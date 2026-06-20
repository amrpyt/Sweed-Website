import Image from "next/image";
import styles from "./chess-3d-section.module.css";

export function Chess3DSection() {
  return (
    <section className={styles.section} aria-label="SWEED strategy board">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>SWEED STRATEGY</span>
          <h2 className={styles.title}>Luxury brand strategists</h2>
          <p className={styles.summary}>
            نقدم لكل عميل قصة مصممة بعناية، وخطة واضحة تجعل العلامة التجارية تتحرك بثقة.
          </p>
        </div>

        <div className={styles.viewerShell}>
          <Image
            alt=""
            aria-hidden="true"
            className={styles.viewer}
            height={760}
            priority={false}
            src="/images/homepage/strategy-horse-static.png"
            width={520}
          />
        </div>
      </div>
    </section>
  );
}
