import { NextResponse, type NextRequest } from "next/server";
import { isAdminPath, verifyBasicAuthHeader } from "@/features/admin-auth/basic-auth";

export function middleware(request: NextRequest) {
  if (!isAdminPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const result = verifyBasicAuthHeader(request.headers.get("authorization"), {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  });

  if (result.ok || (result.reason === "not-configured" && process.env.NODE_ENV !== "production")) {
    return NextResponse.next();
  }

  if (result.reason === "not-configured") {
    return new NextResponse("Not found", {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "WWW-Authenticate": 'Basic realm="SWEED Admin", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
