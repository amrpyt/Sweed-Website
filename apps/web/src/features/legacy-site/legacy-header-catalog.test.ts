import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "bun:test";

const headerSource = readFileSync(join(import.meta.dir, "legacy-header.tsx"), "utf8");

describe("header primary CTA", () => {
  test("keeps the approved consultation action in desktop and mobile navigation", () => {
    expect(headerSource.match(/handleNavigationClick\(event, consultationHref\)/g)).toHaveLength(2);
    expect(headerSource).toContain("احجز استشارتك المجانية");
    expect(headerSource).not.toContain("تحميل الكتالوج");
  });
});
