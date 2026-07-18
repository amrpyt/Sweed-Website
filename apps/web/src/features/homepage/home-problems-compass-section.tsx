"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { TextSignalReveal } from "@/components/motion";
import { BrandActionButtonContent, getBrandActionButtonClassName } from "@/components/ui";
import { homepageContent } from "@/content/homepage";
import { useHomeConversion } from "./home-conversion-context";
import { HomeButton } from "./home-hero-ui";
import styles from "./home-public-page.module.css";

const compassPoints = [
  { x: 0, y: -255, rotate: 0 },
  { x: 390, y: -150, rotate: -2 },
  { x: 390, y: 150, rotate: 2 },
  { x: 0, y: 255, rotate: 0 },
  { x: -390, y: 150, rotate: -2 },
  { x: -390, y: -150, rotate: 2 },
];

export function HomeProblemsCompassSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const compassRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLButtonElement[]>([]);
  const { selection, selectAndFocusContact } = useHomeConversion();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      if (!sectionRef.current || !innerRef.current || !compassRef.current || cards.length === 0) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        gsap.set([compassRef.current, ctaRef.current, ...cards], { clearProps: "all" });
        return;
      }

      const isDesktop = window.matchMedia("(min-width: 900px)").matches;
      const animatedElements = [compassRef.current, ctaRef.current, ...cards].filter(Boolean);

      gsap.set(animatedElements, { opacity: 0 });
      gsap.set(compassRef.current, { scale: 0.86, rotate: -7 });
      gsap.set(ctaRef.current, { y: 20 });

      if (isDesktop) {
        gsap.set(cards, { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 0.68, rotate: 0 });
      } else {
        gsap.set(cards, { y: 24, scale: 0.96 });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      timeline
        .to(compassRef.current, { scale: 1, rotate: 0, opacity: 1, duration: 0.65, ease: "back.out(1.45)" })
        .to(
          cards,
          isDesktop
            ? {
                x: (_, target) => Number((target as HTMLElement).dataset.x),
                y: (_, target) => Number((target as HTMLElement).dataset.y),
                rotate: (_, target) => Number((target as HTMLElement).dataset.rotate),
                opacity: 1,
                scale: 1,
                duration: 0.9,
                ease: "power3.out",
                stagger: { each: 0.07, from: "center" },
              }
            : {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.55,
                ease: "power2.out",
                stagger: 0.06,
              },
          0.12,
        )
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" }, "-=0.25");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.problemsSection} id="problems">
      <div className={styles.container}>
        <div ref={innerRef} className={styles.problemsCompassInner}>
          <div className={`${styles.sectionHeader} ${styles.problemsHeader}`}>
            <TextSignalReveal as="h2">هل تواجه هذه المشاكل؟</TextSignalReveal>
            <p>اختار التحدي الأقرب لك، ونرتب لك بداية واضحة.</p>
          </div>

          <div className={styles.compassStage}>
            <div ref={compassRef} className={styles.compassImageWrap} aria-hidden="true">
              <Image
                alt=""
                fill
                priority={false}
                sizes="(max-width: 768px) 72vw, 390px"
                src="/images/homepage/compass-problems.png"
              />
            </div>

            {homepageContent.problems.map((card, index) => {
              const point = compassPoints[index % compassPoints.length];

              return (
                <button
                  className={styles.compassProblemCard}
                  data-active={selection.problem === card.title ? "true" : "false"}
                  data-testid="home-problem-card"
                  data-x={point.x}
                  data-y={point.y}
                  data-rotate={point.rotate}
                  key={card.title}
                  ref={(node) => {
                    if (node) cardRefs.current[index] = node;
                  }}
                  type="button"
                  aria-pressed={selection.problem === card.title}
                  onClick={() => {
                    selectAndFocusContact({
                      problem: card.title,
                      service: card.serviceKey,
                      source: "problems",
                    });
                  }}
                >
                  <span className={styles.compassProblemIcon}>
                    <i aria-hidden="true" className={`fas ${card.icon}`} />
                  </span>
                  <span className={styles.compassProblemText}>
                    <strong>{card.title}</strong>
                    <span>{card.summary}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div ref={ctaRef} className={styles.problemsCta}>
            <span>ابدأ بخطوة واضحة</span>
            <HomeButton className={getBrandActionButtonClassName({ variant: "primary" })} href="/#contact">
              <BrandActionButtonContent>احجز استشارة</BrandActionButtonContent>
            </HomeButton>
          </div>
        </div>
      </div>
    </section>
  );
}
