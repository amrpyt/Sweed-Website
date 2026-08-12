const referenceScope = ".sweed-reference-page";

export function stripReferenceChrome(html: string) {
  return html
    .replace(
      /^\s*(?:<!--[^]*?-->\s*)?<nav\b[^>]*class=["'][^"']*\bnav\b[^"']*["'][^>]*>[^]*?<\/nav>\s*/i,
      "",
    )
    .replace(/\s*<footer\b[^>]*>[^]*?<\/footer>\s*(?=(?:<script\b|$))/i, "");
}

export function scopeReferenceHeadHtml(headHtml: string) {
  return headHtml.replace(
    /<style\b([^>]*)>([^]*?)<\/style>/gi,
    (_match, attrs: string, css: string) => `<style${attrs}>${scopeReferenceCss(css)}</style>`,
  );
}

export function guardReferenceScript(content: string) {
  return content.replace(
    /document\.getElementById\((['"])nav\1\)\.classList/g,
    "document.getElementById($1nav$1)?.classList",
  );
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
