"use client";

import { useEffect, useRef } from "react";
import styles from "./progress-indicator.module.css";

export function ProgressIndicator() {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const indicator = indicatorRef.current;
    const bar = barRef.current;
    if (!indicator || !bar) return;

    const supportsScrollTimeline = CSS.supports("animation-timeline: scroll(root block)");
    let timeoutId: number | undefined;

    const updateProgress = () => {
      const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(Math.max(window.scrollY / scrollRange, 0), 1);
      const percentage = Math.round(progress * 100);

      indicator.setAttribute("aria-valuenow", String(percentage));
      indicator.setAttribute("aria-valuetext", `${percentage}%`);

      if (!supportsScrollTimeline) {
        bar.style.setProperty("--scroll-progress", String(progress));
      }

      timeoutId = undefined;
    };

    const scheduleUpdate = () => {
      if (timeoutId !== undefined) return;
      timeoutId = window.setTimeout(updateProgress, 40);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    updateProgress();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      ref={indicatorRef}
      aria-label="تقدم قراءة الصفحة"
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={0}
      className={styles.progressIndicator}
      role="progressbar"
    >
      <div ref={barRef} className={styles.progressBar} />
    </div>
  );
}
