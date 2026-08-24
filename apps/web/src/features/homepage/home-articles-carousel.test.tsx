import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { homepageContent } from "@/content/homepage";
import { HomeFaqBlogSection } from "./home-faq-blog-section";

describe("homepage articles carousel", () => {
  test("renders six unique article slides with manual controls", () => {
    const html = renderToStaticMarkup(<HomeFaqBlogSection />);
    const images = homepageContent.articles.map((article) => article.image);

    expect(homepageContent.articles).toHaveLength(6);
    expect(new Set(images).size).toBe(6);
    expect(html).toContain('aria-roledescription="carousel"');
    expect(html).toContain('aria-label="المقال السابق"');
    expect(html).toContain('aria-label="المقال التالي"');
    expect((html.match(/data-testid="home-latest-article"/g) ?? [])).toHaveLength(6);
  });
});
