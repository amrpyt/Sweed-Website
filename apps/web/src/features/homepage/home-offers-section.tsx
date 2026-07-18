"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { homepageContent } from "@/content/homepage";
import { useHomeConversion } from "./home-conversion-context";
import styles from "./home-offers-section.module.css";

export function HomeOffersSection() {
  const { selection, selectAndFocusContact } = useHomeConversion();

  return (
    <section className={styles.section} id="offers" aria-labelledby="home-offers-title">
      <div className={styles.container}>
        <div className={styles.headingLayout}>
          <div>
            <p className={styles.eyebrow}>العروض والباقات</p>
            <h2 id="home-offers-title">اختار نقطة البداية المناسبة لمرحلة مشروعك.</h2>
          </div>
          <p>
            تفاصيل الأسعار والمحتوى النهائي تُعتمد قبل الإطلاق. الهيكل الحالي يوضح الفرق بين كل باقة وما الذي يحصل عليه العميل.
          </p>
        </div>

        <div className={styles.offersGrid}>
          {homepageContent.offers.map((offer, index) => {
            const isSelected = selection.offer === offer.title;

            return (
              <Reveal className={styles.offerReveal} delay={index * 80} key={offer.title} variant="soft">
                <article
                  className={styles.offerCard}
                  data-featured={offer.featured ? "true" : "false"}
                  data-selected={isSelected ? "true" : "false"}
                  data-testid="home-offer-card"
                >
                  {offer.featured ? <span className={styles.featuredBadge}>الأكثر طلبًا</span> : null}

                  <div className={styles.offerHeader}>
                    <span className={styles.offerIcon} aria-hidden="true">
                      <i className={`fas ${offer.icon}`} />
                    </span>
                    <div>
                      <p>{offer.meta}</p>
                      <h3>{offer.title}</h3>
                    </div>
                  </div>

                  <p className={styles.summary}>{offer.summary}</p>

                  <ul className={styles.items}>
                    {offer.items?.map((item) => (
                      <li key={item}>
                        <i className="fas fa-check" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={styles.offerAction}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      selectAndFocusContact({ offer: offer.title, source: "offers" });
                    }}
                  >
                    {offer.ctaLabel ?? "اطلب الباقة"}
                    <i className="fas fa-arrow-left" aria-hidden="true" />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className={styles.allOffersLink}>
          <Link href="/offers">قارن كل تفاصيل العروض</Link>
        </div>
      </div>
    </section>
  );
}
