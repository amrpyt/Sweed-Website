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

const leftTitle = "نحوّل";
const rightTitle = "الفجوة";

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

    gsap.set(images, { autoAlpha: 0, scale: 1.04 });
    gsap.set(images[0], { autoAlpha: 1, scale: 1 });
    gsap.set(left, { autoAlpha: 0.72, x: "34vw", filter: "blur(6px)", transformOrigin: "50% 50%" });
    gsap.set(right, { autoAlpha: 0.72, x: "-34vw", filter: "blur(6px)", transformOrigin: "50% 50%" });

    const pin = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${Math.max(section.offsetHeight - window.innerHeight, window.innerHeight * 1.65)}`,
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
      imageTimer = setInterval(showNextImage, 960);
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
      .fromTo(left, { x: "34vw", autoAlpha: 0.72, filter: "blur(6px)" }, { x: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1.75 }, 0.15)
      .fromTo(right, { x: "-34vw", autoAlpha: 0.72, filter: "blur(6px)" }, { x: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1.75 }, 0.15)
      .fromTo(
        imageStack,
        { clipPath: "inset(50% 50% 50% 50% round 0.25rem)", scale: 0.92 },
        { clipPath: "inset(0% 0% 0% 0% round 0.25rem)", scale: 1, duration: 1.55 },
        0.35,
      )
      .fromTo(images, { scale: 1.04 }, { scale: 1, duration: 1.55, stagger: 0.03 }, 0.35)
      .fromTo(paragraph, { y: 34, autoAlpha: 0.72 }, { y: 0, autoAlpha: 1, duration: 0.75 }, 0.72)
      .to([left, right], { scale: 1.015, duration: 0.35 }, 1.9);

    ScrollTrigger.refresh();

    return () => {
      stopImageCycle();
      cycleTrigger.kill();
      pin.kill();
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="slogan" aria-label="سلوجن سويد: نحوّل فجوة الحضور الرقمي إلى ثقة وطلب">
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
        <div className={styles.eyebrow}>SWEED / الحضور الرقمي</div>
        <div className={styles.headline} data-testid="brand-gap-headline" aria-label="نحوّل الفجوة">
          <span ref={leftRef} className={styles.headingGroup} data-testid="brand-gap-lead-word" aria-hidden="true">
            {leftTitle}
          </span>
          <span ref={rightRef} className={styles.headingGroup} data-testid="brand-gap-target-word" aria-hidden="true">
            {rightTitle}
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
          حضورك الرقمي لازم يشرح قيمتك قبل ما العميل يسأل. نحول الظهور الضعيف إلى قصة واضحة، صورة موثوقة، وصفحة تدفع العميل للتحرك.
        </p>
      </div>
    </section>
  );
}
