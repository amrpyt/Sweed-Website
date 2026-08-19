import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const routePath = resolve(import.meta.dir, "../../../app/(marketing)/services/[slug]/page.tsx");

describe("service reference route contract", () => {
  test("all uploaded HTML services render through the reference page", () => {
    const source = readFileSync(routePath, "utf8");

    expect(source).toContain("ServiceReferencePage");
    expect(source).toContain("serviceReferenceSlugs.includes");
    expect(source).not.toContain("ServiceDetailPublicPage");
    expect(source).not.toContain("<SoftwareDevelopmentPage");
  });
});
