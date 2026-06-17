"use client";

import gsap from "gsap";
import { useRef, useLayoutEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import type { SimpleIcon } from "simple-icons";
import { siDocker, siGithub, siNextdotjs, siPrisma, siReact, siTailwindcss, siVercel } from "simple-icons";
import { homepageContent, type HomeAction, type HomeCard, type HomeProcessStep } from "@/content/homepage";
import { LogoLoop } from "@/components/motion/logo-loop";
import { Reveal } from "@/components/motion/reveal";
import { HeroTextReveal, HeroFadeIn } from "@/components/motion/hero-text-reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { Preloader } from "@/components/motion/preloader";
import { BackToTop, ProgressIndicator, ToastContainer } from "@/components/ui";
import { AiAdvisorWidget } from "@/features/ai-advisor";
import { LegacyFooter } from "@/features/legacy-site/legacy-footer";
import { LegacyHeader } from "@/features/legacy-site/legacy-header";
import { OfferFunnelController } from "@/features/offer-funnel";
import { Chess3DSection } from "./chess-3d-section";
import { HomeButton, HomeCard as HeroHomeCard, HomeChip } from "./home-hero-ui";
import styles from "./home-public-page.module.css";

function Icon({ name }: { name: string }) {
  if (name === "fa-arrow-left" || name === "fa-arrow-up-left" || name === "fa-arrow-up-right") {
    return (
      <svg
        aria-hidden="true"
        className={styles.directionalIcon}
        fill="none"
        height="20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        width="20"
      >
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
      </svg>
    );
  }
  return <i aria-hidden="true" className={name.includes(" ") ? name : `fas ${name}`} />;
}

function ActionButton({ action }: { action: HomeAction }) {
  const variantClass =
    action.variant === "secondary" ? styles.buttonSecondary : action.variant === "light" ? styles.buttonLight : styles.buttonPrimary;

  return (
    <HomeButton className={`${styles.button} ${variantClass}`} href={action.href}>
      <span className={styles.buttonIconPrefix}>
        <Icon name={action.icon} />
      </span>
      <span className={styles.buttonText}>{action.label}</span>
    </HomeButton>
  );
}

function SectionHeader({ title, summary }: { title: string; summary: string }) {
  return (
    <div className={styles.sectionHeader}>
      <h2>{title}</h2>
      <p>{summary}</p>
    </div>
  );
}

function ProblemCard({ card }: { card: HomeCard }) {
  return (
    <HeroHomeCard className={styles.problemCard}>
      <div className={styles.problemCardHeader}>
        <div className={styles.problemIcon}>
          <Icon name={card.icon} />
        </div>
        <h3>{card.title}</h3>
      </div>
    </HeroHomeCard>
  );
}

function FeatureCard({ card }: { card: HomeCard }) {
  const body = (
    <>
      <div className={styles.featureIcon}>
        <Icon name={card.icon} />
      </div>
      <h3>{card.title}</h3>
      <p>{card.summary}</p>
      {card.meta ? <span className={styles.meta}>{card.meta}</span> : null}
    </>
  );

  return card.href ? (
    <Link className={styles.featureCard} href={card.href}>
      {body}
    </Link>
  ) : (
    <HeroHomeCard className={styles.featureCard}>{body}</HeroHomeCard>
  );
}

function WhyPoint({ card }: { card: HomeCard }) {
  return (
    <div className={styles.whyPoint}>
      <span className={styles.whyPointIcon}>
        <Icon name={card.icon} />
      </span>
      <div>
        <h3>{card.title}</h3>
        <p>{card.summary}</p>
      </div>
    </div>
  );
}

function PortfolioCard({ card }: { card: HomeCard }) {
  return (
    <Link className={styles.portfolioCard} href={card.href ?? "/portfolio"}>
      <div className={styles.portfolioIcon}>
        <Icon name={card.icon} />
      </div>
      <div className={styles.portfolioContent}>
        {card.category ? <HomeChip className={styles.categoryChip}>{card.category}</HomeChip> : null}
        <h3>{card.title}</h3>
        <p>{card.summary}</p>
        {card.meta ? <span>{card.meta}</span> : null}
      </div>
    </Link>
  );
}

function PortfolioCarouselActions({
  onPrevious,
  onNext,
}: {
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className={styles.portfolioRowHeader}>
      <button className={styles.portfolioNav} onClick={onPrevious} type="button" aria-label="الأعمال السابقة">
        <Icon name="fa-chevron-right" />
      </button>
      <button className={styles.portfolioNav} onClick={onNext} type="button" aria-label="الأعمال التالية">
        <Icon name="fa-chevron-left" />
      </button>
    </div>
  );
}

function ServiceCard({ card }: { card: HomeCard }) {
  return (
    <Link className={styles.serviceCard} href={card.href ?? "/services"}>
      <div className={styles.serviceIcon}>
        <Icon name={card.icon} />
      </div>
      <h3>{card.title}</h3>
    </Link>
  );
}

function ProcessCard({ step, index }: { step: HomeProcessStep; index: number }) {
  return (
    <HeroHomeCard className={styles.processCard}>
      <div className={styles.processNumber}>{index + 1}</div>
      <div className={styles.processIcon}>
        <Icon name={step.icon} />
      </div>
      <h3>{step.title}</h3>
      <p>{step.summary}</p>
      <small>
        <Icon name="fa-clock" />
        {step.duration}
      </small>
    </HeroHomeCard>
  );
}

function ProductCard({ card }: { card: HomeCard }) {
  return (
    <Link className={styles.productCard} href={card.href ?? "/products"}>
      <div className={styles.productImage}>
        <Icon name={card.icon} />
      </div>
      <div className={styles.productBody}>
        <h3>{card.title}</h3>
        <p>{card.summary}</p>
        <div className={styles.productFooter}>
          <div>
            {card.oldPrice ? <span>{card.oldPrice}</span> : null}
            {card.price ? <strong>{card.price}</strong> : null}
          </div>
          <em>اشتري الآن</em>
        </div>
      </div>
    </Link>
  );
}

function ArticleCard({ card }: { card: HomeCard }) {
  return (
    <Link className={styles.articleCard} href={card.href ?? "/articles"}>
      <div className={styles.articleIcon}>
        <Icon name={card.icon} />
      </div>
      <div className={styles.articleBody}>
        {card.category ? <HomeChip className={styles.categoryChip}>{card.category}</HomeChip> : null}
        {card.meta ? <span className={styles.articleMeta}>{card.meta}</span> : null}
        <h3>{card.title}</h3>
        <p>{card.summary}</p>
        <strong>اقرأ المزيد <Icon name="fa-arrow-left" /></strong>
      </div>
    </Link>
  );
}

function FaqCard({ card }: { card: HomeCard }) {
  return (
    <details className={styles.faqItem}>
      <summary>
        <span>{card.title}</span>
        <Icon name="fa-chevron-down" />
      </summary>
      <p>{card.summary}</p>
    </details>
  );
}

function BrandLogo({ icon }: { icon: SimpleIcon }) {
  return (
    <svg aria-hidden="true" className={styles.clientLogo} role="img" viewBox="0 0 24 24">
      <path d={icon.path} />
    </svg>
  );
}

const partnerLogos = [siReact, siNextdotjs, siTailwindcss, siVercel, siGithub, siDocker, siPrisma].map((icon) => ({
  node: <BrandLogo icon={icon} />,
  title: icon.title,
}));

export function HomePublicPage() {
  const portfolioSectionRef = useRef<HTMLDivElement>(null);
  const portfolioTrackRef = useRef<HTMLDivElement>(null);
  const portfolioProgressLineRef = useRef<HTMLDivElement>(null);
  const hoverPillRef = useRef<HTMLDivElement>(null);
  const [activePortfolioIndex, setActivePortfolioIndex] = useState(0);

  const heroSectionRef = useRef<HTMLDivElement>(null);
  const gridLineLeftRef = useRef<HTMLDivElement>(null);
  const gridLineRightRef = useRef<HTMLDivElement>(null);
  const matrixLeftRef = useRef<HTMLDivElement>(null);
  const matrixRightRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);
  const clientsStripRef = useRef<HTMLElement>(null);

  const scrollToPortfolioCard = (index: number) => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      const container = portfolioTrackRef.current;
      if (!container) return;
      const cards = container.querySelectorAll(`.${styles.portfolioCard}`);
      const card = cards[index];
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
      setActivePortfolioIndex(index);
      return;
    }

    const st = ScrollTrigger.getAll().find((trigger) => trigger.trigger === portfolioSectionRef.current);
    if (!st) return;

    const targetProgress = index / (homepageContent.portfolio.length - 1);
    const targetScroll = st.start + targetProgress * (st.end - st.start);

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  const handleMobileScroll = () => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;
    const container = portfolioTrackRef.current;
    if (!container) return;

    const scrollLeft = Math.abs(container.scrollLeft);
    const card = container.querySelector<HTMLAnchorElement>(`.${styles.portfolioCard}`);
    const cardWidth = card ? card.getBoundingClientRect().width : container.clientWidth * 0.75;
    const index = Math.round(scrollLeft / (cardWidth + 16)); // card width + gap
    setActivePortfolioIndex(Math.max(0, Math.min(index, homepageContent.portfolio.length - 1)));
  };

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const section = heroSectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    // Set initial states
    gsap.set([gridLineLeftRef.current, gridLineRightRef.current], { scaleY: 0, transformOrigin: "top" });
    gsap.set([matrixLeftRef.current, matrixRightRef.current], { opacity: 0, filter: "blur(4px)" });
    gsap.set(buildingRef.current, { y: 60, opacity: 0 });
    
    const redDots = section.querySelectorAll(`.${styles.redDot}`);
    gsap.set(redDots, { scale: 0 });

    // Timeline for assets reveal (starts when preloader triangle begins opening: 1.6s)
    const tl = gsap.timeline({ delay: 1.6 });

    tl.to([gridLineLeftRef.current, gridLineRightRef.current], {
      scaleY: 1,
      duration: 1.2,
      ease: "power4.out",
    })
    .to([matrixLeftRef.current, matrixRightRef.current], {
      opacity: 0.6,
      filter: "blur(0px)",
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
    }, "+=0.4");

    // ScrollTrigger for the pyramid reveal of the Partners section over the building
    const pyramid = clientsStripRef.current?.querySelector(`.${styles.pyramidOverlay}`);
    const stTl = gsap.timeline({
      scrollTrigger: {
        trigger: section, // heroSectionRef.current
        start: "top top", // Starts immediately on scroll
        end: "bottom top", // End when bottom of hero section hits top of screen
        scrub: 1,          // Smooth scrubbing
      }
    });

    if (pyramid) {
      stTl.to(pyramid, {
        clipPath: "polygon(0% 100%, 0% 100%, 50% 0%, 100% 100%, 100% 100%)",
        duration: 1,
        ease: "none"
      }).to(pyramid, {
        clipPath: "polygon(0% 100%, 0% 0%, 50% 0%, 100% 0%, 100% 100%)",
        duration: 1,
        ease: "none"
      });
    }

    // Portfolio horizontal scroll trigger with lateral pin indicator
    const portfolioSection = portfolioSectionRef.current;
    const portfolioTrack = portfolioTrackRef.current;
    const progressLineFill = portfolioProgressLineRef.current;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      if (!portfolioSection || !portfolioTrack) return;

      const getScrollDistance = () => {
        const panels = Array.from(portfolioTrack.children) as HTMLElement[];
        const lastPanel = panels.at(-1);
        if (!lastPanel) return Math.max(0, portfolioTrack.scrollWidth - window.innerWidth);

        const lastPanelEnd = lastPanel.offsetLeft + lastPanel.offsetWidth;
        const trackInset = Math.max(0, portfolioTrack.getBoundingClientRect().left);
        const viewportEndPadding = Math.min(96, window.innerWidth * 0.08);
        return Math.max(0, trackInset + lastPanelEnd - window.innerWidth + viewportEndPadding);
      };
      const scrollWidth = getScrollDistance();

      if (scrollWidth <= 0) return;

      const portfolioTween = gsap.to(portfolioTrack, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: portfolioSection,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          start: "top top+=72",
          end: () => `+=${getScrollDistance() + window.innerHeight * 0.75}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressLineFill) {
              gsap.set(progressLineFill, { scaleX: self.progress });
            }
            const numItems = homepageContent.portfolio.length;
            const activeCardIndex = Math.min(
              Math.floor(self.progress * numItems),
              numItems - 1
            );
            setActivePortfolioIndex(Math.max(0, activeCardIndex));
          },
        },
      });

      // 3D scrolling tilt effect for the cards (physics/animations)
      const cards = Array.from(portfolioTrack.children) as HTMLElement[];
      const cardTweens: gsap.core.Tween[] = [];
      
      cards.forEach((card) => {
        const tween = gsap.fromTo(card,
          {
            rotationY: 25,
            z: -120,
            opacity: 0.8,
          },
          {
            rotationY: -25,
            z: -120,
            opacity: 0.8,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: portfolioTween,
              start: "left right",
              end: "right left",
              scrub: true,
            }
          }
        );
        cardTweens.push(tween);
      });

      return () => {
        portfolioTween.kill();
        cardTweens.forEach((t) => t.kill());
      };
    });

    // Custom cursor follower (hover pill) logic for desktop pointer
    const hoverPill = hoverPillRef.current;
    let cleanupCursor: (() => void) | undefined;

    if (portfolioSection && hoverPill && window.matchMedia("(pointer: fine)").matches) {
      const onMouseMove = (e: MouseEvent) => {
        const rect = portfolioSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(hoverPill, {
          x: x,
          y: y,
          duration: 0.25,
          ease: "power2.out",
        });
      };

      const onMouseEnter = () => {
        gsap.to(hoverPill, {
          scale: 1,
          opacity: 1,
          duration: 0.2,
        });
      };

      const onMouseLeave = () => {
        gsap.to(hoverPill, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
        });
      };

      portfolioSection.addEventListener("mousemove", onMouseMove);
      portfolioSection.addEventListener("mouseenter", onMouseEnter);
      portfolioSection.addEventListener("mouseleave", onMouseLeave);

      const cards = portfolioSection.querySelectorAll(`.${styles.portfolioCard}`);
      const onCardEnter = () => {
        hoverPill.classList.add(styles.hoverPillActive);
        gsap.to(hoverPill, {
          backgroundColor: "#ed2062",
          borderColor: "transparent",
          color: "#fff",
          scale: 1.3,
          duration: 0.2,
        });
      };

      const onCardLeave = () => {
        hoverPill.classList.remove(styles.hoverPillActive);
        gsap.to(hoverPill, {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(255, 255, 255, 0.3)",
          color: "transparent",
          scale: 1,
          duration: 0.2,
        });
      };

      cards.forEach((card) => {
        card.addEventListener("mouseenter", onCardEnter);
        card.addEventListener("mouseleave", onCardLeave);
      });

      cleanupCursor = () => {
        portfolioSection.removeEventListener("mousemove", onMouseMove);
        portfolioSection.removeEventListener("mouseenter", onMouseEnter);
        portfolioSection.removeEventListener("mouseleave", onMouseLeave);
        cards.forEach((card) => {
          card.removeEventListener("mouseenter", onCardEnter);
          card.removeEventListener("mouseleave", onCardLeave);
        });
      };
    }

    return () => {
      tl.kill();
      stTl.kill();
      mm.revert();
      if (cleanupCursor) cleanupCursor();
    };
  }, []);

  return (
    <>
      <Preloader />
      <a className={styles.skipLink} href="#home">
        تخطي إلى المحتوى
      </a>
      <ProgressIndicator />
      <LegacyHeader page="home" />
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
              <div className={styles.heroEyebrowWrapper}>
                <HeroFadeIn delay={2.5}>
                  <div className={styles.heroEyebrow}>
                    <span>SWEED</span>
                    <span className={styles.divider} />
                    <span>MARKETING & ADVERTISING</span>
                  </div>
                </HeroFadeIn>
              </div>

              <HeroTextReveal className={styles.heroH1} delay={2.5}>
                <span data-word style={{ display: "inline-block", whiteSpace: "pre" }}>نصنع </span>
                <span data-word style={{ display: "inline-block", whiteSpace: "pre" }}>العلامات </span>
                <br className={styles.h1Break} />
                <span data-word style={{ display: "inline-block", whiteSpace: "pre" }}>التي </span>
                <span data-word style={{ display: "inline-block", whiteSpace: "pre" }}>تقود </span>
                <br className={styles.h1Break} />
                <span data-word className={styles.highlightText} style={{ display: "inline-block", whiteSpace: "pre" }}>المستقبل.</span>
              </HeroTextReveal>

              <HeroFadeIn className={styles.heroSubtitleWrapper} delay={2.8}>
                <p className={styles.heroSubtitle}>
                  نحن وكالة تسويق وتصميم علامات تجارية متكاملة.
                </p>
                <p className={styles.heroSubtitle}>
                  نساعد الشركات الطموحة على بناء حضور قوي، وتجربة متكاملة، ونمو مستدام.
                </p>
              </HeroFadeIn>

              <HeroFadeIn delay={3.0}>
                <div className={styles.heroActions}>
                  {homepageContent.hero.actions.map((action) => (
                    <MagneticButton key={action.label}>
                      <ActionButton action={action} />
                    </MagneticButton>
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
                  <Image
                    src="/images/hero/custom-image.png"
                    alt="SWEED Building Mockup"
                    width={800}
                    height={450}
                    priority
                    className={styles.buildingImg}
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        <section ref={clientsStripRef} className={styles.clientsStrip} id="expertise" aria-label="عملاؤنا">
          <div className={styles.pyramidOverlay} />
          <div className={styles.clientsLabel}>شركاء نجاح اشتغلوا معانا</div>
          <LogoLoop
            ariaLabel="شركاء نجاح اشتغلوا معانا"
            className={styles.clientsMarquee}
            direction="left"
            fadeOut
            fadeOutColor="#ffffff"
            gap={64}
            hoverSpeed={0}
            logoHeight={52}
            logos={partnerLogos}
            scaleOnHover
            speed={46}
          />
        </section>

        <Chess3DSection />

        <section className={styles.problemsSection} id="problems">
          <div className={styles.container}>
            <div className={styles.problemsLayout}>
              <Reveal className={`${styles.sectionHeader} ${styles.problemsHeader}`} variant="slideStart">
                <span>تشخيص سريع</span>
                <h2>هل تواجه هذه المشاكل؟</h2>
                <p>اختار التحدي الأقرب لك، ونرتب لك بداية واضحة.</p>
              </Reveal>
              <div className={styles.problemsGrid}>
                {homepageContent.problems.map((card, index) => (
                  <Reveal as="article" delay={index * 55} key={card.title} variant="scaleIn">
                    <ProblemCard card={card} />
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal className={styles.problemsCta} variant="soft">
              <span>ابدأ بخطوة واضحة</span>
              <ActionButton action={{ label: "احجز استشارتك الآن", href: "/contact?services=consulting#contact-form", icon: "fa-calendar-check", variant: "primary" }} />
            </Reveal>
          </div>
        </section>

        <section className={styles.servicesSection} id="services">
          <div className={styles.container}>
            <SectionHeader title="خدماتنا المتكاملة" summary="كل خدمة لها هدف واضح: بناء ثقة، زيادة طلب، أو تحسين تجربة العميل." />
            <div className={styles.servicesGrid}>
              {homepageContent.services.map((card, index) => (
                <Reveal delay={index * 70} key={card.title} variant="scaleIn">
                  <ServiceCard card={card} />
                </Reveal>
              ))}
            </div>
            <Reveal className={styles.servicesCta} variant="soft">
              <ActionButton action={{ label: "مشاهدة كل الخدمات", href: "/services", icon: "fa-arrow-left", variant: "primary" }} />
            </Reveal>
          </div>
        </section>

        <section className={styles.whySection} id="about">
          <div className={styles.container}>
            <div className={styles.whyLayout}>
              <div>
                <SectionHeader title="ليه تختار SWEED؟" summary="فريق واحد يرتب الرسالة، ينفذ، ويقيس النتيجة." />
                <div className={styles.whyGrid}>
                  {homepageContent.why.map((card, index) => (
                    <Reveal delay={index * 70} key={card.title} variant="scaleIn">
                      <WhyPoint card={card} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={portfolioSectionRef} className={styles.portfolioSection} id="portfolio">
          <div ref={hoverPillRef} className={styles.hoverPill}>
            شاهد المشروع
          </div>
          <div className={styles.container}>
            <div className={styles.portfolioHead}>
              <div className={styles.portfolioYear}>{homepageContent.portfolioHead.year}</div>
              <div className={styles.portfolioHeadTexts}>
                <h2 className={styles.portfolioLabel}>{homepageContent.portfolioHead.label}</h2>
                <p className={styles.portfolioDescription}>
                  {homepageContent.portfolioHead.description}
                </p>
              </div>
              <div className={styles.portfolioHeadingWrap}>
                <h3 className={styles.portfolioHeadingDisplay}>{homepageContent.portfolioHead.title}</h3>
                <div className={styles.portfolioCountBadge}>
                  {homepageContent.portfolio.length}
                </div>
              </div>
            </div>
            
            <div className={styles.portfolioScrollWrapper}>
              {/* Pinned Lateral progress indicator */}
              <div className={styles.lateralIndicator} aria-label="مؤشر معرض الأعمال">
                <div className={styles.progressLine}>
                  <div ref={portfolioProgressLineRef} className={styles.progressLineFill} />
                </div>
                <div className={styles.dotsWrapper}>
                  {homepageContent.portfolio.map((card, index) => (
                    <button
                      key={card.title}
                      className={`${styles.indicatorDot} ${activePortfolioIndex === index ? styles.activeDot : ""}`}
                      onClick={() => scrollToPortfolioCard(index)}
                      type="button"
                      aria-label={`عرض مشروع ${card.title}`}
                    >
                      <span className={styles.dotCircle} />
                      <span className={styles.dotLabel}>
                        <span className={styles.dotNum}>0{index + 1}</span>
                        <span className={styles.dotCategory}>{card.category}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrolling track */}
              <div 
                ref={portfolioTrackRef} 
                className={styles.portfolioTrack}
                onScroll={handleMobileScroll}
              >
                {homepageContent.portfolio.map((card) => (
                  <PortfolioCard card={card} key={card.title} />
                ))}
              </div>
            </div>

            <div className={styles.portfolioFooter}>
              <MagneticButton>
                <ActionButton action={{ label: "مشاهدة كل الأعمال", href: "/portfolio", icon: "fa-arrow-left", variant: "primary" }} />
              </MagneticButton>
            </div>
          </div>
        </section>

        <section className={styles.offersSection} id="offers">
          <div className={styles.container}>
            <SectionHeader title="عروض واضحة تبدأ منها" summary="اختر نقطة البداية، أو احجز استشارة ونرشح لك الأنسب." />
            <div className={styles.featureGrid}>
              {homepageContent.offers.map((card, index) => (
                <Reveal delay={index * 70} key={card.title} variant="scaleIn">
                  <FeatureCard card={card} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.processSection} id="process">
          <div className={styles.container}>
            <SectionHeader title="كيف نعمل معك خطوة بخطوة" summary="مسار واضح من أول مكالمة حتى إطلاق الشغل، بألوان البراند وبدون أي حركة تلقائية تشتت العميل." />
            <div className={styles.processGrid}>
              {homepageContent.process.map((step, index) => (
                <Reveal delay={index * 70} key={step.title} variant="scaleIn">
                  <ProcessCard index={index} step={step} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.productsSection} id="products">
          <div className={styles.container}>
            <SectionHeader title="منتجاتنا الجاهزة" summary="حلول سريعة ومنتجات جاهزة للاستخدام الفوري" />
            <div className={styles.productsGrid}>
              {homepageContent.products.map((card, index) => (
                <Reveal delay={index * 70} key={card.title} variant="scaleIn">
                  <ProductCard card={card} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.blogSection} id="blog">
          <div className={styles.container}>
            <SectionHeader title="المقالات الحديثة" summary="آخر المقالات والنصائح التسويقية المفيدة" />
            <div className={styles.articleGrid}>
              {homepageContent.articles.map((card, index) => (
                <Reveal delay={index * 70} key={card.title} variant="scaleIn">
                  <ArticleCard card={card} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.faqSection} id="faq">
          <div className={styles.container}>
            <SectionHeader title="الأسئلة الشائعة" summary="إجابات على أهم الأسئلة التي قد تخطر ببالك" />
            <div className={styles.faqList}>
              {homepageContent.faq.map((card, index) => (
                <Reveal delay={index * 50} key={card.title} variant="fadeUp">
                  <FaqCard card={card} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection} id="contact">
          <div className={styles.container}>
            <Reveal className={styles.ctaBox} variant="scaleIn">
              <h2>{homepageContent.contact.title}</h2>
              <p>{homepageContent.contact.summary}</p>
              <div className={styles.ctaButtons}>
                <MagneticButton>
                  <ActionButton action={{ label: "احجز استشارة مجانية", href: "/contact?services=consulting#contact-form", icon: "fa-calendar-check", variant: "primary" }} />
                </MagneticButton>
                <MagneticButton>
                  <ActionButton action={{ label: "تواصل معنا الآن", href: "/contact", icon: "fa-phone", variant: "secondary" }} />
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <LegacyFooter />
      <OfferFunnelController page="home" />
      <AiAdvisorWidget />
      <BackToTop />
      <ToastContainer />
    </>
  );
}
