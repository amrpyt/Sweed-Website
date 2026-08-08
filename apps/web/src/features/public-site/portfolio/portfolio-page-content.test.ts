import { describe, expect, test } from "bun:test";
import { portfolioPageSource } from "@/content/public-site/portfolio-page";

describe("portfolio executive source", () => {
  test("keeps the six approved service narratives in order", () => {
    expect(portfolioPageSource.groups.map((group) => group.id)).toEqual([
      "consulting",
      "branding",
      "marketing",
      "media",
      "advertising",
      "digital",
    ]);
  });

  test("does not publish numeric outcome metrics for pending proof", () => {
    for (const group of portfolioPageSource.groups) {
      for (const project of group.projects) {
        if (project.proof.state === "pending") {
          expect(project.proof.metric).toBeUndefined();
        }
      }
    }
  });

  test("keeps project proof and source facts separate", () => {
    const snap = portfolioPageSource.groups
      .flatMap((group) => group.projects)
      .find((project) => project.id === "snap-growth");

    expect(snap?.facts).toContain("بحث سوقي واستبيانات شملت 1,025 مشاركة من العملاء والتجار والكباتن");
    expect(snap?.proof.state).toBe("pending");
  });
});
