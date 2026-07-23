"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { homepageContent } from "@/content/homepage";
import { HomeVideoDialog } from "./home-video-dialog";
import styles from "./home-blit-scroll-section.module.css";

function removeStatementLabel(statement: string) {
  return statement.replace(/^[^:]+:\s*/, "");
}

export function HomeBlitScrollSection() {
  const video = homepageContent.hero.media[0];
  const about = homepageContent.about;
  const [lead, ...storyParagraphs] = about.paragraphs;

  return (
    <section className={styles.section} id="about" aria-labelledby="home-about-title">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <Reveal className={styles.headingBlock} once variant="soft">
            <p className={styles.sectionLabel}>من نحن</p>
            <h2 id="home-about-title">{about.title}</h2>
          </Reveal>

          <Reveal className={styles.leadBlock} once variant="soft">
            <span aria-hidden="true">من 2011</span>
            <p>{lead}</p>
          </Reveal>
        </header>

        <div className={styles.storyGrid}>
          <div className={styles.mediaColumn} data-about-media>
            <div className={styles.mediaUnit}>
              <HomeVideoDialog
                title="تعرف على SWEED"
                videoSrc={video.src}
                poster={video.poster}
                triggerClassName={styles.videoTrigger}
                triggerTestId="home-about-video-trigger"
              >
                <span className={styles.mediaFrame}>
                  <Image
                    src={video.poster}
                    alt={video.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 900px) 94vw, 48vw"
                    className={styles.poster}
                  />
                  <span className={styles.mediaShade} aria-hidden="true" />
                  <span className={styles.mediaCopy}>
                    <small>فيديو تعريفي</small>
                    <strong>{about.videoLabel}</strong>
                  </span>
                </span>
              </HomeVideoDialog>

              <div className={styles.mediaMeta} aria-label="نطاق خبرة سويد">
                <span>
                  <strong>2011</strong>
                  <small>بداية الرحلة</small>
                </span>
                <span>
                  <strong>مصر والعالم العربي</strong>
                  <small>سوق نفهم تفاصيله</small>
                </span>
              </div>
            </div>
          </div>

          <div className={styles.copyColumn}>
            <div className={styles.story}>
              {storyParagraphs.map((paragraph, index) => (
                <Reveal delay={index * 70} key={paragraph} once variant="soft">
                  <p className={index === 1 ? styles.storyEmphasis : undefined}>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <ul className={styles.points} aria-label="مبادئ عمل سويد">
              {about.points.map((point, index) => (
                <Reveal as="li" delay={index * 70} key={point.title} once variant="soft">
                  <span className={styles.pointIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.pointIcon} aria-hidden="true">
                    <i className={`fas ${point.icon}`} />
                  </span>
                  <span className={styles.pointCopy}>
                    <strong>{point.title}</strong>
                    <small>{point.summary}</small>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <Reveal className={styles.directionBand} once variant="soft">
          <div className={styles.directionStatement}>
            <span>رؤيتنا</span>
            <p>{removeStatementLabel(about.vision)}</p>
          </div>
          <div className={styles.directionStatement}>
            <span>رسالتنا</span>
            <p>{removeStatementLabel(about.mission)}</p>
          </div>
          <Link className={styles.aboutLink} href={about.action.href}>
            {about.action.label}
            <i className="fas fa-arrow-left" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
