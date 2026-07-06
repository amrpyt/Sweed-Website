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
  const imageStackRef = useRef<HTMLSpanElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const imageRefs = useRef<HTMLSpanElement[]>([]);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const imageStack = imageStackRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const paragraph = paragraphRef.current;
    const images = imageRefs.current.filter(Boolean);

    if (!section || !sticky || !imageStack || !left || !right || !paragraph || images.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(images, { autoAlpha: 0, scale: 1.08 });
    gsap.set(images[0], { autoAlpha: 1, scale: 1 });

    const pin = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: sticky,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });

    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .fromTo(left, { x: "-30vw" }, { x: 0, duration: 1 }, 0)
      .fromTo(right, { x: "30vw" }, { x: 0, duration: 1 }, 0)
      .fromTo(imageStack, { scale: 0.74 }, { scale: 1, duration: 0.38 }, 0)
      .fromTo(paragraph, { y: 26 }, { y: 0, duration: 0.45 }, 0.1);

    const imageSteps = [0.24, 0.58, 0.76, 0.94];
    images.slice(1).forEach((image, index) => {
      const step = imageSteps[index] ?? 0.94;
      timeline
        .to(images[index], { autoAlpha: 0, duration: 0.08 }, step)
        .to(image, { autoAlpha: 1, scale: 1, duration: 0.08 }, step);
    });

    ScrollTrigger.refresh();

    return () => {
      pin.kill();
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="brand-gap" aria-label="We close the digital gap">
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.overlay} aria-hidden="true">
          <span className={styles.horizontalLine} />
          <span className={styles.horizontalLine} />
          <span className={styles.horizontalLine} />
        </div>
        <div className={styles.eyebrow}>SWEED / BRAND PRESENCE</div>
        <div className={styles.headline} aria-label="We close that gap">
          <span ref={leftRef}>We close</span>
          <span ref={rightRef}>That gap</span>
        </div>
        <span ref={imageStackRef} className={styles.imageStack} aria-hidden="true">
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
