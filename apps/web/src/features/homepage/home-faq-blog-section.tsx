"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { homepageContent } from "@/content/homepage";
import { articles } from "@/content/local-data";
import styles from "./home-faq-blog-section.module.css";

const dateFormatter = new Intl.DateTimeFormat("ar-EG", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function HomeFaqBlogSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const latestArticles = useMemo(
    () =>
      [...articles]
        .sort((first, second) => {
          const dateDifference = Date.parse(second.publishedAt) - Date.parse(first.publishedAt);
          return dateDifference || second.order - first.order;
        })
        .slice(0, 3),
    [],
  );

  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: homepageContent.faq.map((item) => ({
        "@type": "Question",
        name: item.title,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.summary,
        },
      })),
    }),
    [],
  );

  return (
    <>
      <section className={styles.faqSection} id="faq" aria-labelledby="home-faq-title">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
        />

        <div className={styles.container}>
          <div className={styles.faqLayout}>
            <div className={styles.faqHeading}>
              <p className={styles.eyebrow}>الأسئلة الشائعة</p>
              <h2 id="home-faq-title">إجابات واضحة قبل ما تاخد قرار التواصل.</h2>
              <p>فتح سؤال جديد يقفل السؤال السابق تلقائيًا، عشان المحتوى يفضل سريع وسهل القراءة.</p>
              <Link href="/faq">شاهد كل الأسئلة</Link>
            </div>

            <div className={styles.accordion}>
              {homepageContent.faq.map((item, index) => {
                const isOpen = openFaqIndex === index;
                const panelId = `home-faq-panel-${index}`;
                const triggerId = `home-faq-trigger-${index}`;

                return (
                  <div className={styles.faqItem} data-open={isOpen ? "true" : "false"} key={item.title}>
                    <h3>
                      <button
                        id={triggerId}
                        type="button"
                        aria-controls={panelId}
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      >
                        <span>{item.title}</span>
                        <i className="fas fa-plus" aria-hidden="true" />
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      className={styles.faqPanel}
                      role="region"
                      aria-labelledby={triggerId}
                      hidden={!isOpen}
                    >
                      <p>{item.summary}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.blogSection} id="blog" aria-labelledby="home-blog-title">
        <div className={styles.container}>
          <div className={styles.blogHeading}>
            <div>
              <p className={styles.eyebrow}>المقالات</p>
              <h2 id="home-blog-title">أحدث أفكارنا عن التسويق والنمو والتجارب الرقمية.</h2>
            </div>
            <Link href="/articles">
              كل المقالات
              <i className="fas fa-arrow-left" aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.articlesGrid}>
            {latestArticles.map((article, index) => (
              <Reveal className={styles.articleReveal} delay={index * 70} key={article.slug} variant="soft">
                <article className={styles.articleCard} data-testid="home-latest-article">
                  <Link className={styles.articleMedia} href={`/articles/${article.slug}`}>
                    <Image
                      src={article.seo.image ?? "/images/hero/custom-image.png"}
                      alt={`صورة مقال ${article.title}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 760px) 94vw, 31vw"
                    />
                    <span>{article.category}</span>
                  </Link>
                  <div className={styles.articleBody}>
                    <div className={styles.articleMeta}>
                      <time dateTime={article.publishedAt}>{dateFormatter.format(new Date(`${article.publishedAt}T00:00:00Z`))}</time>
                      <span>{article.readingTime}</span>
                    </div>
                    <h3>
                      <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <p>{article.summary}</p>
                    <Link className={styles.readMore} href={`/articles/${article.slug}`}>
                      اقرأ المقال
                      <i className="fas fa-arrow-left" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
