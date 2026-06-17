"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useScramble } from "use-scramble";
import styles from "./preloader.module.css";

const TARGET_WORD = "SWEED";
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export function Preloader() {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);

  const { ref: scrambleRef } = useScramble({
    text: "SWEED",
    speed: 1.5,
    tick: 1,
    step: 1,
    scramble: 15,
    seed: 3,
  });

  useEffect(() => {
    // Prevent scrolling while preloading
    document.body.style.overflow = "hidden";

    const obj = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        // Slide up preloader overlay with a sharp triangle (inverted V) clip-path
        gsap.to(containerRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 50% -100%, 0% 0%)",
          duration: 1.4,
          ease: "expo.inOut",
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

    // 0. Smooth Blur effect on the text as it loads
    gsap.fromTo(textRef.current, 
      { filter: "blur(20px)", scale: 1.1 },
      { filter: "blur(0px)", scale: 1, duration: 1.4, ease: "power2.out" }
    );

    // 1. Count up parallel to scramble
    tl.to(obj, {
      value: 100,
      duration: 1.4, // Scramble time is ~1.4s
      ease: "power3.inOut",
      onUpdate: () => {
        setCount(Math.floor(obj.value));
      }
    });

    // 2. Fade out the text slightly before the curtain pulls up
    tl.to([textRef.current, countRef.current], {
      opacity: 0,
      y: -40,
      duration: 0.4,
      ease: "power2.in"
    }, "+=0.3");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  const formattedCount = count < 10 ? `0${count}` : count < 100 ? `${count}` : "100";

  return (
    <div ref={containerRef} className={styles.preloaderContainer} aria-hidden="true">
      <div className={styles.content}>
        
        <div ref={textRef} className={styles.hugeLogo}>
          <span ref={scrambleRef} />
        </div>

        <div ref={countRef} className={styles.smallCounter}>
          {formattedCount}%
        </div>
        
      </div>
    </div>
  );
}
