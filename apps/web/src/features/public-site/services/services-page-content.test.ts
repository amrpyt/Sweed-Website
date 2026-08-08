import { describe, expect, test } from "bun:test";
import { servicesPageSource } from "@/content/public-site/services-page";

describe("services executive source", () => {
  test("keeps the approved six-service journey in order", () => {
    expect(servicesPageSource.services.map((item) => item.id)).toEqual([
      "consulting",
      "branding",
      "digital-marketing",
      "development",
      "advertising",
      "media",
    ]);
  });

  test("gives every service one explicit success indicator and one destination", () => {
    for (const service of servicesPageSource.services) {
      expect(service.successIndicator.length).toBeGreaterThan(10);
      expect(service.href).toMatch(/^\/services\//);
      expect(service.scope.length).toBeGreaterThanOrEqual(3);
    }
  });

  test("keeps the integrated path and final CTA as explicit route sections", () => {
    expect(servicesPageSource.integratedPath.id).toBe("integrated-path");
    expect(servicesPageSource.finalCta.id).toBe("services-cta");
  });
});
