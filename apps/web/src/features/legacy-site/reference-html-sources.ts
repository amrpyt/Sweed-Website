import { gunzipSync } from "node:zlib";
import type { LegacyPageKey } from "./legacy-routes";
import { offersReferenceHtmlBase64 } from "./reference-html-offers";
import { portfolioReferenceHtmlBase64 } from "./reference-html-portfolio";
import { servicesReferenceHtmlBase64 } from "./reference-html-services";

const referenceSources = {
  services: servicesReferenceHtmlBase64,
  portfolio: portfolioReferenceHtmlBase64,
  offers: offersReferenceHtmlBase64,
} satisfies Partial<Record<LegacyPageKey, readonly string[]>>;

export type ReferenceHtmlPage = keyof typeof referenceSources;

export function hasReferenceHtml(page: LegacyPageKey): page is ReferenceHtmlPage {
  return page in referenceSources;
}

export function getReferenceHtmlBuffer(page: ReferenceHtmlPage) {
  const encoded = referenceSources[page].join("");
  return gunzipSync(Buffer.from(encoded, "base64"));
}

export function getReferenceHtml(page: ReferenceHtmlPage) {
  return getReferenceHtmlBuffer(page).toString("utf8");
}
