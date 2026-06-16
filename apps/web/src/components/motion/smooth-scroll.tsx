"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

const disabledPathPrefixes = ["/admin", "/api"];

export function SmoothScroll() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (disabledPathPrefixes.some((prefix) => pathname?.startsWith(prefix))) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.classList.add("lenis", "lenis-smooth");
    root.dataset.smoothScroll = "lenis";

    const lenis = new Lenis({
      anchors: true,
      autoRaf: true,
      duration: 1.05,
      easing: (time: number) => 1 - Math.pow(1 - time, 3),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    return () => {
      lenis.destroy();
      root.classList.remove("lenis", "lenis-smooth", "lenis-stopped", "lenis-scrolling");
      delete root.dataset.smoothScroll;
    };
  }, [pathname]);

  return null;
}
