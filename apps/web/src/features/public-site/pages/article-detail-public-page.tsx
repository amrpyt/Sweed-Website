import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/content/types";
import { PublicPageShell } from "./public-page-shell";
import styles from "./content-detail-public-page.module.css";

const dateFormatter = new Intl.DateTimeFormat("ar-EG", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function ArticleDetailPublicPage({ article }: { article: Article }) {
  return (
    <PublicPageShell page="article-detail">
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div>
              <p className={styles.eyebrow}>{article.category}</p>
              <h1>{article.title}</h1>
              <p className={styles.summary}>{article.summary}</p>
              <div className={styles.meta}>
                <span>{dateFormatter.format(new Date(`${article.publishedAt}T00:00:00Z`))}</span>
                <span>{article.readingTime}</span>
              </div>
            </div>

            <figure className={styles.media}>
              <Image
                src={article.seo.image ?? "/images/hero/custom-image.png"}
                alt={`صورة مقال ${article.title}`}
                fill
                priority
                sizes="(max-width: 860px) 94vw, 42vw"
              />
            </figure>
          </div>
        </header>

        <section className={styles.content}>
          <div className={`${styles.container} ${styles.contentGrid}`}>
            <aside className={styles.aside}>
              <h2>خد القرار من المعلومة</h2>
              <p>المقال معمول عشان يساعدك تحدد خطوة عملية، مش تجمع معلومات وخلاص.</p>
              <Link href="/#contact">
                احجز استشارتك المجانية
                <i className="fas fa-arrow-left" aria-hidden="true" />
              </Link>
            </aside>

            <div className={styles.sections}>
              {article.body.map((section) => (
                <article id={section.id} key={section.id}>
                  <h2>{section.title}</h2>
                  <p>{section.summary}</p>
                  {section.items?.length ? (
                    <ul className={styles.list}>
                      {section.items.map((item) => (
                        <li key={item}>
                          <i className="fas fa-check" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PublicPageShell>
  );
}
