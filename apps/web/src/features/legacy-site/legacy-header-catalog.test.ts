import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "bun:test";

const headerSource = readFileSync(join(import.meta.dir, "legacy-header.tsx"), "utf8");
const headerCss = readFileSync(join(import.meta.dir, "legacy-header.module.css"), "utf8");

describe("header primary CTA", () => {
  test("keeps the approved consultation action in desktop and mobile navigation", () => {
    expect(headerSource.match(/handleNavigationClick\(event, consultationHref\)/g)).toHaveLength(2);
    expect(headerSource).toContain("احجز استشارتك المجانية");
    expect(headerSource).not.toContain("تحميل الكتالوج");
    expect(headerSource).toContain("getBrandActionButtonClassName");
    expect(headerSource).toContain("BrandActionButtonContent");
  });

  test("keeps the approved compact navbar geometry instead of the oversized pill variant", () => {
    expect(headerCss).toContain("height: 77px;");
    expect(headerCss).toContain("min-height: 76px;");
    expect(headerCss).toContain("width: min(100% - 3rem, 1360px);");
    expect(headerCss).toContain("width: clamp(98px, 9vw, 118px);");
    expect(headerCss).not.toContain("height: 118px;");
    expect(headerCss).not.toContain("background: #e02269;");
  });
});
