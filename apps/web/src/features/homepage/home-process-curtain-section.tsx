"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { homepageContent } from "@/content/homepage";
import styles from "./home-process-curtain-section.module.css";

export function HomeProcessCurtainSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<HTMLLIElement[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const intro = introRef.current;
    const steps = stepRefs.current.filter(Boolean);

    if (!section || !intro || steps.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) return;

      gsap.fromTo(
        intro,
        { autoAlpha: 0.72, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: intro,
            start: "top 82%",
            once: true,
          },
        },
      );

      steps.forEach((step, index) => {
        gsap.fromTo(
          step,
          { autoAlpha: 0.64, x: index % 2 === 0 ? 28 : -28 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.72,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 86%",
              once: true,
            },
          },
        );
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="process"
      aria-labelledby="home-process-title"
    >
      <div className={styles.shell}>
        <div ref={introRef} className={styles.intro}>
          <span className={styles.label}>طريقة الشغل</span>
          <h2 id="home-process-title" className={styles.title}>
            كل خطوة لها هدف واضح قبل ما نتحرك للي بعدها.
          </h2>
          <p className={styles.summary}>
            نبدأ بالفهم، نبني الخطة، ثم نحولها لتنفيذ قابل للقياس. بدون قفزات عشوائية أو شغل منفصل عن هدف المشروع.
          </p>
        </div>

        <ol className={styles.steps}>
          {homepageContent.process.map((step, index) => (
            <li
              className={styles.step}
              key={step.title}
              ref={(node) => {
                if (node) stepRefs.current[index] = node;
              }}
            >
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className={styles.stepContent}>
                <div className={styles.stepHeading}>
                  <span className={styles.icon} aria-hidden="true">
                    <i className={`fas ${step.icon}`} />
                  </span>
                  <h3>{step.title}</h3>
                </div>
                <p>{step.summary}</p>
              </div>

              <span className={styles.duration}>{step.duration}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
