"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import styles from "./home-blit-scroll-section.module.css";

export function HomeBlitScrollSection() {
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const overlayVideoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const media = mediaRef.current;
    const playButton = playButtonRef.current;

    if (!section || !sticky || !media || !playButton) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const startWidth = isMobile ? "88vw" : "min(62vw, 980px)";
    const startHeight = isMobile ? "42vh" : "min(42vh, 520px)";

    gsap.set(media, {
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      top: "50vh",
      width: startWidth,
      height: startHeight,
      scale: 1,
      transformOrigin: "50% 50%",
      borderRadius: isMobile ? 24 : 30,
    });

    gsap.set(playButton, {
      opacity: 1,
      scale: 1,
    });

    const getCoverScale = () => {
      const rect = media.getBoundingClientRect();
      const widthScale = window.innerWidth / Math.max(1, rect.width);
      const heightScale = window.innerHeight / Math.max(1, rect.height);
      return Math.max(widthScale, heightScale) * 1.04;
    };

    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=130%",
        scrub: 0.7,
        pin: sticky,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(media, {
        scale: getCoverScale,
        borderRadius: 0,
        duration: 1,
      })
      .to(
        playButton,
        {
          opacity: 0,
          scale: 0.82,
          duration: 0.25,
          ease: "power2.out",
        },
        0.45,
      );

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, []);

  function openVideo() {
    setIsOpen(true);
    const video = overlayVideoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  }

  function closeVideo() {
    setIsOpen(false);
    overlayVideoRef.current?.pause();
  }

  return (
    <section ref={sectionRef} className={styles.section} aria-label="عرض فيديو سويد التفاعلي">
      <div ref={stickyRef} className={styles.sticky}>
        <div ref={mediaRef} className={styles.mediaFrame}>
          <video src="/videos/blit-scroll-effect-demo.mp4" autoPlay muted loop playsInline preload="metadata" />
          <button
            ref={playButtonRef}
            className={styles.playButton}
            type="button"
            onClick={openVideo}
            aria-label="افتح فيديو سويد"
          >
            <span className={styles.playIcon} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`} aria-hidden={!isOpen}>
        <button className={styles.closeButton} type="button" onClick={closeVideo} aria-label="أغلق فيديو سويد">
          ×
        </button>
        <div className={styles.overlayFrame}>
          <video ref={overlayVideoRef} src="/videos/blit-scroll-effect-demo.mp4" controls playsInline preload="metadata" />
        </div>
      </div>
    </section>
  );
}
