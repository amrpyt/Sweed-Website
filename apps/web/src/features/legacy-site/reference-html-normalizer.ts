import { getSweedReferenceButtonThemeCss } from "./reference-button-theme";

const referenceScope = ".sweed-reference-page";
const sweedReferenceFontStack =
  '"SWEED Helvetica Arabic","SF Arabic",Arial,sans-serif';
const sweedReferenceInlineFontStack =
  "SWEED Helvetica Arabic,SF Arabic,Arial,sans-serif";

const sweedReferenceColorMap = new Map<string, string>([
  ["#241238", "#261b3e"],
  ["#3b2160", "#261b3e"],
  ["#4e2b7e", "#261b3e"],
  ["#180b28", "#261b3e"],
  ["#14091f", "#261b3e"],
  ["#2a1745", "#261b3e"],
  ["#3a1e5e", "#261b3e"],
  ["#2b2437", "#261b3e"],
  ["#d6246e", "#ed2062"],
  ["#ff7bac", "#ed2062"],
  ["#8b87a0", "#6d6e70"],
  ["#faf9fc", "#f8f9fa"],
  ["#efeaf7", "#f7f8fb"],
  ["#eee9f5", "#d9dee8"],
  ["#e4def0", "#d9dee8"],
  ["#d9d2e8", "#d9dee8"],
  ["#c9c4d8", "#6d6e70"],
  ["#f1edf8", "#f7f8fb"],
  ["#160a24", "#261b3e"],
  ["#31184f", "#261b3e"],
  ["#33195a", "#261b3e"],
  ["#1d0e2e", "#261b3e"],
  ["#120818", "#261b3e"],
  ["#0e0614", "#261b3e"],
  ["#2a1240", "#261b3e"],
  ["#160b24", "#261b3e"],
  ["#150922", "#261b3e"],
  ["#2e1648", "#261b3e"],
  ["#1a0c2c", "#261b3e"],
  ["#5a2f8f", "#261b3e"],
  ["#6c43a8", "#261b3e"],
  ["#6b21a8", "#261b3e"],
  ["#8b2e5e", "#ed2062"],
  ["#4ade80", "#ed2062"],
  ["#1e7a46", "#ed2062"],
  ["#fca5a5", "#ed2062"],
  ["#b0472b", "#ed2062"],
  ["#2b6cb0", "#261b3e"],
  ["#0f766e", "#261b3e"],
  ["#f2f9f4", "#f8f9fa"],
  ["#cbe7d4", "#d9dee8"],
  ["#fcf3f6", "#f8f9fa"],
  ["#f3d3e0", "#f7f8fb"],
  ["#e0d6ee", "#d9dee8"],
  ["#f1eef7", "#f7f8fb"],
  ["#e4dbf2", "#d9dee8"],
  ["#f3effa", "#f7f8fb"],
]);

const sweedReferenceThemeCss = `
<style data-sweed-reference-theme="true">
${referenceScope} {
  --purple-900: #261b3e;
  --purple-700: #261b3e;
  --purple-100: #f7f8fb;
  --fuchsia: #ed2062;
  --silver: #6d6e70;
  --ink: #261b3e;
  --white: #ffffff;
  --bg: #f8f9fa;
  --font-display: ${sweedReferenceFontStack};
  --font-body: ${sweedReferenceFontStack};
  font-family: ${sweedReferenceFontStack};
}
${referenceScope} h1,
${referenceScope} h2,
${referenceScope} h3,
${referenceScope} h4,
${referenceScope} h5,
${referenceScope} h6 {
  color: inherit;
}
${referenceScope} button,
${referenceScope} input,
${referenceScope} select,
${referenceScope} textarea {
  font-family: inherit;
}
${getSweedReferenceButtonThemeCss(referenceScope)}
</style>`;

export function applySweedReferenceTheme(input: string) {
  let output = input.replace(/#[0-9a-f]{6}\b/gi, (color) => sweedReferenceColorMap.get(color.toLowerCase()) ?? color);

  output = output
    .replace(/rgba\(59\s*,\s*33\s*,\s*96\s*,/gi, "rgba(38,27,62,")
    .replace(/'IBM Plex Sans Arabic'\s*,\s*sans-serif/gi, sweedReferenceFontStack)
    .replace(/'Cairo'\s*,\s*sans-serif/gi, sweedReferenceFontStack)
    .replace(/font-family\s*:\s*Cairo(?=\s*[;}])/gi, `font-family:${sweedReferenceInlineFontStack}`)
    .replace(
      /font-family\s*:\s*["']?IBM Plex Sans Arabic["']?(?=\s*[;}])/gi,
      `font-family:${sweedReferenceInlineFontStack}`,
    );

  return output;
}

export function stripReferenceChrome(html: string) {
  return html
    .replace(
      /<nav\b[^>]*class=["'][^"']*\bnav\b[^"']*["'][^>]*>[^]*?<\/nav>\s*/i,
      "",
    )
    .replace(/\s*<footer\b[^>]*>[^]*?<\/footer>\s*(?=(?:<script\b|$))/i, "");
}

export function decorateReferenceActionButtons(input: string) {
  return input.replace(
    /<(a|button)\b([^>]*)>([^]*?)<\/\1>/gi,
    (match, tag: string, attributes: string, content: string) => {
      const className = /\bclass=["']([^"']*)["']/i.exec(attributes)?.[1] ?? "";
      const classTokens = className.trim().split(/\s+/).filter(Boolean);

      if (!classTokens.includes("btn")) return match;
      if (content.includes('class="sweed-action-fill"')) return match;

      return `<${tag}${attributes}><span aria-hidden="true" class="sweed-action-fill"></span><span aria-hidden="true" class="sweed-action-icon"><svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.75" viewBox="0 0 24 24" width="18"><path d="M7 17L17 7"></path><path d="M7 7h10v10"></path></svg></span><span class="sweed-action-label">${content}</span></${tag}>`;
    },
  );
}

export function scopeReferenceHeadHtml(headHtml: string) {
  const withoutReferenceFonts = headHtml.replace(
    /<link\b[^>]*href=["']https:\/\/fonts\.googleapis\.com[^>]*>\s*/gi,
    "",
  );
  const themedHead = applySweedReferenceTheme(withoutReferenceFonts);
  const scopedHead = themedHead.replace(
    /<style\b([^>]*)>([^]*?)<\/style>/gi,
    (_match, attrs: string, css: string) => `<style${attrs}>${scopeReferenceCss(css)}</style>`,
  );

  return `${scopedHead}\n${sweedReferenceThemeCss}`;
}

export function guardReferenceScript(content: string) {
  const guarded = content.replace(
    /document\.getElementById\((['"])nav\1\)\.classList/g,
    "document.getElementById($1nav$1)?.classList",
  );

  const domReadyWrapper = /^\s*document\.addEventListener\(\s*(['"])DOMContentLoaded\1\s*,\s*function\s*\(\)\s*\{([\s\S]*)\}\s*\)\s*;?\s*$/i.exec(
    guarded,
  );

  return domReadyWrapper?.[2] ?? guarded;
}

export function wrapReferenceInlineScript(content: string) {
  return `(() => {\n${content}\n})();`;
}

function scopeReferenceCss(css: string): string {
  let output = "";
  let cursor = 0;

  while (cursor < css.length) {
    const openingBrace = findNextBrace(css, cursor);
    if (openingBrace < 0) {
      output += css.slice(cursor);
      break;
    }

    const closingBrace = findMatchingBrace(css, openingBrace);
    if (closingBrace < 0) {
      output += css.slice(cursor);
      break;
    }

    const rawPrelude = css.slice(cursor, openingBrace);
    const { prefix, prelude } = splitPreludePrefix(rawPrelude);
    const block = css.slice(openingBrace + 1, closingBrace);
    const trimmedPrelude = prelude.trim();

    if (isNestedAtRule(trimmedPrelude)) {
      output += `${prefix}${prelude}{${scopeReferenceCss(block)}}`;
    } else if (trimmedPrelude.startsWith("@")) {
      output += `${rawPrelude}{${block}}`;
    } else {
      output += `${prefix}${scopeSelectorList(trimmedPrelude)}{${block}}`;
    }

    cursor = closingBrace + 1;
  }

  return output;
}

function isNestedAtRule(prelude: string) {
  return /^@(media|supports|layer|container)\b/i.test(prelude);
}

function splitPreludePrefix(rawPrelude: string) {
  const match = /^(\s*(?:\/\*[^]*?\*\/\s*)*)([^]*)$/.exec(rawPrelude);
  return {
    prefix: match?.[1] ?? "",
    prelude: match?.[2] ?? rawPrelude,
  };
}

function scopeSelectorList(selectorList: string) {
  return splitSelectors(selectorList).map(scopeSelector).join(",");
}

function scopeSelector(selector: string) {
  const trimmed = selector.trim();

  if (!trimmed || trimmed.startsWith(referenceScope)) return trimmed;
  if (trimmed === ":root" || trimmed === "html" || trimmed === "body") return referenceScope;
  if (trimmed === "*") return `${referenceScope},${referenceScope} *`;
  if (/^body(?=[.#:[\s>+~]|$)/.test(trimmed)) return trimmed.replace(/^body/, referenceScope);
  if (/^html\s+body(?=[.#:[\s>+~]|$)/.test(trimmed)) {
    return trimmed.replace(/^html\s+body/, referenceScope);
  }

  return `${referenceScope} ${trimmed}`;
}

function splitSelectors(selectorList: string) {
  const selectors: string[] = [];
  let start = 0;
  let roundDepth = 0;
  let squareDepth = 0;
  let quote = "";

  for (let index = 0; index < selectorList.length; index += 1) {
    const char = selectorList[index];
    const previous = selectorList[index - 1];

    if (quote) {
      if (char === quote && previous !== "\\") quote = "";
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }

    if (char === "(") roundDepth += 1;
    if (char === ")") roundDepth = Math.max(0, roundDepth - 1);
    if (char === "[") squareDepth += 1;
    if (char === "]") squareDepth = Math.max(0, squareDepth - 1);

    if (char === "," && roundDepth === 0 && squareDepth === 0) {
      selectors.push(selectorList.slice(start, index));
      start = index + 1;
    }
  }

  selectors.push(selectorList.slice(start));
  return selectors;
}

function findNextBrace(css: string, start: number) {
  return scanForBrace(css, start, 1);
}

function findMatchingBrace(css: string, openingBrace: number) {
  return scanForBrace(css, openingBrace + 1, -1);
}

function scanForBrace(css: string, start: number, mode: 1 | -1) {
  let depth = mode === -1 ? 1 : 0;
  let quote = "";
  let inComment = false;

  for (let index = start; index < css.length; index += 1) {
    const char = css[index];
    const next = css[index + 1];
    const previous = css[index - 1];

    if (inComment) {
      if (char === "*" && next === "/") {
        inComment = false;
        index += 1;
      }
      continue;
    }

    if (!quote && char === "/" && next === "*") {
      inComment = true;
      index += 1;
      continue;
    }

    if (quote) {
      if (char === quote && previous !== "\\") quote = "";
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }

    if (mode === 1 && char === "{") return index;
    if (mode === -1 && char === "{") depth += 1;
    if (mode === -1 && char === "}") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }

  return -1;
}
