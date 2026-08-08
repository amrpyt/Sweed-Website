import { describe, expect, test } from "bun:test";
import { articles } from "@/content/local-data";
import { getKnowledgeArticles } from "@/content/public-site/articles-page";
import { filterArticles } from "./article-browser-logic";

const knowledgeArticles = getKnowledgeArticles(articles);

describe("article browser filters", () => {
  test("finds Arabic text in title and summary", () => {
    const result = filterArticles(knowledgeArticles, {
      query: "ميزانية",
      category: "all",
      type: "all",
      sort: "latest",
    });

    expect(result.map((article) => article.slug)).toContain("marketing-metrics-that-matter");
  });

  test("filters by executive knowledge category", () => {
    const result = filterArticles(knowledgeArticles, {
      query: "",
      category: "brand-identity",
      type: "all",
      sort: "latest",
    });

    expect(result.map((article) => article.slug)).toEqual(["five-brand-decisions"]);
  });

  test("returns an empty result for unmatched text", () => {
    expect(
      filterArticles(knowledgeArticles, {
        query: "موضوع غير موجود إطلاقًا",
        category: "all",
        type: "all",
        sort: "latest",
      }),
    ).toHaveLength(0);
  });

  test("sorts deterministically by publish date then slug", () => {
    const result = filterArticles(knowledgeArticles, {
      query: "",
      category: "all",
      type: "all",
      sort: "latest",
    });

    expect(result[0]?.slug).toBe("project-needs-direction");
    expect(result.at(-1)?.publishedAt).toBe("2026-05-04");
    expect(result.filter((article) => article.publishedAt === "2026-05-04").map((article) => article.slug)).toEqual([
      "how-to-choose-marketing-package",
      "why-ai-demo-helps-sales",
    ]);
  });
});
