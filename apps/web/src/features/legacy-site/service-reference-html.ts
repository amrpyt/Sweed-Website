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

function getConsultingPresentationCss(slug: ServiceReferenceSlug) {
  if (slug !== "consulting") return "";

  return `
/* Presentation refinements: consulting only */
.sweed-reference-page[data-service-reference="consulting"] section{padding-block:clamp(62px,6vw,88px)}
.sweed-reference-page[data-service-reference="consulting"] .reveal{opacity:1!important;transform:none!important}
.sweed-reference-page[data-service-reference="consulting"] .sec-title{position:relative;display:inline-block;margin-bottom:28px;line-height:1.5;text-wrap:balance}
.sweed-reference-page[data-service-reference="consulting"] .sec-title::after{content:"";position:absolute;right:50%;bottom:-14px;width:74px;height:4px;border-radius:999px;background:linear-gradient(90deg,#261b3e 0 48%,#ed2062 48%);transform:translateX(50%)}
.sweed-reference-page[data-service-reference="consulting"] .eyebrow{padding:4px 13px;border:1px solid rgba(237,32,98,.24);border-radius:999px;background:rgba(237,32,98,.055);margin-bottom:13px}
.sweed-reference-page[data-service-reference="consulting"] .sec-lead{max-width:720px;margin-inline:auto;text-align:center;line-height:2}

.sweed-reference-page[data-service-reference="consulting"] .d-hero{min-height:clamp(560px,72vh,760px)}
.sweed-reference-page[data-service-reference="consulting"] .d-hero h1{line-height:1.42;text-wrap:balance}
.sweed-reference-page[data-service-reference="consulting"] .hero-overlay{background:linear-gradient(to left,rgba(21,11,35,.94) 0%,rgba(38,27,62,.80) 48%,rgba(38,27,62,.42) 100%)}
.sweed-reference-page[data-service-reference="consulting"] .hero-chips span{border-color:rgba(255,255,255,.26);background:rgba(255,255,255,.11)}

.sweed-reference-page[data-service-reference="consulting"] #quiz .container,
.sweed-reference-page[data-service-reference="consulting"] #problems .container,
.sweed-reference-page[data-service-reference="consulting"] #departments .container,
.sweed-reference-page[data-service-reference="consulting"] #tracks .container,
.sweed-reference-page[data-service-reference="consulting"] #works .container,
.sweed-reference-page[data-service-reference="consulting"] #trusts .container,
.sweed-reference-page[data-service-reference="consulting"] #fit .container,
.sweed-reference-page[data-service-reference="consulting"] #faq .container{text-align:center}
.sweed-reference-page[data-service-reference="consulting"] .qz{background:linear-gradient(135deg,#fff 0%,#f8f9fa 100%)}
.sweed-reference-page[data-service-reference="consulting"] .qz-opt{min-height:88px;display:flex;align-items:center;justify-content:center;box-shadow:0 5px 16px rgba(38,27,62,.035)}
.sweed-reference-page[data-service-reference="consulting"] .qz-opt:hover{box-shadow:0 14px 25px rgba(38,27,62,.12)}

.sweed-reference-page[data-service-reference="consulting"] .problems3{background:linear-gradient(135deg,#f7f8fb,#fff)}
.sweed-reference-page[data-service-reference="consulting"] .sec-photos{max-width:980px;margin-inline:auto;margin-bottom:30px}
.sweed-reference-page[data-service-reference="consulting"] .sec-photos img{height:150px;filter:saturate(.84) contrast(1.03);transition:transform .45s ease,filter .45s ease}
.sweed-reference-page[data-service-reference="consulting"] .sec-photos img:hover{transform:translateY(-6px) rotate(0deg);filter:saturate(1) contrast(1)}
.sweed-reference-page[data-service-reference="consulting"] .p3{min-height:190px;text-align:right;border-top:3px solid transparent;transition:transform .28s ease,box-shadow .28s ease,border-color .28s ease}
.sweed-reference-page[data-service-reference="consulting"] .p3:hover{transform:translateY(-6px);border-top-color:#ed2062;box-shadow:0 17px 32px rgba(38,27,62,.12)}
.sweed-reference-page[data-service-reference="consulting"] .p3 p,
.sweed-reference-page[data-service-reference="consulting"] .dept .subs,
.sweed-reference-page[data-service-reference="consulting"] .tr-block p,
.sweed-reference-page[data-service-reference="consulting"] .folder .brief,
.sweed-reference-page[data-service-reference="consulting"] .tcard p,
.sweed-reference-page[data-service-reference="consulting"] .fit-col li,
.sweed-reference-page[data-service-reference="consulting"] .faq-a{text-align:justify;text-align-last:start}

.sweed-reference-page[data-service-reference="consulting"] .dept-band{box-shadow:0 14px 28px rgba(38,27,62,.15)}
.sweed-reference-page[data-service-reference="consulting"] .dept-grid{gap:16px}
.sweed-reference-page[data-service-reference="consulting"] .dept{min-height:166px;border-right-color:#d9dee8;box-shadow:0 4px 12px rgba(38,27,62,.035)}
.sweed-reference-page[data-service-reference="consulting"] .dept:hover{border-right-color:#ed2062}
.sweed-reference-page[data-service-reference="consulting"] .dept-note{max-width:760px;margin-inline:auto}

.sweed-reference-page[data-service-reference="consulting"] .tracks{background:linear-gradient(145deg,#fff 0%,#f7f8fb 100%);position:relative;overflow:hidden}
.sweed-reference-page[data-service-reference="consulting"] .tracks::before{content:"";position:absolute;inset:0 0 auto auto;width:290px;height:290px;background:url("/images/hero/sweed-building.png") center/cover no-repeat;opacity:.035;pointer-events:none}
.sweed-reference-page[data-service-reference="consulting"] .tr-tab{background:#fff;min-height:126px;display:flex;flex-direction:column;justify-content:center;box-shadow:0 5px 16px rgba(38,27,62,.035)}
.sweed-reference-page[data-service-reference="consulting"] .tr-tab .ic{font-size:0;width:32px;height:32px;margin-inline:auto;margin-bottom:9px;border:2px solid currentColor;border-radius:10px;color:#261b3e;display:grid;place-items:center;filter:none}
.sweed-reference-page[data-service-reference="consulting"] .tr-tab .ic::after{content:"✦";font-size:16px;color:#ed2062;line-height:1}
.sweed-reference-page[data-service-reference="consulting"] .tr-tab.active{border-color:#ed2062;box-shadow:0 14px 28px rgba(38,27,62,.12)}
.sweed-reference-page[data-service-reference="consulting"] .track-stage{text-align:right;border-color:#d9dee8}
.sweed-reference-page[data-service-reference="consulting"] .tr-foot{margin-top:26px}

.sweed-reference-page[data-service-reference="consulting"] .method{background:linear-gradient(135deg,#261b3e,#201432)}
.sweed-reference-page[data-service-reference="consulting"] .method .sec-title::after{background:linear-gradient(90deg,#fff 0 48%,#ed2062 48%)}
.sweed-reference-page[data-service-reference="consulting"] .m-out-bar{margin-top:36px}

.sweed-reference-page[data-service-reference="consulting"] .works{background:linear-gradient(140deg,#f7f8fb,#fff)}
.sweed-reference-page[data-service-reference="consulting"] .sec-banner{height:190px;filter:saturate(.78) contrast(1.03)}
.sweed-reference-page[data-service-reference="consulting"] .folder{min-height:330px;text-align:right}
.sweed-reference-page[data-service-reference="consulting"] .folder:hover{box-shadow:0 18px 34px rgba(38,27,62,.13)}
.sweed-reference-page[data-service-reference="consulting"] .trusts{background:#fff}
.sweed-reference-page[data-service-reference="consulting"] .tcard{min-height:166px;text-align:right;box-shadow:0 6px 18px rgba(38,27,62,.04)}
.sweed-reference-page[data-service-reference="consulting"] .fit-grid{max-width:940px;margin-inline:auto}
.sweed-reference-page[data-service-reference="consulting"] .fit-col{background:#fff!important;border-color:#d9dee8!important;text-align:right;box-shadow:0 6px 18px rgba(38,27,62,.045)}
.sweed-reference-page[data-service-reference="consulting"] .fit-col h4{color:#261b3e!important}
.sweed-reference-page[data-service-reference="consulting"] .fit-col li::before{color:#ed2062!important}
.sweed-reference-page[data-service-reference="consulting"] .faq-item{text-align:right;transition:transform .22s ease,border-color .22s ease}
.sweed-reference-page[data-service-reference="consulting"] .faq-item:hover{border-color:#ed2062;transform:translateX(-4px)}
.sweed-reference-page[data-service-reference="consulting"] .faq-q{font-size:1rem}
.sweed-reference-page[data-service-reference="consulting"] .d-cta{background:linear-gradient(90deg,rgba(38,27,62,.98),rgba(38,27,62,.88)),url("/images/hero/two-men-consultation.jpg") center/cover no-repeat}

@media(max-width:900px){
  .sweed-reference-page[data-service-reference="consulting"] .tr-tab{min-height:auto;flex-direction:row}
  .sweed-reference-page[data-service-reference="consulting"] .tr-tab .ic{margin:0}
}
@media(max-width:640px){
  .sweed-reference-page[data-service-reference="consulting"] section{padding-block:54px}
  .sweed-reference-page[data-service-reference="consulting"] .sec-title{font-size:clamp(1.38rem,7vw,1.9rem)}
  .sweed-reference-page[data-service-reference="consulting"] .d-hero{min-height:590px}
  .sweed-reference-page[data-service-reference="consulting"] .sec-photos img{height:104px}
  .sweed-reference-page[data-service-reference="consulting"] .p3{min-height:auto}
  .sweed-reference-page[data-service-reference="consulting"] .dept{min-height:auto}
  .sweed-reference-page[data-service-reference="consulting"] .folder{min-height:auto}
}
@media(prefers-reduced-motion:reduce){
  .sweed-reference-page[data-service-reference="consulting"] *{transition:none!important;animation:none!important}
}
`;
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
  const styles = `${prototypeStyles}\n${getSweedReferenceButtonThemeCss(".sweed-reference-page")}\n${getConsultingPresentationCss(slug)}`;

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
