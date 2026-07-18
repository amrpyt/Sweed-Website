"use client";

import Image from "next/image";
import Link from "next/link";
import { homepageContent } from "@/content/homepage";
import { HomeVideoDialog } from "./home-video-dialog";
import styles from "./home-blit-scroll-section.module.css";

export function HomeBlitScrollSection() {
  const video = homepageContent.hero.media[0];

  return (
    <section className={styles.section} id="about" aria-labelledby="home-about-title">
      <div className={styles.container}>
        <div className={styles.mediaColumn}>
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
                <strong>شاهد كيف نفكر، نخطط، ونحوّل الفكرة إلى حضور قابل للنمو.</strong>
              </span>
            </span>
          </HomeVideoDialog>
        </div>

        <div className={styles.copyColumn}>
          <p className={styles.sectionLabel}>من نحن</p>
          <h2 id="home-about-title">فريق يفهم مشروعك قبل ما يقترح عليك أي حل.</h2>
          <p className={styles.summary}>
            SWEED وكالة تسويق وإعلان متكاملة تجمع الاستراتيجية، الهوية، المحتوى، الإعلان، والتطوير في مسار واحد واضح.
          </p>

          <ul className={styles.points}>
            {homepageContent.about.map((point) => (
              <li key={point.title}>
                <span className={styles.pointIcon} aria-hidden="true">
                  <i className={`fas ${point.icon}`} />
                </span>
                <span>
                  <strong>{point.title}</strong>
                  <small>{point.summary}</small>
                </span>
              </li>
            ))}
          </ul>

          <Link className={styles.aboutLink} href="/about">
            تعرف على سويد
            <i className="fas fa-arrow-left" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
