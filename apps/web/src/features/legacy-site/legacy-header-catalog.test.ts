import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "bun:test";
import { defaultNavItems, homeNavItems } from "./legacy-header.config";

const headerSource = readFileSync(join(import.meta.dir, "legacy-header.tsx"), "utf8");
const headerPartsSource = readFileSync(join(import.meta.dir, "legacy-header-parts.tsx"), "utf8");
const headerCss = readFileSync(join(import.meta.dir, "legacy-header.module.css"), "utf8");

describe("header company profile CTA", () => {
  test("keeps compact desktop and mobile profile actions without leaking the mobile CTA into desktop layout", () => {
    expect(headerSource.match(/handleNavigationClick\(event, catalogHref\)/g)).toHaveLength(2);
    expect(headerSource.match(/بروفايل الشركة/g)).toHaveLength(2);
    expect(headerSource).not.toContain("حمل الكتالوج");
    expect(headerSource).toContain("className={getBrandActionButtonClassName({ className: styles.desktopCta");
    expect(headerSource).toContain("<div className={styles.mobileCta}>");
    expect(headerSource).not.toContain("className={getBrandActionButtonClassName({ className: styles.mobileCta");
    expect(headerCss).toContain(".mobileCta {\n  display: none !important;");
    expect(headerSource).not.toContain("consultationHref");
  });

  test("uses the company profile label in the shared legacy header parts too", () => {
    expect(headerPartsSource).toContain("بروفايل الشركة");
    expect(headerPartsSource).not.toContain("حمل الكتالوج");
    expect(headerPartsSource).not.toContain("فتح كتالوج سويد");
  });

  test("keeps the approved compact navbar geometry instead of the oversized pill variant", () => {
    expect(headerCss).toContain("height: 77px;");
    expect(headerCss).toContain("min-height: 76px;");
    expect(headerCss).toContain("width: min(100% - 3rem, 1360px);");
    expect(headerCss).toContain("width: clamp(98px, 9vw, 118px);");
    expect(headerCss).not.toContain("height: 118px;");
    expect(headerCss).not.toContain("background: #e02269;");
  });

  test("keeps the approved contact item in desktop and mobile navigation lists", () => {
    expect(defaultNavItems.some((item) => item.label === "اتصل بنا")).toBe(true);
    expect(homeNavItems.some((item) => item.label === "اتصل بنا")).toBe(true);
  });
});
