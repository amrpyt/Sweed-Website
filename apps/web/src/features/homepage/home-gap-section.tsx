"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { homepageContent } from "@/content/homepage";
import styles from "./home-gap-section.module.css";

export function HomeGapSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const start = section.querySelector("[data-slogan-start]");
      const end = section.querySelector("[data-slogan-end]");
      const visual = section.querySelector("[data-slogan-visual]");
      const caption = section.querySelector("[data-slogan-caption]");

      gsap.set(start, { autoAlpha: 0, xPercent: 22 });
      gsap.set(end, { autoAlpha: 0, xPercent: -22 });
      gsap.set(visual, { autoAlpha: 0, scale: 0.9, rotate: -8 });
      gsap.set(caption, { autoAlpha: 0, y: 14 });

      gsap
        .timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        })
        .to(start, { autoAlpha: 1, xPercent: 0, duration: 0.76 })
        .to(end, { autoAlpha: 1, xPercent: 0, duration: 0.76 }, "<0.08")
        .to(visual, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.82 }, "<0.08")
        .to(caption, { autoAlpha: 1, y: 0, duration: 0.64 }, "-=0.28");
    }, section);

    return () => context.revert();
  }, []);

  const slogan = homepageContent.slogan;

  return (
    <section ref={sectionRef} className={styles.section} id="slogan" aria-labelledby="home-slogan-title">
      <div className={styles.container}>
        <div className={styles.phrase} data-slogan-start>
          <strong>{slogan.start}</strong>
        </div>

        <div className={styles.visual} data-slogan-visual aria-hidden="true">
          <span className={styles.northMarker}>N</span>
          <Image
            src={slogan.image}
            alt=""
            fill
            loading="lazy"
            sizes="(max-width: 640px) 55vw, 260px"
          />
        </div>

        <div className={`${styles.phrase} ${styles.phraseEnd}`} data-slogan-end>
          <strong>{slogan.end}</strong>
        </div>

        <p className={styles.caption} data-slogan-caption>{slogan.caption}</p>
        <h2 className={styles.srOnly} id="home-slogan-title">
          {slogan.start} — {slogan.end}
        </h2>
      </div>
    </section>
  );
}
