"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
import styles from "./about-public-page.module.css";

const METHODOLOGY_STAGE_COUNT = 5;
const METHODOLOGY_STAGE_POSITIONS = [0, 0.95, 1.9, 2.85, 3.8] as const;

export function AboutPageMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from("[data-about-hero-line]", {
          y: 38,
          clipPath: "inset(0 0 100% 0)",
          autoAlpha: 0,
          duration: 0.82,
          stagger: 0.12,
        })
        .from(
          "[data-about-hero-support]",
          { y: 22, autoAlpha: 0, duration: 0.64, stagger: 0.1 },
          "-=0.36",
        );

      const revealGroups = [
        { trigger: "#story", targets: "[data-story-copy]", delay: 0.08 },
        { trigger: "#founder", targets: "[data-founder-copy]", delay: 0.1 },
        { trigger: "#values", targets: "[data-value-card]", delay: 0.08 },
        { trigger: "#team", targets: "[data-team-card]", delay: 0.08 },
        { trigger: "#alliances", targets: "[data-alliance-card]", delay: 0.08 },
        { trigger: "#testimonials", targets: "[data-testimonial-card]", delay: 0.08 },
      ];

      revealGroups.forEach(({ trigger, targets, delay }) => {
        gsap.from(targets, {
          y: 32,
          autoAlpha: 0,
          duration: 0.72,
          stagger: delay,
          ease: "power4.out",
          scrollTrigger: { trigger, start: "top 76%", once: true },
        });
      });

      gsap.from("[data-story-media]", {
        clipPath: "inset(0 50% 0 50% round 16px)",
        autoAlpha: 0.72,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: { trigger: "#story", start: "top 72%", once: true },
      });

      gsap.from("[data-founder-portrait]", {
        clipPath: "inset(100% 0 0 0 round 16px)",
        duration: 0.88,
        ease: "power4.out",
        scrollTrigger: { trigger: "#founder", start: "top 72%", once: true },
      });

      gsap
        .timeline({
          defaults: { duration: 0.82, ease: "power4.out" },
          scrollTrigger: { trigger: "#promise", start: "top 74%", once: true },
        })
        .from("[data-promise-line='start']", { xPercent: 18, autoAlpha: 0 })
        .from("[data-promise-line='end']", { xPercent: -18, autoAlpha: 0 }, "<0.08")
        .from("[data-promise-signature]", { y: 18, autoAlpha: 0, duration: 0.62 }, "-=0.34");

      const methodologySection = root.querySelector<HTMLElement>("#methodology");
      const methodologyPin = root.querySelector<HTMLElement>("[data-methodology-pin]");
      const methodologyPathWrap = root.querySelector<HTMLElement>(`.${styles.methodologyPathWrap}`);
      const methodologyPaths = Array.from(root.querySelectorAll<SVGPathElement>("[data-methodology-path]"));
      const methodologyNodes = gsap.utils.toArray<HTMLElement>("[data-methodology-node]");
      const methodologyCurrent = root.querySelector<HTMLElement>("[data-methodology-current]");
      const methodologyProgress = root.querySelector<HTMLElement>("[data-methodology-progress]");

      if (
        !methodologySection ||
        !methodologyPin ||
        !methodologyPathWrap ||
        methodologyPaths.length === 0 ||
        methodologyNodes.length !== METHODOLOGY_STAGE_COUNT ||
        !methodologyCurrent ||
        !methodologyProgress
      ) {
        return;
      }

      ScrollTrigger.saveStyles([
        methodologyPin,
        methodologyProgress,
        ...methodologyPaths,
        ...methodologyNodes,
      ]);

      let currentStage = -1;

      const setStageState = (nextStage: number) => {
        const boundedStage = Math.max(0, Math.min(METHODOLOGY_STAGE_COUNT - 1, nextStage));
        if (boundedStage === currentStage) return;

        currentStage = boundedStage;
        methodologyCurrent.textContent = String(boundedStage + 1).padStart(2, "0");

        methodologyNodes.forEach((node, index) => {
          const state = index < boundedStage ? "completed" : index === boundedStage ? "current" : "future";
          node.dataset.state = state;

          if (state === "current") {
            node.setAttribute("aria-current", "step");
          } else {
            node.removeAttribute("aria-current");
          }
        });
      };

      const resetStageState = () => {
        currentStage = -1;
        methodologyCurrent.textContent = "01";
        methodologyNodes.forEach((node) => {
          node.dataset.state = "rest";
          node.removeAttribute("aria-current");
        });
      };

      const preparePaths = () =>
        methodologyPaths.map((path) => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          return { path, length };
        });

      media.add(
        {
          pinned: "(min-width: 821px) and (min-height: 700px)",
          phone: "(max-width: 820px)",
          compact: "(min-width: 821px) and (max-height: 699px)",
        },
        (mediaContext) => {
          const conditions = mediaContext.conditions ?? {};
          const pathData = preparePaths();

          if (conditions.pinned) {
            setStageState(0);
            gsap.set(methodologyNodes, {
              autoAlpha: 0.28,
              y: 20,
              scale: 0.965,
              transformOrigin: "50% 50%",
            });
            gsap.set(methodologyNodes[0], { autoAlpha: 1, y: 0, scale: 1 });
            gsap.set(methodologyProgress, { scaleX: 0.2, transformOrigin: "right center" });

            const clock = { value: 0 };
            const sequence = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                id: "about-methodology-pinned",
                trigger: methodologySection,
                start: "top top+=77",
                end: () => `+=${Math.round(Math.max(window.innerHeight * 4.2, 2800))}`,
                pin: methodologyPin,
                pinSpacing: true,
                scrub: 0.65,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            sequence.eventCallback("onUpdate", () => {
              const timelineTime = sequence.time();
              const activeStage = METHODOLOGY_STAGE_POSITIONS.reduce<number>(
                (latestStage, stagePosition, index) =>
                  timelineTime >= stagePosition ? index : latestStage,
                0,
              );
              setStageState(activeStage);
            });

            sequence.to(clock, { value: 1, duration: 5 }, 0);
            sequence.to(methodologyProgress, { scaleX: 1, duration: 4 }, 0);
            pathData.forEach(({ path }) => {
              sequence.to(path, { strokeDashoffset: 0, duration: 4 }, 0);
            });

            methodologyNodes.slice(1).forEach((node, index) => {
              const previousNode = methodologyNodes[index];
              const stagePosition = METHODOLOGY_STAGE_POSITIONS[index + 1];

              sequence
                .to(
                  previousNode,
                  { autoAlpha: 0.68, scale: 0.985, duration: 0.18, ease: "power2.out" },
                  stagePosition,
                )
                .to(
                  node,
                  { autoAlpha: 1, y: 0, scale: 1, duration: 0.32, ease: "power3.out" },
                  stagePosition,
                );
            });

            return resetStageState;
          }

          if (conditions.phone) {
            setStageState(0);
            gsap.set(methodologyProgress, { scaleX: 0.2, transformOrigin: "right center" });

            pathData.forEach(({ path }) => {
              gsap.to(path, {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: methodologyPathWrap,
                  start: "top 78%",
                  end: "bottom 38%",
                  scrub: 0.45,
                  invalidateOnRefresh: true,
                },
              });
            });

            gsap.to(methodologyProgress, {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: methodologyPathWrap,
                start: "top 78%",
                end: "bottom 38%",
                scrub: 0.45,
                invalidateOnRefresh: true,
              },
            });

            methodologyNodes.forEach((node, index) => {
              gsap.fromTo(
                node,
                { autoAlpha: 0.42, y: 22, scale: 0.98 },
                {
                  autoAlpha: 1,
                  y: 0,
                  scale: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: node,
                    start: "top 88%",
                    end: "top 56%",
                    scrub: 0.4,
                    invalidateOnRefresh: true,
                  },
                },
              );

              ScrollTrigger.create({
                trigger: node,
                start: "top 58%",
                end: "bottom 42%",
                onEnter: () => setStageState(index),
                onEnterBack: () => setStageState(index),
                onLeave: () => setStageState(Math.min(METHODOLOGY_STAGE_COUNT - 1, index + 1)),
                onLeaveBack: () => setStageState(Math.max(0, index - 1)),
              });
            });

            return resetStageState;
          }

          if (conditions.compact) {
            resetStageState();
            gsap.set(methodologyNodes, { clearProps: "opacity,visibility,transform" });
            pathData.forEach(({ path }) => gsap.set(path, { strokeDashoffset: 0 }));
            gsap.set(methodologyProgress, { scaleX: 1, transformOrigin: "right center" });
          }

          return resetStageState;
        },
      );
    }, root);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <div className={styles.motionRoot} ref={rootRef}>
      {children}
    </div>
  );
}
