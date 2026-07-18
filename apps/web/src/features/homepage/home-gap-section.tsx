import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import styles from "./home-gap-section.module.css";

export function HomeGapSection() {
  return (
    <section className={styles.section} id="slogan" aria-labelledby="home-slogan-title">
      <div className={styles.container}>
        <Reveal className={styles.phrase} variant="slideStart">
          <span aria-hidden="true">01</span>
          <strong>نصنع أثرًا</strong>
        </Reveal>

        <Reveal className={styles.visual} delay={90} variant="scaleIn">
          <Image
            src="/images/homepage/strategy-horse.png"
            alt="رمز بصري يعبر عن قوة العلامة واتجاهها"
            fill
            loading="lazy"
            sizes="(max-width: 640px) 55vw, 260px"
          />
        </Reveal>

        <Reveal className={`${styles.phrase} ${styles.phraseEnd}`} delay={150} variant="slideStart">
          <span aria-hidden="true">02</span>
          <strong>يدفع للنمو</strong>
        </Reveal>

        <h2 className={styles.srOnly} id="home-slogan-title">
          نصنع أثرًا يدفع للنمو
        </h2>
      </div>
    </section>
  );
}
