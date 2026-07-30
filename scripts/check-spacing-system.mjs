import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve("apps/web/src");
const CARBON_REM_VALUES = new Set([
  0,
  0.125,
  0.25,
  0.5,
  0.75,
  1,
  1.5,
  2,
  2.5,
  3,
  4,
  5,
  6,
  10,
]);

const EXCLUDED_PATH_FRAGMENTS = [
  `${path.sep}admin${path.sep}`,
  `${path.sep}midu-clone${path.sep}`,
  `${path.sep}styles${path.sep}tokens.css`,
  `${path.sep}offer-funnel${path.sep}admin-settings-form.module.css`,
];

const SPACING_DECLARATION = /\b(?:margin(?:-[\w-]+)?|padding(?:-[\w-]+)?|gap|row-gap|column-gap)\s*:\s*([^;]+)/g;
const LENGTH_VALUE = /(-?\d*\.?\d+)(rem|px)/g;

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

function toRem(value, unit) {
  return unit === "px" ? value / 16 : value;
}

const violations = [];
const files = (await collectCssFiles(ROOT)).filter((filePath) => !isExcluded(filePath));

for (const filePath of files) {
  const source = await readFile(filePath, "utf8");
  const lines = source.split("\n");

  lines.forEach((line, index) => {
    if (line.includes("spacing-exception:")) return;

    SPACING_DECLARATION.lastIndex = 0;
    for (const declaration of line.matchAll(SPACING_DECLARATION)) {
      const value = declaration[1];
      LENGTH_VALUE.lastIndex = 0;

      for (const match of value.matchAll(LENGTH_VALUE)) {
        const numericValue = Math.abs(Number(match[1]));
        const remValue = toRem(numericValue, match[2]);

        if (!CARBON_REM_VALUES.has(remValue)) {
          violations.push({
            filePath: path.relative(process.cwd(), filePath),
            line: index + 1,
            value: match[0],
            declaration: line.trim(),
          });
        }
      }
    }
  });
}

if (violations.length > 0) {
  console.error("Spacing system check failed. Use Carbon spacing tokens or a documented semantic token.\n");
  for (const violation of violations) {
    console.error(
      `${violation.filePath}:${violation.line} — ${violation.value}\n  ${violation.declaration}`,
    );
  }
  console.error(
    "\nAllowed raw values: 0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 160px. Prefer semantic CSS variables over raw values.",
  );
  process.exit(1);
}

console.log(`Spacing system check passed across ${files.length} CSS files.`);
