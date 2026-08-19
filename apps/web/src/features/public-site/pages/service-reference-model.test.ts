import { describe, expect, test } from "bun:test";
import { serviceReferenceSlugs } from "@/features/legacy-site/service-reference-html";
import { createServiceJsonLd, getServiceReferenceModel } from "./service-reference-model";

describe("service reference model", () => {
  test("resolves every reference slug to the correct public service identity", () => {
    const models = serviceReferenceSlugs.map(getServiceReferenceModel);

    expect(models.map((model) => model.slug)).toEqual([...serviceReferenceSlugs]);
    expect(models.find((model) => model.slug === "consulting")?.title).toBe("الاستشارات الإدارية والتسويقية");
    expect(models.find((model) => model.slug === "software-development")?.title).toBe("المواقع والأنظمة والحلول الرقمية");
    expect(models.find((model) => model.slug === "advertising")?.title).toBe("الدعاية والإعلان");
  });

  test("creates Service JSON-LD for every public service route", () => {
    for (const slug of serviceReferenceSlugs) {
      const schema = createServiceJsonLd(slug);

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("Service");
      expect(schema.url).toBe(`https://sweed.com/services/${slug}`);
      expect(schema.name).toBe(getServiceReferenceModel(slug).title);
      expect(schema.provider).toEqual({ "@type": "Organization", name: "SWEED", url: "https://sweed.com" });
    }
  });
});
