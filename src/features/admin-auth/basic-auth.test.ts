import { describe, expect, test } from "bun:test";
import { isAdminPath, verifyBasicAuthHeader } from "./basic-auth";

function basic(username: string, password: string) {
  return `Basic ${btoa(`${username}:${password}`)}`;
}

describe("admin basic auth", () => {
  test("matches admin page and admin API paths", () => {
    expect(isAdminPath("/admin/offer-funnel")).toBe(true);
    expect(isAdminPath("/api/admin/offer-funnel")).toBe(true);
    expect(isAdminPath("/api/offer-funnel")).toBe(false);
  });

  test("allows local access when credentials are not configured", () => {
    expect(verifyBasicAuthHeader(null, {})).toEqual({ ok: false, reason: "not-configured" });
  });

  test("accepts correct credentials and rejects invalid credentials", () => {
    const credentials = { username: "admin", password: "secret" };

    expect(verifyBasicAuthHeader(basic("admin", "secret"), credentials)).toEqual({ ok: true });
    expect(verifyBasicAuthHeader(basic("admin", "wrong"), credentials)).toEqual({ ok: false, reason: "invalid" });
  });
});
