import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { normalizeLegacyAccessibility } from "./legacy-accessibility";

function readLegacyPage(file: string) {
  return readFileSync(new URL(`../../../site/pages/${file}`, import.meta.url), "utf8");
}

describe("legacy page accessibility normalization", () => {
  test("associates article search and newsletter fields with accessible names", () => {
    const body = normalizeLegacyAccessibility(readLegacyPage("blog.html"), "articles");

    expect(body).toContain('for="article-search"');
    expect(body).toContain('id="article-search"');
    expect(body).toContain('aria-label="تنفيذ البحث في المقالات"');
    expect(body).toContain('for="newsletter-email"');
    expect(body).toContain('id="newsletter-email"');
    expect(body).toContain('aria-label="صفحة المقالات السابقة"');
    expect(body).toContain('aria-label="صفحة المقالات التالية"');
    expect(body).toContain('<main id="main-content" tabindex="-1">');
  });

  test("labels offer carousel navigation buttons", () => {
    const body = normalizeLegacyAccessibility(readLegacyPage("offers.html"), "offers");

    expect(body).toContain('aria-label="العرض السابق"');
    expect(body).toContain('aria-label="العرض التالي"');
  });

  test("associates product filters with their visible labels", () => {
    const body = normalizeLegacyAccessibility(readLegacyPage("products.html"), "products");

    expect(body).toContain('for="product-type-filter"');
    expect(body).toContain('id="product-type-filter"');
    expect(body).toContain('for="product-price-filter"');
    expect(body).toContain('id="product-price-filter"');
    expect(body).toContain('for="product-delivery-filter"');
    expect(body).toContain('id="product-delivery-filter"');
    expect(body).toContain('for="industry-select"');
    expect(body).toContain('name="industry"');
  });

  test("adds the missing portfolio section heading level", () => {
    const body = normalizeLegacyAccessibility(readLegacyPage("portfolio.html"), "portfolio");

    expect(body).toContain('<h2 class="sweed-visually-hidden">مشروعات مختارة</h2>');
  });
});
