"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CSSProperties } from "react";
import { useLayoutEffect, useRef } from "react";
import { homepageContent } from "@/content/homepage";
import { useHomeConversion } from "./home-conversion-context";
import styles from "./home-problems-compass-section.module.css";

const dialAngles = [54, 90, 126, -54, -90, -126] as const;
const dialNodes = [
  { x: 278, y: 98 },
  { x: 316, y: 180 },
  { x: 278, y: 262 },
  { x: 82, y: 98 },
  { x: 44, y: 180 },
  { x: 82, y: 262 },
] as const;

export function HomeProblemsCompassSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { selection, selectAndFocusContact, updateSelection } = useHomeConversion();
  const selectedIndex = homepageContent.problems.findIndex((problem) => problem.title === selection.problem);
  const selectedProblem = selectedIndex >= 0 ? homepageContent.problems[selectedIndex] : null;
  const dialAngle = selectedIndex >= 0 ? dialAngles[selectedIndex] : 0;
  const hasSelection = Boolean(selectedProblem);
  const dialStyle = { "--dial-angle": `${dialAngle}deg` } as CSSProperties;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const heading = section.querySelector("[data-problems-heading]");
      const visual = section.querySelector("[data-problems-visual]");
      const cards = gsap.utils.toArray<HTMLElement>(section.querySelectorAll("[data-problem-card]"));

      gsap.set([heading, visual], { autoAlpha: 0, y: 28 });
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
        .to(cards, { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.09 }, "-=0.52");
    }, section);

    return () => context.revert();
  }, []);

  const continueToContact = () => {
    if (!selectedProblem) return;

    selectAndFocusContact({
      problem: selectedProblem.title,
      service: selectedProblem.serviceKey,
      source: "problems",
    });
  };

  return (
    <section ref={sectionRef} className={styles.section} id="problems" aria-labelledby="home-problems-title">
      <div className={styles.container}>
        <header className={styles.heading} data-problems-heading>
          <h2 id="home-problems-title">هل تواجه هذه المشاكل؟</h2>
          <p>{homepageContent.problemsIntro}</p>
        </header>

        <div className={styles.problemLayout} data-has-selection={hasSelection ? "true" : "false"}>
          <div className={styles.cardsColumn}>
            {homepageContent.problems.slice(0, 3).map((problem, index) => (
              <ProblemButton
                key={problem.title}
                index={index}
                problem={problem}
                selected={selectedIndex === index}
                onSelect={() => updateSelection({ problem: problem.title, service: problem.serviceKey, source: "problems" })}
              />
            ))}
          </div>

          <div
            className={styles.directionHub}
            data-active={hasSelection ? "true" : "false"}
            data-dial-angle={dialAngle}
            data-problems-visual
            data-testid="home-direction-dial"
            style={dialStyle}
          >
            <div className={styles.dialShell}>
              <svg className={styles.directionDial} viewBox="0 0 360 360" aria-hidden="true">
                <circle className={styles.dialSurface} cx="180" cy="180" r="158" />
                <circle className={styles.dialOuterRing} cx="180" cy="180" r="148" />
                <circle className={styles.dialInnerRing} cx="180" cy="180" r="112" />
                <circle className={styles.dialCoreRing} cx="180" cy="180" r="72" />

                <path className={styles.dialAxis} d="M180 32V328M32 180H328" />
                <path className={styles.dialDiagonal} d="M75 75L285 285M285 75L75 285" />

                {dialNodes.map((node, index) => (
                  <g
                    className={`${styles.dialNode} ${selectedIndex === index ? styles.dialNodeActive : ""}`}
                    key={`${node.x}-${node.y}`}
                    transform={`translate(${node.x} ${node.y})`}
                  >
                    <circle r="18" />
                    <text textAnchor="middle" y="4">
                      {String(index + 1).padStart(2, "0")}
                    </text>
                  </g>
                ))}

                <g className={styles.needle}>
                  <path className={styles.needleShadow} d="M180 183L170 76L180 48L190 76Z" />
                  <path className={styles.needleBody} d="M180 180L173 78L180 58L187 78Z" />
                  <circle className={styles.needlePivot} cx="180" cy="180" r="12" />
                </g>

                <circle className={styles.brandCore} cx="180" cy="180" r="54" />
                <text className={styles.brandLetter} x="180" y="199" textAnchor="middle">
                  S
                </text>
              </svg>
            </div>

            <div className={styles.resultPanel} aria-live="polite" data-active={hasSelection ? "true" : "false"}>
              <span className={styles.resultEyebrow}>{hasSelection ? "الاتجاه الأنسب ليك" : "بوصلة سويد"}</span>
              <strong data-testid="home-direction-service">
                {selectedProblem?.serviceKey ?? "اختار المشكلة الأقرب لوضعك"}
              </strong>
              <p>{selectedProblem?.solution ?? "هنحوّل وصفك لاتجاه واضح وأول خطوة عملية."}</p>
              <button type="button" disabled={!selectedProblem} onClick={continueToContact}>
                {selectedProblem ? "ابدأ أول خطوة" : "اختار مشكلة الأول"}
                <i className="fas fa-arrow-left" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className={styles.cardsColumn}>
            {homepageContent.problems.slice(3).map((problem, index) => {
              const problemIndex = index + 3;

              return (
                <ProblemButton
                  key={problem.title}
                  index={problemIndex}
                  problem={problem}
                  selected={selectedIndex === problemIndex}
                  onSelect={() => updateSelection({ problem: problem.title, service: problem.serviceKey, source: "problems" })}
                />
              );
            })}
          </div>
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
      {selected ? <span className={styles.selectionBadge}>اختيارك</span> : null}
    </button>
  );
}
