import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

function readSource(path: string) {
  return readFileSync(join(import.meta.dir, path), "utf8");
}

describe("homepage control consistency", () => {
  test("keeps the shared header CTA on the SWEED control geometry", () => {
    const css = readSource("../../features/legacy-site/legacy-header.module.css");

    expect(css).toContain("min-height: var(--control-height-md);");
    expect(css).toContain("font-weight: var(--font-weight-strong);");
    expect(css).toContain("transform: translateY(calc(-1 * var(--control-text-optical-shift)));");
    expect(css).not.toContain(".mobileCta {\n    display: flex;\n    min-height: 52px;");
  });

  test("keeps the mobile touch floor from overriding component control sizes or shapes", () => {
    const css = readSource("home-public-page.module.css");

    expect(css).toContain(":where(.homepage) :where(a, button) {");

    const focusStart = css.indexOf(".homepage a:focus-visible,");
    const focusEnd = css.indexOf(".homepage *:focus:not(:focus-visible)", focusStart);
    const focusCss = css.slice(focusStart, focusEnd);

    expect(focusCss).not.toContain("border-radius:");
  });

  test("uses the shared control radius for homepage CTA-style actions", () => {
    const about = readSource("home-blit-scroll-section.module.css");
    const offers = readSource("home-offers-section.module.css");
    const faqBlog = readSource("home-faq-blog-section.module.css");
    const contact = readSource("home-contact-section.module.css");

    expect(about).toContain(".aboutLink {\n  display: inline-flex;\n  min-height: var(--control-height-md);");
    expect(about).toContain("border-radius: var(--shape-control);");

    expect(offers).toContain(".offerAction {");
    expect(offers).toContain(".allOffersLink a {");
    expect(offers.match(/border-radius: var\(--shape-control\);/g)?.length ?? 0).toBeGreaterThanOrEqual(2);

    expect(faqBlog).toContain(".blogHeading > a {");
    expect(faqBlog).toContain("border-radius: var(--shape-control);");

    expect(contact).toContain(".form > button {");
    expect(contact).toContain("border-radius: var(--shape-control);");
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
