"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useMemo, useRef, type ReactNode } from "react";

type TextSignalRevealProps = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  endColor?: string;
  highlightColor?: string;
  scrub?: boolean;
  start?: string;
  trigger?: "scroll" | "manual";
};

export function TextSignalReveal({
  children,
  as: Tag = "span",
  className,
  delay = 0,
  endColor = "currentColor",
  highlightColor = "#ed2062",
  scrub = false,
  start = "top 82%",
  trigger = "scroll",
}: TextSignalRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const words = useMemo(() => children.trim().split(/\s+/).filter(Boolean), [children]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (trigger === "manual") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const wordEls = el.querySelectorAll<HTMLElement>("[data-signal-word]");
    if (wordEls.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(wordEls, {
        color: highlightColor,
        opacity: 0,
        y: "0.45em",
        willChange: "opacity, transform, color",
      });

      const timeline = gsap.timeline({
        delay,
        scrollTrigger: {
          trigger: el,
          start,
          end: scrub ? "top 42%" : undefined,
          scrub: scrub ? 0.8 : false,
          once: false,
          toggleActions: scrub ? undefined : "restart none restart reset",
        },
      });

      timeline
        .to(wordEls, {
          opacity: 1,
          y: 0,
          duration: 0.34,
          ease: "power2.out",
          stagger: 0.055,
        })
        .to(
          wordEls,
          {
            color: endColor,
            duration: 0.32,
            ease: "power2.inOut",
            stagger: 0.055,
            clearProps: "willChange",
          },
          0.16,
        );
    }, el);

    return () => ctx.revert();
  }, [delay, endColor, highlightColor, scrub, start, trigger]);

  const content: ReactNode = words.map((word, index) => (
    <span data-signal-word key={`${word}-${index}`} style={{ display: "inline-block", whiteSpace: "pre" }}>
      {word}
      {index < words.length - 1 ? "\u00A0" : ""}
    </span>
  ));

  return (
    // @ts-expect-error polymorphic tag is constrained above
    <Tag ref={ref} className={className}>
      {content}
    </Tag>
  );
}
