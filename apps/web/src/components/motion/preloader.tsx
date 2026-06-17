"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import styles from "./preloader.module.css";

export function Preloader() {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling while preloading
    document.body.style.overflow = "hidden";

    const obj = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        // Slide up preloader overlay
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
          onComplete: () => {
            // Restore scrolling
            document.body.style.overflow = "";
            if (containerRef.current) {
              containerRef.current.style.display = "none";
            }
          }
        });
      }
    });

    // Count up from 0 to 100
    tl.to(obj, {
      value: 100,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        setCount(Math.floor(obj.value));
      }
    });

    // Stagger fade out of text & counter
    tl.to([countRef.current, textRef.current], {
      opacity: 0,
      y: -24,
      duration: 0.35,
      ease: "power2.in",
    }, "-=0.2");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  const formattedCount = count < 10 ? `0${count}` : `${count}`;

  return (
    <div ref={containerRef} className={styles.preloaderContainer} aria-hidden="true">
      <div className={styles.content}>
        <div ref={countRef} className={styles.counter}>
          {formattedCount}
        </div>
        <div ref={textRef} className={styles.logoText}>
          <span>SWEED</span>
          <span className={styles.logoDot} />
        </div>
      </div>
    </div>
  );
}
