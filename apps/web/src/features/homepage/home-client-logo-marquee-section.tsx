import { aboutPageContent } from "@/content/about-page";
import styles from "./home-client-logo-marquee-section.module.css";

export function HomeClientLogoMarqueeSection() {
  const logos = aboutPageContent.partners.placeholders;

  return (
    <section className={styles.section} aria-labelledby="home-clients-title">
      <div className={styles.heading}>
        <span>بعض من عملائنا</span>
        <h2 id="home-clients-title">شراكات في اتجاه واحد</h2>
      </div>

      <div className={styles.marquee} aria-label="شعارات العملاء">
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <div className={styles.group} aria-hidden={copy === 1} key={copy}>
              {logos.map((logo, index) => (
                <span className={styles.logo} key={`${copy}-${logo}`}>
                  <i aria-hidden="true">{String(index + 1).padStart(2, "0")}</i>
                  {logo}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
