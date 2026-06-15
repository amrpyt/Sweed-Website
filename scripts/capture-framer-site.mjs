#!/usr/bin/env node
import { chromium } from "playwright";
import { createServer } from "node:http";
import crypto from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_WAIT_MS = 900;

function parseArgs(argv) {
  const args = {
    startUrl: "",
    outDir: ".artifacts/framer-capture/site",
    maxPages: 40,
    maxAssets: 350,
    port: 4177,
    serve: false,
    keepBrowser: false,
    headed: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (!arg.startsWith("--") && !args.startUrl) {
      args.startUrl = arg;
    } else if (arg === "--out" && next) {
      args.outDir = next;
      index += 1;
    } else if (arg === "--max-pages" && next) {
      args.maxPages = Number(next);
      index += 1;
    } else if (arg === "--max-assets" && next) {
      args.maxAssets = Number(next);
      index += 1;
    } else if (arg === "--port" && next) {
      args.port = Number(next);
      index += 1;
    } else if (arg === "--serve") {
      args.serve = true;
    } else if (arg === "--keep-browser") {
      args.keepBrowser = true;
      args.headed = true;
    } else if (arg === "--headed") {
      args.headed = true;
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }
  }

  if (!args.startUrl) {
    printHelp();
    process.exit(1);
  }

  args.startUrl = new URL(args.startUrl).toString();
  args.outDir = path.resolve(args.outDir);
  args.maxPages = Number.isFinite(args.maxPages) ? args.maxPages : 40;
  args.maxAssets = Number.isFinite(args.maxAssets) ? args.maxAssets : 350;
  args.port = Number.isFinite(args.port) ? args.port : 4177;
  return args;
}

function printHelp() {
  console.log(`Usage:
  bun run capture:framer -- <framer-url> [options]
  node scripts/capture-framer-site.mjs <framer-url> [options]

Options:
  --out <dir>        Output directory. Default: .artifacts/framer-capture/site
  --max-pages <n>    Max same-origin pages to crawl. Default: 40
  --max-assets <n>   Max static assets to save. Default: 350
  --serve            Serve the captured site after export
  --port <n>         Local server port for --serve. Default: 4177
  --headed           Run Playwright with a visible browser while crawling
  --keep-browser     Keep a visible browser open on the local export`);
}

function normalizePageUrl(rawUrl) {
  const url = new URL(rawUrl);
  url.hash = "";
  url.search = "";
  let pathname = url.pathname.replace(/\/+/g, "/");
  if (pathname.length > 1) pathname = pathname.replace(/\/$/, "");
  url.pathname = pathname || "/";
  return url.toString();
}

function routePathname(rawUrl) {
  const pathname = new URL(rawUrl).pathname.replace(/\/+/g, "/");
  return pathname === "/" ? "/" : pathname.replace(/\/$/, "");
}

function htmlPathForPage(rawUrl) {
  const pathname = routePathname(rawUrl);
  if (pathname === "/") return "index.html";
  return `${pathname.slice(1)}/index.html`;
}

function isSameOriginLink(rawUrl, origin) {
  try {
    const url = new URL(rawUrl);
    if (url.origin !== origin) return false;
    if (url.protocol !== "https:") return false;
    if (/\.(png|jpe?g|webp|gif|svg|css|mjs|js|json|woff2?|mp4|webm|pdf)$/i.test(url.pathname)) return false;
    return true;
  } catch {
    return false;
  }
}

function extFromContentType(contentType = "") {
  const clean = contentType.split(";")[0].trim();
  return {
    "text/css": ".css",
    "application/javascript": ".js",
    "text/javascript": ".js",
    "application/json": ".json",
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/webp": ".webp",
    "image/svg+xml": ".svg",
    "image/gif": ".gif",
    "font/woff2": ".woff2",
    "font/woff": ".woff",
    "application/font-woff2": ".woff2",
    "application/font-woff": ".woff",
    "video/mp4": ".mp4",
    "video/webm": ".webm",
  }[clean] || "";
}

function shouldCaptureAsset(rawUrl, contentType = "") {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return false;
  }

  if (url.protocol !== "https:") return false;

  const hostOk =
    url.hostname.endsWith("framer.website") ||
    url.hostname.includes("framerusercontent.com") ||
    url.hostname.includes("framerstatic.com");
  if (!hostOk) return false;

  const type = contentType.split(";")[0].trim();
  const pathLooksStatic = /\.(png|jpe?g|webp|gif|svg|css|mjs|js|json|woff2?|mp4|webm|framercms)$/i.test(url.pathname);

  return (
    pathLooksStatic ||
    type.startsWith("text/css") ||
    type.includes("javascript") ||
    type.startsWith("image/") ||
    type.startsWith("font/") ||
    type.startsWith("video/") ||
    type === "application/json" ||
    type === "application/font-woff2" ||
    type === "application/font-woff"
  );
}

function makeAssetNamer() {
  const used = new Set();

  return (rawUrl, contentType = "") => {
    const url = new URL(rawUrl);
    let filename = path.basename(url.pathname);

    if (!filename || !path.extname(filename)) {
      const fallback = filename || "asset";
      filename = `${fallback}${extFromContentType(contentType) || ".bin"}`;
    }

    filename = filename.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(0, 140);
    let localPath = `assets/${filename}`;

    if (used.has(localPath)) {
      const ext = path.extname(filename);
      const stem = path.basename(filename, ext);
      const hash = crypto.createHash("sha1").update(rawUrl).digest("hex").slice(0, 8);
      localPath = `assets/${stem}-${hash}${ext}`;
    }

    used.add(localPath);
    return localPath;
  };
}

function extractAbsoluteUrls(text) {
  const urls = new Set();
  const matches = text.matchAll(/https:\/\/[^"'\\)\s<>]+/g);
  for (const match of matches) {
    const cleaned = match[0].replace(/&amp;/g, "&").replace(/[),.;]+$/, "");
    urls.add(cleaned);
  }
  return urls;
}

function relativeUrl(fromHtmlPath, toLocalPath) {
  const fromDir = path.posix.dirname(fromHtmlPath.replaceAll(path.sep, "/"));
  const relative = path.posix.relative(fromDir === "." ? "" : fromDir, toLocalPath.replaceAll(path.sep, "/"));
  return relative.startsWith(".") ? relative : `./${relative}`;
}

function rewriteUrls(text, fromHtmlPath, assetMap, pageUrls) {
  let output = text;

  for (const [rawUrl, asset] of assetMap) {
    const local = relativeUrl(fromHtmlPath, asset.localPath);
    output = output.split(rawUrl).join(local);
    output = output.split(rawUrl.replace(/&/g, "&amp;")).join(local.replace(/&/g, "&amp;"));
  }

  const sortedPageUrls = [...pageUrls].sort(
    (left, right) => new URL(right).pathname.length - new URL(left).pathname.length
  );

  for (const pageUrl of sortedPageUrls) {
    const url = new URL(pageUrl);
    const fromDir = path.posix.dirname(fromHtmlPath);
    const targetPath = htmlPathForPage(pageUrl);
    const targetDir = path.posix.dirname(targetPath);
    let local = path.posix.relative(fromDir === "." ? "" : fromDir, targetDir);
    if (!local) local = ".";
    if (!local.startsWith(".")) local = `./${local}`;
    if (routePathname(pageUrl) === "/" && !local.endsWith("/")) local = `${local}/`;

    output = output.split(url.toString()).join(local);
    output = output.split(url.origin + url.pathname).join(local);
  }

  return output;
}

function makeStaticServer(root, port) {
  const mime = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".woff2": "font/woff2",
    ".woff": "font/woff",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
  };

  const server = createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url || "/", `http://127.0.0.1:${port}`);
      const pathname = decodeURIComponent(requestUrl.pathname);
      const candidates = [
        pathname === "/" ? "/index.html" : pathname,
        `${pathname.replace(/\/$/, "")}/index.html`,
      ];

      for (const candidate of candidates) {
        const file = path.resolve(root, `.${candidate}`);
        if (!file.startsWith(root)) continue;

        try {
          const body = await readFile(file);
          response.writeHead(200, { "content-type": mime[path.extname(file)] || "application/octet-stream" });
          response.end(body);
          return;
        } catch {}
      }
    } catch {}

    response.writeHead(404);
    response.end("not found");
  });

  return new Promise((resolve) => {
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}

async function scrollThroughPage(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height + 1200; y += 900) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(250);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForLoadState("networkidle", { timeout: 12_000 }).catch(() => {});
  await page.waitForTimeout(DEFAULT_WAIT_MS);
}

async function openRenderedPage(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await page.waitForLoadState("networkidle", { timeout: 12_000 }).catch(() => {});
  await page.waitForTimeout(DEFAULT_WAIT_MS);
}

async function captureAsset(rawUrl, assetMap, localPathForAsset, assetQueue, maxAssets) {
  if (assetMap.size >= maxAssets) return;
  if (assetMap.has(rawUrl) || !shouldCaptureAsset(rawUrl)) return;

  try {
    const response = await fetch(rawUrl);
    if (!response.ok) return;
    const contentType = response.headers.get("content-type") || "";
    if (!shouldCaptureAsset(rawUrl, contentType)) return;

    const body = Buffer.from(await response.arrayBuffer());
    const localPath = localPathForAsset(rawUrl, contentType);
    assetMap.set(rawUrl, { localPath, body, contentType });

    const textLike = contentType.includes("javascript") || contentType.includes("text/css") || contentType.includes("json");
    if (textLike) {
      const text = body.toString("utf8");
      for (const nestedUrl of extractAbsoluteUrls(text)) {
        if (!assetMap.has(nestedUrl) && shouldCaptureAsset(nestedUrl)) {
          assetQueue.push(nestedUrl);
        }
      }
    }
  } catch {}
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const start = normalizePageUrl(args.startUrl);
  const origin = new URL(start).origin;
  const localPathForAsset = makeAssetNamer();
  const assetMap = new Map();
  const pageHtml = new Map();
  const queue = [start];
  const queued = new Set(queue);
  const assetQueue = [];
  const failed = [];

  await rm(args.outDir, { recursive: true, force: true });
  await mkdir(path.join(args.outDir, "assets"), { recursive: true });
  console.log(`Starting crawl: ${start}`);
  console.log(`Output: ${args.outDir}`);

  const browser = await chromium.launch({ headless: !args.headed });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1600 }, deviceScaleFactor: 1 });
  const page = await context.newPage();

  page.on("response", async (response) => {
    try {
      const rawUrl = response.url();
      const contentType = response.headers()["content-type"] || "";
      if (response.status() >= 400 || assetMap.size >= args.maxAssets || assetMap.has(rawUrl) || !shouldCaptureAsset(rawUrl, contentType)) return;

      const body = await response.body();
      if (!body.length) return;

      const localPath = localPathForAsset(rawUrl, contentType);
      assetMap.set(rawUrl, { localPath, body, contentType });

      const textLike = contentType.includes("javascript") || contentType.includes("text/css") || contentType.includes("json");
      if (textLike) {
        for (const nestedUrl of extractAbsoluteUrls(body.toString("utf8"))) {
          if (!assetMap.has(nestedUrl) && shouldCaptureAsset(nestedUrl)) assetQueue.push(nestedUrl);
        }
      }
    } catch {}
  });

  while (queue.length && pageHtml.size < args.maxPages) {
    const currentUrl = queue.shift();

    try {
      console.log(`Opening: ${new URL(currentUrl).pathname}`);
      await openRenderedPage(page, currentUrl);
      await scrollThroughPage(page);

      const html = await page.content();
      pageHtml.set(currentUrl, html);

      for (const absoluteUrl of extractAbsoluteUrls(html)) {
        if (!assetMap.has(absoluteUrl) && shouldCaptureAsset(absoluteUrl)) assetQueue.push(absoluteUrl);
      }

      const links = await page.evaluate(() =>
        Array.from(document.querySelectorAll("a[href]"), (anchor) => anchor.href)
      );

      for (const link of links) {
        if (!isSameOriginLink(link, origin)) continue;
        const normalized = normalizePageUrl(link);
        if (queued.has(normalized)) continue;

        queued.add(normalized);
        queue.push(normalized);
      }

      console.log(`Captured page ${pageHtml.size}: ${new URL(currentUrl).pathname}`);
    } catch (error) {
      failed.push({ url: currentUrl, error: error.message });
    }
  }

  console.log(`Fetching referenced assets: ${assetQueue.length}`);
  while (assetQueue.length && assetMap.size < args.maxAssets) {
    const assetUrl = assetQueue.shift();
    await captureAsset(assetUrl, assetMap, localPathForAsset, assetQueue, args.maxAssets);
  }

  const pageUrls = Array.from(pageHtml.keys());

  for (const [rawUrl, html] of pageHtml) {
    const htmlPath = htmlPathForPage(rawUrl);
    const outputHtml = rewriteUrls(html, htmlPath, assetMap, pageUrls);
    const target = path.join(args.outDir, htmlPath);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, outputHtml, "utf8");
  }

  for (const [rawUrl, asset] of assetMap) {
    let body = asset.body;
    const textLike =
      asset.contentType.includes("javascript") ||
      asset.contentType.includes("text/css") ||
      asset.contentType.includes("json");

    if (textLike) {
      const rewritten = rewriteUrls(body.toString("utf8"), asset.localPath, assetMap, pageUrls);
      body = Buffer.from(rewritten, "utf8");
    }

    const target = path.join(args.outDir, asset.localPath);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, body);
  }

  let server;
  if (args.serve || args.keepBrowser) {
    server = await makeStaticServer(args.outDir, args.port);
  }

  if (args.keepBrowser) {
    const testPage = await context.newPage();
    await testPage.goto(`http://127.0.0.1:${args.port}/`, { waitUntil: "domcontentloaded" });
    console.log(`Local browser open: http://127.0.0.1:${args.port}/`);
  } else {
    await browser.close();
  }

  const result = {
    outDir: args.outDir,
    pages: pageUrls.map((url) => routePathname(url)),
    assets: assetMap.size,
    failed,
    servedAt: server ? `http://127.0.0.1:${args.port}/` : undefined,
  };

  console.log(JSON.stringify(result, null, 2));

  if (server && !args.keepBrowser) {
    console.log("Static server is running. Press Ctrl+C to stop.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
