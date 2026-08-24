import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { articlesPageSource, getKnowledgeArticles, type KnowledgeArticle } from "@/content/public-site/articles-page";
import { getArticlesPageModel } from "@/features/public-site";
import { PublicPageShell } from "@/features/public-site/pages/public-page-shell";
import { PublicPageHero } from "@/features/public-site/shared/public-page-hero";
import { ArticleBrowser } from "./article-browser";
import { ArticleCarouselControls } from "./article-carousel-controls";
import styles from "./articles-executive-page.module.css";

const sectionIds = [
  "latest",
  articlesPageSource.problemPaths.id,
  articlesPageSource.fieldLessons.id,
  articlesPageSource.relationship.id,
  articlesPageSource.finalCta.id,
];

export function ArticlesExecutivePage() {
  const model = getArticlesPageModel();
  const articles = getKnowledgeArticles(model.articles);
  const bySlug = new Map(articles.map((article) => [article.slug, article]));
  const latestArticles = [...articles]
    .sort((first, second) => second.publishedAt.localeCompare(first.publishedAt))
    .slice(0, 6);
  const mostViewedArticles = articlesPageSource.fieldLessons.slugs.flatMap((slug) => {
    const article = bySlug.get(slug);
    return article ? [article] : [];
  });

  return (
    <PublicPageShell page="articles" sectionIds={sectionIds}>
      <main className={styles.page}>
        <div className={styles.articlesHero}>
          <PublicPageHero
            eyebrow={articlesPageSource.hero.eyebrow}
            title={articlesPageSource.hero.title}
            summary={articlesPageSource.hero.summary}
            tone="dark"
          />
        </div>

        <ArticleBrowser articles={articles} />

        <ArticleCarouselSection
          id={articlesPageSource.problemPaths.id}
          title="أحدث المقالات"
          summary="آخر ما نشرناه من مقالات وأدلة عملية تساعدك تفهم أسرع وتاخد قرار أوضح."
          articles={latestArticles}
        />

        <ArticleCarouselSection
          id={articlesPageSource.fieldLessons.id}
          title="الأكثر مشاهدة"
          summary="موضوعات عملية بيرجع لها أصحاب المشاريع لفهم قرارات التسويق والنمو بشكل أوضح."
          articles={mostViewedArticles}
          alternate
        />

        <section className={styles.relationship} id={articlesPageSource.relationship.id}>
          <div className={styles.relationshipInner}>
            <div>
              <h2>{articlesPageSource.relationship.title}</h2>
              <p>{articlesPageSource.relationship.summary}</p>
            </div>
            <ButtonLink href={articlesPageSource.relationship.action.href} size="compact" variant="secondary">
              {articlesPageSource.relationship.action.label}
            </ButtonLink>
          </div>
        </section>

        <section className={styles.finalCta} id={articlesPageSource.finalCta.id}>
          <div className={styles.ctaInner}>
            <div>
              <h2>{articlesPageSource.finalCta.title}</h2>
              <p>{articlesPageSource.finalCta.summary}</p>
            </div>
            <div className={styles.actions}>
              {articlesPageSource.finalCta.actions.map((action) => (
                <ButtonLink href={action.href} key={action.href} variant={action.variant}>
                  {action.label}
                </ButtonLink>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PublicPageShell>
  );
}

function ArticleCarouselSection({
  id,
  title,
  summary,
  articles,
  alternate = false,
}: {
  id: string;
  title: string;
  summary: string;
  articles: readonly KnowledgeArticle[];
  alternate?: boolean;
}) {
  const loopSetCount = articles.length > 1 && articles.length <= 3 ? 3 : articles.length > 1 ? 2 : 1;
  const loopArticles = Array.from({ length: loopSetCount }, () => articles).flat();
  const trackId = `${id}-carousel-track`;

  return (
    <section
      className={`${styles.articleCarouselSection} ${alternate ? styles.articleCarouselAlternate : ""}`}
      data-items={articles.length}
      data-sets={loopSetCount}
      id={id}
    >
      <div className={styles.carouselInner}>
        <header className={styles.carouselHeader}>
          <h2>{title}</h2>
          <p>{summary}</p>
        </header>
        <div className={styles.carouselStage}>
          <div className={styles.carouselViewport}>
            <div className={styles.carouselTrack} id={trackId}>
              {loopArticles.map((article, index) => (
                <CarouselArticleCard article={article} duplicate={index >= articles.length} key={`${article.slug}-${index}`} />
              ))}
            </div>
          </div>
          <ArticleCarouselControls itemCount={articles.length} trackId={trackId} />
        </div>
      </div>
    </section>
  );
}

function CarouselArticleCard({ article, duplicate }: { article: KnowledgeArticle; duplicate: boolean }) {
  return (
    <article aria-hidden={duplicate || undefined} className={styles.carouselCard}>
      <div className={styles.carouselCardMedia}>
        {article.seo.image ? (
          <Image
            alt={duplicate ? "" : article.title}
            fill
            sizes="(min-width: 64rem) 29vw, 82vw"
            src={article.seo.image}
          />
        ) : null}
      </div>
      <div className={styles.carouselCardCopy}>
        <span className={styles.carouselCardCategory}>{article.category}</span>
        <h3>{article.title}</h3>
        <p>{article.summary}</p>
        <div className={styles.carouselCardMeta}>
          <span>{formatDate(article.publishedAt)}</span>
          <span>{article.readingTime}</span>
        </div>
        <ButtonLink
          className={styles.articleCardAction}
          href={`/articles/${article.slug}`}
          size="compact"
          tabIndex={duplicate ? -1 : undefined}
        >
          اقرأ المقالة
        </ButtonLink>
      </div>
    </article>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ar-EG", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${value}T00:00:00Z`),
  );
}
