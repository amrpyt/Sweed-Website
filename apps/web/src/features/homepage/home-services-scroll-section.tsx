"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { TextSignalReveal } from "@/components/motion";
import { homepageContent } from "@/content/homepage";
import { HomeButton } from "./home-hero-ui";
import styles from "./home-public-page.module.css";

const serviceImages = [
  "/images/hero/two-men-consultation.jpg",
  "/images/hero/entrepreneur-laptop-office.jpg",
  "/images/hero/businessman-laptop-standing.jpg",
  "/images/hero/sweed-building.png",
  "/images/hero/two-men-consultation.jpg",
  "/images/hero/entrepreneur-laptop-office.jpg",
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className={styles.directionalIcon}
      fill="none"
      height="20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
      width="20"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export function HomeServicesScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const itemRefs = useRef<HTMLAnchorElement[]>([]);
  const numberRefs = useRef<HTMLSpanElement[]>([]);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const section = sectionRef.current;
      const visual = visualRef.current;
      const items = itemRefs.current.filter(Boolean);
      const images = imageRefs.current.filter(Boolean);
      const numbers = numberRefs.current.filter(Boolean);
      if (!section || !visual || items.length === 0) return;

      gsap.set(items, { opacity: 0.16 });
      gsap.set(numbers, { opacity: 0 });
      gsap.set(images, { autoAlpha: 0, scale: 0.985 });
      gsap.set(items[0], { opacity: 1 });
      gsap.set(numbers[0], { opacity: 1 });
      gsap.set(images[0], { autoAlpha: 1, scale: 1 });

      const tweens = items.flatMap((item, index) => [
        gsap.fromTo(item, { opacity: 0.16 }, {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: item,
            start: "top 55%",
            end: "bottom 55%",
            toggleActions: "play reverse play reverse",
          },
        }),
        gsap.fromTo(numbers[index], { opacity: 0 }, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.in",
          scrollTrigger: {
            trigger: item,
            start: "top 55%",
            end: "bottom 55%",
            toggleActions: "play reverse play reverse",
          },
        }),
        gsap.fromTo(images[index], { autoAlpha: 0, scale: 0.985 }, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          scrollTrigger: {
            trigger: item,
            start: "top 55%",
            end: "bottom 55%",
            toggleActions: "play none play reverse",
          },
        }),
      ]);

      return () => {
        tweens.forEach((tween) => tween.kill());
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
        <div className={styles.servicesStory}>
          <div ref={visualRef} className={styles.servicesVisual} aria-hidden="true">
            {homepageContent.services.map((card, index) => (
              <div
                className={styles.serviceImageLayer}
                key={card.title}
                ref={(node) => {
                  if (node) imageRefs.current[index] = node;
                }}
              >
                <Image alt="" fill sizes="(max-width: 768px) 100vw, 54vw" src={serviceImages[index % serviceImages.length]} />
              </div>
            ))}
          </div>
          <div className={styles.servicesList}>
            <div className={styles.servicesListTitle}>
              <TextSignalReveal as="h3">خدماتنا المتكاملة</TextSignalReveal>
            </div>
            {homepageContent.services.map((card, index) => (
              <Link
                className={styles.servicePanel}
                href={card.href ?? "/services"}
                key={card.title}
                ref={(node) => {
                  if (node) itemRefs.current[index] = node;
                }}
              >
                <span
                  className={styles.servicePanelNumber}
                  ref={(node) => {
                    if (node) numberRefs.current[index] = node;
                  }}
                >
                  {index + 1}
                </span>
                <span className={styles.servicePanelBody}>
                  <strong>{card.title}</strong>
                  <span>{card.summary}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.servicesCta}>
          <HomeButton className={`${styles.button} ${styles.buttonPrimary}`} href="/services">
            <span className={styles.buttonIconPrefix}>
              <ArrowIcon />
            </span>
            <span className={styles.buttonText}>مشاهدة كل الخدمات</span>
          </HomeButton>
        </div>
      </div>
    </section>
  );
}
