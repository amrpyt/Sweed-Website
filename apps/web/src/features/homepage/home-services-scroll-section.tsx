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

const serviceImages = [
  "/images/hero/two-men-consultation.jpg",
  "/images/hero/entrepreneur-laptop-office.jpg",
  "/images/hero/businessman-laptop-standing.jpg",
  "/images/hero/sweed-building.png",
  "/images/hero/two-men-consultation.jpg",
  "/images/hero/entrepreneur-laptop-office.jpg",
];

export function HomeServicesScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const itemRefs = useRef<HTMLAnchorElement[]>([]);
  const numberRefs = useRef<HTMLSpanElement[]>([]);
  const progressRefs = useRef<HTMLSpanElement[]>([]);

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
      const progress = progressRefs.current.filter(Boolean);
      if (!section || !visual || items.length === 0) return;

      gsap.set(items, { autoAlpha: 0.68, y: 28, scale: 0.96 });
      gsap.set(numbers, { autoAlpha: 0.35 });
      gsap.set(progress, { scaleY: 0.18, transformOrigin: "50% 0%" });
      gsap.set(images, { autoAlpha: 0, scale: 1.06, y: 22 });
      gsap.set(items[0], { autoAlpha: 1, y: 0, scale: 1 });
      gsap.set(numbers[0], { autoAlpha: 1 });
      gsap.set(progress[0], { scaleY: 1 });
      gsap.set(images[0], { autoAlpha: 1, scale: 1, y: 0 });

      const tweens = items.flatMap((item, index) => [
        gsap.to(item, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 64%",
            end: "bottom 42%",
            toggleActions: "play reverse play reverse",
          },
        }),
        gsap.to(item, {
          autoAlpha: 0.62,
          y: -22,
          scale: 0.96,
          duration: 0.45,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: item,
            start: "bottom 42%",
            end: "bottom 24%",
            toggleActions: "play none none reverse",
          },
        }),
        gsap.to(numbers[index], {
          autoAlpha: 1,
          duration: 0.45,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 64%",
            end: "bottom 42%",
            toggleActions: "play reverse play reverse",
          },
        }),
        gsap.to(progress[index], {
          scaleY: 1,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 64%",
            end: "bottom 42%",
            toggleActions: "play reverse play reverse",
          },
        }),
        gsap.to(images[index], {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 64%",
            end: "bottom 42%",
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
            <div className={styles.servicesVisualChrome}>
              <span>01</span>
              <span>Service System</span>
            </div>
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
            <div className={styles.servicesVisualOverlay} />
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
                  className={styles.servicePanelProgress}
                  ref={(node) => {
                    if (node) progressRefs.current[index] = node;
                  }}
                  aria-hidden="true"
                />
                <span
                  className={styles.servicePanelNumber}
                  ref={(node) => {
                    if (node) numberRefs.current[index] = node;
                  }}
                >
                  {index + 1}
                </span>
                <span className={styles.servicePanelBody}>
                  <span className={styles.servicePanelIcon}>
                    <i aria-hidden="true" className={`fas ${card.icon}`} />
                  </span>
                  <strong>{card.title}</strong>
                  <span>{card.summary}</span>
                  <em>{"\u0627\u0643\u062a\u0634\u0641 \u0627\u0644\u062e\u062f\u0645\u0629"}</em>
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
