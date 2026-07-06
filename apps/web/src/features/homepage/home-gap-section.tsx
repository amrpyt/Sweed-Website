"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import styles from "./home-gap-section.module.css";

const gapImages = [
  "/images/hero/two-men-consultation.jpg",
  "/images/hero/entrepreneur-laptop-office.jpg",
  "/images/hero/businessman-laptop-standing.jpg",
  "/images/hero/sweed-building.png",
  "/images/homepage/strategy-horse.png",
];

export function HomeGapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const imageRefs = useRef<HTMLSpanElement[]>([]);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const paragraph = paragraphRef.current;
    const images = imageRefs.current.filter(Boolean);

    if (!section || !sticky || !left || !right || !paragraph || images.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(images, { autoAlpha: 0, scale: 1.08 });
    gsap.set(images[0], { autoAlpha: 1, scale: 1 });

    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=130%",
        pin: sticky,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(left, { xPercent: -12, yPercent: -42, duration: 1 }, 0)
      .to(right, { xPercent: 12, yPercent: -42, duration: 1 }, 0)
      .fromTo(paragraph, { autoAlpha: 0.35, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.65 }, 0.25);

    images.slice(1).forEach((image, index) => {
      const step = 0.18 + index * 0.16;
      timeline
        .to(images[index], { autoAlpha: 0, scale: 0.96, duration: 0.12 }, step)
        .to(image, { autoAlpha: 1, scale: 1, duration: 0.12 }, step);
    });

    ScrollTrigger.refresh();

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="brand-gap" aria-label="We close the digital gap">
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.eyebrow}>SWEED / BRAND PRESENCE</div>
        <div className={styles.headline} aria-label="We close that gap">
          <span ref={leftRef}>We close</span>
          <span ref={rightRef}>That gap</span>
        </div>
        <span className={styles.imageStack} aria-hidden="true">
          {gapImages.map((src, index) => (
            <span
              className={styles.imageFrame}
              key={src}
              ref={(node) => {
                if (node) imageRefs.current[index] = node;
              }}
            >
              <Image alt="" fill sizes="280px" src={src} />
            </span>
          ))}
        </span>
        <p ref={paragraphRef} className={styles.copy}>
          Your website should make the value of your brand obvious before a customer asks for proof.
          We turn unclear presence into a sharp story, trusted visuals, and a page that moves people to act.
        </p>
      </div>
    </section>
  );
}
