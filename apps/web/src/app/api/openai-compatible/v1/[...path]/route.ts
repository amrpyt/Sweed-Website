import { NextResponse } from "next/server";

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

function getUpstreamConfig(request: Request) {
  const upstreamBaseUrl = process.env.RORK_OPENAI_BASE_URL ?? "https://rork-openai-proxy-v2.amremaad11.workers.dev/v1";
  const authHeader = request.headers.get("authorization");
  const apiKey = authHeader?.replace(/^Bearer\s+/i, "") || process.env.OPENAI_API_KEY;

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
    .map((message) => ({
      role: message.role === "assistant" || message.role === "system" ? message.role : "user",
      content: contentToText(message.content),
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
  const createdAt = chat.created ?? Math.floor(Date.now() / 1000);
  const model = chat.model ?? fallbackModel;
  const text = chat.choices?.[0]?.message?.content ?? "";
  const usage = chat.usage ?? {};

  const chunks = [
    sseData({
      type: "response.created",
      response: {
        id: responseId,
        created_at: createdAt,
        model,
      },
    }),
    sseData({
      type: "response.output_item.added",
      output_index: 0,
      item: {
        type: "message",
        id: itemId,
      },
    }),
    sseData({
      type: "response.output_text.delta",
      item_id: itemId,
      delta: text,
    }),
    sseData({
      type: "response.output_item.done",
      output_index: 0,
      item: {
        type: "message",
        id: itemId,
      },
    }),
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

  return new Response(new ReadableStream({ start(controller) {
    chunks.forEach((chunk) => controller.enqueue(encoder.encode(chunk)));
    controller.close();
  } }), {
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache",
      connection: "keep-alive",
    },
  });
}

async function forwardChatCompletions(request: Request, body: unknown) {
  const { upstreamBaseUrl, apiKey } = getUpstreamConfig(request);
  const response = await fetch(`${upstreamBaseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(apiKey ? { authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify(body),
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      "content-type": response.headers.get("content-type") ?? "application/json",
    },
  });
}

async function handleResponses(request: Request, body: ResponsesBody) {
  const chatBody = {
    model: body.model ?? process.env.AI_MODEL ?? "gpt-4o-mini",
    messages: responsesInputToChatMessages(body.input),
    stream: false,
  };

  const chatResponse = await forwardChatCompletions(request, chatBody);
  const chat = (await chatResponse.json()) as ChatCompletionResponse;

  if (!chatResponse.ok) {
    return NextResponse.json(chat, { status: chatResponse.status });
  }

  if (body.stream) {
    return createResponsesStream(chat, chatBody.model);
  }

  const responseId = chat.id ?? `resp_${crypto.randomUUID()}`;
  const itemId = `msg_${crypto.randomUUID()}`;
  const text = chat.choices?.[0]?.message?.content ?? "";

  return NextResponse.json({
    id: responseId,
    created_at: chat.created ?? Math.floor(Date.now() / 1000),
    model: chat.model ?? chatBody.model,
    output: [
      {
        type: "message",
        role: "assistant",
        id: itemId,
        content: [
          {
            type: "output_text",
            text,
            annotations: [],
          },
        ],
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
  const params = await context.params;
  const endpoint = params.path?.join("/") ?? "";
  const body = await request.json();

  if (endpoint === "responses") {
    return handleResponses(request, body as ResponsesBody);
  }

  if (endpoint === "chat/completions") {
    return forwardChatCompletions(request, body);
  }

  return NextResponse.json({ error: `Unsupported endpoint: ${endpoint}` }, { status: 404 });
}
