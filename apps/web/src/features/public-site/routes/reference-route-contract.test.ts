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

  test("portfolio renders the modular executive implementation", () => {
    const source = readRoute("portfolio");
    expect(source).toContain("PortfolioExecutivePage");
    expect(source).not.toContain("LegacyPage");
  });

  test("offers renders the modular executive implementation", () => {
    const source = readRoute("offers");
    expect(source).toContain("OffersExecutivePage");
    expect(source).not.toContain("LegacyPage");
  });

  test("articles stays on the current knowledge-center implementation", () => {
    const source = readRoute("articles");

    expect(source).toContain("ArticlesExecutivePage");
    expect(source).not.toContain('presentation="reference"');
  });
});
