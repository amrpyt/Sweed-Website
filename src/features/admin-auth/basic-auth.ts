export type AdminAuthResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "missing" | "invalid" };

export function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/api/admin/");
}

export function verifyBasicAuthHeader(
  authorization: string | null,
  credentials: { username?: string; password?: string },
): AdminAuthResult {
  if (!credentials.username || !credentials.password) {
    return { ok: false, reason: "not-configured" };
  }

  if (!authorization?.startsWith("Basic ")) {
    return { ok: false, reason: "missing" };
  }

  try {
    const decoded = atob(authorization.slice("Basic ".length));
    const separatorIndex = decoded.indexOf(":");
    const username = decoded.slice(0, separatorIndex);
    const password = decoded.slice(separatorIndex + 1);

    if (username === credentials.username && password === credentials.password) {
      return { ok: true };
    }
  } catch {
    return { ok: false, reason: "invalid" };
  }

  return { ok: false, reason: "invalid" };
}
