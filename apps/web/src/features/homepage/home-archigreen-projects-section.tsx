"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrandActionButtonContent, getBrandActionButtonClassName } from "@/components/ui/brand-action-button";
import { homepageContent } from "@/content/homepage";
import styles from "./home-archigreen-projects-section.module.css";

export function HomeArchigreenProjectsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const projects = homepageContent.portfolio;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.querySelectorAll<HTMLElement>("[data-carousel-slide]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.carouselIndex);
        if (Number.isFinite(index)) setActiveIndex(index);
      },
      { root: track, threshold: [0.45, 0.65, 0.85] },
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  const goToProject = (index: number) => {
    const track = trackRef.current;
    if (!track || projects.length === 0) return;

    const normalizedIndex = (index + projects.length) % projects.length;
    const slide = track.querySelector<HTMLElement>(`[data-carousel-index="${normalizedIndex}"]`);
    if (!slide) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    slide.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "start",
    });
    setActiveIndex(normalizedIndex);
  };

  return (
    <section className={styles.section} id="portfolio" aria-labelledby="home-portfolio-title">
      <div className={styles.container}>
        <div className={styles.headingLayout}>
          <div className={styles.headingCopy}>
            <p className={styles.kicker}>{homepageContent.portfolioHead.label}</p>
            <h2 id="home-portfolio-title">{homepageContent.portfolioHead.title}</h2>
            <p>{homepageContent.portfolioHead.description}</p>
            <small>بننشر الأرقام الموثقة فقط. دراسات الحالة الأخرى بتظهر بوضوح كـ«قيد التوثيق» لحد اعتمادها.</small>
          </div>

          <div className={styles.headingActions}>
            <div className={styles.carouselControls} role="group" aria-label="التنقل بين الأعمال المختارة">
              <button type="button" aria-label="المشروع السابق" onClick={() => goToProject(activeIndex - 1)}>
                <span aria-hidden="true">→</span>
              </button>
              <button type="button" aria-label="المشروع التالي" onClick={() => goToProject(activeIndex + 1)}>
                <span aria-hidden="true">←</span>
              </button>
            </div>
            <Link className={getBrandActionButtonClassName({ size: "compact", variant: "secondary" })} href="/portfolio">
              <BrandActionButtonContent>شاهد كل الأعمال</BrandActionButtonContent>
            </Link>
          </div>
        </div>

        <div
          ref={trackRef}
          className={styles.projectsTrack}
          role="region"
          aria-roledescription="carousel"
          aria-label="أعمال SWEED المختارة"
        >
          {projects.map((project, index) => (
            <article
              className={styles.projectCard}
              data-active={activeIndex === index ? "true" : "false"}
              data-carousel-index={index}
              data-carousel-slide
              data-status={project.verification}
              data-testid="home-portfolio-card"
              key={project.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} من ${projects.length}: ${project.title}`}
            >
              <figure className={styles.projectMedia}>
                <Image
                  src={project.image ?? "/images/hero/custom-image.png"}
                  alt={`عرض بصري لمشروع ${project.title}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1100px) 72vw, 58vw"
                />
              </figure>

              <div className={styles.projectBody}>
                <div className={styles.projectMeta}>
                  <span>{project.category}</span>
                  <span className={styles.proofState} data-status={project.verification}>
                    {project.verification === "verified" ? "نتيجة موثقة" : "قيد التوثيق"}
                  </span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <strong className={styles.result} data-pending={project.verification === "pending" ? "true" : "false"}>
                  {project.result}
                </strong>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
