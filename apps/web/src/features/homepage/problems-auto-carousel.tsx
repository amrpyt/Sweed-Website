"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type ProblemsAutoCarouselProps = {
  children: ReactNode;
  className?: string;
};

const ADVANCE_DELAY_MS = 1650;
const RESUME_AFTER_USER_MS = 5200;

export function ProblemsAutoCarousel({ children, className }: ProblemsAutoCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timerId: number | undefined;
    let resumeTimerId: number | undefined;
    let index = 0;

    const getSlides = () => Array.from(scroller.querySelectorAll(":scope > article")) as HTMLElement[];

    const setActiveSlide = (slides: HTMLElement[], activeIndex: number) => {
      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeIndex;
        slide.dataset.activeProblem = isActive ? "true" : "false";
        slide.setAttribute("aria-hidden", isActive ? "false" : "true");
      });
      if (activeIndex >= 0) {
        scroller.dataset.activeIndex = String(activeIndex);
        return;
      }

      delete scroller.dataset.activeIndex;
    };

    const clearTimers = () => {
      window.clearTimeout(timerId);
      window.clearTimeout(resumeTimerId);
    };

    const shouldRun = () => !reduceMotionQuery.matches && getSlides().length > 1;

    const scheduleNext = () => {
      if (!shouldRun()) return;

      timerId = window.setTimeout(() => {
        const slides = getSlides();
        if (!slides.length) return;

        index = (index + 1) % slides.length;
        setActiveSlide(slides, index);
        scheduleNext();
      }, ADVANCE_DELAY_MS);
    };

    const start = () => {
      clearTimers();
      const slides = getSlides();
      if (!shouldRun()) {
        delete scroller.dataset.carouselReady;
        delete scroller.dataset.activeIndex;
        setActiveSlide(slides, -1);
        return;
      }

      scroller.dataset.carouselReady = "true";
      index = 0;
      setActiveSlide(slides, index);
      scheduleNext();
    };

    const pauseThenResume = () => {
      clearTimers();
      resumeTimerId = window.setTimeout(start, RESUME_AFTER_USER_MS);
    };

    const handleModeChange = () => {
      if (shouldRun()) {
        start();
        return;
      }

      clearTimers();
      delete scroller.dataset.carouselReady;
      delete scroller.dataset.activeIndex;
      setActiveSlide(getSlides(), -1);
    };

    start();
    scroller.addEventListener("pointerdown", pauseThenResume, { passive: true });
    scroller.addEventListener("wheel", pauseThenResume, { passive: true });
    scroller.addEventListener("focusin", pauseThenResume);
    reduceMotionQuery.addEventListener("change", handleModeChange);

    return () => {
      clearTimers();
      scroller.removeEventListener("pointerdown", pauseThenResume);
      scroller.removeEventListener("wheel", pauseThenResume);
      scroller.removeEventListener("focusin", pauseThenResume);
      reduceMotionQuery.removeEventListener("change", handleModeChange);
    };
  }, []);

  return (
    <div className={className} ref={scrollerRef}>
      {children}
    </div>
  );
}
