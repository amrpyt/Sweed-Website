import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ProofStateLabel } from "./proof-state-label";
import { PublicPageHero } from "./public-page-hero";
import { StickyChipStrip } from "./sticky-chip-strip";

describe("public-page shared primitives", () => {
  test("renders chip links when no selection callback exists", () => {
    const html = renderToStaticMarkup(
      <StickyChipStrip
        ariaLabel="خريطة الخدمات"
        activeId="branding"
        items={[
          { id: "consulting", label: "استشارات", href: "#consulting" },
          { id: "branding", label: "هوية", href: "#branding" },
        ]}
      />,
    );

    expect(html).toContain('aria-label="خريطة الخدمات"');
    expect(html).toContain('href="#branding"');
    expect(html).toContain('aria-current="location"');
  });

  test("renders pressed buttons when selection is interactive", () => {
    const html = renderToStaticMarkup(
      <StickyChipStrip
        ariaLabel="فلترة الأعمال"
        activeId="branding"
        items={[
          { id: "all", label: "الكل", href: "#all" },
          { id: "branding", label: "هوية", href: "#branding" },
        ]}
        onSelect={() => undefined}
      />,
    );

    expect(html).toContain('type="button"');
    expect(html).toContain('aria-pressed="true"');
  });

  test("renders proof state and one page-level heading", () => {
    const proof = renderToStaticMarkup(<ProofStateLabel state="pending" />);
    const hero = renderToStaticMarkup(
      <PublicPageHero
        eyebrow="الخدمات"
        title="مش كل مشكلة محتاجة نفس الخدمة"
        summary="ابدأ من المشكلة ونحدد المسار المناسب."
        actions={[{ label: "ابدأ الآن", href: "/contact", variant: "primary" }]}
      />,
    );

    expect(proof).toContain('data-proof-state="pending"');
    expect(proof).toContain("قيد التوثيق");
    expect(hero).toContain("<h1");
    expect(hero).toContain('href="/contact"');
  });
});
