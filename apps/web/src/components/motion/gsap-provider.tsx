"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

/**
 * Registers GSAP plugins and sets up replayable scroll-triggered heading reveals.
 * Renders nothing — purely a side-effect component.
 */
export function GsapProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const headings = document.querySelectorAll<HTMLElement>("[data-gsap-heading]");
    const contexts: gsap.Context[] = [];

    headings.forEach((wrapper) => {
      const context = gsap.context(() => {
        const h2 = wrapper.querySelector("h2");
        const p = wrapper.querySelector("p");

        if (h2) {
          gsap.fromTo(
            h2,
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power4.out",
              scrollTrigger: {
                trigger: wrapper,
                start: "top 82%",
                toggleActions: "restart none restart reset",
              },
            },
          );
        }

        if (p) {
          gsap.fromTo(
            p,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: 0.18,
              ease: "power3.out",
              scrollTrigger: {
                trigger: wrapper,
                start: "top 82%",
                toggleActions: "restart none restart reset",
              },
            },
          );
        }
      }, wrapper);

      contexts.push(context);
    });

    return () => {
      contexts.forEach((context) => context.revert());
    };
  }, []);

  return null;
}
