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
.sweed-reference-page[data-service-reference="consulting"] .d-hero .btns{opacity:1!important}

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

function getBrandingPresentationCss(slug: ServiceReferenceSlug) {
  if (slug !== "branding") return "";

  return `
/* Presentation refinements: branding only */
.sweed-reference-page[data-service-reference="branding"] section{padding-block:clamp(60px,6vw,86px)}
.sweed-reference-page[data-service-reference="branding"] .reveal{opacity:1!important;transform:none!important}
.sweed-reference-page[data-service-reference="branding"] .sec-title{position:relative;display:inline-block;margin:0 auto 28px;line-height:1.48;text-wrap:balance}
.sweed-reference-page[data-service-reference="branding"] .sec-title::after{content:"";position:absolute;right:50%;bottom:-14px;width:76px;height:4px;border-radius:999px;background:linear-gradient(90deg,#261b3e 0 48%,#ed2062 48%);transform:translateX(50%)}
.sweed-reference-page[data-service-reference="branding"] .eyebrow{padding:5px 13px;margin-bottom:14px;border:1px solid rgba(237,32,98,.24);border-radius:999px;background:rgba(237,32,98,.055)}
.sweed-reference-page[data-service-reference="branding"] .sec-lead{max-width:760px;margin-inline:auto;text-align:center;line-height:2}
.sweed-reference-page[data-service-reference="branding"] .maturity .container,.sweed-reference-page[data-service-reference="branding"] .logovs .container,.sweed-reference-page[data-service-reference="branding"] .bdepts .container,.sweed-reference-page[data-service-reference="branding"] .btracks .container,.sweed-reference-page[data-service-reference="branding"] .journey .container,.sweed-reference-page[data-service-reference="branding"] .ba .container,.sweed-reference-page[data-service-reference="branding"] .bworks .container,.sweed-reference-page[data-service-reference="branding"] .deliv .container,.sweed-reference-page[data-service-reference="branding"] .btrust .container,.sweed-reference-page[data-service-reference="branding"] .faq .container{text-align:center}
.sweed-reference-page[data-service-reference="branding"] .b-hero{min-height:clamp(570px,76vh,800px)}
.sweed-reference-page[data-service-reference="branding"] .b-hero h1{line-height:1.36;text-wrap:balance}
.sweed-reference-page[data-service-reference="branding"] .b-hero .hero-overlay{background:linear-gradient(90deg,rgba(22,12,36,.58),rgba(38,27,62,.86) 52%,rgba(38,27,62,.97))}
.sweed-reference-page[data-service-reference="branding"] .b-hero .btns{opacity:1!important}

.sweed-reference-page[data-service-reference="branding"] .maturity{background:linear-gradient(135deg,#fff 0%,#f7f8fb 100%)}
.sweed-reference-page[data-service-reference="branding"] .mat-wrap{border-color:#dfe3eb;box-shadow:0 16px 34px rgba(38,27,62,.08)}
.sweed-reference-page[data-service-reference="branding"] .mq{border-bottom-color:#e7e9ef}
.sweed-reference-page[data-service-reference="branding"] .mq h4{font-size:1rem}
.sweed-reference-page[data-service-reference="branding"] .opts button{border-color:#dfe3eb;transition:transform .22s ease,border-color .22s ease,background .22s ease}
.sweed-reference-page[data-service-reference="branding"] .opts button:hover{transform:translateY(-2px);border-color:#ed2062;background:#fff6fa}
.sweed-reference-page[data-service-reference="branding"] .fingerprint{background:linear-gradient(145deg,#f5f4fb,#fff);border-radius:22px}

.sweed-reference-page[data-service-reference="branding"] .logovs{position:relative;overflow:hidden;background:linear-gradient(145deg,#fbfbfd,#fff)}
.sweed-reference-page[data-service-reference="branding"] .logovs::before{content:"";position:absolute;inset:auto 0 0;width:100%;height:180px;background:linear-gradient(180deg,transparent,rgba(237,32,98,.035));pointer-events:none}
.sweed-reference-page[data-service-reference="branding"] .lv-grid{position:relative;z-index:1;gap:18px}
.sweed-reference-page[data-service-reference="branding"] .lv{min-height:310px;padding:0 20px 22px;overflow:hidden;border-color:#dfe3eb;box-shadow:0 8px 18px rgba(38,27,62,.045);transition:transform .28s ease,box-shadow .28s ease,border-color .28s ease}
.sweed-reference-page[data-service-reference="branding"] .lv::before{content:"";display:block;height:106px;margin:0 -20px 19px;background:center/cover no-repeat;filter:saturate(.77) contrast(1.02)}
.sweed-reference-page[data-service-reference="branding"] .lv:nth-child(1)::before{background-image:linear-gradient(rgba(38,27,62,.19),rgba(38,27,62,.19)),url("https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=900&auto=format&fit=crop")}
.sweed-reference-page[data-service-reference="branding"] .lv:nth-child(2)::before{background-image:linear-gradient(rgba(38,27,62,.14),rgba(38,27,62,.14)),url("https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=900&auto=format&fit=crop")}
.sweed-reference-page[data-service-reference="branding"] .lv:nth-child(3)::before{background-image:linear-gradient(rgba(38,27,62,.15),rgba(38,27,62,.15)),url("https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=900&auto=format&fit=crop")}
.sweed-reference-page[data-service-reference="branding"] .lv:nth-child(4)::before{background-image:linear-gradient(rgba(38,27,62,.16),rgba(38,27,62,.16)),url("https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=900&auto=format&fit=crop")}
.sweed-reference-page[data-service-reference="branding"] .lv:hover{transform:translateY(-7px);border-color:#ed2062;box-shadow:0 18px 34px rgba(38,27,62,.12)}
.sweed-reference-page[data-service-reference="branding"] .lv .stack{display:none}
.sweed-reference-page[data-service-reference="branding"] .lv p{text-align:justify;text-align-last:center}

.sweed-reference-page[data-service-reference="branding"] .bdepts{background:linear-gradient(160deg,#fff 0%,#f7f8fb 100%)}
.sweed-reference-page[data-service-reference="branding"] .sec-photos{max-width:1040px;margin:0 auto 34px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.sweed-reference-page[data-service-reference="branding"] .sec-photos img{height:148px;border-radius:18px;object-fit:cover;filter:saturate(.78) contrast(1.02);transition:transform .35s ease,filter .35s ease}
.sweed-reference-page[data-service-reference="branding"] .sec-photos img:hover{transform:translateY(-6px);filter:saturate(1)}
.sweed-reference-page[data-service-reference="branding"] .bd-grid{gap:18px}
.sweed-reference-page[data-service-reference="branding"] .bd{min-height:315px;padding:0 21px 22px;overflow:hidden;border-top:3px solid transparent;background:#fff;box-shadow:0 7px 18px rgba(38,27,62,.045);text-align:right;transition:transform .28s ease,box-shadow .28s ease,border-color .28s ease}
.sweed-reference-page[data-service-reference="branding"] .bd::before{content:"";display:block;height:116px;margin:0 -21px 19px;background:center/cover no-repeat;filter:saturate(.78) contrast(1.02)}
.sweed-reference-page[data-service-reference="branding"] .bd:nth-child(1)::before{background-image:linear-gradient(rgba(38,27,62,.18),rgba(38,27,62,.18)),url("https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=900&auto=format&fit=crop")}
.sweed-reference-page[data-service-reference="branding"] .bd:nth-child(2)::before{background-image:linear-gradient(rgba(38,27,62,.18),rgba(38,27,62,.18)),url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=900&auto=format&fit=crop")}
.sweed-reference-page[data-service-reference="branding"] .bd:nth-child(3)::before{background-image:linear-gradient(rgba(38,27,62,.15),rgba(38,27,62,.15)),url("https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=900&auto=format&fit=crop")}
.sweed-reference-page[data-service-reference="branding"] .bd:nth-child(4)::before{background-image:linear-gradient(rgba(38,27,62,.15),rgba(38,27,62,.15)),url("https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=900&auto=format&fit=crop")}
.sweed-reference-page[data-service-reference="branding"] .bd:nth-child(5)::before{background-image:linear-gradient(rgba(38,27,62,.20),rgba(38,27,62,.20)),url("https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=900&auto=format&fit=crop")}
.sweed-reference-page[data-service-reference="branding"] .bd:nth-child(6)::before{background-image:linear-gradient(rgba(38,27,62,.17),rgba(38,27,62,.17)),url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=900&auto=format&fit=crop")}
.sweed-reference-page[data-service-reference="branding"] .bd:hover{transform:translateY(-7px);border-top-color:#ed2062;box-shadow:0 18px 34px rgba(38,27,62,.13)}
.sweed-reference-page[data-service-reference="branding"] .bd .what,.sweed-reference-page[data-service-reference="branding"] .bd .inc{text-align:justify;text-align-last:start}
.sweed-reference-page[data-service-reference="branding"] .bd .go{color:#ed2062;font-weight:700}

.sweed-reference-page[data-service-reference="branding"] .btracks{position:relative;overflow:hidden;background:linear-gradient(135deg,#f5f5fa,#fff)}
.sweed-reference-page[data-service-reference="branding"] .btracks::before{content:"";position:absolute;inset:auto auto 0 0;width:290px;height:270px;background:url("https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=900&auto=format&fit=crop") center/cover;opacity:.055;pointer-events:none}
.sweed-reference-page[data-service-reference="branding"] .track-tabs{gap:12px}
.sweed-reference-page[data-service-reference="branding"] .tr-tab{min-height:112px;background:#fff;box-shadow:0 5px 15px rgba(38,27,62,.04);transition:transform .22s ease,box-shadow .22s ease}
.sweed-reference-page[data-service-reference="branding"] .tr-tab:hover{transform:translateY(-4px);box-shadow:0 15px 26px rgba(38,27,62,.10)}
.sweed-reference-page[data-service-reference="branding"] .tr-tab.active{border-color:#ed2062;box-shadow:0 14px 28px rgba(38,27,62,.12)}
.sweed-reference-page[data-service-reference="branding"] .track-stage{position:relative;background:rgba(255,255,255,.94);border-color:#dfe3eb;box-shadow:0 16px 30px rgba(38,27,62,.06);text-align:right}
.sweed-reference-page[data-service-reference="branding"] .tr-panel .promise{line-height:1.9}
.sweed-reference-page[data-service-reference="branding"] .tr-panel .tr-visual{overflow:hidden;border-radius:16px;background:#f7f8fb}
.sweed-reference-page[data-service-reference="branding"] .tr-panel .tr-visual::before{content:"";display:block;height:82px;background:linear-gradient(rgba(38,27,62,.38),rgba(38,27,62,.38)),url("https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=900&auto=format&fit=crop") center/cover}
.sweed-reference-page[data-service-reference="branding"] .tr-panel .tr-visual>*{position:relative;z-index:1}
.sweed-reference-page[data-service-reference="branding"] .tr-foot{margin-top:28px}

.sweed-reference-page[data-service-reference="branding"] .journey{position:relative;overflow:hidden;background:linear-gradient(135deg,#261b3e,#201431)}
.sweed-reference-page[data-service-reference="branding"] .journey::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(38,27,62,.96),rgba(38,27,62,.78)),url("https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1600&auto=format&fit=crop") center/cover;opacity:.28;pointer-events:none}
.sweed-reference-page[data-service-reference="branding"] .journey .container{position:relative;z-index:1}
.sweed-reference-page[data-service-reference="branding"] .journey .sec-title::after{background:linear-gradient(90deg,#fff 0 48%,#ed2062 48%)}
.sweed-reference-page[data-service-reference="branding"] .j-wrap{padding-top:32px}
.sweed-reference-page[data-service-reference="branding"] .j-st{min-height:122px}

.sweed-reference-page[data-service-reference="branding"] .ba{background:linear-gradient(145deg,#fff 0%,#f8f8fc 100%)}
.sweed-reference-page[data-service-reference="branding"] .ba-stage{box-shadow:0 18px 38px rgba(38,27,62,.12)}
.sweed-reference-page[data-service-reference="branding"] .ba-side{background-size:cover;background-position:center;position:relative;isolation:isolate}
.sweed-reference-page[data-service-reference="branding"] .ba-side::before{content:"";position:absolute;inset:0;z-index:-1;background:inherit;filter:saturate(.78) brightness(.58)}
.sweed-reference-page[data-service-reference="branding"] .ba-before{background-image:linear-gradient(rgba(38,27,62,.80),rgba(38,27,62,.80)),url("https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop")}
.sweed-reference-page[data-service-reference="branding"] .ba-after{background-image:linear-gradient(rgba(38,27,62,.84),rgba(38,27,62,.84)),url("https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1200&auto=format&fit=crop")}
.sweed-reference-page[data-service-reference="branding"] .ba-side,.sweed-reference-page[data-service-reference="branding"] .ba-side *{color:#fff!important}

.sweed-reference-page[data-service-reference="branding"] .bworks{background:linear-gradient(140deg,#f6f7fb,#fff)}
.sweed-reference-page[data-service-reference="branding"] .bworks .sec-banner{height:205px;filter:saturate(.80) contrast(1.03)}
.sweed-reference-page[data-service-reference="branding"] .wcard{min-height:430px;box-shadow:0 8px 20px rgba(38,27,62,.06);transition:transform .28s ease,box-shadow .28s ease}
.sweed-reference-page[data-service-reference="branding"] .wcard:hover{transform:translateY(-7px);box-shadow:0 19px 35px rgba(38,27,62,.13)}
.sweed-reference-page[data-service-reference="branding"] .wcard .img img{height:190px;object-fit:cover;filter:saturate(.82)}

.sweed-reference-page[data-service-reference="branding"] .deliv{background:linear-gradient(155deg,#fff,#f7f8fb)}
.sweed-reference-page[data-service-reference="branding"] .d-grid{gap:18px}
.sweed-reference-page[data-service-reference="branding"] .dcard{min-height:265px;padding:0 20px 22px;overflow:hidden;border-top:3px solid transparent;background:#fff;box-shadow:0 6px 17px rgba(38,27,62,.045);transition:transform .28s ease,box-shadow .28s ease,border-color .28s ease}
.sweed-reference-page[data-service-reference="branding"] .dcard::before{content:"";display:block;height:100px;margin:0 -20px 18px;background:center/cover no-repeat;filter:saturate(.75)}
.sweed-reference-page[data-service-reference="branding"] .dcard:nth-child(1)::before{background-image:url("https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=750&auto=format&fit=crop")}
.sweed-reference-page[data-service-reference="branding"] .dcard:nth-child(2)::before{background-image:url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=750&auto=format&fit=crop")}
.sweed-reference-page[data-service-reference="branding"] .dcard:nth-child(3)::before{background-image:url("https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=750&auto=format&fit=crop")}
.sweed-reference-page[data-service-reference="branding"] .dcard:nth-child(4)::before{background-image:url("https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=750&auto=format&fit=crop")}
.sweed-reference-page[data-service-reference="branding"] .dcard:nth-child(5)::before{background-image:url("https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=750&auto=format&fit=crop")}
.sweed-reference-page[data-service-reference="branding"] .dcard:nth-child(6)::before{background-image:url("https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=750&auto=format&fit=crop")}
.sweed-reference-page[data-service-reference="branding"] .dcard:hover{transform:translateY(-6px);border-top-color:#ed2062;box-shadow:0 18px 34px rgba(38,27,62,.12)}
.sweed-reference-page[data-service-reference="branding"] .dcard p{text-align:justify;text-align-last:center}

.sweed-reference-page[data-service-reference="branding"] .btrust{position:relative;overflow:hidden;background:linear-gradient(135deg,#f4f2fa,#fff)!important}
.sweed-reference-page[data-service-reference="branding"] .principles{gap:18px}
.sweed-reference-page[data-service-reference="branding"] .pr{min-height:155px;border-top:3px solid transparent;background:#fff;box-shadow:0 6px 18px rgba(38,27,62,.05);transition:transform .24s ease,border-color .24s ease}
.sweed-reference-page[data-service-reference="branding"] .pr:hover{transform:translateY(-5px);border-top-color:#ed2062}
.sweed-reference-page[data-service-reference="branding"] .pr p{text-align:justify;text-align-last:center}
.sweed-reference-page[data-service-reference="branding"] .tr-counters{padding-top:28px}
.sweed-reference-page[data-service-reference="branding"] .faq-item{text-align:right;transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease}
.sweed-reference-page[data-service-reference="branding"] .faq-item:hover{transform:translateX(-4px);border-color:#ed2062;box-shadow:0 12px 24px rgba(38,27,62,.08)}
.sweed-reference-page[data-service-reference="branding"] .faq-a{text-align:justify;text-align-last:start}
.sweed-reference-page[data-service-reference="branding"] .b-cta{background:linear-gradient(90deg,rgba(38,27,62,.98),rgba(38,27,62,.89)),url("https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1600&auto=format&fit=crop") center/cover}
.sweed-reference-page[data-service-reference="branding"] .b-cta .reveal{opacity:1!important;transform:none!important}
@media(max-width:900px){.sweed-reference-page[data-service-reference="branding"] .lv{min-height:280px}.sweed-reference-page[data-service-reference="branding"] .bd{min-height:290px}.sweed-reference-page[data-service-reference="branding"] .tr-tab{min-height:auto}}
@media(max-width:640px){.sweed-reference-page[data-service-reference="branding"] section{padding-block:52px}.sweed-reference-page[data-service-reference="branding"] .sec-title{font-size:clamp(1.42rem,7vw,1.92rem)}.sweed-reference-page[data-service-reference="branding"] .b-hero{min-height:590px}.sweed-reference-page[data-service-reference="branding"] .sec-photos{grid-template-columns:1fr;gap:10px}.sweed-reference-page[data-service-reference="branding"] .sec-photos img{height:130px}.sweed-reference-page[data-service-reference="branding"] .lv,.sweed-reference-page[data-service-reference="branding"] .bd,.sweed-reference-page[data-service-reference="branding"] .dcard,.sweed-reference-page[data-service-reference="branding"] .wcard{min-height:auto}}
@media(prefers-reduced-motion:reduce){.sweed-reference-page[data-service-reference="branding"] *{transition:none!important;animation:none!important}}

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
  const styles = `${prototypeStyles}\n${getSweedReferenceButtonThemeCss(".sweed-reference-page")}\n${getConsultingPresentationCss(slug)}\n${getBrandingPresentationCss(slug)}`;

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
