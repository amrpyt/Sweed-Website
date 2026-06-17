"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./preloader.module.css";

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Prevent scrolling while preloading
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        if (containerRef.current) containerRef.current.style.display = "none";
      }
    });

    // Premium smooth fade in for the text
    tl.fromTo(textRef.current, 
      { filter: "blur(12px)", opacity: 0, y: 15 },
      { filter: "blur(0px)", opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      0
    );

    // Simulate loading progress
    tl.to(barRef.current, {
      width: "100%",
      duration: 1.4,
      ease: "power3.inOut"
    }, 0); // start at 0s

    tl.to(percentRef.current, {
      innerHTML: 100,
      duration: 1.4,
      ease: "power3.inOut",
      snap: { innerHTML: 1 },
      onUpdate: function() {
        if (percentRef.current) {
          percentRef.current.innerHTML = Math.round(Number(this.targets()[0].innerHTML)).toString();
        }
      }
    }, 0);

    // Fade out loading UI right before opening
    tl.to(barRef.current?.parentElement?.parentElement || null, {
      opacity: 0,
      duration: 0.3,
    }, 1.3);

    // Slide up preloader overlay with a sharp triangle (inverted V) clip-path
    tl.to(containerRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 50% -100%, 0% 0%)",
      duration: 1.4,
      ease: "expo.inOut",
    }, 1.6); // Start opening at 1.6s

    // Split the word at the same time the triangle opens
    tl.to(leftRef.current, {
      x: "-40vw",
      opacity: 0,
      duration: 1.4,
      ease: "expo.inOut",
    }, 1.6);

    tl.to(rightRef.current, {
      x: "40vw",
      opacity: 0,
      duration: 1.4,
      ease: "expo.inOut",
    }, 1.6);

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.preloaderContainer} aria-hidden="true">
      <div className={styles.content}>
        <div ref={textRef} className={styles.hugeLogo} dir="ltr">
          <div ref={leftRef} className={styles.leftHalf}>
            <img src="/sweed-logo-official.svg" alt="SWEED Left" className={styles.logoImage} />
          </div>
          <div ref={rightRef} className={styles.rightHalf}>
            <img src="/sweed-logo-official.svg" alt="SWEED Right" className={styles.logoImage} />
          </div>
        </div>
      </div>
      
      <div className={styles.loadingWrapper}>
        <div className={styles.loadingHeader}>
          <span>Initializing System</span>
          <span><span ref={percentRef}>0</span>%</span>
        </div>
        <div className={styles.loadingBarContainer}>
          <div ref={barRef} className={styles.loadingBar}></div>
        </div>
      </div>
    </div>
  );
}
