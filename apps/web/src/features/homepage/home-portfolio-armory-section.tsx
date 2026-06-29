"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { TextSignalReveal } from "@/components/motion";
import { homepageContent } from "@/content/homepage";
import styles from "./home-portfolio-armory-section.module.css";

const projectImages = [
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
];

export function HomePortfolioArmorySection() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const panels = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-portfolio-panel]"));
    const visualCards = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-portfolio-visual]"));
    const progress = root.querySelector<HTMLElement>("[data-portfolio-progress]");
    if (panels.length === 0 || visualCards.length === 0 || !progress) return;

    gsap.set(panels.slice(1), { autoAlpha: 0, y: 42, filter: "blur(14px)" });
    gsap.set(visualCards.slice(1), { autoAlpha: 0, y: 70, scale: 0.96, filter: "blur(14px)" });

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: () => `+=${window.innerHeight * (panels.length - 1)}`,
      pin: true,
      scrub: 0.7,
      invalidateOnRefresh: true,
      onUpdate: ({ progress: value }) => {
        const active = Math.min(panels.length - 1, Math.floor(value * panels.length));
        gsap.to(progress, { scaleX: value, duration: 0.18, ease: "none", overwrite: true });

        panels.forEach((panel, index) => {
          gsap.to(panel, {
            autoAlpha: index === active ? 1 : 0,
            y: index === active ? 0 : 42,
            filter: index === active ? "blur(0px)" : "blur(14px)",
            duration: 0.32,
            ease: "power2.out",
            overwrite: true,
          });
        });

        visualCards.forEach((card, index) => {
          gsap.to(card, {
            autoAlpha: index === active ? 1 : 0,
            y: index === active ? 0 : 70,
            scale: index === active ? 1 : 0.96,
            filter: index === active ? "blur(0px)" : "blur(14px)",
            duration: 0.34,
            ease: "power2.out",
            overwrite: true,
          });
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={rootRef} className={styles.section} id="portfolio">
      <div className={styles.shell}>
        <div className={styles.visualPane}>
          <div className={styles.scope} aria-hidden="true" />
          {homepageContent.portfolio.map((card, index) => (
            <div className={styles.visualCard} data-portfolio-visual key={card.title}>
              <div className={styles.image} style={{ backgroundImage: `url(${projectImages[index % projectImages.length]})` }} />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
          ))}
          <div className={styles.telemetry} aria-hidden="true">
            PROJECT: SELECTED
            <br />
            STATUS: LIVE
            <br />
            MODE: SCROLL
          </div>
        </div>

        <div className={styles.copyPane}>
          <div className={styles.kicker}>{homepageContent.portfolioHead.label}</div>
          <TextSignalReveal as="h2" scrub start="top 70%">
            {homepageContent.portfolioHead.title}
          </TextSignalReveal>

          <div className={styles.panels}>
            {homepageContent.portfolio.map((card, index) => (
              <article className={styles.panel} data-portfolio-panel key={card.title}>
                <div className={styles.meta}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{card.category}</strong>
                </div>
                <TextSignalReveal as="h3" scrub start="top 68%">
                  {card.title}
                </TextSignalReveal>
                <ul>
                  {card.meta ? <li>{card.meta}</li> : null}
                  <li>{card.summary}</li>
                </ul>
              </article>
            ))}
          </div>

          <div className={styles.progressWrap} aria-hidden="true">
            <span data-portfolio-progress />
          </div>
        </div>
      </div>
    </section>
  );
}
