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

const leftTitle = "We close";
const rightTitle = "That gap";

export function HomeGapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const imageStackRef = useRef<HTMLSpanElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const leftCharRefs = useRef<HTMLSpanElement[]>([]);
  const rightCharRefs = useRef<HTMLSpanElement[]>([]);
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
    const leftChars = leftCharRefs.current.filter(Boolean);
    const rightChars = rightCharRefs.current.filter(Boolean);

    if (!section || !sticky || !imageStack || !left || !right || !paragraph || images.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(images, { autoAlpha: 0 });
    gsap.set(images[0], { autoAlpha: 1 });
    gsap.set(leftChars, { x: -80, scaleY: 0.95, autoAlpha: 0, transformOrigin: "50% 50%" });
    gsap.set(rightChars, { x: 80, scaleY: 0.95, autoAlpha: 0, transformOrigin: "50% 50%" });

    const pin = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${Math.max(section.offsetHeight - window.innerHeight, window.innerHeight)}`,
      pin: sticky,
      pinSpacing: true,
      pinType: "fixed",
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });

    let activeImage = 0;
    let imageTimer: ReturnType<typeof setInterval> | undefined;

    const showNextImage = () => {
      const nextImage = (activeImage + 1) % images.length;
      gsap.set(images[activeImage], { autoAlpha: 0 });
      gsap.set(images[nextImage], { autoAlpha: 1 });
      activeImage = nextImage;
    };

    const startImageCycle = () => {
      if (imageTimer || images.length < 2) return;
      imageTimer = setInterval(showNextImage, 800);
    };

    const stopImageCycle = () => {
      if (!imageTimer) return;
      clearInterval(imageTimer);
      imageTimer = undefined;
    };

    const cycleTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onEnter: startImageCycle,
      onLeave: stopImageCycle,
      onEnterBack: startImageCycle,
      onLeaveBack: stopImageCycle,
    });

    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        start: "top 50%",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .fromTo(left, { x: "-30vw" }, { x: 0, duration: 1 }, 0)
      .fromTo(right, { x: "30vw" }, { x: 0, duration: 1 }, 0)
      .fromTo(
        imageStack,
        { clipPath: "inset(50% 50% 50% 50% round 0.25rem)" },
        { clipPath: "inset(0% 0% 0% 0% round 0.25rem)", duration: 1 },
        0,
      )
      .fromTo(paragraph, { y: 26 }, { y: 0, duration: 0.45 }, 0.1);

    const leftCharsTween = gsap.to(leftChars, {
      keyframes: {
        "40%": { autoAlpha: 1 },
        "90%": { x: 0, scaleY: 1 },
        "100%": { autoAlpha: 1, x: 0, scaleY: 1 },
      },
      duration: 1,
      ease: "expo.out",
      stagger: { each: 0.022, from: "end" },
      scrollTrigger: {
        trigger: sticky,
        start: "top 50%",
        end: "bottom top",
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    });

    const rightCharsTween = gsap.to(rightChars, {
      keyframes: {
        "40%": { autoAlpha: 1 },
        "90%": { x: 0, scaleY: 1 },
        "100%": { autoAlpha: 1, x: 0, scaleY: 1 },
      },
      duration: 1,
      ease: "expo.out",
      stagger: { each: 0.022, from: "start" },
      scrollTrigger: {
        trigger: sticky,
        start: "top 50%",
        end: "bottom top",
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    });

    ScrollTrigger.refresh();

    return () => {
      stopImageCycle();
      cycleTrigger.kill();
      pin.kill();
      timeline.scrollTrigger?.kill();
      timeline.kill();
      leftCharsTween.scrollTrigger?.kill();
      leftCharsTween.kill();
      rightCharsTween.scrollTrigger?.kill();
      rightCharsTween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="brand-gap" aria-label="We close the digital gap">
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.overlay} aria-hidden="true">
          <span className={styles.horizontalLine}>
            <i className={styles.lineSquare} />
          </span>
          <span className={styles.horizontalLine}>
            <i className={styles.lineSquare} />
          </span>
          <span className={styles.horizontalLine}>
            <i className={styles.lineSquare} />
          </span>
        </div>
        <div className={styles.eyebrow}>SWEED / BRAND PRESENCE</div>
        <div className={styles.headline} aria-label="We close that gap">
          <span ref={leftRef} className={styles.headingGroup} aria-hidden="true">
            {Array.from(leftTitle).map((char, index) => (
              <span
                className={styles.char}
                key={`${char}-${index}`}
                ref={(node) => {
                  if (node) leftCharRefs.current[index] = node;
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
          <span ref={rightRef} className={styles.headingGroup} aria-hidden="true">
            {Array.from(rightTitle).map((char, index) => (
              <span
                className={styles.char}
                key={`${char}-${index}`}
                ref={(node) => {
                  if (node) rightCharRefs.current[index] = node;
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
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
