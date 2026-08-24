"use client";

import EmblaCarousel from "embla-carousel";
import AutoScroll, { type AutoScrollType } from "embla-carousel-auto-scroll";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { BrandActionButtonContent, getBrandActionButtonClassName } from "@/components/ui/brand-action-button";
import { homepageContent } from "@/content/homepage";
import styles from "./home-faq-blog-section.module.css";

export function HomeFaqBlogSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const articlesViewportRef = useRef<HTMLDivElement>(null);
  const articlesStageRef = useRef<HTMLDivElement>(null);
  const articlesEmblaRef = useRef<ReturnType<typeof EmblaCarousel> | null>(null);
  const articlesAutoScrollRef = useRef<AutoScrollType | null>(null);
  const articlesMouseInsideRef = useRef(false);
  const articlesFocusInsideRef = useRef(false);

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

  useEffect(() => {
    const viewport = articlesViewportRef.current;
    if (!viewport || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const autoScroll = AutoScroll({
      direction: "forward",
      playOnInit: true,
      speed: 0.62,
      startDelay: 800,
      stopOnFocusIn: false,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    });
    const embla = EmblaCarousel(
      viewport,
      { align: "start", direction: "rtl", dragFree: true, loop: true },
      [autoScroll],
    );

    articlesEmblaRef.current = embla;
    articlesAutoScrollRef.current = autoScroll;
    autoScroll.play(0);

    return () => {
      articlesEmblaRef.current = null;
      articlesAutoScrollRef.current = null;
      embla.destroy();
    };
  }, []);

  const stopArticles = () => articlesAutoScrollRef.current?.stop();

  const resumeArticles = () => {
    if (articlesMouseInsideRef.current || articlesFocusInsideRef.current) return;
    articlesAutoScrollRef.current?.play(0);
  };

  const moveArticles = (direction: "previous" | "next") => {
    const embla = articlesEmblaRef.current;
    if (!embla) return;
    stopArticles();
    if (direction === "previous") embla.scrollPrev();
    else embla.scrollNext();
    if (!articlesMouseInsideRef.current && !articlesFocusInsideRef.current) {
      articlesAutoScrollRef.current?.play(800);
    }
  };

  return (
    <>
      <section className={styles.blogSection} id="blog" aria-labelledby="home-blog-title">
        <div className={styles.container}>
          <div className={styles.blogHeading}>
            <div>
              <p className={styles.eyebrow}>من دفتر البوصلة</p>
              <h2 id="home-blog-title">مقالات بتفيدك فعلًا</h2>
              <p>خلاصة خبرتنا في السوق — مكتوبة ببساطة عشان تاخد منها قرار، مش معلومة وخلاص.</p>
            </div>
          </div>

          <div
            ref={articlesStageRef}
            className={styles.articlesStage}
            onMouseEnter={() => {
              articlesMouseInsideRef.current = true;
              stopArticles();
            }}
            onMouseLeave={() => {
              articlesMouseInsideRef.current = false;
              resumeArticles();
            }}
            onFocusCapture={() => {
              articlesFocusInsideRef.current = true;
              stopArticles();
            }}
            onBlurCapture={(event) => {
              if (articlesStageRef.current?.contains(event.relatedTarget as Node | null)) return;
              articlesFocusInsideRef.current = false;
              resumeArticles();
            }}
          >
            <div
              ref={articlesViewportRef}
              className={styles.articlesViewport}
              data-testid="home-articles-viewport"
              role="region"
              aria-roledescription="carousel"
              aria-label="مقالات SWEED المختارة"
              aria-live="off"
              onPointerUp={resumeArticles}
            >
              <div className={styles.articlesGrid}>
                {homepageContent.articles.map((article, index) => (
                  <article
                    className={styles.articleCard}
                    data-card-tone={index + 1}
                    data-testid="home-latest-article"
                    key={article.title}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} من ${homepageContent.articles.length}: ${article.title}`}
                  >
                    <Link className={styles.articleMedia} href={article.href ?? "/articles"}>
                      <Image
                        src={article.image ?? "/images/hero/custom-image.png"}
                        alt={`صورة مقال ${article.title}`}
                        fill
                        loading="lazy"
                        sizes="(max-width: 760px) 94vw, 31vw"
                      />
                      <span>{article.category}</span>
                    </Link>
                    <div className={styles.articleBody}>
                      <div className={styles.articleMeta}>
                        <span>{article.meta}</span>
                        <span>دليل عملي</span>
                      </div>
                      <h3>
                        <Link href={article.href ?? "/articles"}>{article.title}</Link>
                      </h3>
                      <p>{article.summary}</p>
                      <Link className={styles.readMore} href={article.href ?? "/articles"}>
                        اقرأ المقال
                        <i className="fas fa-arrow-left" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <button
              type="button"
              className={`${styles.articlesNavButton} ${styles.articlesPrevious}`}
              aria-label="المقال السابق"
              onClick={() => moveArticles("previous")}
            >
              <i className="fas fa-arrow-right" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`${styles.articlesNavButton} ${styles.articlesNext}`}
              aria-label="المقال التالي"
              onClick={() => moveArticles("next")}
            >
              <i className="fas fa-arrow-left" aria-hidden="true" />
            </button>
          </div>

          <div className={styles.articlesActions}>
            <Link className={getBrandActionButtonClassName({ size: "compact" })} href="/articles">
              <BrandActionButtonContent>كل المقالات</BrandActionButtonContent>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.faqSection} id="faq" aria-labelledby="home-faq-title">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
        />

        <div className={styles.container}>
          <div className={styles.faqLayout}>
            <div className={styles.faqHeading}>
              <p className={styles.eyebrow}>الأسئلة الشائعة</p>
              <h2 id="home-faq-title">أسئلة بنسمعها كتير... وإجاباتنا واضحة</h2>
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
    </>
  );
}
