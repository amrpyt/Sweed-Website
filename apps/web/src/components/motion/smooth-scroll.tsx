"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

const disabledPathPrefixes = ["/admin", "/api"];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function SmoothScroll() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (disabledPathPrefixes.some((prefix) => pathname?.startsWith(prefix))) return;

    const root = document.documentElement;
    root.dataset.motionSystem = "controlled-cinematic";
    root.dataset.motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "reduced" : "full";

    let frameId = 0;
    let idleTimer = 0;
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let smoothedVelocity = 0;

    const markIdle = () => {
      smoothedVelocity = 0;
      root.style.setProperty("--sweed-scroll-velocity", "0");
      root.style.setProperty("--sweed-scroll-direction", "0");
      root.dataset.scrollDirection = "idle";
      root.dataset.scrollState = "idle";
    };

    const updateSignals = () => {
      frameId = 0;

      const now = performance.now();
      const y = window.scrollY;
      const delta = y - lastY;
      const elapsed = Math.max(16, now - lastTime);
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = clamp(y / maxScroll, 0, 1);
      const rawVelocity = clamp(delta / elapsed / 2.5, -1, 1);

      smoothedVelocity = smoothedVelocity * 0.78 + rawVelocity * 0.22;

      root.style.setProperty("--sweed-scroll-progress", progress.toFixed(4));
      root.style.setProperty("--sweed-scroll-velocity", smoothedVelocity.toFixed(4));
      root.style.setProperty("--sweed-scroll-direction", delta > 0 ? "1" : delta < 0 ? "-1" : "0");
      root.dataset.scrollDirection = delta > 0 ? "down" : delta < 0 ? "up" : "idle";
      root.dataset.scrollState = Math.abs(smoothedVelocity) > 0.004 ? "moving" : "idle";

      lastY = y;
      lastTime = now;

      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(markIdle, 120);
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateSignals);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(idleTimer);
      root.style.removeProperty("--sweed-scroll-progress");
      root.style.removeProperty("--sweed-scroll-velocity");
      root.style.removeProperty("--sweed-scroll-direction");
      delete root.dataset.scrollDirection;
      delete root.dataset.scrollState;
      delete root.dataset.motionSystem;
      delete root.dataset.motionPreference;
    };
  }, [pathname]);

  useLayoutEffect(() => {
    if (disabledPathPrefixes.some((prefix) => pathname?.startsWith(prefix))) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 900) return;

    gsap.registerPlugin(ScrollTrigger);

    const root = document.documentElement;
    root.classList.add("lenis", "lenis-smooth");
    root.dataset.smoothScroll = "lenis";

    const lenis = new Lenis({
      anchors: true,
      autoRaf: false,
      duration: 0.72,
      easing: (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      smoothWheel: true,
      wheelMultiplier: 0.92,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      root.classList.remove("lenis", "lenis-smooth", "lenis-stopped", "lenis-scrolling");
      delete root.dataset.smoothScroll;
    };
  }, [pathname]);

  return null;
}
