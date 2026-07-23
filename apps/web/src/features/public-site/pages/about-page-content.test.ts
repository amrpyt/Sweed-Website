import { describe, expect, test } from "bun:test";
import { aboutPageContent, type AboutMetric } from "@/content/about-page";
import { homepageContent } from "@/content/homepage";

describe("approved About page content", () => {
  test("keeps the approved narrative order", () => {
    expect(aboutPageContent.sectionIds).toEqual([
      "about-hero",
      "story",
      "founder",
      "promise",
      "values",
      "methodology",
      "numbers",
      "team",
      "alliances",
      "partners",
      "testimonials",
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
    expect(aboutPageContent.team.members.filter((member) => member.verification === "verified")).toHaveLength(2);
    expect(aboutPageContent.team.members.filter((member) => member.verification === "placeholder")).toHaveLength(4);
    expect(aboutPageContent.alliances.items.every((item) => item.verification === "placeholder")).toBe(true);
    expect(aboutPageContent.testimonials.items.every((item) => item.verification === "placeholder")).toBe(true);
    expect(aboutPageContent.partners.notice).toContain("ليست أسماء عملاء");
  });

  test("preserves Arabic-safe motion content boundaries", () => {
    expect(aboutPageContent.hero.lines).toHaveLength(2);
    expect(aboutPageContent.values.items).toHaveLength(6);
    expect(aboutPageContent.methodology.steps).toHaveLength(5);
  });
});
