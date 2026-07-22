"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { homepageContent } from "@/content/homepage";
import { useHomeConversion } from "./home-conversion-context";
import styles from "./home-problems-compass-section.module.css";

export function HomeProblemsCompassSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { selection, selectAndFocusContact, updateSelection } = useHomeConversion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const heading = section.querySelector("[data-problems-heading]");
      const visual = section.querySelector("[data-problems-visual]");
      const cards = gsap.utils.toArray<HTMLElement>(section.querySelectorAll("[data-problem-card]"));
      const cta = section.querySelector("[data-problems-cta]");

      gsap.set([heading, visual, cta], { autoAlpha: 0, y: 28 });
      gsap.set(cards, { autoAlpha: 0, y: 34 });

      const timeline = gsap.timeline({
        defaults: { ease: "power4.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      timeline
        .to(heading, { autoAlpha: 1, y: 0, duration: 0.72 })
        .to(visual, { autoAlpha: 1, y: 0, duration: 0.76 }, "-=0.44")
        .to(cards, { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.1 }, "-=0.52")
        .to(cta, { autoAlpha: 1, y: 0, duration: 0.64 }, "-=0.34");
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="problems" aria-labelledby="home-problems-title">
      <div className={styles.container}>
        <header className={styles.heading} data-problems-heading>
          <h2 id="home-problems-title">هل تواجه هذه المشاكل؟</h2>
          <p>{homepageContent.problemsIntro}</p>
        </header>

        <div className={styles.problemLayout}>
          <div className={styles.cardsColumn}>
            {homepageContent.problems.slice(0, 3).map((problem, index) => (
              <ProblemButton
                key={problem.title}
                index={index}
                problem={problem}
                selected={selection.problem === problem.title}
                onSelect={() => updateSelection({ problem: problem.title, service: problem.serviceKey, source: "problems" })}
              />
            ))}
          </div>

          <div className={styles.compassVisual} data-problems-visual aria-hidden="true">
            <span className={styles.compassOrbit} />
            <Image
              src={homepageContent.slogan.image}
              alt=""
              width={420}
              height={420}
              sizes="(max-width: 760px) 58vw, 320px"
            />
            <strong>حدد المشكلة</strong>
            <small>عشان نحدد الاتجاه</small>
          </div>

          <div className={styles.cardsColumn}>
            {homepageContent.problems.slice(3).map((problem, index) => (
              <ProblemButton
                key={problem.title}
                index={index + 3}
                problem={problem}
                selected={selection.problem === problem.title}
                onSelect={() => updateSelection({ problem: problem.title, service: problem.serviceKey, source: "problems" })}
              />
            ))}
          </div>
        </div>

        <div className={styles.ctaRow} data-problems-cta>
          <span>{selection.problem ? "اختيارك اتسجل — هنكمل من هنا." : "اختار الجملة الأقرب لوضعك الحالي."}</span>
          <button
            type="button"
            onClick={() =>
              selectAndFocusContact({
                problem: selection.problem,
                service: selection.service,
                source: "problems",
              })
            }
          >
            ده وضعي... عايز أول خطوة
            <i className="fas fa-arrow-left" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

function ProblemButton({
  problem,
  index,
  selected,
  onSelect,
}: {
  problem: (typeof homepageContent.problems)[number];
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      className={styles.problemCard}
      data-active={selected ? "true" : "false"}
      data-problem-card
      data-testid="home-problem-card"
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className={styles.cardNumber} aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className={styles.cardIcon} aria-hidden="true">
        <i className={`fas ${problem.icon}`} />
      </span>
      <strong>{problem.title}</strong>
      <span className={styles.cardCheck} aria-hidden="true">
        <i className="fas fa-check" />
      </span>
    </button>
  );
}
