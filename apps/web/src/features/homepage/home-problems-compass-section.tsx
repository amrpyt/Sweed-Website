"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { TextSignalReveal } from "@/components/motion";
import { homepageContent } from "@/content/homepage";
import { HomeButton } from "./home-hero-ui";
import styles from "./home-public-page.module.css";

const compassPoints = [
  { x: 0, y: -245 },
  { x: 340, y: -155 },
  { x: 340, y: 155 },
  { x: 0, y: 245 },
  { x: -340, y: 155 },
  { x: -340, y: -155 },
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

export function HomeProblemsCompassSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const compassRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      if (!sectionRef.current || !innerRef.current || cards.length === 0) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        gsap.set([compassRef.current, ...cards], { clearProps: "all" });
        return;
      }

      if (window.innerWidth <= 1180) {
        gsap.fromTo(
          [compassRef.current, ...cards],
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%",
              once: true,
            },
          },
        );
        return;
      }

      gsap.set(cards, { x: 0, y: 0, opacity: 0, scale: 0.72 });
      gsap.set(compassRef.current, { scale: 0.92, opacity: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=110%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(compassRef.current, { scale: 1, opacity: 1, duration: 0.35, ease: "power2.out" })
        .to(
          cards,
          {
              x: (_, target) => Number((target as HTMLElement).dataset.x),
              y: (_, target) => Number((target as HTMLElement).dataset.y),
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.08,
          },
          0.12,
        );
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
              <div
                className={styles.compassProblemCard}
                data-x={point.x}
                data-y={point.y}
                key={card.title}
                ref={(node) => {
                    if (node) cardRefs.current[index] = node;
                  }}
                >
                  <span className={styles.compassProblemIcon}>
                    <i aria-hidden="true" className={`fas ${card.icon}`} />
                  </span>
                  <span className={styles.compassProblemText}>
                    <strong>{card.title}</strong>
                    <span>{card.summary}</span>
                  </span>
                </div>
              );
            })}
          </div>

          <div className={styles.problemsCta}>
            <span>ابدأ بخطوة واضحة</span>
            <HomeButton className={`${styles.button} ${styles.buttonPrimary}`} href="/contact?services=consulting#contact-form">
              <span className={styles.buttonIconPrefix}>
                <ArrowIcon />
              </span>
              <span className={styles.buttonText}>احجز استشارتك الآن</span>
            </HomeButton>
          </div>
        </div>
      </div>
    </section>
  );
}
