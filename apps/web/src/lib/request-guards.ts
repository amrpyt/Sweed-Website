export type JsonBodyResult =
  | { ok: true; value: unknown }
  | { ok: false; reason: "invalid-json" | "too-large" };

export async function readJsonBody(request: Request, maxBytes: number): Promise<JsonBodyResult> {
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    return { ok: false, reason: "too-large" };
  }

  if (!request.body) {
    return { ok: false, reason: "invalid-json" };
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let receivedBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      receivedBytes += value.byteLength;
      if (receivedBytes > maxBytes) {
        await reader.cancel("request body too large").catch(() => undefined);
        return { ok: false, reason: "too-large" };
      }

      chunks.push(value);
    }
  } catch {
    return { ok: false, reason: "invalid-json" };
  }

  const merged = new Uint8Array(receivedBytes);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return { ok: true, value: JSON.parse(new TextDecoder().decode(merged)) as unknown };
  } catch {
    return { ok: false, reason: "invalid-json" };
  }
}

export function getClientKey(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = headers.get("x-real-ip")?.trim();
  return (forwarded || realIp || "unknown").slice(0, 80);
}

type RateLimiterOptions = {
  maxRequests: number;
  windowMs: number;
  maxTrackedClients?: number;
};

export class SlidingWindowRateLimiter {
  private readonly attempts = new Map<string, number[]>();
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private readonly maxTrackedClients: number;

  constructor({ maxRequests, windowMs, maxTrackedClients = 2_000 }: RateLimiterOptions) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.maxTrackedClients = maxTrackedClients;
  }

  check(clientKey: string, now = Date.now()) {
    this.pruneExpired(now);

    const recent = (this.attempts.get(clientKey) ?? []).filter((timestamp) => now - timestamp < this.windowMs);
    recent.push(now);
    this.attempts.set(clientKey, recent);

    if (this.attempts.size > this.maxTrackedClients) {
      const oldestKey = this.attempts.keys().next().value as string | undefined;
      if (oldestKey && oldestKey !== clientKey) this.attempts.delete(oldestKey);
    }

    return {
      limited: recent.length > this.maxRequests,
      remaining: Math.max(0, this.maxRequests - recent.length),
      retryAfterSeconds: Math.max(1, Math.ceil(this.windowMs / 1_000)),
    };
  }

  private pruneExpired(now: number) {
    for (const [key, timestamps] of this.attempts) {
      const recent = timestamps.filter((timestamp) => now - timestamp < this.windowMs);
      if (recent.length) this.attempts.set(key, recent);
      else this.attempts.delete(key);
    }
  }
}
