import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

function readSource(path: string) {
  return readFileSync(join(import.meta.dir, path), "utf8");
}

describe("homepage control consistency", () => {
  test("keeps the shared header CTA on the SWEED control geometry", () => {
    const header = readSource("../../features/legacy-site/legacy-header.tsx");
    const headerCss = readSource("../../features/legacy-site/legacy-header.module.css");
    const actionCss = readSource("../../components/ui/brand-action-button.module.css");

    expect(header).toContain("BrandActionButtonContent");
    expect(header).toContain("getBrandActionButtonClassName");
    expect(header).toContain('size: "nav"');
    expect(actionCss).toContain("--brand-action-font-weight: var(--font-weight-strong);");
    expect(actionCss).toContain("--brand-action-min-height: var(--control-height-md);");
    expect(actionCss).toContain("transform: translate(var(--brand-action-label-shift), calc(-1 * var(--control-text-optical-shift)))");
    expect(headerCss).not.toContain(".mobileCta {\n    display: flex;\n    min-height: 52px;");
  });

  test("keeps the mobile touch floor from overriding component control sizes or shapes", () => {
    const css = readSource("home-public-page.module.css");

    expect(css).toContain(":where(.homepage) :where(a, button) {");

    const focusStart = css.indexOf(".homepage a:focus-visible,");
    const focusEnd = css.indexOf(".homepage *:focus:not(:focus-visible)", focusStart);
    const focusCss = css.slice(focusStart, focusEnd);

    expect(focusCss).not.toContain("border-radius:");
  });

  test("routes homepage CTA-style actions through the canonical shared button mechanism", () => {
    const sources = [
      readSource("home-blit-scroll-section.tsx"),
      readSource("home-offers-section.tsx"),
      readSource("home-faq-blog-section.tsx"),
      readSource("home-contact-section.tsx"),
    ];

    for (const source of sources) {
      expect(source).toContain("getBrandActionButtonClassName");
      expect(source).toContain("BrandActionButtonContent");
    }
  });

  test("keeps mobile problem options as individual rounded cards", () => {
    const css = readSource("home-problems-compass-section.module.css");
    const mobileStart = css.indexOf("@media (max-width: 720px)");
    const mobileEnd = css.indexOf("@media (max-height: 500px)", mobileStart);
    const mobileCss = css.slice(mobileStart, mobileEnd);

    const cardStart = mobileCss.indexOf(".problemCard,\n  .problemCard:nth-child(n) {");
    const cardEnd = mobileCss.indexOf(".problemCard:focus-visible", cardStart);
    const cardCss = mobileCss.slice(cardStart, cardEnd);

    expect(cardCss).toContain("border-radius: var(--shape-card);");
    expect(cardCss).not.toContain("border-radius: 0;");
  });
});
