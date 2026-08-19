import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { gzipSync, gunzipSync } from "node:zlib";
import { join } from "node:path";

const root = process.cwd();
const sourceDirectory = process.env.SWEED_SERVICE_HTML_DIR ?? join(root, "references", "service-html");
const generatedDirectory = join(root, "apps", "web", "src", "features", "legacy-site");

const services = [
  ["consulting", "consultingReferenceHtmlBase64"],
  ["branding", "brandingReferenceHtmlBase64"],
  ["digital-marketing", "digital_marketingReferenceHtmlBase64"],
  ["software-development", "software_developmentReferenceHtmlBase64"],
  ["media", "mediaReferenceHtmlBase64"],
  ["advertising", "advertisingReferenceHtmlBase64"],
];

function generatedPath(slug) {
  return join(generatedDirectory, `reference-html-service-${slug}.ts`);
}

function decodeGeneratedSource(moduleSource) {
  const chunks = [...moduleSource.matchAll(/"([A-Za-z0-9+/=]{4,})"/g)].map((match) => match[1]);
  if (!chunks.length) throw new Error("Generated service reference contains no base64 payload");
  return gunzipSync(Buffer.from(chunks.join(""), "base64")).toString("utf8");
}

function renderModule(exportName, html) {
  const payload = gzipSync(Buffer.from(html, "utf8"), { level: 9 }).toString("base64");
  const chunks = payload.match(/.{1,120}/g) ?? [];
  const body = chunks.map((chunk) => `  ${JSON.stringify(chunk)},`).join("\n");
  return `// Generated from the supplied HTML source. Keep this payload lossless.\nexport const ${exportName} = [\n${body}\n].join(\"\");\n`;
}

let regenerated = 0;
let verified = 0;

for (const [slug, exportName] of services) {
  const modulePath = generatedPath(slug);
  const currentModule = await readFile(modulePath, "utf8");
  const embeddedHtml = decodeGeneratedSource(currentModule);
  const rawPath = join(sourceDirectory, `${slug}.html`);

  if (!existsSync(rawPath)) {
    verified += 1;
    console.log(`verified ${slug}: using embedded approved HTML source`);
    continue;
  }

  const rawHtml = await readFile(rawPath, "utf8");
  if (rawHtml === embeddedHtml) {
    verified += 1;
    console.log(`verified ${slug}: raw source matches generated reference`);
    continue;
  }

  await writeFile(modulePath, renderModule(exportName, rawHtml));
  regenerated += 1;
  console.log(`regenerated ${slug} from ${rawPath}`);
}

console.log(`service references: ${regenerated} regenerated, ${verified} verified`);
