import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const marketingRoot = new URL("../../../app/(marketing)/", import.meta.url);

function readMarketingRoute(route: string) {
  return readFileSync(new URL(`${route}/page.tsx`, marketingRoot), "utf8");
}

describe("sitewide SWEED brand shell", () => {
  test("wraps the CRM demo with the shared SWEED header and footer", () => {
    const route = readMarketingRoute("crm-ai-demo");
    const demo = readFileSync(new URL("../../crm-ai-demo/crm-ai-demo-page.tsx", import.meta.url), "utf8");

    expect(route).toContain("LegacyHeader");
    expect(route).toContain("LegacyFooter");
    expect(route).toContain("<CrmAiDemoPage />");
    expect(demo).not.toContain("styles.siteBar");
  });

  test("uses the shared SWEED shell around the Midu experimental body", () => {
    const route = readMarketingRoute("midu-clone");

    expect(route).toContain("LegacyHeader");
    expect(route).toContain("LegacyFooter");
    expect(route).not.toContain("<header className={styles.navShell}>");
    expect(route).not.toContain("<footer className={styles.footer}");
    expect(route).toContain('<section className={styles.footer} id="contact"');
  });

  test("wraps the 404 state with the shared SWEED header and footer", () => {
    const source = readFileSync(new URL("../../../app/not-found.tsx", import.meta.url), "utf8");

    expect(source).toContain("LegacyHeader");
    expect(source).toContain("LegacyFooter");
    expect(source).toContain("الصفحة دي مش موجودة");
    expect(source).toContain("<ButtonLink href=\"/\">العودة للرئيسية</ButtonLink>");
  });
});
