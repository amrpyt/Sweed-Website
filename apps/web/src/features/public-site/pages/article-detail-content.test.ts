import { describe, expect, test } from "bun:test";
import { articles } from "@/content/local-data";
import { createArticleJsonLd, getArticleDetailModel } from "./article-detail-model";

describe("article detail model", () => {
  test("keeps the known article reading metadata and body order", () => {
    const article = articles.find((item) => item.slug === "project-needs-direction")!;
    const model = getArticleDetailModel(article, articles);

    expect(model.article.title).toBe("مشروعك مش محتاج مجهود أكتر... محتاج اتجاه أوضح");
    expect(model.article.publishedAt).toBe("2026-07-20");
    expect(model.article.readingTime).toBe("6 دقائق");
    expect(model.article.body.map((section) => section.id)).toEqual(["effort-vs-direction", "first-step"]);
    expect(model.relatedService.href).toBe("/services/consulting");
    expect(model.relatedArticles.every((item) => item.slug !== article.slug)).toBe(true);
    expect(model.mostViewedArticles).toHaveLength(3);
    expect(model.mostViewedArticles.every((item) => item.slug !== article.slug)).toBe(true);
  });

  test("creates Article JSON-LD only when required typed fields exist", () => {
    const article = articles.find((item) => item.slug === "project-needs-direction")!;
    const schema = createArticleJsonLd(article);

    expect(schema?.["@type"]).toBe("Article");
    expect(schema?.url).toBe("https://sweed.com/articles/project-needs-direction");
    expect(schema?.datePublished).toBe("2026-07-20");
    expect(schema?.image).toContain("/images/hero/two-men-consultation.jpg");
    expect(createArticleJsonLd({ ...article, seo: { ...article.seo, image: undefined } })).toBeNull();
  });
});
