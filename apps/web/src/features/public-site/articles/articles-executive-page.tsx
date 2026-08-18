import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { articlesPageSource, getKnowledgeArticles, type KnowledgeArticle } from "@/content/public-site/articles-page";
import { getArticlesPageModel } from "@/features/public-site";
import { PublicPageShell } from "@/features/public-site/pages/public-page-shell";
import { PublicPageHero } from "@/features/public-site/shared/public-page-hero";
import { ArticleBrowser } from "./article-browser";
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

  return (
    <PublicPageShell page="articles" sectionIds={sectionIds}>
      <main className={styles.page}>
        <PublicPageHero
          eyebrow={articlesPageSource.hero.eyebrow}
          title={articlesPageSource.hero.title}
          summary={articlesPageSource.hero.summary}
          tone="dark"
        />

        <ArticleBrowser articles={articles} />

        <section className={styles.pathsSection} id={articlesPageSource.problemPaths.id}>
          <div className={styles.container}>
            <SectionIntro
              title={articlesPageSource.problemPaths.title}
              summary="اختار المشكلة الأقرب، وهتلاقي المقالات المنشورة فعليًا اللي تساعدك تبدأ من القرار مش اسم الخدمة."
            />
            <div className={styles.problemPaths}>
              {articlesPageSource.problemPaths.groups.map((group) => (
                <article key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.slugs.flatMap((slug) => {
                      const article = bySlug.get(slug);
                      return article ? [<ArticleTextLink article={article} key={slug} />] : [];
                    })}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.lessonsSection} id={articlesPageSource.fieldLessons.id}>
          <div className={styles.container}>
            <SectionIntro title={articlesPageSource.fieldLessons.title} summary={articlesPageSource.fieldLessons.summary} />
            <div className={styles.lessons}>
              {articlesPageSource.fieldLessons.slugs.flatMap((slug) => {
                const article = bySlug.get(slug);
                return article ? [<LessonArticle article={article} key={slug} />] : [];
              })}
            </div>
            <p className={styles.publishingRule}>{articlesPageSource.fieldLessons.publishingRule}</p>
          </div>
        </section>

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

function SectionIntro({ title, summary }: { title: string; summary: string }) {
  return (
    <header className={styles.sectionIntro}>
      <h2>{title}</h2>
      <p>{summary}</p>
    </header>
  );
}

function ArticleTextLink({ article }: { article: KnowledgeArticle }) {
  return (
    <li>
      <Link href={`/articles/${article.slug}`}>
        <span>{article.title}</span>
        <small>{article.readingTime}</small>
      </Link>
    </li>
  );
}

function LessonArticle({ article }: { article: KnowledgeArticle }) {
  return (
    <article>
      <span>{article.contentType === "guide" ? "دليل عملي" : "مقال"}</span>
      <h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3>
      <p>{article.summary}</p>
      <small>{article.readingTime}</small>
    </article>
  );
}
