"use client";

import { useRef } from "react";
import Link from "next/link";
import type { SimpleIcon } from "simple-icons";
import { siDocker, siGithub, siNextdotjs, siPrisma, siReact, siTailwindcss, siVercel } from "simple-icons";
import { homepageContent, type HomeAction, type HomeCard, type HomeProcessStep } from "@/content/homepage";
import { LogoLoop } from "@/components/motion/logo-loop";
import { Reveal } from "@/components/motion/reveal";
import { AiAdvisorWidget } from "@/features/ai-advisor";
import { LegacyFooter } from "@/features/legacy-site/legacy-footer";
import { LegacyHeader } from "@/features/legacy-site/legacy-header";
import { OfferFunnelController } from "@/features/offer-funnel";
import { HomeButton, HomeCard as HeroHomeCard, HomeChip } from "./home-hero-ui";
import styles from "./home-public-page.module.css";

function Icon({ name }: { name: string }) {
  return <i aria-hidden="true" className={name.includes(" ") ? name : `fas ${name}`} />;
}

function ActionButton({ action }: { action: HomeAction }) {
  const variantClass =
    action.variant === "secondary" ? styles.buttonSecondary : action.variant === "light" ? styles.buttonLight : styles.buttonPrimary;

  return (
    <HomeButton className={`${styles.button} ${variantClass}`} href={action.href}>
      <Icon name={action.icon} />
      <span>{action.label}</span>
    </HomeButton>
  );
}

function SectionHeader({ title, summary }: { title: string; summary: string }) {
  return (
    <Reveal className={styles.sectionHeader} variant="soft">
      <h2>{title}</h2>
      <p>{summary}</p>
    </Reveal>
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
      <div className={styles.portfolioMedia}>
        <div className={styles.portfolioIcon}>
          <Icon name={card.icon} />
        </div>
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
  const portfolioTrackRef = useRef<HTMLDivElement>(null);

  const scrollPortfolio = (direction: -1 | 1) => {
    const container = portfolioTrackRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLAnchorElement>(`.${styles.portfolioCard}`);
    const step = card ? card.getBoundingClientRect().width : container.clientWidth * 0.9;
    container.scrollTo({
      left: container.scrollLeft + direction * (step + 16),
      behavior: "smooth",
    });
  };

  return (
    <>
      <LegacyHeader page="home" />
      <main className={styles.homepage}>
        <section className={styles.hero} id="home">
          <div className={styles.heroImageStack} aria-hidden="true">
            <span className={styles.heroImageOne} />
            <span className={styles.heroImageTwo} />
            <span className={styles.heroImageThree} />
          </div>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <Reveal className={styles.heroText} variant="hero">
                <span>{homepageContent.hero.eyebrow}</span>
                <h1>{homepageContent.hero.title}</h1>
                <p className={styles.heroSubtitle}>{homepageContent.hero.subtitle}</p>
                <p className={styles.heroDescription}>{homepageContent.hero.summary}</p>
                <div className={styles.heroActions}>
                  {homepageContent.hero.actions.map((action) => (
                    <ActionButton action={action} key={action.label} />
                  ))}
                </div>
              </Reveal>
              <div className={styles.heroDots} aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.clientsStrip} id="expertise" aria-label="عملاؤنا">
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

        <section className={styles.portfolioSection} id="portfolio">
          <div className={styles.container}>
            <SectionHeader title="أعمالنا تتحدث عن نفسها" summary="نفخر بالمشاريع الناجحة التي حققناها لعملائنا" />
            <PortfolioCarouselActions onNext={() => scrollPortfolio(-1)} onPrevious={() => scrollPortfolio(1)} />
            <div className={styles.portfolioFooter}>
              <ActionButton action={{ label: "مشاهدة كل الأعمال", href: "/portfolio", icon: "fa-arrow-left", variant: "primary" }} />
            </div>
            <div className={styles.portfolioViewport} ref={portfolioTrackRef}>
              <div className={styles.portfolioTrack}>
                {[...homepageContent.portfolio, ...homepageContent.portfolio].map((card, index) => (
                  <Reveal
                    aria-hidden={index >= homepageContent.portfolio.length ? "true" : undefined}
                    delay={(index % homepageContent.portfolio.length) * 70}
                    key={`${card.title}-${index}`}
                    variant="scaleIn"
                  >
                    <PortfolioCard card={card} />
                  </Reveal>
                ))}
              </div>
            </div>
            <div className={styles.portfolioDots} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
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
                <ActionButton action={{ label: "احجز استشارة مجانية", href: "/contact?services=consulting#contact-form", icon: "fa-calendar-check", variant: "primary" }} />
                <ActionButton action={{ label: "تواصل معنا الآن", href: "/contact", icon: "fa-phone", variant: "secondary" }} />
                <HomeButton className={`${styles.button} ${styles.buttonWhatsapp}`} href={homepageContent.contact.whatsappHref} rel="noreferrer" target="_blank">
                  <Icon name="fab fa-whatsapp" />
                  <span>واتساب</span>
                </HomeButton>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <LegacyFooter />
      <OfferFunnelController page="home" />
      <AiAdvisorWidget />
    </>
  );
}
