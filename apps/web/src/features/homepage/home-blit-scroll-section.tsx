"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { homepageContent } from "@/content/homepage";
import { HomeVideoDialog } from "./home-video-dialog";
import styles from "./home-blit-scroll-section.module.css";

export function HomeBlitScrollSection() {
  const video = homepageContent.hero.media[0];
  const about = homepageContent.about;

  return (
    <section className={styles.section} id="about" aria-labelledby="home-about-title">
      <div className={styles.container}>
        <Reveal className={styles.mediaColumn} once variant="clipUp">
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
        </Reveal>

        <div className={styles.copyColumn}>
          <Reveal once variant="soft">
            <p className={styles.sectionLabel}>من نحن</p>
            <h2 id="home-about-title">{about.title}</h2>
          </Reveal>

          <div className={styles.story}>
            {about.paragraphs.map((paragraph, index) => (
              <Reveal delay={80 + index * 70} key={paragraph} once variant="soft">
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <ul className={styles.points}>
            {about.points.map((point, index) => (
              <Reveal as="li" delay={index * 80} key={point.title} once variant="soft">
                <span className={styles.pointIcon} aria-hidden="true">
                  <i className={`fas ${point.icon}`} />
                </span>
                <span>
                  <strong>{point.title}</strong>
                  <small>{point.summary}</small>
                </span>
              </Reveal>
            ))}
          </ul>

          <div className={styles.directionStatement}>
            <p>{about.vision}</p>
            <p>{about.mission}</p>
          </div>

          <Link className={styles.aboutLink} href={about.action.href}>
            {about.action.label}
            <i className="fas fa-arrow-left" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
