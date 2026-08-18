import Image from "next/image";
import Link from "next/link";
import { AnimatedCounter } from "@/components/enhanced/animated-counter";
import { ButtonLink } from "@/components/ui/button";
import { aboutPageContent, type AboutMetric } from "@/content/about-page";
import { homepageContent } from "@/content/homepage";
import { HomeVideoDialog } from "@/features/homepage/home-video-dialog";
import { AboutPageCarousel } from "./about-page-carousel";
import { AboutPageMotion } from "./about-page-motion";
import { PublicPageShell } from "./public-page-shell";
import styles from "./about-public-page.module.css";

function SectionHeader({
  title,
  summary,
  align = "start",
}: {
  title: string;
  summary?: string;
  align?: "start" | "center";
}) {
  return (
    <header className={`${styles.sectionHeader} ${align === "center" ? styles.sectionHeaderCenter : ""}`}>
      <h2>{title}</h2>
      {summary ? <p>{summary}</p> : null}
    </header>
  );
}

function PlaceholderBadge({ children = "بيانات مؤقتة" }: { children?: string }) {
  return <span className={styles.placeholderBadge}>{children}</span>;
}

export function AboutPublicPage() {
  const content = aboutPageContent;
  const video = homepageContent.hero.media[0];

  return (
    <PublicPageShell page="about" sectionIds={[...content.sectionIds]} showBreadcrumb={false}>
      <main className={styles.page}>
        <AboutPageMotion>
          <section className={styles.hero} id="about-hero" aria-labelledby="about-page-title">
            <span className={styles.heroGlow} aria-hidden="true" />
            <div className={styles.container}>
              <nav className={styles.heroBreadcrumb} aria-label="مسار الصفحة" data-about-hero-support>
                <Link href="/">{content.hero.breadcrumb[0]}</Link>
                <i className="fas fa-chevron-left" aria-hidden="true" />
                <span>{content.hero.breadcrumb[1]}</span>
              </nav>

              <h1 id="about-page-title" className={styles.heroTitle}>
                {content.hero.lines.map((line, index) => (
                  <span className={styles.heroLineMask} key={line}>
                    <span
                      className={index === 1 ? styles.heroTitleAccent : undefined}
                      data-about-hero-line
                    >
                      {line}
                    </span>
                  </span>
                ))}
              </h1>

              <p className={styles.heroDescription} data-about-hero-support>
                {content.hero.description}
              </p>

              <div className={styles.heroCompass} aria-hidden="true" data-about-hero-support>
                <span className={styles.heroCompassRing} />
                <i className="fas fa-location-arrow" />
                <span>معًا ستصل</span>
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.storySection}`} id="story" aria-labelledby="story-title">
            <div className={styles.container}>
              <SectionHeader title={content.story.title} summary={content.story.intro} />

              <div className={styles.storyLayout}>
                <div className={styles.storyMediaColumn} data-story-media>
                  <div className={styles.storyMediaSticky}>
                    <HomeVideoDialog
                      title="تعرف على SWEED"
                      videoSrc={video.src}
                      poster={video.poster}
                      triggerClassName={styles.videoTrigger}
                      triggerTestId="about-story-video"
                    >
                      <span className={styles.videoFrame}>
                        <Image
                          src={video.poster}
                          alt={video.alt}
                          fill
                          loading="lazy"
                          sizes="(max-width: 860px) 94vw, 46vw"
                          className={styles.videoPoster}
                        />
                        <span className={styles.videoShade} aria-hidden="true" />
                      </span>
                    </HomeVideoDialog>
                    <p className={styles.videoCaption}>{content.story.videoCaption}</p>
                  </div>
                </div>

                <div className={styles.storyCopyColumn}>
                  <div className={styles.storyParagraphs}>
                    {content.story.paragraphs.map((paragraph) => (
                      <article key={paragraph.label} data-story-copy>
                        <span>{paragraph.label}</span>
                        <p>{paragraph.text}</p>
                      </article>
                    ))}
                  </div>

                  <ol className={styles.timeline} aria-label="مراحل رحلة سويد">
                    {content.story.timeline.map((item) => (
                      <li key={item.year} data-story-copy>
                        <span className={styles.timelineYear}>{item.year}</span>
                        <div>
                          <strong>{item.title}</strong>
                          <p>{item.summary}</p>
                        </div>
                      </li>
                    ))}
                  </ol>

                  <div className={styles.storyClosing} data-story-copy>
                    <p>{content.story.afterTimeline}</p>
                    <strong>{content.story.closing}</strong>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.founderSection}`} id="founder" aria-labelledby="founder-title">
            <div className={`${styles.container} ${styles.founderLayout}`}>
              <div className={styles.founderPortrait} data-founder-portrait>
                <div className={styles.founderInitials} aria-hidden="true">م س</div>
                <div className={styles.portraitStatus}>
                  <i className="fas fa-image" aria-hidden="true" />
                  <span>{content.founder.portraitStatus}</span>
                </div>
              </div>

              <div className={styles.founderCopy}>
                <h2 id="founder-title" data-founder-copy>{content.founder.title}</h2>
                <div className={styles.founderQuote}>
                  {content.founder.paragraphs.map((paragraph) => (
                    <p key={paragraph} data-founder-copy>{paragraph}</p>
                  ))}
                </div>
                <div className={styles.founderSignature} data-founder-copy>
                  <span>{content.founder.name}</span>
                  <strong>{content.founder.role}</strong>
                  <small>{content.founder.credential}</small>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.promiseSection} id="promise" aria-labelledby="promise-title">
            <div className={styles.container}>
              <h2 id="promise-title" className={styles.srOnly}>وعد سويد</h2>
              <div className={styles.promiseCopy}>
                <p data-promise-line="start">{content.promise.lines[0]}</p>
                <strong data-promise-line="end">{content.promise.lines[1]}</strong>
              </div>
              <p className={styles.promiseSignature} data-promise-signature>{content.promise.signature}</p>
            </div>
          </section>

          <section className={`${styles.section} ${styles.valuesSection}`} id="values" aria-labelledby="values-title">
            <div className={styles.container}>
              <SectionHeader title={content.values.title} align="center" />

              <div className={styles.directionCards}>
                <article className={styles.directionCard} data-value-card>
                  <span>رؤيتنا</span>
                  <p>{content.values.vision}</p>
                </article>
                <article className={`${styles.directionCard} ${styles.directionCardAccent}`} data-value-card>
                  <span>رسالتنا</span>
                  <p>{content.values.mission}</p>
                </article>
              </div>

              <div className={styles.valuesGrid}>
                {content.values.items.map((value, index) => (
                  <article className={styles.valueItem} key={value.title} data-value-card>
                    <span className={styles.valueNumber}>{String(index + 1).padStart(2, "0")}</span>
                    <i className={`fas ${value.icon}`} aria-hidden="true" />
                    <h3>{value.title}</h3>
                    <p>{value.summary}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.methodologySection}`} id="methodology" aria-labelledby="methodology-title">
            <div className={`${styles.container} ${styles.methodologyStage}`} data-methodology-pin>
              <div className={styles.methodologyHeadingRow}>
                <SectionHeader title={content.methodology.title} summary={content.methodology.intro} />

                <div className={styles.methodologyProgress} aria-hidden="true">
                  <span>المرحلة الحالية</span>
                  <strong>
                    <b data-methodology-current>01</b>
                    <small>/ 05</small>
                  </strong>
                  <i className={styles.methodologyProgressTrack}>
                    <span data-methodology-progress />
                  </i>
                </div>
              </div>

              <div className={styles.methodologyPathWrap}>
                <svg className={styles.methodologyPathDesktop} viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
                  <path className={styles.methodologyPathBase} d="M 96 12 H 4" />
                  <path className={styles.methodologyPathProgress} d="M 96 12 H 4" data-methodology-path />
                </svg>
                <svg className={styles.methodologyPathMobile} viewBox="0 0 20 100" preserveAspectRatio="none" aria-hidden="true">
                  <path className={styles.methodologyPathBase} d="M 10 2 V 98" />
                  <path className={styles.methodologyPathProgress} d="M 10 2 V 98" data-methodology-path />
                </svg>

                <ol className={styles.methodologySteps}>
                  {content.methodology.steps.map((step, index) => (
                    <li
                      key={step.number}
                      data-methodology-node
                      data-methodology-index={index}
                      data-state="rest"
                    >
                      <span className={styles.methodNode}>{step.number}</span>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                      <div className={styles.deliverable}>
                        <span>اللي بتستلمه</span>
                        <strong>{step.deliverable}</strong>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <ButtonLink className={styles.primaryAction} href={content.methodology.action.href} size="compact">
                {content.methodology.action.label}
              </ButtonLink>
            </div>
          </section>

          <section className={styles.numbersSection} id="numbers" aria-labelledby="numbers-title">
            <div className={styles.container}>
              <h2 id="numbers-title" className={styles.srOnly}>أرقام سويد</h2>
              <div className={styles.numbersGrid}>
                {content.numbers.map((metric: AboutMetric) => (
                  <article key={metric.label}>
                    <strong>
                      <AnimatedCounter
                        value={metric.value}
                        prefix={metric.prefix}
                        suffix={metric.suffix}
                        duration={1500}
                      />
                    </strong>
                    <p>{metric.label}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.teamSection}`} id="team" aria-labelledby="team-title">
            <div className={styles.container}>
              <SectionHeader
                title={content.team.title}
                summary="الأسماء الموثقة ظاهرة كما هي، وأي منصب لم تُسلَّم بياناته الرسمية معلَّم بوضوح."
              />

              <AboutPageCarousel ariaLabel="الإدارة العليا في سويد" variant="team">
                {content.team.members.map((member) => (
                  <article className={styles.teamCard} key={`${member.role}-${member.name}`} data-team-card>
                    <div className={styles.teamPortrait}>
                      <span>{member.initials}</span>
                      <small>الصورة قيد التسليم</small>
                    </div>
                    <div className={styles.teamCardCopy}>
                      {member.verification === "placeholder" ? <PlaceholderBadge /> : <span className={styles.verifiedBadge}>الاسم موثق</span>}
                      <h3>{member.name}</h3>
                      <strong>{member.role}</strong>
                      <p>{member.summary}</p>
                    </div>
                  </article>
                ))}
              </AboutPageCarousel>
            </div>
          </section>

          <section className={`${styles.section} ${styles.alliancesSection}`} id="alliances" aria-labelledby="alliances-title">
            <div className={styles.container}>
              <SectionHeader title={content.alliances.title} summary={content.alliances.intro} />
              <div className={styles.alliancesGrid}>
                {content.alliances.items.map((alliance) => (
                  <article key={alliance.title} data-alliance-card>
                    <div className={styles.allianceTopline}>
                      <i className={`fas ${alliance.icon}`} aria-hidden="true" />
                      <PlaceholderBadge>الجهة قيد التوثيق</PlaceholderBadge>
                    </div>
                    <h3>{alliance.title}</h3>
                    <p>{alliance.summary}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.partnersSection} id="partners" aria-labelledby="partners-title">
            <div className={styles.container}>
              <SectionHeader title={content.partners.title} summary={content.partners.notice} align="center" />
            </div>
            <div className={styles.partnerMarquee} aria-label="أماكن شعارات الشركاء قيد التسليم">
              <div className={styles.partnerTrack}>
                {content.partners.placeholders.map((item) => (
                  <span key={item}><i className="fas fa-building" aria-hidden="true" />{item}</span>
                ))}
                {content.partners.placeholders.map((item) => (
                  <span aria-hidden="true" key={`duplicate-${item}`}><i className="fas fa-building" />{item}</span>
                ))}
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.testimonialsSection}`} id="testimonials" aria-labelledby="testimonials-title">
            <div className={styles.container}>
              <SectionHeader title={content.testimonials.title} summary={content.testimonials.notice} />

              <AboutPageCarousel
                ariaLabel="نماذج بنية تقييمات العملاء"
                autoplayMs={6000}
                variant="testimonials"
              >
                {content.testimonials.items.map((testimonial, index) => (
                  <article className={styles.testimonialCard} key={index} data-testimonial-card>
                    <div className={styles.testimonialStatus}>
                      <PlaceholderBadge>نموذج غير منشور</PlaceholderBadge>
                      <span className={styles.stars} aria-hidden="true">
                        {Array.from({ length: 5 }, (_, star) => <i className="fas fa-star" key={star} />)}
                      </span>
                    </div>
                    <blockquote>“{testimonial.quote}”</blockquote>
                    <footer>
                      <strong>{testimonial.person}</strong>
                      <span>{testimonial.role}</span>
                    </footer>
                  </article>
                ))}
              </AboutPageCarousel>
            </div>
          </section>

          <section className={styles.ctaSection} id="cta" aria-labelledby="about-cta-title">
            <div className={styles.container}>
              <div className={styles.ctaCopy}>
                <h2 id="about-cta-title">{content.cta.title}</h2>
                <p>{content.cta.summary}</p>
              </div>
              <div className={styles.ctaActions}>
                <ButtonLink className={styles.ctaPrimary} href={content.cta.primary.href}>
                  {content.cta.primary.label}
                </ButtonLink>
                <ButtonLink className={styles.ctaSecondary} href={content.cta.secondary.href} variant="secondary">
                  {content.cta.secondary.label}
                </ButtonLink>
              </div>
            </div>
          </section>
        </AboutPageMotion>
      </main>
    </PublicPageShell>
  );
}
