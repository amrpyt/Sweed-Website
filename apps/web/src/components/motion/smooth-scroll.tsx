"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

const disabledPathPrefixes = ["/admin", "/api"];

/**
 * Sets up Lenis smooth scroll synced with GSAP's ticker.
 * GSAP drives the animation frame loop, and Lenis + ScrollTrigger
 * update on each tick — keeping everything perfectly in sync.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (disabledPathPrefixes.some((prefix) => pathname?.startsWith(prefix))) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const root = document.documentElement;
    root.classList.add("lenis", "lenis-smooth");
    root.dataset.smoothScroll = "lenis";

    const lenis = new Lenis({
      anchors: true,
      autoRaf: false, // GSAP ticker drives the loop now
      duration: 1.05,
      easing: (time: number) => 1 - Math.pow(1 - time, 3),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    // Sync ScrollTrigger with Lenis scroll events
    lenis.on("scroll", ScrollTrigger.update);

    // Let GSAP ticker drive Lenis RAF
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      root.classList.remove("lenis", "lenis-smooth", "lenis-stopped", "lenis-scrolling");
      delete root.dataset.smoothScroll;
    };
  }, [pathname]);

  return null;
}
