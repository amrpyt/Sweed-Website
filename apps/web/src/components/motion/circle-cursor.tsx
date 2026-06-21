"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./circle-cursor.module.css";

const interactiveSelector = "a, button, summary, input, textarea, select, [role='button']";

export function CircleCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(false);
  const activeRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    if (!media.matches) return undefined;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let frame = 0;

    const setReady = (nextReady: boolean) => {
      if (readyRef.current === nextReady) return;
      readyRef.current = nextReady;
      setIsReady(nextReady);
    };

    const setActive = (nextActive: boolean) => {
      if (activeRef.current === nextActive) return;
      activeRef.current = nextActive;
      setIsActive(nextActive);
    };

    const updateActiveTarget = (target: EventTarget | null) => {
      setActive(Boolean(target instanceof Element && target.closest(interactiveSelector)));
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      setReady(true);
      updateActiveTarget(event.target);
    };

    const handlePointerOver = (event: PointerEvent) => updateActiveTarget(event.target);
    const handlePointerLeave = () => setReady(false);

    const animate = () => {
      ringX += (targetX - ringX) * 0.22;
      ringY += (targetY - ringY) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }

      frame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className={`${styles.cursor} ${isReady ? styles.ready : ""} ${isActive ? styles.active : ""}`}>
      <div ref={ringRef} className={styles.ring} />
      <div ref={dotRef} className={styles.dot} />
    </div>
  );
}
