import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { LegacyFooter } from "./legacy-footer";

describe("shared public footer", () => {
  test("keeps the production shell hook and ends with the oversized SWEED wordmark", () => {
    const html = renderToStaticMarkup(<LegacyFooter />);

    expect(html).toContain("sweed-common-footer");
    expect(html).toContain('aria-label="SWEED - الرئيسية"');
    expect(html).toContain(">S</span><span>WEED</span>");
  });

  test("preserves contact, service, and legal routes", () => {
    const html = renderToStaticMarkup(<LegacyFooter />);

    expect(html).toContain("info@sweed.com");
    expect(html).toContain('/services#consulting');
    expect(html).toContain('/privacy');
    expect(html).toContain('/terms');
  });
});
