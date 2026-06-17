"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, type ReactNode } from "react";

/**
 * Horizontal scroll section — pins in place and scrolls children horizontally
 * as the user scrolls vertically. Creates a cinematic "film strip" effect.
 *
 * On mobile (≤768px), falls back to normal horizontal overflow scroll.
 *
 * The component is RTL-aware — it reads the document direction and adjusts
 * the scroll direction accordingly.
 */
export function HorizontalScroll({
  children,
  className,
  trackClassName,
}: {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth <= 768) return; // mobile fallback

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Calculate how far we need to scroll horizontally
    const isRTL = document.documentElement.dir === "rtl";
    const scrollWidth = track.scrollWidth - section.clientWidth;

    if (scrollWidth <= 0) return;

    // Animate the track horizontally as user scrolls vertically
    const tween = gsap.to(track, {
      x: isRTL ? scrollWidth : -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 0.8,
        start: "top top+=80",
        end: () => `+=${scrollWidth * 1.2}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === section)
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className={className}>
      <div
        ref={trackRef}
        className={trackClassName}
        style={{
          display: "flex",
          flexWrap: "nowrap",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
