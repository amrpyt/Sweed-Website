import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import type { Article } from "@/content/types";
import { articlesPageSource } from "@/content/public-site/articles-page";
import { createArticleJsonLd, getArticleDetailModel } from "./article-detail-model";
import { ArticleReadingProgress } from "./article-reading-progress";
import { PublicPageShell } from "./public-page-shell";
import styles from "./article-detail-public-page.module.css";

const dateFormatter = new Intl.DateTimeFormat("ar-EG", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const articleImageNames: Readonly<Record<string, string>> = {
  "project-needs-direction": "direction",
  "ads-without-return": "ads",
  "five-brand-decisions": "brand",
  "how-to-choose-marketing-package": "package",
  "why-ai-demo-helps-sales": "ai",
  "marketing-metrics-that-matter": "metrics",
};

const mixedImageNames: Readonly<Record<string, string>> = {
  "project-needs-direction": "strategy",
  "ads-without-return": "ads",
  "five-brand-decisions": "brand",
  "how-to-choose-marketing-package": "package",
  "why-ai-demo-helps-sales": "ai",
  "marketing-metrics-that-matter": "budget",
};

function getArticleVisual(article: Article, collection: "browser" | "latest" | "mixed") {
  const name = collection === "mixed" ? mixedImageNames[article.slug] : articleImageNames[article.slug];
  if (!name) return article.seo.image;
  const filename = collection === "mixed" ? `mixed-${name}` : name;
  return `/images/articles/${collection}/${filename}.webp`;
}

function getAuthorInitial(article: Article) {
  return (article.author?.name ?? "سويد").trim().slice(0, 1);
}

export function ArticleDetailPublicPage({ article, allArticles }: { article: Article; allArticles: readonly Article[] }) {
  const model = getArticleDetailModel(article, allArticles);
  const schema = createArticleJsonLd(article);
  const sectionIds = [...article.body.map((section) => section.id), "related-service", "related-articles", "most-viewed", "article-cta"];
  const authorName = article.author?.name ?? "فريق سويد";
  const authorRole = article.author?.role ?? "من دفتر البوصلة";
  const hasInlineVisual = article.body.length > 1;

  return (
    <PublicPageShell page="article-detail" sectionIds={sectionIds} showBreadcrumb={false}>
      <main className={styles.page}>
        <ArticleReadingProgress />
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
              <Link href="/">الرئيسية</Link>
              <span aria-hidden="true">/</span>
              <Link href="/articles">المقالات</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{article.category}</span>
            </nav>

            <div className={styles.heroCopy}>
              <p className={styles.category}>{article.category}</p>
              <h1>{article.title}</h1>
              <span className={styles.titleRule} aria-hidden="true" />
              <p className={styles.summary}>{article.summary}</p>

              <div className={styles.articleMeta}>
                <div className={styles.authorInfo}>
                  {article.author?.avatar?.src ? (
                    <Image className={styles.authorAvatarImage} src={article.author.avatar.src} alt={article.author.avatar.alt} width={46} height={46} />
                  ) : (
                    <span className={styles.authorAvatar} aria-hidden="true">{getAuthorInitial(article)}</span>
                  )}
                  <span>
                    <strong>{authorName}</strong>
                    <small>{authorRole}</small>
                  </span>
                </div>
                <div className={styles.meta}>
                  <time dateTime={article.publishedAt}>{dateFormatter.format(new Date(`${article.publishedAt}T00:00:00Z`))}</time>
                  <span>{article.readingTime} قراءة</span>
                </div>
              </div>
            </div>

            {getArticleVisual(article, "latest") ? (
              <figure className={styles.heroMedia}>
                <Image src={getArticleVisual(article, "latest")!} alt={article.title} fill priority sizes="(min-width: 64rem) 46vw, 100vw" />
                <figcaption>من دفتر البوصلة</figcaption>
              </figure>
            ) : null}
          </div>
        </header>

        <section className={styles.readingSection} aria-label="محتوى المقال">
          <div className={styles.readingLayout}>
            <article className={styles.articleBody} data-testid="article-body">
              <div className={styles.articleIntro}>
                <span>فكرة المقال</span>
                <p>{article.seo.description}</p>
              </div>

              {article.body.map((section, index) => (
                <section id={section.id} key={section.id} className={styles.bodySection}>
                  <div className={styles.sectionHeading}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <h2>{section.title}</h2>
                  </div>
                  <p>{section.summary}</p>
                  {section.items?.length ? (
                    <ul>
                      {section.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  ) : null}

                  {(hasInlineVisual && index === Math.floor((article.body.length - 1) / 2)) || (!hasInlineVisual && index === 0) ? (
                    <figure className={styles.inlineVisual}>
                      <Image src={getArticleVisual(article, "mixed") ?? article.seo.image ?? ""} alt="" fill sizes="(min-width: 64rem) 62rem, 100vw" />
                      <figcaption>لما الصورة تبقى أوضح، القرار بيبقى أسهل.</figcaption>
                    </figure>
                  ) : null}
                </section>
              ))}

              <div className={styles.articleTakeaway}>
                <span>الخلاصة</span>
                <p>{article.summary}</p>
              </div>

              <div className={styles.articleFooterMeta}>
                <div>
                  <span>{article.category}</span>
                  {(article.tags ?? ["قرارات عملية", "من دفتر البوصلة"]).map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className={styles.authorBio}>
                  {article.author?.avatar?.src ? (
                    <Image className={styles.authorAvatarImage} src={article.author.avatar.src} alt={article.author.avatar.alt} width={58} height={58} />
                  ) : (
                    <span className={styles.authorAvatar} aria-hidden="true">{getAuthorInitial(article)}</span>
                  )}
                  <div>
                    <strong>{authorName}</strong>
                    <small>{authorRole}</small>
                    <p>{article.author?.bio ?? "نحوّل الخبرة والمواقف العملية إلى محتوى يساعد صاحب المشروع يفهم الصورة ويأخذ قرارًا أوضح."}</p>
                  </div>
                </div>
              </div>
            </article>

            <aside className={styles.aside} id="related-service">
              <div className={styles.tocBlock}>
                <p>داخل المقال</p>
                <ol>
                  {article.body.map((section, index) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              <div className={styles.shareBlock}>
                <p>شارك المقال</p>
                <div className={styles.shareLinks}>
                  <a href={model.shareLinks.whatsapp} target="_blank" rel="noreferrer">واتساب</a>
                  <a href={model.shareLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                </div>
              </div>

              <div className={styles.serviceBlock}>
                <p>لو محتاج تطبق الفكرة</p>
                <h2>{model.relatedService.title}</h2>
                <span>{model.relatedService.summary}</span>
                <ButtonLink href={model.relatedService.href} size="compact">
                  اعرف تفاصيل الخدمة
                </ButtonLink>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.relatedSection} id="related-articles">
          <div className={styles.relatedInner}>
            <header className={styles.recommendationHeader}>
              <p className={styles.sectionEyebrow}>كمّل القراءة</p>
              <h2>مقالات ذات صلة</h2>
              <span className={styles.titleRule} aria-hidden="true" />
              <p>مقالات تكمّل الفكرة وتفتح لك زاوية جديدة قبل ما تاخد قرارك.</p>
            </header>
            <div className={styles.relatedGrid}>
              {model.relatedArticles.map((related) => (
                <article key={related.slug}>
                  {getArticleVisual(related, "browser") ? (
                    <Link className={styles.relatedImage} href={`/articles/${related.slug}`} aria-label={related.title}>
                      <Image src={getArticleVisual(related, "browser")!} alt="" fill sizes="(min-width: 64rem) 27rem, 100vw" />
                    </Link>
                  ) : (
                    <div className={styles.relatedImage} aria-hidden="true" />
                  )}
                  <div className={styles.relatedCopy}>
                    <span>{related.category}</span>
                    <h3><Link href={`/articles/${related.slug}`}>{related.title}</Link></h3>
                    <p>{related.summary}</p>
                    <small>{related.readingTime} قراءة</small>
                    <ButtonLink className={styles.cardAction} href={`/articles/${related.slug}`} size="compact">اقرأ المقال</ButtonLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.relatedSection} ${styles.mostViewedSection}`} id="most-viewed">
          <div className={styles.relatedInner}>
            <header className={styles.recommendationHeader}>
              <p className={styles.sectionEyebrow}>اختيارات القرّاء</p>
              <h2>أكثر المقالات مشاهدة</h2>
              <span className={styles.titleRule} aria-hidden="true" />
              <p>موضوعات عملية بيرجع لها أصحاب المشاريع لأنها تختصر الطريق وتوضح القرار.</p>
            </header>
            <div className={styles.relatedGrid}>
              {model.mostViewedArticles.map((popular) => (
                <article key={popular.slug}>
                  <Link className={styles.relatedImage} href={`/articles/${popular.slug}`} aria-label={popular.title}>
                    <Image src={getArticleVisual(popular, "latest") ?? popular.seo.image ?? ""} alt="" fill sizes="(min-width: 64rem) 27rem, 100vw" />
                  </Link>
                  <div className={styles.relatedCopy}>
                    <span>{popular.category}</span>
                    <h3><Link href={`/articles/${popular.slug}`}>{popular.title}</Link></h3>
                    <p>{popular.summary}</p>
                    <small>{popular.readingTime} قراءة</small>
                    <ButtonLink className={styles.cardAction} href={`/articles/${popular.slug}`} size="compact">اقرأ المقال</ButtonLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta} id="article-cta">
          <div className={styles.ctaInner}>
            <div>
              <p className={styles.sectionEyebrow}>خطوتك التالية</p>
              <h2>{articlesPageSource.finalCta.title}</h2>
              <span className={styles.titleRule} aria-hidden="true" />
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
