import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { aboutPageContent } from "@/content/about-page";
import { homepageContent } from "@/content/homepage";
import { HomeVideoDialog } from "@/features/homepage/home-video-dialog";
import { AboutPageMotion } from "./about-page-motion";
import { PublicPageShell } from "./public-page-shell";
import styles from "./about-public-page.module.css";

function SectionHeader({ title, summary }: { title: string; summary?: string }) {
  return (
    <header className={styles.sectionHeader}>
      <h2>{title}</h2>
      {summary ? <p>{summary}</p> : null}
    </header>
  );
}

export function AboutPublicPage() {
  const content = aboutPageContent;
  const video = homepageContent.hero.media[0];

  return (
    <PublicPageShell page="about" sectionIds={[...content.sectionIds]} showBreadcrumb={false}>
      <main className={styles.page}>
        <AboutPageMotion>
          <section className={styles.hero} id="about-hero" aria-labelledby="about-page-title">
            <div className={styles.container}>
              <nav className={styles.heroBreadcrumb} aria-label="مسار الصفحة">
                <Link href="/">{content.hero.breadcrumb[0]}</Link>
                <i className="fas fa-chevron-left" aria-hidden="true" />
                <span>{content.hero.breadcrumb[1]}</span>
              </nav>
              <h1 id="about-page-title" className={styles.heroTitle}>
                {content.hero.lines.map((line, index) => (
                  <span className={styles.heroLineMask} key={line}>
                    <span className={index === 1 ? styles.heroTitleAccent : undefined}>{line}</span>
                  </span>
                ))}
              </h1>
              <p className={styles.heroDescription}>{content.hero.description}</p>
            </div>
          </section>

          <section className={`${styles.section} ${styles.storySection}`} id="story" aria-labelledby="story-title">
            <div className={styles.container}>
              <SectionHeader title={content.story.title} summary={content.story.intro} />
              <div className={styles.storyLayout}>
                <div className={styles.storyMediaColumn}>
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
                    </span>
                  </HomeVideoDialog>
                  <p className={styles.videoCaption}>{content.story.videoCaption}</p>
                </div>

                <div className={styles.storyCopyColumn}>
                  <div className={styles.storyParagraphs}>
                    {content.story.paragraphs.slice(0, 2).map((paragraph) => (
                      <article key={paragraph.label}>
                        <span>{paragraph.label}</span>
                        <p>{paragraph.text}</p>
                      </article>
                    ))}
                  </div>
                  <div className={styles.storyClosing}>
                    <p>{content.story.afterTimeline}</p>
                    <strong>{content.story.closing}</strong>
                  </div>
                  <article className={styles.founderCopy} aria-labelledby="founder-title">
                    <h2 id="founder-title">{content.founder.title}</h2>
                    <div className={styles.founderQuote}>
                      {content.founder.paragraphs.slice(0, 2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                    <div className={styles.founderSignature}>
                      <span>{content.founder.name}</span>
                      <strong>{content.founder.role}</strong>
                      <small>{content.founder.credential}</small>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.valuesSection}`} id="promise" aria-labelledby="promise-title">
            <div className={styles.container}>
              <SectionHeader title="وعدنا وقيمنا في الشغل" summary={content.promise.lines[0]} />
              <div className={styles.promiseCopy}>
                <strong id="promise-title">{content.promise.lines[1]}</strong>
                <p>{content.promise.signature}</p>
              </div>
              <div className={styles.valuesGrid}>
                {content.values.items.map((value, index) => (
                  <article className={styles.valueItem} key={value.title}>
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
            <div className={styles.container}>
              <SectionHeader title={content.methodology.title} summary={content.methodology.intro} />
              <ol className={styles.methodologySteps}>
                {content.methodology.steps.map((step) => (
                  <li key={step.number} data-state="active">
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
          </section>

          <section className={styles.ctaSection} id="cta" aria-labelledby="about-cta-title">
            <div className={styles.container}>
              <div className={styles.ctaCopy}>
                <h2 id="about-cta-title">{content.cta.title}</h2>
                <p>{content.cta.summary}</p>
              </div>
              <div className={styles.ctaActions}>
                <ButtonLink href={content.cta.primary.href}>
                  {content.cta.primary.label}
                </ButtonLink>
                <ButtonLink href={content.cta.secondary.href} variant="secondary">
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
