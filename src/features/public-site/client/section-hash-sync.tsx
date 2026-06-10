"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SectionHashSync({ sectionIds }: { sectionIds: string[] }) {
  const pathname = usePathname();
  const sectionSignature = sectionIds.join("|");

  useEffect(() => {
    const sections = sectionSignature
      .split("|")
      .filter(Boolean)
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    if (!sections.length || typeof IntersectionObserver === "undefined") {
      return;
    }

    let activeSectionId = "";
    let frameId = 0;

    const updateActiveSection = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const focusLine = viewportHeight * 0.35;

      const nextSection = sections
        .map((section) => {
          const rect = section.getBoundingClientRect();
          const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

          return {
            section,
            entersReadingZone: rect.top >= 0 && rect.top <= viewportHeight * 0.6,
            visibleHeight,
            touchesFocusLine: rect.top <= focusLine && rect.bottom >= focusLine,
            top: rect.top,
            topDistance: Math.abs(rect.top - focusLine),
          };
        })
        .filter((candidate) => candidate.visibleHeight > 0)
        .sort(
          (left, right) =>
            Number(right.entersReadingZone) - Number(left.entersReadingZone) ||
            (left.entersReadingZone && right.entersReadingZone ? left.top - right.top : 0) ||
            Number(right.touchesFocusLine) - Number(left.touchesFocusLine) ||
            right.visibleHeight - left.visibleHeight ||
            left.topDistance - right.topDistance,
        )[0]?.section;

      const nextSectionId = nextSection?.id;
      if (!nextSectionId || nextSectionId === activeSectionId) {
        return;
      }

      activeSectionId = nextSectionId;
      const nextUrl = `${pathname}#${nextSectionId}`;
      if (`${window.location.pathname}${window.location.hash}` === nextUrl) {
        return;
      }

      window.history.replaceState(window.history.state, "", nextUrl);
    };

    const scheduleUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateActiveSection();
      });
    };

    const observer = new IntersectionObserver(
      () => {
        scheduleUpdate();
      },
      {
        rootMargin: "-32% 0px -45% 0px",
        threshold: [0, 0.2, 0.35, 0.5, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [pathname, sectionSignature]);

  return null;
}
