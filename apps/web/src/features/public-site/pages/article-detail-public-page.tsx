import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import type { Article } from "@/content/types";
import { articlesPageSource } from "@/content/public-site/articles-page";
import { createArticleJsonLd, getArticleDetailModel } from "./article-detail-model";
import { PublicPageShell } from "./public-page-shell";
import styles from "./article-detail-public-page.module.css";

const dateFormatter = new Intl.DateTimeFormat("ar-EG", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function ArticleDetailPublicPage({ article, allArticles }: { article: Article; allArticles: readonly Article[] }) {
  const model = getArticleDetailModel(article, allArticles);
  const schema = createArticleJsonLd(article);
  const sectionIds = [...article.body.map((section) => section.id), "related-service", "related-articles", "article-cta"];

  return (
    <PublicPageShell page="article-detail" sectionIds={sectionIds}>
      <main className={styles.page}>
        {schema ? (
          <script
            type="application/ld+json"
            data-article-schema
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ) : null}

        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumb} aria-label="مسار المقال">
              <Link href="/articles">المقالات</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{article.category}</span>
            </nav>

            <div className={styles.heroCopy}>
              <p className={styles.category}>{article.category}</p>
              <h1>{article.title}</h1>
              <p className={styles.summary}>{article.summary}</p>
              <div className={styles.meta}>
                <time dateTime={article.publishedAt}>{dateFormatter.format(new Date(`${article.publishedAt}T00:00:00Z`))}</time>
                <span>{article.readingTime}</span>
                {article.author?.name ? <span>{article.author.name}</span> : null}
              </div>
            </div>

            {article.seo.image ? (
              <figure className={styles.heroMedia}>
                <Image src={article.seo.image} alt={article.title} fill priority sizes="(min-width: 64rem) 42vw, 100vw" />
              </figure>
            ) : null}
          </div>
        </header>

        <section className={styles.readingSection}>
          <div className={styles.readingLayout}>
            <article className={styles.articleBody} data-testid="article-body">
              {article.body.map((section) => (
                <section id={section.id} key={section.id}>
                  <h2>{section.title}</h2>
                  <p>{section.summary}</p>
                  {section.items?.length ? (
                    <ul>
                      {section.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  ) : null}
                </section>
              ))}
            </article>

            <aside className={styles.aside} id="related-service">
              <div className={styles.shareBlock}>
                <p>شارك المقال</p>
                <div className={styles.shareLinks}>
                  <a href={model.shareLinks.whatsapp} target="_blank" rel="noreferrer">شارك عبر واتساب</a>
                  <a href={model.shareLinks.linkedin} target="_blank" rel="noreferrer">شارك على LinkedIn</a>
                </div>
              </div>

              <div className={styles.serviceBlock}>
                <p>لو محتاج تطبق الفكرة</p>
                <h2>{model.relatedService.title}</h2>
                <span>{model.relatedService.summary}</span>
                <ButtonLink href={model.relatedService.href} size="compact">
                  اعرف خدمة {model.relatedService.title}
                </ButtonLink>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.relatedSection} id="related-articles">
          <div className={styles.relatedInner}>
            <header>
              <h2>كمّل من نفس النقطة</h2>
              <p>مقالات منشورة من نفس المكتبة، مرتبة حسب قربها من موضوعك وحداثتها.</p>
            </header>
            <div className={styles.relatedGrid}>
              {model.relatedArticles.map((related) => (
                <article key={related.slug}>
                  <span>{related.category}</span>
                  <h3><Link href={`/articles/${related.slug}`}>{related.title}</Link></h3>
                  <p>{related.summary}</p>
                  <small>{related.readingTime}</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta} id="article-cta">
          <div className={styles.ctaInner}>
            <div>
              <h2>{articlesPageSource.finalCta.title}</h2>
              <p>{articlesPageSource.finalCta.summary}</p>
            </div>
            <div className={styles.ctaActions}>
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
