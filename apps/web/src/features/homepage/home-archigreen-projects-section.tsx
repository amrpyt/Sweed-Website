"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import styles from "./home-archigreen-projects-section.module.css";

const projectFilters = ["كل البراندنج", "كل الحملات", "كل المواقع"];

const demoProjects = [
  {
    number: "1",
    category: "استراتيجية علامة",
    scope: "هوية كاملة",
    location: "القاهرة",
    title: "إطلاق علامة نوفا",
    summary:
      "بنينا منصة علامة كاملة من التموضع والرسالة إلى النظام البصري وتجربة الإطلاق، بحيث تتحول الفكرة إلى حضور واضح قابل للقياس.",
    image: "/images/hero/custom-image.png",
  },
  {
    number: "2",
    category: "حملة نمو",
    scope: "Sprint 90 يوم",
    location: "MENA",
    title: "محرك عملاء Pulse",
    summary:
      "نظام حملة يعتمد على عروض واضحة، صفحات هبوط، اختبارات كرياتيف، وتحسين أسبوعي يحول الانتباه إلى فرص بيع مؤهلة.",
    image: "/images/hero/entrepreneur-laptop-office.jpg",
  },
  {
    number: "3",
    category: "تجربة موقع",
    scope: "إعادة تصميم",
    location: "Remote",
    title: "حضور Astra الرقمي",
    summary:
      "تجربة موقع عالية الثقة تعيد ترتيب الخدمات، الإثباتات، ودعوات التواصل في مسار أوضح من الاكتشاف إلى طلب الاستشارة.",
    image: "/images/hero/two-men-consultation.jpg",
  },
  {
    number: "4",
    category: "نظام محتوى",
    scope: "سرد بصري",
    location: "مصر",
    title: "Signal Content Studio",
    summary:
      "نظام محتوى واتجاه بصري قابل للتكرار للسوشيال والإعلانات والمبيعات، عشان العلامة تفضل ثابتة في كل نقطة تواصل.",
    image: "/images/homepage/strategy-horse.png",
  },
];

export function HomeArchigreenProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;

    if (!section || !track || !progress) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      const stackSource = document.querySelector<HTMLElement>('[data-projects-stack-source="true"]');
      const images = gsap.utils.toArray<HTMLElement>(`.${styles.projectImage}`);
      const copyBlocks = gsap.utils.toArray<HTMLElement>(`.${styles.copyReveal}`);

      if (reduceMotion || !desktop) {
        gsap.set(track, { x: 0 });
        gsap.set(progress, { scaleX: 1 });
        gsap.set(images, { clipPath: "circle(100% at 50% 50%)" });
        gsap.set(copyBlocks, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(track, { x: 0 });
      gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(section, { zIndex: 12 });

      const stackTrigger = stackSource
        ? ScrollTrigger.create({
            trigger: stackSource,
            start: "top top",
            end: "+=118%",
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          })
        : null;
      gsap.set(images, { clipPath: "circle(24% at 50% 50%)" });
      gsap.set(copyBlocks, { opacity: 0, y: 34 });

      const getScrollAmount = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const horizontalTween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      const mainTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        scrub: 1,
        animation: horizontalTween,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(progress, {
            scaleX: self.progress,
            transformOrigin: "left center",
          });
        },
        onLeave: () => {
          gsap.to(progress, { scaleX: 0.92, transformOrigin: "center center", duration: 0.25, ease: "power2.out" });
        },
        onEnterBack: () => {
          gsap.to(progress, { scaleX: 1, transformOrigin: "center center", duration: 0.25, ease: "power2.out" });
        },
      });

      images.forEach((image) => {
        gsap.fromTo(
          image,
          { clipPath: "circle(24% at 50% 50%)" },
          {
            clipPath: "circle(100% at 50% 50%)",
            duration: 2.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: image,
              containerAnimation: horizontalTween,
              start: "left 62%",
              end: "left 30%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      copyBlocks.forEach((block) => {
        gsap.to(block, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: block,
            containerAnimation: horizontalTween,
            start: "left 68%",
            toggleActions: "play none none reverse",
          },
        });
      });

      ScrollTrigger.refresh();

      return () => {
        stackTrigger?.kill();
        mainTrigger.kill();
        horizontalTween.kill();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="portfolio" aria-label="أعمال سويد المختارة">
      <div ref={trackRef} className={styles.track}>
        <div className={styles.sideSpacer} aria-hidden="true" />

        <article className={styles.introPanel}>
          <div className={styles.introMain}>
            <p className={styles.kicker}>مشاريعنا</p>
            <h2>أكثر من 100 مشروع مكتمل، نعرض من خلالهم أفضل ما قدمناه عبر مجالات خدماتنا المختلفة.</h2>
          </div>

          <div className={styles.filters} aria-label="تصنيفات المشاريع">
            {projectFilters.map((filter) => (
              <a href="#contact" className={styles.filterButton} key={filter}>
                {filter}
              </a>
            ))}
          </div>
        </article>

        {demoProjects.map((project) => (
          <article className={styles.projectPanel} key={project.title}>
            <div className={styles.projectMeta}>
              <span>{project.category}</span>
              <span>{project.scope}</span>
              <span>{project.location}</span>
            </div>

            <div className={styles.projectBody}>
              <span className={styles.projectNumber}>{project.number}</span>
              <div className={styles.copyReveal}>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
            </div>

            <figure className={styles.projectImage}>
              <Image src={project.image} alt="" fill sizes="(max-width: 900px) 92vw, 46vw" className={styles.image} />
            </figure>
          </article>
        ))}

        <div className={styles.sideSpacer} aria-hidden="true" />
      </div>

      <span className={styles.progressBar} aria-hidden="true">
        <span ref={progressRef} />
      </span>
    </section>
  );
}
