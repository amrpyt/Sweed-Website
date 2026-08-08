import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const workspaceRoot = fileURLToPath(new URL("../..", import.meta.url));

const isDevelopment = process.env.NODE_ENV !== "production";

const scriptSrc = ["'self'", "'unsafe-inline'", "blob:", "https:"];
if (isDevelopment) {
  scriptSrc.push("'unsafe-eval'");
}

const connectSrc = ["'self'", "https:", "blob:"];
if (isDevelopment) {
  connectSrc.push("ws:", "wss:", "http://localhost:3000");
}

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self' https: data: blob:",
      `script-src ${scriptSrc.join(" ")}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com",
      `connect-src ${connectSrc.join(" ")}`,
      "worker-src 'self' blob:",
      "frame-src https://www.youtube.com https://www.google.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

if (!isDevelopment) {
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  });
}

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    root: workspaceRoot,
  },
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/services/development",
        destination: "/services/software-development",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
