"use client";

import EmblaCarousel, { type EmblaCarouselType } from "embla-carousel";
import type { ReactNode } from "react";
import { Children, useEffect, useRef, useState } from "react";
import styles from "./about-public-page.module.css";

type AboutPageCarouselProps = {
  ariaLabel: string;
  children: ReactNode;
  variant: "team" | "testimonials";
  autoplayMs?: number;
};

export function AboutPageCarousel({
  ariaLabel,
  children,
  variant,
  autoplayMs,
}: AboutPageCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<EmblaCarouselType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = Children.toArray(children);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const api = EmblaCarousel(viewport, {
      direction: "rtl",
      loop: variant === "testimonials",
      align: "start",
      containScroll: "trimSnaps",
      skipSnaps: false,
    });

    apiRef.current = api;

    const syncState = () => {
      setSelectedIndex(api.selectedScrollSnap());
      setSnapCount(api.scrollSnapList().length);
    };

    syncState();
    api.on("select", syncState);
    api.on("reInit", syncState);

    return () => {
      api.destroy();
      apiRef.current = null;
    };
  }, [variant]);

  useEffect(() => {
    if (!autoplayMs || isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => apiRef.current?.scrollNext(), autoplayMs);
    return () => window.clearInterval(timer);
  }, [autoplayMs, isPaused]);

  return (
    <div
      className={styles.carousel}
      data-carousel-variant={variant}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false);
      }}
    >
      <div className={styles.carouselViewport} ref={viewportRef} aria-label={ariaLabel} role="region">
        <div className={styles.carouselTrack}>
          {slides.map((slide, index) => (
            <div className={styles.carouselSlide} key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.carouselControls}>
        <div className={styles.carouselArrows}>
          <button type="button" onClick={() => apiRef.current?.scrollPrev()} aria-label="العنصر السابق">
            <i className="fas fa-arrow-right" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => apiRef.current?.scrollNext()} aria-label="العنصر التالي">
            <i className="fas fa-arrow-left" aria-hidden="true" />
          </button>
        </div>

        <div className={styles.carouselDots} aria-label="اختيار مجموعة العرض">
          {Array.from({ length: snapCount }, (_, index) => (
            <button
              type="button"
              aria-label={`انتقل إلى المجموعة ${index + 1}`}
              aria-current={selectedIndex === index ? "true" : undefined}
              className={selectedIndex === index ? styles.carouselDotActive : undefined}
              key={index}
              onClick={() => apiRef.current?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
