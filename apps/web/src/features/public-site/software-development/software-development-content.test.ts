import { describe, expect, test } from "bun:test";
import { softwareDevelopmentPageSource } from "@/content/public-site/software-development-page";

describe("software development executive source", () => {
  test("keeps the six technical layers and module system", () => {
    expect(softwareDevelopmentPageSource.layers).toHaveLength(6);
    expect(softwareDevelopmentPageSource.modules).toHaveLength(6);
    expect(softwareDevelopmentPageSource.process).toHaveLength(7);
    expect(softwareDevelopmentPageSource.integrationFlow).toHaveLength(6);
  });

  test("keeps the fault diagnostic advisory and useful", () => {
    expect(softwareDevelopmentPageSource.faultOptions.length).toBeGreaterThanOrEqual(4);

    for (const option of softwareDevelopmentPageSource.faultOptions) {
      expect(option.recommendation.length).toBeGreaterThan(20);
      expect(option.recommendation).not.toMatch(/مضمون|نضمن نتيجة/);
    }
  });

  test("keeps the approved service paths without promise language", () => {
    expect(softwareDevelopmentPageSource.useCases).toHaveLength(5);
    expect(JSON.stringify(softwareDevelopmentPageSource)).not.toMatch(/آمن 100%|أسرع موقع|نضمن نتيجة/);
  });
});
