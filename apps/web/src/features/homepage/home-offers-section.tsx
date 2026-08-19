"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { BrandActionButtonContent, getBrandActionButtonClassName } from "@/components/ui/brand-action-button";
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
            <h2 id="home-offers-title">باقات على مقاس مرحلة مشروعك</h2>
          </div>
          <p>{homepageContent.offersIntro}</p>
        </div>

        <div className={styles.offersGrid}>
          {homepageContent.offers.map((offer, index) => {
            const isSelected = selection.offer === offer.title;

            return (
              <Reveal className={styles.offerReveal} delay={index * 100} key={offer.title} once variant="soft">
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
                      <h3>{offer.title}</h3>
                      <p>{offer.meta}</p>
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
                    className={getBrandActionButtonClassName({ className: styles.offerAction, size: "compact" })}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      selectAndFocusContact({ offer: offer.title, source: "offers" });
                    }}
                  >
                    <BrandActionButtonContent>{offer.ctaLabel ?? "اطلب الباقة"}</BrandActionButtonContent>
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className={styles.allOffersLink}>
          <p>{homepageContent.offersTail}</p>
        </div>

        <div className={styles.bottomActions}>
          <Link
            className={getBrandActionButtonClassName({
              className: styles.allOffersPageLink,
              size: "compact",
              variant: "secondary",
            })}
            href="/offers"
          >
            <BrandActionButtonContent>شاهد كل العروض</BrandActionButtonContent>
          </Link>

          <Link
            className={getBrandActionButtonClassName({
              className: styles.customPackageLink,
              size: "compact",
            })}
            href="/contact?source=home-offers&package=%D8%A8%D8%A7%D9%82%D8%A9%20%D8%B9%D9%84%D9%89%20%D9%85%D9%82%D8%A7%D8%B3%D9%83"
          >
            <BrandActionButtonContent>باقة على مقاسك</BrandActionButtonContent>
          </Link>
        </div>
      </div>
    </section>
  );
}
