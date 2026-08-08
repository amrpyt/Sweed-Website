import { describe, expect, test } from "bun:test";
import { offersPageSource } from "@/content/public-site/offers-page";

describe("offers executive source", () => {
  test("keeps the three-question selector and integrated packages", () => {
    expect(offersPageSource.quiz.questions).toHaveLength(3);
    expect(offersPageSource.integratedPackages.map((item) => item.id)).toEqual([
      "direction",
      "path",
      "partnership",
    ]);
  });

  test("keeps all six service package groups", () => {
    expect(offersPageSource.serviceGroups.map((group) => group.id)).toEqual([
      "consulting",
      "branding",
      "digital-marketing",
      "media",
      "advertising",
      "software-development",
    ]);
    expect(offersPageSource.serviceGroups.every((group) => group.packages.length === 3)).toBe(true);
  });

  test("does not publish unverified final prices or timed promotions", () => {
    expect(offersPageSource.integratedPackages.every((item) => item.priceLabel === "تسعير حسب نطاق المشروع")).toBe(true);
    expect("liveOffers" in offersPageSource).toBe(false);
  });
});
