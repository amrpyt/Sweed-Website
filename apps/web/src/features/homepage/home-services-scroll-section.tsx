import Image from "next/image";
import Link from "next/link";
import { homepageContent } from "@/content/homepage";
import styles from "./home-services-section.module.css";

export function HomeServicesScrollSection() {
  return (
    <section aria-labelledby="home-services-title" className={styles.section} id="services">
      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.introInner}>
            <span className={styles.sectionLabel}>خدمات SWEED</span>
            <h2 id="home-services-title">خدماتنا المتكاملة</h2>
            <p>
              نربط الاستراتيجية بالهوية والمحتوى والتقنية؛ عشان كل خطوة تخدم نفس الهدف بدل ما تشتغل كل خدمة في اتجاه مختلف.
            </p>
            <span className={styles.scope}>استراتيجية · هوية · تسويق · تطوير · إنتاج</span>
            <Link className={styles.allServicesLink} href="/services">
              <span>استعرض كل الخدمات</span>
              <i aria-hidden="true" className="fas fa-arrow-left" />
            </Link>
          </div>
        </div>

        <ol className={styles.serviceList} data-testid="home-services-list">
          {homepageContent.services.map((service, index) => (
            <li key={service.title}>
              <Link
                className={styles.serviceItem}
                data-service-index={index + 1}
                data-testid="home-service-panel"
                href={service.href ?? "/services"}
              >
                <span className={styles.index} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className={styles.media}>
                  <Image
                    alt={`صورة توضيحية لخدمة ${service.title}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 720px) 92vw, (max-width: 1100px) 34vw, 220px"
                    src={service.image ?? "/images/hero/custom-image.png"}
                  />
                </span>

                <span className={styles.content}>
                  <span className={styles.titleLine}>
                    <span className={styles.icon} aria-hidden="true">
                      <i className={`fas ${service.icon}`} />
                    </span>
                    <strong>{service.title}</strong>
                  </span>
                  <span className={styles.summary}>{service.summary}</span>
                </span>

                <span className={styles.arrow} aria-hidden="true">
                  <i className="fas fa-arrow-left" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
