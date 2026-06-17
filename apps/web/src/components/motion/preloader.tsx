"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./preloader.module.css";
import MetallicPaint from "./MetallicPaint";

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

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
      { filter: "blur(0px)", opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    // Slide up preloader overlay with a sharp triangle (inverted V) clip-path
    tl.to(containerRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 50% -100%, 0% 0%)",
      duration: 1.4,
      ease: "expo.inOut",
    }, "+=0.3"); // Wait a bit before opening

    // Split the word at the same time the triangle opens
    tl.to(leftRef.current, {
      x: "-40vw",
      opacity: 0,
      duration: 1.4,
      ease: "expo.inOut",
    }, "<");

    tl.to(rightRef.current, {
      x: "40vw",
      opacity: 0,
      duration: 1.4,
      ease: "expo.inOut",
    }, "<");

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
             <MetallicPaint imageSrc="/sweed-logo-official.svg" lightColor="#ffffff" darkColor="#111111" tintColor="#ffffff" speed={0.5} refraction={0.02} />
          </div>
          <div ref={rightRef} className={styles.rightHalf}>
             <MetallicPaint imageSrc="/sweed-logo-official.svg" lightColor="#ffffff" darkColor="#111111" tintColor="#ffffff" speed={0.5} refraction={0.02} />
          </div>
        </div>
      </div>
    </div>
  );
}
