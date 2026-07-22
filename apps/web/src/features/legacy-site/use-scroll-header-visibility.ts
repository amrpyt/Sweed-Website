"use client";

import { useEffect, useState } from "react";

type ScrollHeaderVisibilityOptions = {
  disabled?: boolean;
  hideAfter?: number;
  hideDistance?: number;
  revealDistance?: number;
  throttleMs?: number;
};

export function useScrollHeaderVisibility({
  disabled = false,
  hideAfter = 120,
  hideDistance = 18,
  revealDistance = 10,
  throttleMs = 40,
}: ScrollHeaderVisibilityOptions = {}) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (disabled) return;

    let lastScrollY = Math.max(window.scrollY, 0);
    let direction: -1 | 0 | 1 = 0;
    let accumulatedDistance = 0;
    let timeoutId: number | undefined;

    const updateVisibility = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const delta = currentScrollY - lastScrollY;
      const nextDirection: -1 | 0 | 1 = delta > 0 ? 1 : delta < 0 ? -1 : 0;

      if (currentScrollY <= hideAfter) {
        accumulatedDistance = 0;
        direction = 0;
        setIsHidden(false);
      } else if (nextDirection !== 0) {
        if (nextDirection !== direction) {
          direction = nextDirection;
          accumulatedDistance = 0;
        }

        accumulatedDistance += Math.abs(delta);

        if (direction === 1 && accumulatedDistance >= hideDistance) {
          setIsHidden(true);
          accumulatedDistance = 0;
        } else if (direction === -1 && accumulatedDistance >= revealDistance) {
          setIsHidden(false);
          accumulatedDistance = 0;
        }
      }

      lastScrollY = currentScrollY;
      timeoutId = undefined;
    };

    const handleScroll = () => {
      if (timeoutId !== undefined) return;
      timeoutId = window.setTimeout(updateVisibility, throttleMs);
    };

    const initialFrameId = window.requestAnimationFrame(() => {
      setIsHidden(false);
      updateVisibility();
    });

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(initialFrameId);
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [disabled, hideAfter, hideDistance, revealDistance, throttleMs]);

  return disabled ? false : isHidden;
}
