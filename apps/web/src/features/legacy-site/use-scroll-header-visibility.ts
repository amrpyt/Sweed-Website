"use client";

import { useEffect, useState } from "react";

type ScrollHeaderVisibilityOptions = {
  disabled?: boolean;
  hideAfter?: number;
  revealDelta?: number;
};

export function useScrollHeaderVisibility({
  disabled = false,
  hideAfter = 120,
  revealDelta = 8,
}: ScrollHeaderVisibilityOptions = {}) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (disabled) return;

    let lastScrollY = window.scrollY;
    let timeoutId: number | undefined;

    const updateVisibility = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (currentScrollY <= hideAfter) {
        setIsHidden(false);
      } else if (delta > revealDelta) {
        setIsHidden(true);
      } else if (delta < -revealDelta) {
        setIsHidden(false);
      }

      lastScrollY = Math.max(currentScrollY, 0);
      timeoutId = undefined;
    };

    const handleScroll = () => {
      if (timeoutId) return;
      timeoutId = window.setTimeout(updateVisibility, 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateVisibility();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [disabled, hideAfter, revealDelta]);

  return disabled ? false : isHidden;
}
