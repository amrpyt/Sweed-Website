"use client";

import gsap from "gsap";
import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { SimpleIcon } from "simple-icons";
import { siDocker, siGithub, siNextdotjs, siPrisma, siReact, siTailwindcss, siVercel } from "simple-icons";
import { homepageContent, type HomeAction, type HomeCard } from "@/content/homepage";
import { LogoLoop } from "@/components/motion/logo-loop";
import { Reveal } from "@/components/motion/reveal";
import { HeroTextReveal, HeroFadeIn } from "@/components/motion/hero-text-reveal";
import { TextSignalReveal } from "@/components/motion";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { BackToTop, ProgressIndicator, ToastContainer } from "@/components/ui";
import { AiAdvisorWidget } from "@/features/ai-advisor";
import { LegacyFooter } from "@/features/legacy-site/legacy-footer";
import { LegacyHeader } from "@/features/legacy-site/legacy-header";
import { OfferFunnelController } from "@/features/offer-funnel";
import { HomePortfolioArmorySection } from "./home-portfolio-armory-section";
import { HomeProblemsCompassSection } from "./home-problems-compass-section";
import { HomeServicesScrollSection } from "./home-services-scroll-section";
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
      <TextSignalReveal as="h2">{title}</TextSignalReveal>
      <p>{summary}</p>
    </div>
  );
}

function FeatureCard({ card }: { card: HomeCard }) {
  const body = (
    <>
      <div className={styles.featureIcon}>
        <Icon name={card.icon} />
      </div>
      <TextSignalReveal as="h3">{card.title}</TextSignalReveal>
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
        <TextSignalReveal as="h3">{card.title}</TextSignalReveal>
        <p>{card.summary}</p>
      </div>
    </div>
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
        <TextSignalReveal as="h3">{card.title}</TextSignalReveal>
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
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const gridLineLeftRef = useRef<HTMLDivElement>(null);
  const gridLineRightRef = useRef<HTMLDivElement>(null);
  const matrixLeftRef = useRef<HTMLDivElement>(null);
  const matrixRightRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);

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

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
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
                  <MagneticButton>
                    <ActionButton action={homepageContent.hero.actions[0]} />
                  </MagneticButton>
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

          <div className={styles.clientsStrip} id="expertise" aria-label="عملاؤنا">
            <div className={styles.pyramidOverlay} />
            <div className={styles.clientsLabel}>شركاء نعتز بهم</div>
            <LogoLoop
              ariaLabel="شركاء نجاح اشتغلوا معانا"
              className={styles.clientsMarquee}
              direction="left"
              fadeOut
              fadeOutColor="#ffffff"
              gap={44}
              hoverSpeed={82}
              logoHeight={34}
              logos={partnerLogos}
              scaleOnHover
              speed={82}
            />
          </div>
        </section>

        <HomeProblemsCompassSection />

        <HomeServicesScrollSection />

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

        <HomePortfolioArmorySection />

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
              <TextSignalReveal as="h2">{homepageContent.contact.title}</TextSignalReveal>
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
