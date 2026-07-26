import { describe, expect, test } from "bun:test";
import { getClientKey, readJsonBody, SlidingWindowRateLimiter } from "./request-guards";

describe("request guards", () => {
  test("reads bounded JSON bodies", async () => {
    const request = new Request("https://example.test/api", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ok: true }),
    });

    expect(await readJsonBody(request, 1_024)).toEqual({ ok: true, value: { ok: true } });
  });

  test("rejects oversized and invalid JSON bodies", async () => {
    const oversized = new Request("https://example.test/api", {
      method: "POST",
      body: JSON.stringify({ value: "x".repeat(100) }),
    });
    expect(await readJsonBody(oversized, 20)).toEqual({ ok: false, reason: "too-large" });

    const invalid = new Request("https://example.test/api", {
      method: "POST",
      body: "{not-json",
    });
    expect(await readJsonBody(invalid, 100)).toEqual({ ok: false, reason: "invalid-json" });
  });

  test("uses the first forwarded address as the client key", () => {
    expect(getClientKey(new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" }))).toBe("203.0.113.7");
    expect(getClientKey(new Headers({ "x-real-ip": "203.0.113.8" }))).toBe("203.0.113.8");
  });

  test("enforces a sliding request window", () => {
    const limiter = new SlidingWindowRateLimiter({ maxRequests: 2, windowMs: 1_000 });

    expect(limiter.check("client", 0).limited).toBe(false);
    expect(limiter.check("client", 100).limited).toBe(false);
    expect(limiter.check("client", 200).limited).toBe(true);
    expect(limiter.check("client", 1_200).limited).toBe(false);
  });
});
