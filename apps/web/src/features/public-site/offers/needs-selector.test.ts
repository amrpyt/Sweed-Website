import { describe, expect, test } from "bun:test";
import { getOfferRecommendation, type NeedsAnswers } from "./needs-selector-logic";

const base = { stage: "growth", timing: "now" } satisfies Omit<NeedsAnswers, "challenge">;

describe("offers recommendation", () => {
  test("routes each challenge to the matching service family", () => {
    expect(getOfferRecommendation({ ...base, challenge: "direction" }).serviceId).toBe("consulting");
    expect(getOfferRecommendation({ ...base, challenge: "brand" }).serviceId).toBe("branding");
    expect(getOfferRecommendation({ ...base, challenge: "marketing" }).serviceId).toBe("digital-marketing");
    expect(getOfferRecommendation({ ...base, challenge: "media" }).serviceId).toBe("media");
    expect(getOfferRecommendation({ ...base, challenge: "advertising" }).serviceId).toBe("advertising");
    expect(getOfferRecommendation({ ...base, challenge: "digital" }).serviceId).toBe("software-development");
  });

  test("keeps the result advisory instead of guaranteed", () => {
    const result = getOfferRecommendation({ challenge: "marketing", stage: "redirect", timing: "later" });
    expect(result.packageId).toBe("direction");
    expect(result.note).toContain("ترشيح");
    expect(result.note).not.toMatch(/مضمون|نضمن/);
  });
});
