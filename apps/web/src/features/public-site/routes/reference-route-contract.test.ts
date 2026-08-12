import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const marketingRoot = new URL("../../../app/(marketing)/", import.meta.url);

function readRoute(route: string) {
  return readFileSync(new URL(`${route}/page.tsx`, marketingRoot), "utf8");
}

describe("uploaded reference route contract", () => {
  for (const route of ["services", "portfolio", "offers"] as const) {
    test(`${route} renders the approved reference presentation`, () => {
      const source = readRoute(route);

      expect(source).toContain('import { LegacyPage } from "@/features/legacy-site"');
      expect(source).toContain(`<LegacyPage page="${route}" presentation="reference" />`);
    });
  }

  test("articles stays on the current knowledge-center implementation", () => {
    const source = readRoute("articles");

    expect(source).toContain("ArticlesExecutivePage");
    expect(source).not.toContain('presentation="reference"');
  });
});
