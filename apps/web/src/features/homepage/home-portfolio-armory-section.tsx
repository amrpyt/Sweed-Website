"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { homepageContent } from "@/content/homepage";
import styles from "./home-portfolio-armory-section.module.css";

const projectImages = [
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
];

function SignalText({ as: Tag, children }: { as: "h2" | "h3"; children: string }) {
  return (
    <Tag>
      {children
        .trim()
        .split(/\s+/)
        .map((word, index, words) => (
          <span data-portfolio-word key={`${word}-${index}`}>
            {word}
            {index < words.length - 1 ? " " : ""}
          </span>
        ))}
    </Tag>
  );
}

export function HomePortfolioArmorySection() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const panels = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-portfolio-panel]"));
    const visualCards = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-portfolio-visual]"));
    const wordGroups = panels.map((panel) => gsap.utils.toArray<HTMLElement>(panel.querySelectorAll("[data-portfolio-word]")));
    const headingWords = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-portfolio-heading] [data-portfolio-word]"));
    const progress = root.querySelector<HTMLElement>("[data-portfolio-progress]");
    if (panels.length === 0 || visualCards.length === 0 || !progress) return;

    gsap.set(panels.slice(1), { autoAlpha: 0, y: 42, filter: "blur(14px)" });
    gsap.set(visualCards.slice(1), { autoAlpha: 0, y: 70, scale: 0.96, filter: "blur(14px)" });
    gsap.set(root.querySelectorAll<HTMLElement>("[data-portfolio-word]"), {
      color: "#ed2062",
      display: "inline-block",
      filter: "blur(7px)",
      opacity: 0,
      y: "0.45em",
    });
    gsap.set([...headingWords, ...wordGroups[0]], { color: "#1f1735", filter: "blur(0px)", opacity: 1, y: 0 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: () => `+=${window.innerHeight * (panels.length - 1)}`,
        pin: true,
        scrub: 0.7,
        invalidateOnRefresh: true,
      },
    });

    timeline.to(progress, { scaleX: 1, duration: panels.length - 1, ease: "none" }, 0);

    panels.forEach((panel, index) => {
      if (index === 0) return;
      timeline
        .to([panels[index - 1], visualCards[index - 1]], { autoAlpha: 0, y: 42, filter: "blur(14px)", duration: 0.22, ease: "none" }, index - 0.18)
        .to(visualCards[index], { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.28, ease: "none" }, index - 0.08)
        .to(panel, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.28, ease: "none" }, index - 0.08)
        .to(wordGroups[index], { color: "#ed2062", filter: "blur(7px)", opacity: 0, y: "0.45em", duration: 0.01, stagger: 0 }, index - 0.08)
        .to(wordGroups[index], { color: "#1f1735", filter: "blur(0px)", opacity: 1, y: 0, duration: 0.42, ease: "none", stagger: 0.06 }, index);
    });

    const resetHashScroll = () => {
      if (window.location.hash !== "#portfolio") return;
      window.setTimeout(() => timeline.scrollTrigger?.scroll(timeline.scrollTrigger.start), 80);
      window.setTimeout(() => timeline.scrollTrigger?.scroll(timeline.scrollTrigger.start), 320);
    };

    resetHashScroll();
    window.addEventListener("hashchange", resetHashScroll);

    return () => {
      window.removeEventListener("hashchange", resetHashScroll);
      timeline.kill();
    };
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
          <div data-portfolio-heading>
            <SignalText as="h2">{homepageContent.portfolioHead.title}</SignalText>
          </div>

          <div className={styles.panels}>
            {homepageContent.portfolio.map((card, index) => (
              <article className={styles.panel} data-portfolio-panel key={card.title}>
                <div className={styles.meta}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{card.category}</strong>
                </div>
                <SignalText as="h3">{card.title}</SignalText>
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
