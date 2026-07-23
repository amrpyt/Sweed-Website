"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
import styles from "./about-public-page.module.css";

export function AboutPageMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

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
      const methodologyPaths = Array.from(root.querySelectorAll<SVGPathElement>("[data-methodology-path]"));
      const methodologyNodes = gsap.utils.toArray<HTMLElement>("[data-methodology-node]");

      if (methodologySection && methodologyPaths.length && methodologyNodes.length) {
        methodologyPaths.forEach((path) => {
          const pathLength = path.getTotalLength();
          gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        });
        gsap.set(methodologyNodes, { autoAlpha: 0.36, scale: 0.94 });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: methodologySection,
            start: "top 70%",
            end: "bottom 78%",
            scrub: 0.5,
          },
        });

        timeline.to(methodologyPaths, { strokeDashoffset: 0, duration: 1 });
        methodologyNodes.forEach((node, index) => {
          timeline.to(
            node,
            { autoAlpha: 1, scale: 1, duration: 0.14, ease: "power2.out" },
            Math.min(0.84, index * 0.2),
          );
        });
      }
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div className={styles.motionRoot} ref={rootRef}>
      {children}
    </div>
  );
}
