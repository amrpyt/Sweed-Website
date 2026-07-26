import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getClientKey, readJsonBody, SlidingWindowRateLimiter } from "@/lib/request-guards";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const maxBodyBytes = 64 * 1_024;
const proxyRateLimiter = new SlidingWindowRateLimiter({
  maxRequests: 30,
  windowMs: 10 * 60 * 1_000,
  maxTrackedClients: 500,
});

type ResponseInputMessage = {
  role?: string;
  content?: string | Array<{ type?: string; text?: string }>;
};

type ResponsesBody = {
  model?: string;
  input?: ResponseInputMessage[];
  stream?: boolean;
};

type ChatCompletionResponse = {
  id?: string;
  created?: number;
  model?: string;
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
  };
};

function noStoreJson(body: unknown, init?: ResponseInit) {
  const response = NextResponse.json(body, init);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

function matchesPrivateToken(provided: string | null, expected: string) {
  if (!provided?.startsWith("Bearer ")) return false;

  const suppliedToken = provided.slice("Bearer ".length).trim();
  const suppliedBuffer = Buffer.from(suppliedToken);
  const expectedBuffer = Buffer.from(expected);

  return suppliedBuffer.length === expectedBuffer.length && timingSafeEqual(suppliedBuffer, expectedBuffer);
}

function authorizeProxy(request: Request) {
  const expectedToken = process.env.OPENAI_COMPATIBLE_PROXY_TOKEN?.trim();

  // This compatibility endpoint is private infrastructure, not a public website API.
  // Keep it undiscoverable when the deployment has not explicitly configured access.
  if (!expectedToken) return { ok: false as const, status: 404 };

  if (!matchesPrivateToken(request.headers.get("authorization"), expectedToken)) {
    return { ok: false as const, status: 401 };
  }

  return { ok: true as const };
}

function getUpstreamConfig() {
  const upstreamBaseUrl = process.env.RORK_OPENAI_BASE_URL ?? "https://rork-openai-proxy-v2.amremaad11.workers.dev/v1";
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  return { upstreamBaseUrl: upstreamBaseUrl.replace(/\/$/, ""), apiKey };
}

function contentToText(content: ResponseInputMessage["content"]) {
  if (typeof content === "string") return content;

  return (
    content
      ?.map((part) => {
        if (part.type === "input_text" || part.type === "output_text" || part.type === "text") return part.text ?? "";
        return "";
      })
      .join("") ?? ""
  );
}

function responsesInputToChatMessages(input: ResponseInputMessage[] = []) {
  return input
    .slice(-20)
    .map((message) => ({
      role: message.role === "assistant" || message.role === "system" ? message.role : "user",
      content: contentToText(message.content).slice(0, 20_000),
    }))
    .filter((message) => message.content.trim().length > 0);
}

function sseData(value: unknown) {
  return `data: ${JSON.stringify(value)}\n\n`;
}

function createResponsesStream(chat: ChatCompletionResponse, fallbackModel: string) {
  const encoder = new TextEncoder();
  const responseId = chat.id ?? `resp_${crypto.randomUUID()}`;
  const itemId = `msg_${crypto.randomUUID()}`;
  const createdAt = chat.created ?? Math.floor(Date.now() / 1_000);
  const model = chat.model ?? fallbackModel;
  const text = chat.choices?.[0]?.message?.content ?? "";
  const usage = chat.usage ?? {};

  const chunks = [
    sseData({ type: "response.created", response: { id: responseId, created_at: createdAt, model } }),
    sseData({ type: "response.output_item.added", output_index: 0, item: { type: "message", id: itemId } }),
    sseData({ type: "response.output_text.delta", item_id: itemId, delta: text }),
    sseData({ type: "response.output_item.done", output_index: 0, item: { type: "message", id: itemId } }),
    sseData({
      type: "response.completed",
      response: {
        incomplete_details: null,
        usage: {
          input_tokens: usage.prompt_tokens ?? 0,
          input_tokens_details: { cached_tokens: 0 },
          output_tokens: usage.completion_tokens ?? 0,
          output_tokens_details: { reasoning_tokens: 0 },
        },
        service_tier: null,
      },
    }),
    "data: [DONE]\n\n",
  ];

  return new Response(
    new ReadableStream({
      start(controller) {
        chunks.forEach((chunk) => controller.enqueue(encoder.encode(chunk)));
        controller.close();
      },
    }),
    {
      headers: {
        "content-type": "text/event-stream; charset=utf-8",
        "cache-control": "no-store",
        connection: "keep-alive",
      },
    },
  );
}

async function forwardChatCompletions(body: unknown) {
  const { upstreamBaseUrl, apiKey } = getUpstreamConfig();
  if (!apiKey) return noStoreJson({ error: "Upstream AI credentials are not configured" }, { status: 503 });

  const response = await fetch(`${upstreamBaseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30_000),
    cache: "no-store",
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "application/json",
      "cache-control": "no-store",
    },
  });
}

async function handleResponses(body: ResponsesBody) {
  const configuredModel = process.env.AI_MODEL?.trim() || "gpt-4o-mini";
  const chatBody = {
    model: configuredModel,
    messages: responsesInputToChatMessages(body.input),
    stream: false,
    max_tokens: 2_048,
  };

  const chatResponse = await forwardChatCompletions(chatBody);
  const chat = (await chatResponse.json()) as ChatCompletionResponse;

  if (!chatResponse.ok) return noStoreJson(chat, { status: chatResponse.status });
  if (body.stream) return createResponsesStream(chat, configuredModel);

  const responseId = chat.id ?? `resp_${crypto.randomUUID()}`;
  const itemId = `msg_${crypto.randomUUID()}`;
  const text = chat.choices?.[0]?.message?.content ?? "";

  return noStoreJson({
    id: responseId,
    created_at: chat.created ?? Math.floor(Date.now() / 1_000),
    model: chat.model ?? configuredModel,
    output: [
      {
        type: "message",
        role: "assistant",
        id: itemId,
        content: [{ type: "output_text", text, annotations: [] }],
      },
    ],
    usage: {
      input_tokens: chat.usage?.prompt_tokens ?? 0,
      input_tokens_details: { cached_tokens: 0 },
      output_tokens: chat.usage?.completion_tokens ?? 0,
      output_tokens_details: { reasoning_tokens: 0 },
    },
  });
}

export async function POST(request: Request, context: { params: Promise<{ path?: string[] }> }) {
  const authorization = authorizeProxy(request);
  if (!authorization.ok) {
    return noStoreJson(
      { error: authorization.status === 404 ? "Not found" : "Authentication required" },
      authorization.status === 401
        ? { status: 401, headers: { "WWW-Authenticate": 'Bearer realm="SWEED private AI proxy"' } }
        : { status: 404 },
    );
  }

  const rateLimit = proxyRateLimiter.check(getClientKey(request.headers));
  if (rateLimit.limited) {
    return noStoreJson(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
    );
  }

  const parsedBody = await readJsonBody(request, maxBodyBytes);
  if (!parsedBody.ok) {
    return noStoreJson(
      { error: parsedBody.reason === "too-large" ? "Request body too large" : "Invalid JSON body" },
      { status: parsedBody.reason === "too-large" ? 413 : 400 },
    );
  }

  const params = await context.params;
  const endpoint = params.path?.join("/") ?? "";

  if (endpoint === "responses") return handleResponses(parsedBody.value as ResponsesBody);
  if (endpoint === "chat/completions") {
    const configuredModel = process.env.AI_MODEL?.trim() || "gpt-4o-mini";
    const raw = parsedBody.value && typeof parsedBody.value === "object" ? parsedBody.value as Record<string, unknown> : {};
    return forwardChatCompletions({
      ...raw,
      model: configuredModel,
      stream: false,
      max_tokens: Math.min(Number(raw.max_tokens) || 2_048, 2_048),
    });
  }

  return noStoreJson({ error: "Not found" }, { status: 404 });
}
