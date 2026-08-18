import { describe, expect, test } from "bun:test";
import { homepageContent } from "@/content/homepage";

describe("homepage content", () => {
  test("keeps the approved homepage narrative populated", () => {
    expect(homepageContent.hero.title).toBe("نصنع العلامات التي تقود المستقبل");
    expect(homepageContent.hero.actions.some((action) => action.label === "شاهد أعمالنا")).toBe(true);
    expect(homepageContent.problems).toHaveLength(6);
    expect(homepageContent.about.points).toHaveLength(3);
    expect(homepageContent.why).toHaveLength(4);
    expect(homepageContent.stats).toHaveLength(0);
    expect(homepageContent.faq).toHaveLength(5);
    expect(homepageContent.articles).toHaveLength(3);
  });

  test("preserves problem-to-service mappings", () => {
    expect(homepageContent.problems.map((problem) => problem.serviceKey)).toEqual([
      "الاستشارات الإدارية",
      "التسويق الرقمي",
      "بناء البراند والهوية البصرية",
      "الاستشارات التسويقية",
      "الدعاية والإعلان",
      "المواقع والأنظمة والحلول الرقمية",
    ]);
  });

  test("does not present pending portfolio metrics as verified", () => {
    const verified = homepageContent.portfolio.filter((item) => item.verification === "verified");
    const pending = homepageContent.portfolio.filter((item) => item.verification === "pending");

    expect(verified).toHaveLength(1);
    expect(verified[0]?.result).toContain("22%");
    expect(pending.every((item) => item.result === "النتيجة الرقمية قيد التوثيق")).toBe(true);
  });

  test("keeps public links internal except WhatsApp contact CTA", () => {
    const allLinks = [
      ...homepageContent.hero.actions.map((action) => action.href),
      ...homepageContent.offers.map((item) => item.href),
      ...homepageContent.services.map((item) => item.href),
      ...homepageContent.portfolio.map((item) => item.href),
      ...homepageContent.articles.map((item) => item.href),
    ].filter(Boolean);

    expect(allLinks.every((href) => href?.startsWith("/"))).toBe(true);
    expect(homepageContent.contact.whatsappHref).toStartWith("https://wa.me/201068274662");
  });
});
