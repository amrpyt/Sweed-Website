import { describe, expect, test } from "bun:test";
import { homepageContent } from "@/content/homepage";

describe("homepage content", () => {
  test("keeps key homepage sections populated", () => {
    expect(homepageContent.hero.title).toBe("نصنع العلامات التي تقود المستقبل.");
    expect(homepageContent.hero.actions.some((action) => action.label === "استكشف أعمالنا")).toBe(true);
    expect(homepageContent.process).toHaveLength(4);
    expect(homepageContent.process[0].title).toBe("الاستماع والفهم");
  });

  test("keeps public links internal except WhatsApp contact CTA", () => {
    const allLinks = [
      ...homepageContent.hero.actions.map((action) => action.href),
      ...homepageContent.offers.map((item) => item.href),
      ...homepageContent.services.map((item) => item.href),
      ...homepageContent.products.map((item) => item.href),
      ...homepageContent.portfolio.map((item) => item.href),
      ...homepageContent.articles.map((item) => item.href),
    ].filter(Boolean);

    expect(allLinks.every((href) => href?.startsWith("/"))).toBe(true);
    expect(homepageContent.contact.whatsappHref).toStartWith("https://wa.me/201068274662");
  });
});
