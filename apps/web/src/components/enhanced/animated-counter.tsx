"use client";

import { useEffect, useRef, useState } from "react";
import { animateValue, prefersReducedMotion } from "@/lib/animations";

type AnimatedCounterProps = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

export function AnimatedCounter({
  value,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (hasAnimated || !elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Skip animation if user prefers reduced motion
          if (prefersReducedMotion()) {
            setCount(value);
            observer.disconnect();
            return;
          }

          const cancel = animateValue(0, value, duration, (currentValue) => {
            setCount(currentValue);
          });

          observer.disconnect();
          return cancel;
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  const formattedValue = count.toFixed(decimals);

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
