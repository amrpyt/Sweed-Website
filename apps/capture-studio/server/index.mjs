import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createCaptureConfig, runCapture } from "@sweed/capture-core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(appRoot, "../..");
const distRoot = path.join(appRoot, "dist");
const port = Number(process.env.CAPTURE_STUDIO_PORT || 5187);
const jobs = new Map();

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://127.0.0.1:${port}`);
    if (url.pathname === "/api/jobs" && request.method === "GET") {
      return sendJson(response, [...jobs.values()]
        .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
        .map(publicJob));
    }
    if (url.pathname === "/api/jobs" && request.method === "POST") return createJob(request, response);

    const eventMatch = url.pathname.match(/^\/api\/jobs\/([^/]+)\/events$/);
    if (eventMatch && request.method === "GET") return streamEvents(eventMatch[1], response);

    const cancelMatch = url.pathname.match(/^\/api\/jobs\/([^/]+)\/cancel$/);
    if (cancelMatch && request.method === "POST") return cancelJob(cancelMatch[1], response);

    const downloadMatch = url.pathname.match(/^\/api\/jobs\/([^/]+)\/download\.zip$/);
    if (downloadMatch && request.method === "GET") return sendDownload(downloadMatch[1], response);

    const previewMatch = url.pathname.match(/^\/api\/jobs\/([^/]+)\/preview(\/.*)?$/);
    if (previewMatch && request.method === "GET") return sendPreview(previewMatch[1], previewMatch[2] || "/", response);

    const jobMatch = url.pathname.match(/^\/api\/jobs\/([^/]+)$/);
    if (jobMatch && request.method === "GET") {
      const job = jobs.get(jobMatch[1]);
      return job ? sendJson(response, publicJob(job)) : sendJson(response, { error: "Not found" }, 404);
    }

    return sendStudioAsset(url.pathname, response);
  } catch (error) {
    sendJson(response, { error: error.message }, 500);
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Capture Studio: http://127.0.0.1:${port}`);
});

async function createJob(request, response) {
  const body = await readBody(request);
  const id = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
  const outDir = body.outDir || path.join(repoRoot, ".artifacts", "capture-studio", id);
  const config = createCaptureConfig({ ...body, outDir });
  const controller = new AbortController();
  const job = {
    id,
    status: "running",
    config,
    events: [],
    clients: new Set(),
    report: null,
    controller,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  jobs.set(id, job);
  sendJson(response, publicJob(job), 201);
  runJob(job);
}

async function runJob(job) {
  pushEvent(job, { type: "job:start", message: "Job started" });
  try {
    const report = await runCapture(job.config, {
      signal: job.controller.signal,
      emit(event) {
        pushEvent(job, event);
      },
    });
    job.status = "completed";
    job.report = report;
    job.updatedAt = new Date().toISOString();
    pushEvent(job, { type: "job:complete", message: "Job completed" });
  } catch (error) {
    job.status = job.controller.signal.aborted ? "cancelled" : "failed";
    job.updatedAt = new Date().toISOString();
    job.report = { error: error.message };
    pushEvent(job, { type: "job:error", message: error.message });
  }
}

function streamEvents(id, response) {
  const job = jobs.get(id);
  if (!job) return sendJson(response, { error: "Not found" }, 404);
  response.writeHead(200, {
    "content-type": "text/event-stream",
    "cache-control": "no-cache",
    connection: "keep-alive",
  });
  for (const event of job.events) response.write(`data: ${JSON.stringify(event)}\n\n`);
  job.clients.add(response);
  requestCleanup(response, () => job.clients.delete(response));
}

function cancelJob(id, response) {
  const job = jobs.get(id);
  if (!job) return sendJson(response, { error: "Not found" }, 404);
  job.controller.abort();
  job.status = "cancelled";
  pushEvent(job, { type: "job:cancel", message: "Cancel requested" });
  sendJson(response, publicJob(job));
}

async function sendPreview(id, rawPath, response) {
  const job = jobs.get(id);
  if (!job) return sendJson(response, { error: "Not found" }, 404);
  const siteRoot = path.join(job.config.outDir, "site");
  const pathname = decodeURIComponent(rawPath === "/" ? "/index.html" : rawPath);
  const candidates = [pathname, `${pathname.replace(/\/$/, "")}/index.html`];
  for (const candidate of candidates) {
    const file = path.resolve(siteRoot, `.${candidate}`);
    if (!file.startsWith(siteRoot)) continue;
    try {
      const body = await readFile(file);
      response.writeHead(200, { "content-type": mime(path.extname(file)) });
      response.end(body);
      return;
    } catch {}
  }
  response.writeHead(404);
  response.end("not found");
}

async function sendDownload(id, response) {
  const job = jobs.get(id);
  if (!job) return sendJson(response, { error: "Not found" }, 404);
  const file = path.join(job.config.outDir, "export.zip");
  try {
    await stat(file);
    response.writeHead(200, {
      "content-type": "application/gzip",
      "content-disposition": `attachment; filename="${id}-export.zip"`,
    });
    response.end(await readFile(file));
  } catch {
    sendJson(response, { error: "ZIP not available. Enable zipExport first." }, 404);
  }
}

function publicJob(job) {
  return {
    id: job.id,
    status: job.status,
    config: job.config,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
    events: job.events.slice(-200),
    report: job.report,
  };
}

function pushEvent(job, event) {
  const payload = { id: `${Date.now()}-${job.events.length}`, at: new Date().toISOString(), ...event };
  job.events.push(payload);
  job.updatedAt = payload.at;
  for (const client of job.clients) client.write(`data: ${JSON.stringify(payload)}\n\n`);
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const text = Buffer.concat(chunks).toString("utf8");
  return text ? JSON.parse(text) : {};
}

function sendJson(response, body, status = 200) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

function requestCleanup(response, callback) {
  response.on("close", callback);
  response.on("error", callback);
}

function mime(ext) {
  return {
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
  }[ext] || "application/octet-stream";
}

async function sendStudioAsset(pathname, response) {
  const requested = pathname === "/" ? "/index.html" : pathname;
  const candidates = [requested, "/index.html"];
  for (const candidate of candidates) {
    const file = path.resolve(distRoot, `.${candidate}`);
    if (!file.startsWith(distRoot)) continue;
    try {
      const body = await readFile(file);
      response.writeHead(200, { "content-type": mime(path.extname(file)) });
      response.end(body);
      return;
    } catch {}
  }
  response.writeHead(404);
  response.end("Capture Studio UI not built. Run: bun run --cwd apps/capture-studio build");
}
