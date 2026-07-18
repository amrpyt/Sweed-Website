"use client";

import { useEffect, useState } from "react";
import styles from "./progress-indicator.module.css";

export function ProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className={styles.progressIndicator} role="progressbar" aria-valuenow={scrollProgress} aria-valuemin={0} aria-valuemax={100}>
      <div className={styles.progressBar} style={{ transform: `scaleX(${scrollProgress / 100})` }} />
    </div>
  );
}
