"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

/**
 * Registers GSAP plugins and sets up scroll-triggered section heading reveals.
 * Renders nothing — purely a side-effect component.
 *
 * Place this once in the app shell (via PageScrollEffects).
 * Individual page sections opt in by adding `data-gsap-heading` to their heading wrappers.
 */
export function GsapProvider() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    // Animate every section heading that opts in via data attribute
    const headings = document.querySelectorAll<HTMLElement>("[data-gsap-heading]");

    headings.forEach((wrapper) => {
      const h2 = wrapper.querySelector("h2");
      const p = wrapper.querySelector("p");

      if (h2) {
        gsap.set(h2, { opacity: 0, y: 48, filter: "blur(6px)" });
        gsap.to(h2, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      }

      if (p) {
        gsap.set(p, { opacity: 0, y: 28 });
        gsap.to(p, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return null;
}
