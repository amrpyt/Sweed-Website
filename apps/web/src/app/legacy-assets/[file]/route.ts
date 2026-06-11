import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { getWebAppRoot } from "@/lib/web-app-root";

const contentTypes: Record<string, string> = {
  "mobile-polish.css": "text/css; charset=utf-8",
  "mobile-polish.js": "text/javascript; charset=utf-8",
};

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const contentType = contentTypes[file];

  if (!contentType) {
    return new NextResponse("Not found", { status: 404 });
  }

  const body = await readFile(join(getWebAppRoot(), "site", "assets", file), "utf8");

  return new NextResponse(body, {
    headers: {
      "content-type": contentType,
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}
