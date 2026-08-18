import { describe, expect, test } from "bun:test";
import { aboutPageContent, type AboutMetric } from "@/content/about-page";
import { homepageContent } from "@/content/homepage";

describe("approved About page content", () => {
  test("keeps the approved narrative order", () => {
    expect(aboutPageContent.sectionIds).toEqual([
      "about-hero",
      "story",
      "promise",
      "methodology",
      "cta",
    ]);
  });

  test("keeps About and homepage metrics synchronized", () => {
    const aboutMetrics = aboutPageContent.numbers.map(
      (metric: AboutMetric) => `${metric.prefix ?? ""}${metric.value}${metric.suffix ?? ""}`,
    );
    expect(aboutMetrics).toEqual(homepageContent.stats.map((metric) => metric.value));
  });

  test("does not publish placeholder proof as verified", () => {
    expect(aboutPageContent.numbers).toHaveLength(0);
  });

  test("preserves Arabic-safe motion content boundaries", () => {
    expect(aboutPageContent.hero.lines).toHaveLength(2);
    expect(aboutPageContent.values.items).toHaveLength(4);
    expect(aboutPageContent.methodology.steps).toHaveLength(5);
  });
});
