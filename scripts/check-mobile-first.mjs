import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve("apps/web/src");
const LEGACY_MAX_WIDTH_BUDGET = 40;
const EXCLUDED_PATH_FRAGMENTS = [
  `${path.sep}admin${path.sep}`,
  `${path.sep}midu-clone${path.sep}`,
  `${path.sep}offer-funnel${path.sep}admin-settings-form.module.css`,
];

async function collectCssFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectCssFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".css")) {
      files.push(fullPath);
    }
  }

  return files;
}

function isExcluded(filePath) {
  return EXCLUDED_PATH_FRAGMENTS.some((fragment) => filePath.includes(fragment));
}

const files = (await collectCssFiles(ROOT)).filter((filePath) => !isExcluded(filePath));
const legacyQueries = [];

for (const filePath of files) {
  const source = await readFile(filePath, "utf8");
  const lines = source.split("\n");

  lines.forEach((line, index) => {
    if (/@media[^\{]*max-width/i.test(line)) {
      legacyQueries.push({
        filePath: path.relative(process.cwd(), filePath),
        line: index + 1,
        declaration: line.trim(),
      });
    }
  });
}

if (legacyQueries.length > LEGACY_MAX_WIDTH_BUDGET) {
  console.error(
    `Mobile-first check failed: found ${legacyQueries.length} max-width media queries; budget is ${LEGACY_MAX_WIDTH_BUDGET}.`,
  );
  console.error("New responsive CSS must use mobile base styles and min-width enhancement queries.\n");

  for (const query of legacyQueries.slice(LEGACY_MAX_WIDTH_BUDGET)) {
    console.error(`${query.filePath}:${query.line} — ${query.declaration}`);
  }

  process.exit(1);
}

console.log(
  `Mobile-first check passed. Legacy max-width queries: ${legacyQueries.length}/${LEGACY_MAX_WIDTH_BUDGET}; new work must not increase this count.`,
);
