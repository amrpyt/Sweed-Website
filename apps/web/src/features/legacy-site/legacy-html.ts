import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { normalizeLegacyAccessibility } from "./legacy-accessibility";
import {
  applySweedReferenceTheme,
  decorateReferenceActionButtons,
  guardReferenceScript,
  scopeReferenceHeadHtml,
  stripReferenceChrome,
} from "./reference-html-normalizer";
import { getReferenceHtml, hasReferenceHtml } from "./reference-html-sources";
import {
  decorateLegacyProductActionButtons,
  getLegacyProductActionThemeCss,
  guardLegacyProductRuntimeScript,
} from "./legacy-product-action-theme";
import { legacyHrefMap, legacyPageFiles, type LegacyPageKey } from "./legacy-routes";

type LegacyScript = {
  id: string;
  src?: string;
  type?: string;
  content?: string;
};

export type LegacyPageDocument = {
  title: string;
  headHtml: string;
  bodyHtml: string;
  scripts: LegacyScript[];
};

export type LegacyPresentation = "legacy" | "reference" | "exact";

type LegacyPageOptions = {
  presentation?: LegacyPresentation;
};

const siteRoot = join(process.cwd(), "site");

function readLegacyFile(page: LegacyPageKey) {
  return readFileSync(join(siteRoot, legacyPageFiles[page]), "utf8");
}

function readPageSource(page: LegacyPageKey, presentation: LegacyPresentation) {
  if (presentation !== "legacy") {
    if (!hasReferenceHtml(page)) {
      throw new Error(`No approved reference HTML exists for legacy page: ${page}`);
    }
    return getReferenceHtml(page);
  }

  return readLegacyFile(page);
}

function extractFirst(pattern: RegExp, html: string) {
  return pattern.exec(html)?.[1] ?? "";
}

function rewriteAssetUrl(value: string) {
  return value
    .replaceAll("assets/mobile-polish.css", "/legacy-assets/mobile-polish.css")
    .replaceAll("../assets/mobile-polish.css", "/legacy-assets/mobile-polish.css")
    .replaceAll("assets/mobile-polish.js", "/legacy-assets/mobile-polish.js")
    .replaceAll("../assets/mobile-polish.js", "/legacy-assets/mobile-polish.js");
}

function rewriteLegacyLinks(html: string) {
  let output = html;

  for (const [legacyHref, nextHref] of Object.entries(legacyHrefMap)) {
    output = output.replaceAll(`href="${legacyHref}"`, `href="${nextHref}"`);
    output = output.replaceAll(`href='${legacyHref}'`, `href='${nextHref}'`);
  }

  return output;
}

function normalizeLegacyContactDetails(html: string) {
  return html
    .replaceAll("info@sweid.com", "info@sweed.com")
    .replaceAll("support@sweid.com", "info@sweed.com")
    .replaceAll("mohamedsweed2050@gmail.com", "info@sweed.com")
    .replaceAll("mailto:info@sweid.com", "mailto:info@sweed.com")
    .replaceAll("mailto:mohamedsweed2050@gmail.com", "mailto:info@sweed.com");
}

function applyHomepageBriefAdjustments(html: string, page: LegacyPageKey) {
  if (page !== "home") {
    return html;
  }

  return html
    .replace(">شركاء نجاح اشتغلوا معانا<", ">شركاء النجاح<")
    .replace('<section class="help-section">', '<section class="help-section" id="contact">')
    .replace(
      /<select id="quickService" required>[\s\S]*?<\/select>/,
      `<div data-home-services="true" style="display: grid; gap: 0.85rem;">
                        <p style="margin: 0; color: rgba(255,255,255,0.82); font-size: 0.95rem; font-weight: 700;">اختر خدمة أو أكثر حسب احتياجك الحالي</p>
                        <div style="display: flex; gap: 0.85rem; overflow-x: auto; padding-bottom: 0.3rem; scrollbar-width: thin;">
                            <label style="min-width: 220px; display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.1rem; border-radius: 18px; background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.18); color: white; cursor: pointer;">
                                <input type="checkbox" name="quickServices" value="digital-marketing">
                                <span>التسويق الرقمي والنمو</span>
                            </label>
                            <label style="min-width: 220px; display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.1rem; border-radius: 18px; background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.18); color: white; cursor: pointer;">
                                <input type="checkbox" name="quickServices" value="websites">
                                <span>المواقع والتجارب الرقمية</span>
                            </label>
                            <label style="min-width: 220px; display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.1rem; border-radius: 18px; background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.18); color: white; cursor: pointer;">
                                <input type="checkbox" name="quickServices" value="ai-automation">
                                <span>الذكاء الاصطناعي والأتمتة</span>
                            </label>
                        </div>
                    </div>`,
    )
    .replace('<section class="packages-section" id="packages">', '<section class="packages-section" id="offers">')
    .replace(">باقات مصممة خصيصاً لنجاحك<", ">باقات وعروض<")
    .replace(
      /<div class="packages-cta">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/,
      `<div class="packages-cta">
                <button class="btn btn-secondary" onclick="openPopup()">
                    <i class="fas fa-phone"></i> احصل على استشارة مخصصة
                </button>
            </div>
            <div class="products-more" data-packages-more="true">
                <a href="/offers" class="btn btn-primary">
                    <i class="fas fa-eye"></i> مشاهدة المزيد
                </a>
            </div>
        </div>
    </section>`,
    )
    .replace(">خدماتنا الشاملة<", ">خدماتنا المتكاملة<")
    .replaceAll('href="pages/service-detail.html" class="service-link"', 'href="/services" class="service-link"');
}

function normalizeHtml(html: string, page: LegacyPageKey) {
  const normalized = applyHomepageBriefAdjustments(
    normalizeLegacyContactDetails(rewriteLegacyLinks(rewriteAssetUrl(html))),
    page,
  );

  return addSectionAnchors(normalizeLegacyAccessibility(normalized, page));
}

function normalizeReferenceHtml(html: string) {
  return normalizeLegacyContactDetails(rewriteLegacyLinks(rewriteAssetUrl(html)));
}

const sectionAnchorByClass: Record<string, string> = {
  "hero-section": "hero",
  "clients-marquee-section": "expertise",
  "problems-section": "problems",
  "stats-section": "stats",
  "help-section": "help",
  "why-section": "why",
  "expertise-section": "expertise",
  "partners-section": "partners",
  "portfolio-section": "portfolio",
  "process-section": "process",
  "testimonials-section": "testimonials",
  "packages-section": "packages",
  "services-section": "services",
  "products-section": "products",
  "about-section": "about",
  "blog-section": "blog",
  "faq-section": "faq",
  "cta-section": "cta",
  "hero-about": "hero",
  "company-intro": "intro",
  "ceo-message": "ceo",
  "our-story": "story",
  "vision-mission": "vision-mission",
  values: "values",
  commitment: "commitment",
  team: "team",
  partners: "partners",
  "services-hero": "hero",
  "service-hero": "hero",
  "service-intro": "intro",
  "secondary-services": "secondary-services",
  "contact-hero": "hero",
  "main-contact-section": "contact-form",
  "map-social-section": "map-social",
  "quick-faq-section": "quick-faq",
  "blog-hero": "hero",
  "blog-stats": "stats",
  "newsletter-section": "newsletter",
  "portfolio-hero": "hero",
  "filters-section": "filters",
  "success-stories": "success-stories",
  "quick-finder": "quick-finder",
  "related-articles": "related-articles",
};

function toUniqueId(baseId: string, usedIds: Set<string>) {
  if (!usedIds.has(baseId)) {
    usedIds.add(baseId);
    return baseId;
  }

  let index = 2;
  while (usedIds.has(`${baseId}-${index}`)) {
    index += 1;
  }

  const uniqueId = `${baseId}-${index}`;
  usedIds.add(uniqueId);
  return uniqueId;
}

function addSectionAnchors(html: string) {
  const usedIds = new Set(Array.from(html.matchAll(/\sid=["']([^"']+)["']/gi), (match) => match[1]));

  return html.replace(/<section\b([^>]*)>/gi, (match, attrs: string) => {
    if (/\sid=["'][^"']+["']/i.test(attrs)) {
      return match;
    }

    const classValue = /class=["']([^"']+)["']/i.exec(attrs)?.[1];
    if (!classValue) {
      return match;
    }

    const classes = classValue.split(/\s+/).filter(Boolean);
    const baseId = classes.map((className) => sectionAnchorByClass[className]).find(Boolean);
    if (!baseId) {
      return match;
    }

    return `<section id="${toUniqueId(baseId, usedIds)}"${attrs}>`;
  });
}

function removeLegacyChrome(html: string) {
  return html
    .replace(/\s*<!-- TOP BAR -->[\s\S]*?<div class="mobile-menu-overlay"[^>]*><\/div>/i, "")
    .replace(/\s*<!-- HEADER -->[\s\S]*?<div class="mobile-menu-overlay"[^>]*><\/div>/i, "")
    .replace(/\s*<!-- BREADCRUMB -->[\s\S]*?(?=\s*<!--)/i, "")
    .replace(/\s*<(?:section|nav)\b[^>]*class=["'][^"']*\bbreadcrumb\b[^"']*["'][\s\S]*?<\/(?:section|nav)>/i, "")
    .replace(/\s*<div\b[^>]*class=["'][^"']*\bbreadcrumb\b[^"']*["'][\s\S]*?<\/div>/i, "")
    .replace(/^\s*<\/div>\s*/i, "")
    .replace(/\s*<!-- FOOTER -->[\s\S]*?<footer class="footer"[\s\S]*?<\/footer>/i, "")
    .replace(/\s*<footer class="footer"[\s\S]*?<\/footer>/i, "")
    .replace(/\s*<!-- WHATSAPP(?: FLOAT(?:ING)? BUTTON| FLOAT BUTTON| BUTTON)? -->[\s\S]*?(?=<!--|<script\b|$)/gi, "")
    .replace(/\s*<!-- MOBILE STICKY CTA -->[\s\S]*?(?=<!--|<script\b|$)/gi, "");
}

function extractScripts(html: string, page: LegacyPageKey, presentation: LegacyPresentation = "legacy") {
  const scripts: LegacyScript[] = [];
  let index = 0;
  const withoutScripts = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (_match, attrs: string, content: string) => {
    const src = /src=["']([^"']+)["']/i.exec(attrs)?.[1];
    const type = /type=["']([^"']+)["']/i.exec(attrs)?.[1];
    if (src && /(?:^|\/)mobile-polish\.js$/i.test(src)) {
      return "";
    }
    scripts.push({
      id: `legacy-${page}-${index++}`,
      src: src ? rewriteAssetUrl(src) : undefined,
      type,
      content:
        src
          ? undefined
          : presentation === "reference"
            ? guardReferenceScript(applySweedReferenceTheme(content))
            : presentation === "exact"
              ? guardReferenceScript(content)
              : page === "products"
                ? guardLegacyProductRuntimeScript(content)
                : content,
    });
    return "";
  });

  return { scripts, html: withoutScripts };
}

export function getLegacyPage(page: LegacyPageKey, options: LegacyPageOptions = {}): LegacyPageDocument {
  const presentation = options.presentation ?? "legacy";
  const raw = readPageSource(page, presentation);
  const title = extractFirst(/<title>([\s\S]*?)<\/title>/i, raw).trim() || "SWEED";
  const head = extractFirst(/<head[^>]*>([\s\S]*?)<\/head>/i, raw);
  const body = extractFirst(/<body[^>]*>([\s\S]*?)<\/body>/i, raw);
  const bodyWithoutChrome =
    presentation === "exact"
      ? body
      : presentation === "reference"
        ? stripReferenceChrome(body)
        : removeLegacyChrome(body);
  const { html: bodyWithoutScripts, scripts } = extractScripts(bodyWithoutChrome, page, presentation);
  const headAssets = head
    .replace(/<title>[\s\S]*?<\/title>/gi, "")
    .replace(/<meta[^>]+>/gi, "")
    .trim();

  if (presentation === "exact") {
    return {
      title,
      headHtml: headAssets,
      bodyHtml: bodyWithoutScripts,
      scripts,
    };
  }

  if (presentation === "reference") {
    return {
      title,
      headHtml: scopeReferenceHeadHtml(normalizeReferenceHtml(headAssets)),
      bodyHtml: decorateReferenceActionButtons(applySweedReferenceTheme(normalizeReferenceHtml(bodyWithoutScripts))),
      scripts,
    };
  }

  return {
    title,
    headHtml: `${normalizeHtml(headAssets, page)}${page === "products" ? getLegacyProductActionThemeCss() : ""}`,
    bodyHtml:
      page === "products"
        ? decorateLegacyProductActionButtons(normalizeHtml(bodyWithoutScripts, page))
        : normalizeHtml(bodyWithoutScripts, page),
    scripts,
  };
}

export function getLegacyMetadata(page: LegacyPageKey): Metadata {
  const raw = readLegacyFile(page);
  const title = extractFirst(/<title>([\s\S]*?)<\/title>/i, raw).trim() || "SWEED";
  const description = extractFirst(/<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i, raw).trim();

  return {
    title,
    description: description || undefined,
  };
}
