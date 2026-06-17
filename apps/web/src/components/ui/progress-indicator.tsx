"use client";

import { useEffect, useState } from "react";
import styles from "./progress-indicator.module.css";

export function ProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className={styles.progressIndicator} role="progressbar" aria-valuenow={scrollProgress} aria-valuemin={0} aria-valuemax={100}>
      <div className={styles.progressBar} style={{ width: `${scrollProgress}%` }} />
    </div>
  );
}
