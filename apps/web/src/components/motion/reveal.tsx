"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./reveal.module.css";

type RevealVariant = "fadeUp" | "hero" | "scaleIn" | "slideStart" | "soft";

type RevealProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  variant?: RevealVariant;
};

export function Reveal<T extends ElementType = "div">({
  as,
  children,
  className,
  delay = 0,
  once = false,
  variant = "fadeUp",
}: RevealProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.dataset.motionReady = "true";

    const markVisibleIfInViewport = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      const isInViewport = rect.top < viewportHeight * 0.9 && rect.bottom > 0 && rect.left < viewportWidth && rect.right > 0;

      if (isInViewport) {
        setIsVisible(true);
        return true;
      }

      return false;
    };

    const frameId = window.requestAnimationFrame(() => {
      markVisibleIfInViewport();
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        if (entry.isIntersecting && once) {
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 },
    );

    observer.observe(node);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [once]);

  const setNodeRef = (node: HTMLElement | null) => {
    ref.current = node;
  };

  return (
    <Component
      className={[styles.reveal, styles[variant], isVisible ? styles.visible : "", className ?? ""].filter(Boolean).join(" ")}
      data-motion-visible={isVisible ? "true" : "false"}
      ref={setNodeRef}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Component>
  );
}
