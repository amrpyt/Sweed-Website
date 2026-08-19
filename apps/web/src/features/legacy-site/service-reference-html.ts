import { gunzipSync } from "node:zlib";

import { brandingReferenceHtmlBase64 } from "./reference-html-service-branding";
import { consultingReferenceHtmlBase64 } from "./reference-html-service-consulting";
import { digital_marketingReferenceHtmlBase64 } from "./reference-html-service-digital-marketing";
import { mediaReferenceHtmlBase64 } from "./reference-html-service-media";
import { advertisingReferenceHtmlBase64 } from "./reference-html-service-advertising";
import { software_developmentReferenceHtmlBase64 } from "./reference-html-service-software-development";
import {
  applySweedReferenceTheme,
  decorateReferenceActionButtons,
  guardReferenceScript,
  stripReferenceChrome,
} from "./reference-html-normalizer";
import { getSweedReferenceButtonThemeCss } from "./reference-button-theme";

export type ServiceReferenceSlug =
  | "consulting"
  | "branding"
  | "digital-marketing"
  | "software-development"
  | "media"
  | "advertising";

export type ServiceReferenceScript = {
  src?: string;
  content?: string;
};

export type ServiceReferenceDocument = {
  title: string;
  description: string;
  sourceLength: number;
  bodyHtml: string;
  styles: string;
  scripts: readonly ServiceReferenceScript[];
};

const SOURCES: Record<ServiceReferenceSlug, readonly string[]> = {
  consulting: consultingReferenceHtmlBase64,
  branding: brandingReferenceHtmlBase64,
  "digital-marketing": digital_marketingReferenceHtmlBase64,
  "software-development": software_developmentReferenceHtmlBase64,
  media: mediaReferenceHtmlBase64,
  advertising: advertisingReferenceHtmlBase64,
};

function decodeSource(chunks: readonly string[]) {
  return gunzipSync(Buffer.from(chunks.join(""), "base64")).toString("utf8");
}

function cleanText(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function extractAttribute(attributes: string, name: string) {
  const match = attributes.match(new RegExp(`${name}\\s*=\\s*["']([^"']+)["']`, "i"));
  return match?.[1];
}

function scopeSelector(selector: string) {
  const normalized = selector.trim();
  if (!normalized) return normalized;

  if (normalized === "html" || normalized === "body" || normalized === ":root") {
    return ".sweed-reference-page";
  }

  const rooted = normalized.replace(/^(?:html|body|:root)(?=[.#[:\s>+~]|$)/, ".sweed-reference-page");
  return rooted.startsWith(".sweed-reference-page") ? rooted : `.sweed-reference-page ${rooted}`;
}

/**
 * The uploaded prototypes contain their own complete CSS. We keep every
 * declaration intact and only scope selectors so prototype utility classes
 * cannot leak into SWEED's shared header/footer.
 */
function scopeCss(css: string) {
  let output = "";
  let cursor = 0;
  let segmentStart = 0;
  let quote = "";
  let comment = false;
  let groupDepth = 0;
  let keyframesDepth = -1;

  while (cursor < css.length) {
    const char = css[cursor];
    const next = css[cursor + 1];

    if (comment) {
      if (char === "*" && next === "/") {
        comment = false;
        cursor += 2;
        continue;
      }
      cursor += 1;
      continue;
    }

    if (!quote && char === "/" && next === "*") {
      comment = true;
      cursor += 2;
      continue;
    }

    if (quote) {
      if (char === "\\") {
        cursor += 2;
        continue;
      }
      if (char === quote) quote = "";
      cursor += 1;
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      cursor += 1;
      continue;
    }

    if (char === "{") {
      const prelude = css.slice(segmentStart, cursor);
      const trimmed = prelude.trim();
      const isAtRule = trimmed.startsWith("@");
      const isKeyframes = /^@(?:-\w+-)?keyframes\b/i.test(trimmed);

      output += css.slice(segmentStart, cursor - prelude.length);

      if (!isAtRule && keyframesDepth < 0) {
        const leading = prelude.match(/^\s*/)?.[0] ?? "";
        const trailing = prelude.match(/\s*$/)?.[0] ?? "";
        const selectors = trimmed.split(",").map(scopeSelector).join(", ");
        output += `${leading}${selectors}${trailing}{`;
      } else {
        output += `${prelude}{`;
      }

      groupDepth += 1;
      if (isKeyframes) keyframesDepth = groupDepth;
      segmentStart = cursor + 1;
    } else if (char === "}") {
      output += css.slice(segmentStart, cursor + 1);
      if (keyframesDepth === groupDepth) keyframesDepth = -1;
      groupDepth = Math.max(0, groupDepth - 1);
      segmentStart = cursor + 1;
    }

    cursor += 1;
  }

  output += css.slice(segmentStart);
  return output;
}

function normalizePrototypeCss(css: string) {
  return scopeCss(applySweedReferenceTheme(css));
}

function normalizePrototypeLinks(html: string, slug: ServiceReferenceSlug) {
  const contactHref = `/contact?source=service-html&service=${slug}`;

  return html
    .replace(/href=["'](?:\.\/)?(?:work|works)(?:\/[^"']*)?["']/gi, 'href="/portfolio"')
    .replace(/href=["']#(?:works?|portfolio)["']/gi, 'href="/portfolio"')
    .replace(/href=["']#contact["']/gi, `href="${contactHref}"`)
    .replace(/href=["']#(?:book|consult|cta)["']/gi, `href="${contactHref}"`)
    .replace(/href=["']#["']/gi, `href="${contactHref}"`)
    .replace(/href=["']\/offers\?service=mkt["']/gi, 'href="/offers?service=digital-marketing"')
    .replace(/href=["']\/offers\?service=web["']/gi, 'href="/offers?service=software-development"');
}

export function getServiceReferenceDocument(slug: ServiceReferenceSlug): ServiceReferenceDocument {
  const source = decodeSource(SOURCES[slug]);
  const sourceLength = Buffer.byteLength(source, "utf8");
  const head = source.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  let body = source.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? source;

  const title = cleanText(head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const description = head.match(/<meta\b(?=[^>]*name=["']description["'])[^>]*content=["']([^"']*)["'][^>]*>/i)?.[1] ?? "";

  const prototypeStyles = [...head.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)]
    .map((match) => normalizePrototypeCss(match[1] ?? ""))
    .join("\n");
  const styles = `${prototypeStyles}\n${getSweedReferenceButtonThemeCss(".sweed-reference-page")}`;

  const scripts: ServiceReferenceScript[] = [];
  const collectScript = (attributes: string, content: string) => {
    const src = extractAttribute(attributes, "src");
    if (src) scripts.push({ src });
    else if (content.trim()) scripts.push({ content: guardReferenceScript(content) });
    return "";
  };

  for (const match of source.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    collectScript(match[1] ?? "", match[2] ?? "");
  }

  body = body.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, "");
  body = stripReferenceChrome(body);
  body = applySweedReferenceTheme(body);
  body = normalizePrototypeLinks(body, slug);
  body = decorateReferenceActionButtons(body);

  return { title, description, sourceLength, bodyHtml: body, styles, scripts };
}

export const serviceReferenceSlugs = Object.freeze(Object.keys(SOURCES) as ServiceReferenceSlug[]);
