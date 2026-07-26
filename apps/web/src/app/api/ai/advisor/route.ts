import { NextResponse } from "next/server";
import { advisorRequestSchema } from "@/features/ai-advisor/contracts";
import { askSweedAdvisor } from "@/features/ai-advisor/server/service";
import { getClientKey, readJsonBody, SlidingWindowRateLimiter } from "@/lib/request-guards";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const maxBodyBytes = 16_384;
const advisorRateLimiter = new SlidingWindowRateLimiter({
  maxRequests: 12,
  windowMs: 10 * 60 * 1_000,
});

function jsonResponse(body: unknown, init?: ResponseInit) {
  const response = NextResponse.json(body, init);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function POST(request: Request) {
  const rateLimit = advisorRateLimiter.check(getClientKey(request.headers));
  if (rateLimit.limited) {
    return jsonResponse(
      { error: "Too many advisor requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  const body = await readJsonBody(request, maxBodyBytes);
  if (!body.ok) {
    return jsonResponse(
      { error: body.reason === "too-large" ? "Advisor request is too large" : "Invalid advisor request" },
      { status: body.reason === "too-large" ? 413 : 400 },
    );
  }

  const parsed = advisorRequestSchema.safeParse(body.value);
  if (!parsed.success) {
    return jsonResponse({ error: "Invalid advisor request" }, { status: 400 });
  }

  const response = await askSweedAdvisor(parsed.data);
  return jsonResponse(response);
}
