"use client";

import EmblaCarousel from "embla-carousel";
import AutoScroll, { type AutoScrollType } from "embla-carousel-auto-scroll";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { BrandActionButtonContent, getBrandActionButtonClassName } from "@/components/ui/brand-action-button";
import { homepageContent } from "@/content/homepage";
import styles from "./home-archigreen-projects-section.module.css";

export function HomeArchigreenProjectsSection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const carouselStageRef = useRef<HTMLDivElement>(null);
  const emblaApiRef = useRef<ReturnType<typeof EmblaCarousel> | null>(null);
  const autoScrollRef = useRef<AutoScrollType | null>(null);
  const mouseInsideRef = useRef(false);
  const focusInsideRef = useRef(false);
  const projects = homepageContent.portfolio;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const autoScroll = AutoScroll({
      direction: "forward",
      playOnInit: true,
      speed: 0.7,
      startDelay: 700,
      stopOnFocusIn: false,
      stopOnInteraction: true,
      stopOnMouseEnter: false,
    });
    const embla = EmblaCarousel(
      viewport,
      {
        align: "start",
        direction: "rtl",
        dragFree: true,
        loop: true,
      },
      [autoScroll],
    );

    emblaApiRef.current = embla;
    autoScrollRef.current = autoScroll;

    return () => {
      emblaApiRef.current = null;
      autoScrollRef.current = null;
      embla.destroy();
    };
  }, []);

  const stopAutoScroll = () => {
    autoScrollRef.current?.stop();
  };

  const resumeAutoScroll = () => {
    if (mouseInsideRef.current || focusInsideRef.current) return;
    autoScrollRef.current?.play(0);
  };

  const moveCarousel = (direction: "previous" | "next") => {
    const embla = emblaApiRef.current;
    if (!embla) return;

    stopAutoScroll();
    if (direction === "previous") embla.scrollPrev();
    else embla.scrollNext();

    if (!mouseInsideRef.current && !focusInsideRef.current) {
      autoScrollRef.current?.play(700);
    }
  };

  const handleMouseEnter = () => {
    mouseInsideRef.current = true;
    stopAutoScroll();
  };

  const handleMouseLeave = () => {
    mouseInsideRef.current = false;
    resumeAutoScroll();
  };

  const handleFocusCapture = () => {
    focusInsideRef.current = true;
    stopAutoScroll();
  };

  const handleBlurCapture = (event: React.FocusEvent<HTMLDivElement>) => {
    const stage = carouselStageRef.current;
    if (stage?.contains(event.relatedTarget as Node | null)) return;

    focusInsideRef.current = false;
    resumeAutoScroll();
  };

  return (
    <section className={styles.section} id="portfolio" aria-labelledby="home-portfolio-title">
      <div className={styles.container}>
        <div className={styles.headingLayout}>
          <div className={styles.headingCopy}>
            <p className={styles.kicker}>{homepageContent.portfolioHead.label}</p>
            <h2 id="home-portfolio-title">{homepageContent.portfolioHead.title}</h2>
            <p>{homepageContent.portfolioHead.description}</p>
          </div>

        </div>

        <div
          ref={carouselStageRef}
          className={styles.carouselStage}
          onBlurCapture={handleBlurCapture}
          onFocusCapture={handleFocusCapture}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={viewportRef}
            className={styles.projectsViewport}
            data-testid="home-portfolio-viewport"
            role="region"
            aria-roledescription="carousel"
            aria-label="أعمال SWEED المختارة"
            aria-live="off"
            onPointerUp={resumeAutoScroll}
          >
            <div className={styles.projectsTrack} data-testid="home-portfolio-track">
              {projects.map((project, index) => (
                <article
                  className={styles.projectCard}
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
                      sizes="(max-width: 640px) 88vw, (max-width: 1100px) 56vw, 36vw"
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

          <button
            type="button"
            className={`${styles.carouselNavButton} ${styles.carouselPrevious}`}
            data-testid="home-portfolio-prev"
            aria-label="المشروع السابق"
            onClick={() => moveCarousel("previous")}
          >
            <i className="fas fa-arrow-right" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${styles.carouselNavButton} ${styles.carouselNext}`}
            data-testid="home-portfolio-next"
            aria-label="المشروع التالي"
            onClick={() => moveCarousel("next")}
          >
            <i className="fas fa-arrow-left" aria-hidden="true" />
          </button>
        </div>

        <div className={styles.headingActions}>
          <Link className={getBrandActionButtonClassName({ size: "compact", variant: "secondary" })} href="/portfolio">
            <BrandActionButtonContent>شاهد كل الأعمال</BrandActionButtonContent>
          </Link>
        </div>
      </div>
    </section>
  );
}
