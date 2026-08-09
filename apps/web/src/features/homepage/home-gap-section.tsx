import { Reveal } from "@/components/motion/reveal";
import { homepageContent } from "@/content/homepage";
import styles from "./home-gap-section.module.css";

export function HomeGapSection() {
  const slogan = homepageContent.slogan;

  return (
    <section className={styles.section} id="slogan" aria-labelledby="home-slogan-title">
      <div className={styles.container}>
        <Reveal className={styles.reveal} once variant="soft">
          <h2 className={styles.statement} id="home-slogan-title">
            <span className={styles.phrase}>{slogan.start}</span>
            <span className={styles.compassMark} aria-hidden="true">
              <span>N</span>
            </span>
            <span className={`${styles.phrase} ${styles.phraseEnd}`}>{slogan.end}</span>
          </h2>
          <p className={styles.caption}>{slogan.caption}</p>
        </Reveal>
      </div>
    </section>
  );
}
