import { describe, expect, test } from "bun:test";
import { servicesPageSource } from "@/content/public-site/services-page";

describe("services executive source", () => {
  test("keeps the approved six-service journey and executive copy in order", () => {
    expect(servicesPageSource.hero.title).toBe("مش كل مشكلة محتاجة نفس الخدمة");
    expect(servicesPageSource.services.map((item) => item.id)).toEqual([
      "consulting",
      "branding",
      "digital-marketing",
      "development",
      "advertising",
      "media",
    ]);
    expect(servicesPageSource.services.map((item) => item.title)).toEqual([
      "الاستشارات الإدارية والتسويقية",
      "بناء البراند والهوية البصرية",
      "التسويق الرقمي وإدارة الحملات",
      "المواقع والأنظمة والحلول الرقمية",
      "الدعاية والإعلان",
      "إنتاج المحتوى والميديا",
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
