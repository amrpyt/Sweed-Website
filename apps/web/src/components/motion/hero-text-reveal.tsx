"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef, type ReactNode } from "react";

/**
 * Splits children text into word-level spans and animates them in
 * with staggered blur + slide-up on mount.
 *
 * Usage:
 *   <HeroTextReveal>نحوّل أحلامك إلى إنجازات حقيقية</HeroTextReveal>
 *
 * Also animates sibling elements passed via `afterElements` (subtitle, description, buttons).
 */
export function HeroTextReveal({
  children,
  className,
  as: Tag = "h1",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
}) {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = el.querySelectorAll<HTMLSpanElement>("[data-word]");
    if (words.length === 0) return;

    // Set initial state
    gsap.set(words, {
      opacity: 0,
      y: 32,
      willChange: "opacity, transform",
    });

    // Animate in with stagger
    const tl = gsap.timeline({ delay });
    tl.to(words, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      stagger: 0.06,
      ease: "power4.out",
      clearProps: "willChange",
    });

    return () => {
      tl.kill();
    };
  }, [delay]);

  // Convert children text into word spans
  const text = typeof children === "string" ? children : "";
  const wordSpans = text
    ? text.split(/\s+/).map((word, i) => (
        <span
          key={i}
          data-word
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {word}{" "}
        </span>
      ))
    : children;

  return (
    // @ts-expect-error — polymorphic tag is safe here
    <Tag ref={containerRef} className={className}>
      {wordSpans}
    </Tag>
  );
}

/**
 * Animates hero child elements (subtitle, description, buttons) with a staggered fade-up
 * after the main headline. Wrap each child element individually.
 */
export function HeroFadeIn({
  children,
  className,
  delay = 0.55,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(el, { opacity: 0, y: 20 });
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay,
      ease: "power3.out",
    });

    return () => {
      tween.kill();
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
