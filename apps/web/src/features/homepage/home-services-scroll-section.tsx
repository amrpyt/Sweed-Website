"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { TextSignalReveal } from "@/components/motion";
import { BrandActionButtonContent, getBrandActionButtonClassName } from "@/components/ui";
import { homepageContent } from "@/content/homepage";
import { HomeButton } from "./home-hero-ui";
import styles from "./home-public-page.module.css";

export function HomeServicesScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLAnchorElement[]>([]);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const story = storyRef.current;
      const items = itemRefs.current.filter(Boolean);
      if (!story || items.length === 0) return;

      gsap.set(items, {
        autoAlpha: 1,
        scale: 1,
        yPercent: (index) => (index === 0 ? 0 : 112),
        zIndex: (index) => index + 1,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: story,
          start: "top top",
          end: () => `+=${(items.length - 1) * window.innerHeight * 0.48 + window.innerHeight * 0.18}`,
          pin: story,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      items.forEach((item, index) => {
        if (index === 0) return;

        const step = index - 1;

        timeline
          .to(items[index - 1], { scale: 0.965, autoAlpha: 0.72, duration: 0.55, ease: "none" }, step)
          .to(item, { yPercent: 0, duration: 0.72, ease: "none" }, step);
      });

      timeline.to(items[items.length - 1], { duration: 0.35, ease: "none" });
      ScrollTrigger.refresh();

      return () => {
        timeline.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.servicesSection} id="services">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <TextSignalReveal as="h2">خدماتنا المتكاملة</TextSignalReveal>
          <p>كل خدمة لها هدف واضح: بناء ثقة، زيادة طلب، أو تحسين تجربة العميل.</p>
        </div>
        <div
          ref={storyRef}
          className={styles.servicesStory}
          data-testid="home-services-story"
        >
          <div className={styles.servicesList} data-testid="home-services-list">
            <div className={styles.servicesListTitle}>
              <TextSignalReveal as="h3">خدماتنا المتكاملة</TextSignalReveal>
            </div>
            {homepageContent.services.map((card, index) => (
              <Link
                className={styles.servicePanel}
                data-testid="home-service-panel"
                data-service-index={index + 1}
                href={card.href ?? "/services"}
                key={card.title}
                ref={(node) => {
                  if (node) itemRefs.current[index] = node;
                }}
              >
                <span
                  className={styles.servicePanelProgress}
                  aria-hidden="true"
                />
                <span className={styles.servicePanelMedia}>
                  <Image
                    alt={`صورة توضيحية لخدمة ${card.title}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 82vw, 42vw"
                    src={card.image ?? "/images/hero/custom-image.png"}
                  />
                </span>
                <span
                  className={styles.servicePanelNumber}
                >
                  {index + 1}
                </span>
                <span className={styles.servicePanelBody}>
                  <span className={styles.servicePanelIcon}>
                    <i aria-hidden="true" className={`fas ${card.icon}`} />
                  </span>
                  <strong>{card.title}</strong>
                  <span>{card.summary}</span>
                  <em>اكتشف الخدمة</em>
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.servicesCta}>
          <HomeButton className={getBrandActionButtonClassName({ variant: "primary" })} href="/services">
            <BrandActionButtonContent>كل الخدمات</BrandActionButtonContent>
          </HomeButton>
        </div>
      </div>
    </section>
  );
}
