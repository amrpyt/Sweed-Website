"use client";

import gsap from "gsap";
import { useCallback, useRef, type ReactNode } from "react";

/**
 * Wraps a button or link and makes it subtly follow the cursor on hover.
 * Creates a "magnetic" feel — the element pulls toward the mouse position
 * by a small amount (max ~8px), then springs back on leave.
 *
 * Disabled on touch devices and when prefers-reduced-motion is set.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  /** How strongly the button follows. 0.3 = subtle, 0.6 = strong. */
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useRef(false);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.35,
        ease: "power2.out",
      });
    },
    [strength],
  );

  const onMouseLeave = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  }, []);

  const onTouchStart = useCallback(() => {
    isTouch.current = true;
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
