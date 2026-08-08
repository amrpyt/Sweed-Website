import type { KnowledgeArticle, KnowledgeCategoryId, KnowledgeContentType } from "@/content/public-site/articles-page";

export type ArticleBrowserFilters = {
  query: string;
  category: "all" | KnowledgeCategoryId;
  type: "all" | KnowledgeContentType;
  sort: "latest" | "oldest";
};

export function filterArticles(articles: readonly KnowledgeArticle[], filters: ArticleBrowserFilters): KnowledgeArticle[] {
  const query = normalizeText(filters.query);
  const filtered = articles.filter((article) => {
    const matchesCategory = filters.category === "all" || article.knowledgeCategory === filters.category;
    const matchesType = filters.type === "all" || article.contentType === filters.type;
    const searchable = normalizeText(`${article.title} ${article.summary} ${article.category} ${(article.tags ?? []).join(" ")}`);
    const matchesQuery = !query || searchable.includes(query);
    return matchesCategory && matchesType && matchesQuery;
  });

  return [...filtered].sort((a, b) => {
    const dateOrder = a.publishedAt.localeCompare(b.publishedAt);
    if (dateOrder !== 0) return filters.sort === "latest" ? -dateOrder : dateOrder;
    return a.slug.localeCompare(b.slug);
  });
}

function normalizeText(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("ar")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, " ");
}
