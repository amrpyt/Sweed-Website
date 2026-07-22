"use client";

import gsap from "gsap";
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
import { HomeContactSection } from "./home-contact-section";
import { HomeConversionProvider, HomeConversionStateMarker } from "./home-conversion-context";
import { HomeFaqBlogSection } from "./home-faq-blog-section";
import { HomeGapSection } from "./home-gap-section";
import { HomeArchigreenProjectsSection } from "./home-archigreen-projects-section";
import { HomeOffersSection } from "./home-offers-section";
import { HomeProblemsCompassSection } from "./home-problems-compass-section";
import { HomeProcessCurtainSection } from "./home-process-curtain-section";
import { HomeServicesScrollSection } from "./home-services-scroll-section";
import { HomeVideoDialog } from "./home-video-dialog";
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
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Set initial states
    gsap.set([gridLineLeftRef.current, gridLineRightRef.current], { scaleY: 0, transformOrigin: "top" });
    gsap.set([matrixLeftRef.current, matrixRightRef.current], { opacity: 0 });
    gsap.set(buildingRef.current, { y: 60, opacity: 0 });
    
    const redDots = section.querySelectorAll(`.${styles.redDot}`);
    gsap.set(redDots, { scale: 0 });

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to([gridLineLeftRef.current, gridLineRightRef.current], {
      scaleY: 1,
      duration: 1.2,
      ease: "power4.out",
    })
    .to([matrixLeftRef.current, matrixRightRef.current], {
      opacity: 0.6,
      duration: 0.9,
      ease: "power2.out",
    }, "-=0.8")
    .to(redDots, {
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
      stagger: 0.15,
    }, "-=0.6")
    .to(buildingRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: "power3.out",
    }, "-=0.2");

    const updatePyramid = () => {
      const pyramid = pyramidRef.current;
      if (!pyramid) return;

      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height * 0.75)));
      const phase = progress * 2;
      const peak = phase <= 1 ? 100 - phase * 100 : 0;
      const sides = phase <= 1 ? 100 : 100 - (phase - 1) * 100;
      pyramid.style.clipPath = `polygon(0% 100%, 0% ${sides}%, 50% ${peak}%, 100% ${sides}%, 100% 100%)`;
    };

    updatePyramid();
    window.addEventListener("scroll", updatePyramid, { passive: true });
    window.addEventListener("resize", updatePyramid);

    return () => {
      tl.kill();
      window.removeEventListener("scroll", updatePyramid);
      window.removeEventListener("resize", updatePyramid);
    };
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
              <HeroTextReveal className={styles.heroH1} delay={0.15}>
                <span className={styles.h1Line}>
                  <span data-word style={{ display: "inline-block", whiteSpace: "pre" }}>نصنع </span>
                  <span data-word style={{ display: "inline-block", whiteSpace: "pre" }}>العلامات </span>
                  <span data-word style={{ display: "inline-block", whiteSpace: "pre" }}>التي </span>
                  <span data-word style={{ display: "inline-block", whiteSpace: "pre" }}>تقود </span>
                </span>
                <br className={styles.h1Break} />
                <span className={styles.h1Line}>
                  <span data-word className={styles.highlightText} style={{ display: "inline-block", whiteSpace: "pre" }}>المستقبل.</span>
                </span>
              </HeroTextReveal>

              <HeroFadeIn className={styles.heroSubtitleWrapper} delay={0.25}>
                <p className={styles.heroSubtitle}>
                  نحن وكالة تسويق وتصميم علامات تجارية متكاملة.
                </p>
                <p className={styles.heroSubtitle}>
                  نساعد الشركات الطموحة على بناء حضور قوي، وتجربة متكاملة، ونمو مستدام.
                </p>
              </HeroFadeIn>

              <HeroFadeIn delay={0.35}>
                <div className={styles.heroActions}>
                  {homepageContent.hero.actions.map((action) => (
                    <ActionButton action={action} key={action.label} />
                  ))}
                </div>
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
                    <HomeVideoDialog
                      title="فيديو SWEED التعريفي"
                      videoSrc={homepageContent.hero.media[0].src}
                      poster={homepageContent.hero.media[0].poster}
                      triggerClassName={styles.heroMediaTrigger}
                      triggerTestId="home-hero-video-trigger"
                    >
                      <div className={styles.buildingBeamFrame}>
                        <span className={styles.buildingBeamEdge} aria-hidden="true" />
                        <span className={styles.buildingBeamEdge} aria-hidden="true" />
                        <Image
                          src={homepageContent.hero.media[0].poster}
                          alt={homepageContent.hero.media[0].alt}
                          width={800}
                          height={450}
                          priority
                          className={styles.buildingImg}
                        />
                      </div>
                    </HomeVideoDialog>
                  </BorderBeam>
                </div>
              </div>

            </div>
          </div>

          <div ref={pyramidRef} className={styles.pyramidOverlay} aria-hidden="true" />
        </section>

        <HomeProblemsCompassSection />

        <HomeBlitScrollSection />

        <HomeGapSection />

        <HomeServicesScrollSection />

        <HomeProcessCurtainSection />

        <HomeWhyMetricsSection />

        <HomeArchigreenProjectsSection />

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
