"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { articlesPageSource, type KnowledgeArticle, type KnowledgeCategoryId, type KnowledgeContentType } from "@/content/public-site/articles-page";
import { StickyChipStrip } from "@/features/public-site/shared/sticky-chip-strip";
import { filterArticles, type ArticleBrowserFilters } from "./article-browser-logic";
import styles from "./article-browser.module.css";

type CategoryFilter = "all" | KnowledgeCategoryId;
type TypeFilter = "all" | KnowledgeContentType;

export function ArticleBrowser({ articles }: { articles: readonly KnowledgeArticle[] }) {
  const [draftQuery, setDraftQuery] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [type, setType] = useState<TypeFilter>("all");
  const [sort, setSort] = useState<ArticleBrowserFilters["sort"]>("latest");

  useEffect(() => {
    const timeout = window.setTimeout(() => setQuery(draftQuery), 250);
    return () => window.clearTimeout(timeout);
  }, [draftQuery]);

  const filtered = useMemo(
    () => filterArticles(articles, { query, category, type, sort }),
    [articles, category, query, sort, type],
  );
  const featured = articles.find((article) => article.slug === articlesPageSource.featuredSlug) ?? articles[0] ?? null;

  function clearFilters() {
    setDraftQuery("");
    setQuery("");
    setCategory("all");
    setType("all");
    setSort("latest");
  }

  return (
    <>
      <section className={styles.searchHero} aria-labelledby="knowledge-search-title">
        <div className={styles.searchHeroInner}>
          <div className={styles.searchPanel}>
            <h2 id="knowledge-search-title">دور على المشكلة قبل اسم الخدمة</h2>
            <label className={styles.searchField}>
              <span className={styles.srOnly}>ابحث في المقالات</span>
              <input
                type="search"
                value={draftQuery}
                placeholder="اكتب المشكلة أو الموضوع اللي بتدور عليه"
                onChange={(event) => setDraftQuery(event.target.value)}
              />
            </label>
            <p>النتائج بتتحدث بعد لحظة قصيرة عشان تكتب براحتك.</p>
          </div>

          {featured ? <FeaturedArticle article={featured} /> : null}
        </div>
      </section>

      <StickyChipStrip
        ariaLabel="تصنيفات مركز المعرفة"
        activeId={category}
        items={articlesPageSource.categories.map((item) => ({ id: item.id, label: item.label, href: `#${item.id}` }))}
        onSelect={(id) => setCategory(id as CategoryFilter)}
      />

      <section className={styles.resultsSection} id="latest">
        <div className={styles.container}>
          <header className={styles.resultsHeader}>
            <div className={styles.resultsIntro}>
              <p className={styles.resultsKicker}>المكتبة المنشورة</p>
              <h2>{articlesPageSource.section.header.title}</h2>
              <p className={styles.resultsSummary}>{articlesPageSource.section.header.summary}</p>
            </div>
            <div className={styles.controls}>
              <label>
                <span>نوع المحتوى</span>
                <select value={type} onChange={(event) => setType(event.target.value as TypeFilter)}>
                  {articlesPageSource.contentTypes.map((item) => (
                    <option value={item.id} key={item.id}>{item.label}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>الترتيب</span>
                <select value={sort} onChange={(event) => setSort(event.target.value as ArticleBrowserFilters["sort"])}>
                  <option value="latest">الأحدث</option>
                  <option value="oldest">الأقدم</option>
                </select>
              </label>
              <button type="button" onClick={clearFilters}>مسح الفلاتر</button>
            </div>
          </header>

          <div className={styles.resultsMeta} aria-live="polite">
            <span>{filtered.length} مقال منشور</span>
            {query ? <span>بحث: «{query}»</span> : null}
          </div>

          {filtered.length ? (
            <div className={styles.grid} data-testid="knowledge-results">
              {filtered.map((article) => <ArticleCard article={article} key={article.slug} />)}
            </div>
          ) : (
            <div className={styles.empty} data-testid="knowledge-results">
              <h3>ملقيناش نتيجة مطابقة</h3>
              <p>ملقيناش مقال بنفس الكلمات. جرّب كلمة أقصر أو اختار تصنيف قريب من موضوعك.</p>
              <Button type="button" size="compact" onClick={clearFilters}>ارجع لكل المقالات</Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function FeaturedArticle({ article }: { article: KnowledgeArticle }) {
  return (
    <article className={styles.featured}>
      <div className={styles.featuredMedia}>
        {article.seo.image ? (
          <Image src={article.seo.image} alt={article.title} fill sizes="(min-width: 64rem) 42vw, 100vw" priority />
        ) : null}
      </div>
      <div className={styles.featuredCopy}>
        <span>{article.category}</span>
        <h2>{article.title}</h2>
        <p>{article.summary}</p>
        <div className={styles.meta}>
          <span>{formatDate(article.publishedAt)}</span>
          <span>{article.readingTime}</span>
        </div>
        <ButtonLink href={`/articles/${article.slug}`} size="compact">اقرأ المقال</ButtonLink>
      </div>
    </article>
  );
}

function ArticleCard({ article }: { article: KnowledgeArticle }) {
  return (
    <article className={styles.card} data-testid="knowledge-article-card">
      <div className={styles.cardMedia}>
        {article.seo.image ? <Image src={article.seo.image} alt={article.title} fill sizes="(min-width: 64rem) 30vw, 100vw" /> : null}
      </div>
      <div className={styles.cardCopy}>
        <div className={styles.cardMeta}>
          <span>{article.category}</span>
          <span>{article.contentType === "guide" ? "دليل عملي" : article.contentType === "case-study" ? "دراسة حالة" : "مقال"}</span>
        </div>
        <h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3>
        <p>{article.summary}</p>
        <footer>
          <span>{formatDate(article.publishedAt)}</span>
          <span>{article.readingTime}</span>
        </footer>
      </div>
    </article>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ar-EG", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${value}T00:00:00Z`),
  );
}
