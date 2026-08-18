import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  decorateLegacyProductActionButtons,
  guardLegacyProductRuntimeScript,
  legacyProductActionRuntime,
} from "../../features/legacy-site/legacy-product-action-theme";
import { decorateReferenceActionButtons } from "../../features/legacy-site/reference-html-normalizer";

function readSource(path: string) {
  return readFileSync(join(import.meta.dir, path), "utf8");
}

describe("canonical SWEED action button system", () => {
  test("keeps the homepage hero fill mechanism as the canonical interaction", () => {
    const css = readSource("brand-action-button.module.css");

    expect(css).toContain("clip-path: inset(0 calc(100% - var(--brand-action-icon-size)) 0 0 round var(--brand-action-inner-radius))");
    expect(css).toContain(".actionButton:hover .fill");
    expect(css).toContain("clip-path: inset(0 0 0 0 round var(--brand-action-inner-radius))");
    expect(css).toContain("transform: translateY(-2px)");
    expect(css).toContain("transform: translateY(0) scale(0.99)");
  });

  test("uses the canonical action component in shared public heroes and site chrome", () => {
    const publicHero = readSource("../../features/public-site/shared/public-page-hero.tsx");
    const header = readSource("../../features/legacy-site/legacy-header.tsx");
    const footer = readSource("../../features/legacy-site/legacy-footer.tsx");

    expect(publicHero).toContain("ButtonLink");
    expect(publicHero).toContain('size="hero"');
    expect(header).toContain("BrandActionButtonContent");
    expect(header).toContain("getBrandActionButtonClassName");
    expect(footer).toContain("BrandActionButtonContent");
  });

  test("uses the same canonical mechanism for homepage CTA actions", () => {
    const about = readSource("../../features/homepage/home-blit-scroll-section.tsx");
    const services = readSource("../../features/homepage/home-services-scroll-section.tsx");
    const offers = readSource("../../features/homepage/home-offers-section.tsx");
    const blog = readSource("../../features/homepage/home-faq-blog-section.tsx");
    const contact = readSource("../../features/homepage/home-contact-section.tsx");

    for (const source of [about, services, offers, blog, contact]) {
      expect(source).toContain("BrandActionButtonContent");
    }
  });

  test("bridges reference-page CTAs to the hero fill mechanism without editing source HTML", () => {
    const cssBridge = readSource("../../features/legacy-site/reference-button-theme.ts");
    const decorated = decorateReferenceActionButtons('<a class="btn btn-primary" href="#cta">ابدأ الآن</a>');

    expect(decorated).toContain('class="sweed-action-fill"');
    expect(decorated).toContain('class="sweed-action-icon"');
    expect(decorated).toContain('class="sweed-action-label">ابدأ الآن</span>');
    expect(cssBridge).toContain(".btn .sweed-action-fill");
    expect(cssBridge).toContain("clip-path: inset(0 calc(100% - var(--sweed-action-icon-size)) 0 0 round var(--sweed-action-inner-radius));");
    expect(cssBridge).toContain(".btn:hover .sweed-action-fill");
    expect(cssBridge).toContain("clip-path: inset(0 0 0 0 round var(--sweed-action-inner-radius));");
  });

  test("keeps legacy product purchase CTAs on the hero mechanism without turning tabs into CTAs", () => {
    const cssBridge = readSource("../../features/legacy-site/legacy-product-action-theme.ts");
    const legacyPage = readSource("../../features/legacy-site/legacy-page.tsx");
    const decorated = decorateLegacyProductActionButtons(
      '<button class="product-btn"><i class="fas fa-shopping-cart"></i><span>اطلب الآن</span></button>',
    );

    expect(decorated).toContain('class="sweed-action-fill"');
    expect(decorated).toContain('class="sweed-action-icon"');
    expect(decorated).toContain('class="sweed-action-label">اطلب الآن</span>');
    expect(decorated).toContain('<path d="M7 17L17 7"></path>');
    expect(cssBridge).toContain(".sweed-legacy-page-products .sweed-action-fill");
    expect(cssBridge).toContain("clip-path: inset(0 calc(100% - var(--legacy-action-icon-size)) 0 0 round var(--legacy-action-inner-radius));");
    expect(cssBridge).toContain("clip-path: inset(0 0 0 0 round var(--legacy-action-inner-radius));");
    expect(cssBridge).not.toContain(".tab-btn");
    expect(legacyPage).toContain("sweed-legacy-page-${page}");
    expect(legacyPage).toContain("legacyProductActionRuntime");
    expect(legacyPage).toContain('page === "products" && !script.src');
    expect(legacyPage).toContain("dangerouslySetInnerHTML={{ __html: script.content ?? \"\" }}");
    expect(legacyProductActionRuntime).toContain("MutationObserver");
    expect(legacyProductActionRuntime).toContain(".product-btn, .help-btn");

    const guarded = guardLegacyProductRuntimeScript("header.style.transform = 'translateY(-100%)';");
    expect(guarded).toBe("if (header) header.style.transform = 'translateY(-100%)';");
  });
});
