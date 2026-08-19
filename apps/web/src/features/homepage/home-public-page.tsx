"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { BorderBeam } from "border-beam";
import { homepageContent, type HomeAction } from "@/content/homepage";
import { HeroTextReveal, HeroFadeIn } from "@/components/motion/hero-text-reveal";
import { BackToTop, BrandActionButtonContent, getBrandActionButtonClassName, ProgressIndicator, ToastContainer } from "@/components/ui";
import { AiAdvisorWidget } from "@/features/ai-advisor";
import { LegacyFooter } from "@/features/legacy-site/legacy-footer";
import { LegacyHeader } from "@/features/legacy-site/legacy-header";
import { OfferFunnelController } from "@/features/offer-funnel";
import { HomeBlitScrollSection } from "./home-blit-scroll-section";
import { HomeClientLogoMarqueeSection } from "./home-client-logo-marquee-section";
import { HomeContactSection } from "./home-contact-section";
import { HomeConversionProvider, HomeConversionStateMarker } from "./home-conversion-context";
import { HomeFaqBlogSection } from "./home-faq-blog-section";
import { HomeArchigreenProjectsSection } from "./home-archigreen-projects-section";
import { HomeOffersSection } from "./home-offers-section";
import { HomeProblemsCompassSection } from "./home-problems-compass-section";
import { HomeServicesScrollSection } from "./home-services-scroll-section";
import { HomeTestimonialsSection } from "./home-testimonials-section";
import { HomeWhyMetricsSection } from "./home-why-metrics-section";
import { HomeButton } from "./home-hero-ui";
import styles from "./home-public-page.module.css";

function ActionButton({ action }: { action: HomeAction }) {
  return (
    <HomeButton className={getBrandActionButtonClassName({ size: "hero", variant: action.variant ?? "primary" })} href={action.href}>
      <BrandActionButtonContent>{action.label}</BrandActionButtonContent>
    </HomeButton>
  );
}

export function HomePublicPage() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const gridLineLeftRef = useRef<HTMLDivElement>(null);
  const gridLineRightRef = useRef<HTMLDivElement>(null);
  const matrixLeftRef = useRef<HTMLDivElement>(null);
  const matrixRightRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);
  const pyramidRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = heroSectionRef.current;
    const pyramid = pyramidRef.current;
    const building = buildingRef.current;
    if (!section || !pyramid || !building) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const redDots = section.querySelectorAll(`.${styles.redDot}`);
      const isDesktop = window.matchMedia("(min-width: 769px)").matches;

      gsap.set([gridLineLeftRef.current, gridLineRightRef.current], {
        scaleY: 0,
        transformOrigin: "top",
      });
      gsap.set([matrixLeftRef.current, matrixRightRef.current], { opacity: 0 });
      gsap.set(building, { y: 60, opacity: 0 });
      gsap.set(redDots, { scale: 0.58, opacity: 0 });

      const intro = gsap.timeline({ delay: 0.16 });

      intro
        .to([gridLineLeftRef.current, gridLineRightRef.current], {
          scaleY: 1,
          duration: 0.9,
          ease: "power4.out",
        })
        .to(
          [matrixLeftRef.current, matrixRightRef.current],
          {
            opacity: 0.6,
            duration: 0.72,
            ease: "power3.out",
          },
          "-=0.62",
        )
        .to(
          redDots,
          {
            scale: 1,
            opacity: 1,
            duration: 0.36,
            ease: "power4.out",
            stagger: 0.09,
          },
          "-=0.48",
        )
        .to(
          building,
          {
            y: 0,
            opacity: 1,
            duration: 0.82,
            ease: "power4.out",
          },
          "-=0.12",
        );

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      });

      scrollTimeline
        .to(
          pyramid,
          {
            keyframes: [
              {
                clipPath: "polygon(0% 100%, 0% 100%, 50% 0%, 100% 100%, 100% 100%)",
                duration: 0.52,
              },
              {
                clipPath: "polygon(0% 100%, 0% 0%, 50% 0%, 100% 0%, 100% 100%)",
                duration: 0.48,
              },
            ],
            ease: "none",
          },
          0,
        )
        .fromTo(
          building,
          { yPercent: 0, scale: 1 },
          {
            yPercent: isDesktop ? -7 : -2.5,
            scale: isDesktop ? 1.028 : 1.01,
            ease: "none",
          },
          0,
        );

      if (isDesktop) {
        scrollTimeline
          .fromTo(
            matrixLeftRef.current,
            { xPercent: 0, yPercent: 0 },
            { xPercent: -2, yPercent: -14, ease: "none" },
            0,
          )
          .fromTo(
            matrixRightRef.current,
            { xPercent: 0, yPercent: 0 },
            { xPercent: 2, yPercent: -10, ease: "none" },
            0,
          )
          .fromTo(
            [gridLineLeftRef.current, gridLineRightRef.current],
            { yPercent: 0 },
            { yPercent: -7, ease: "none" },
            0,
          );
      }
    }, section);

    return () => context.revert();
  }, []);

  return (
    <>
      <a className={styles.skipLink} href="#home">
        تخطي إلى المحتوى
      </a>
      <ProgressIndicator />
      <LegacyHeader page="home" />
      <HomeConversionProvider>
        <HomeConversionStateMarker />
        <main className={styles.homepage}>
        <section ref={heroSectionRef} className={styles.hero} id="home">
          {/* Decorative Grid Lines */}
          <div ref={gridLineLeftRef} className={styles.gridLineLeft} aria-hidden="true">
            <span className={styles.redDot} />
          </div>
          <div ref={gridLineRightRef} className={styles.gridLineRight} aria-hidden="true">
            <span className={styles.redDot} />
          </div>

          {/* Dotted matrices */}
          <div ref={matrixLeftRef} className={`${styles.dottedMatrix} ${styles.matrixLeft}`} aria-hidden="true" />
          <div ref={matrixRightRef} className={`${styles.dottedMatrix} ${styles.matrixRight}`} aria-hidden="true" />

          <div className={styles.container}>
            <div className={styles.heroContent}>
              <HeroFadeIn className={styles.heroEyebrowWrapper} delay={0.08}>
                <p className={styles.heroEyebrow}>{homepageContent.hero.eyebrow}</p>
              </HeroFadeIn>

              <HeroTextReveal className={styles.heroH1} delay={0.15}>
                <span className={styles.h1Line}>
                  <span data-word style={{ display: "inline-block", whiteSpace: "pre" }}>نصنع </span>
                  <span data-word style={{ display: "inline-block", whiteSpace: "pre" }}>العلامات </span>
                  <span data-word style={{ display: "inline-block", whiteSpace: "pre" }}>التي </span>
                  <span data-word style={{ display: "inline-block", whiteSpace: "pre" }}>تقود </span>
                </span>
                <br className={styles.h1Break} />
                <span className={styles.h1Line}>
                  <span data-word className={styles.highlightText} style={{ display: "inline-block", whiteSpace: "pre" }}>المستقبل</span>
                </span>
              </HeroTextReveal>

              <HeroFadeIn className={styles.heroSubtitleWrapper} delay={0.25}>
                <p className={styles.heroSubtitle}>{homepageContent.hero.subtitle}</p>
              </HeroFadeIn>

              <HeroFadeIn delay={0.35}>
                <div className={styles.heroActions}>
                  {homepageContent.hero.actions.map((action) => (
                    <ActionButton action={action} key={action.label} />
                  ))}
                </div>
              </HeroFadeIn>

              <HeroFadeIn className={styles.heroTrustLine} delay={0.44}>
                <p>{homepageContent.hero.trustLine}</p>
              </HeroFadeIn>

              <div className={styles.buildingSection}>
                <div ref={buildingRef} className={styles.buildingWrapper}>
                  {/* Waves SVG */}
                  <svg className={styles.waveSvg} viewBox="0 0 1200 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M-100 150 C 150 50, 350 250, 600 150 C 850 50, 1050 250, 1300 150" stroke="rgba(38, 27, 62, 0.08)" strokeWidth="1.5" fill="none" />
                    <path d="M-100 180 C 150 80, 350 280, 600 180 C 850 80, 1050 280, 1300 180" stroke="rgba(38, 27, 62, 0.05)" strokeWidth="1.5" fill="none" />
                    <path d="M-100 120 C 150 20, 350 220, 600 120 C 850 20, 1050 220, 1300 120" stroke="rgba(38, 27, 62, 0.04)" strokeWidth="1" fill="none" />
                  </svg>
                  <BorderBeam size="pulse-outside" colorVariant="colorful" strength={0.7}>
                    <div className={styles.heroMediaArtwork}>
                      <div className={styles.buildingBeamFrame}>
                        <Image
                          src={homepageContent.hero.media[0].poster}
                          alt="واجهة مبنى SWEED"
                          width={800}
                          height={450}
                          priority
                          className={styles.buildingImg}
                        />
                      </div>
                    </div>
                  </BorderBeam>
                </div>
              </div>

            </div>
          </div>

          <div ref={pyramidRef} className={styles.pyramidOverlay} aria-hidden="true" />
        </section>

        <HomeProblemsCompassSection />

        <HomeBlitScrollSection />

        <HomeClientLogoMarqueeSection />

        <HomeServicesScrollSection />

        <HomeWhyMetricsSection />

        <HomeArchigreenProjectsSection />

        <HomeTestimonialsSection />

        <HomeOffersSection />

        <HomeFaqBlogSection />

        <HomeContactSection />
        </main>
      </HomeConversionProvider>
      <LegacyFooter />
      <OfferFunnelController page="home" />
      <AiAdvisorWidget />
      <BackToTop />
      <ToastContainer />
    </>
  );
}
