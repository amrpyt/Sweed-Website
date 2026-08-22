import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const marketingRoot = new URL("../../../app/(marketing)/", import.meta.url);

function readRoute(route: string) {
  return readFileSync(new URL(`${route}/page.tsx`, marketingRoot), "utf8");
}

describe("final v4 route contract", () => {
  test("services renders the modular public implementation", () => {
    const source = readRoute("services");
    expect(source).toContain("ServicesPublicPage");
    expect(source).not.toContain("LegacyPage");
  });

  test("portfolio keeps its approved enhanced body inside the shared SWEED shell", () => {
    const source = readRoute("portfolio");
    expect(source).toContain("LegacyPage");
    expect(source).toContain('page="portfolio"');
    expect(source).toContain('presentation="branded"');
    expect(source).not.toContain('presentation="exact"');
  });

  test("offers keeps its approved enhanced body inside the shared SWEED shell", () => {
    const source = readRoute("offers");
    expect(source).toContain("LegacyPage");
    expect(source).toContain('page="offers"');
    expect(source).toContain('presentation="branded"');
    expect(source).not.toContain('presentation="exact"');
  });

  test("articles stays on the current knowledge-center implementation", () => {
    const source = readRoute("articles");

    expect(source).toContain("ArticlesExecutivePage");
    expect(source).not.toContain('presentation="reference"');
  });
});
