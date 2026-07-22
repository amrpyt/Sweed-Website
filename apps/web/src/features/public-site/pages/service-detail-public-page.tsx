import Link from "next/link";
import type { Service } from "@/content/types";
import { PublicPageShell } from "./public-page-shell";
import styles from "./content-detail-public-page.module.css";

export function ServiceDetailPublicPage({ service }: { service: Service }) {
  return (
    <PublicPageShell page="service-detail">
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div>
              <p className={styles.eyebrow}>{service.category}</p>
              <h1>{service.title}</h1>
              <p className={styles.summary}>{service.description}</p>
              <div className={styles.meta}>
                <span>خطة قابلة للتنفيذ</span>
                <span>مؤشرات قياس واضحة</span>
              </div>
            </div>

            <div className={styles.sections}>
              <article>
                <h2>الخدمة مناسبة لمين؟</h2>
                <p>{service.audience}</p>
              </article>
              <article>
                <h2>النتيجة المتوقعة من نطاق الشغل</h2>
                <ul className={styles.list}>
                  {service.outcomes.map((outcome) => (
                    <li key={outcome}>
                      <i className="fas fa-check" aria-hidden="true" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </header>

        <section className={styles.content}>
          <div className={`${styles.container} ${styles.contentGrid}`}>
            <aside className={styles.aside}>
              <h2>بنبدأ من السبب الحقيقي</h2>
              <p>{service.summary}</p>
              <Link href="/#contact">
                ناقش الخدمة مع الفريق
                <i className="fas fa-arrow-left" aria-hidden="true" />
              </Link>
            </aside>

            <div className={styles.sections}>
              {service.process.map((step, index) => (
                <article key={step}>
                  <h3>{String(index + 1).padStart(2, "0")} — {step}</h3>
                  <p>بنحدد مخرجات الخطوة ومؤشرها قبل الانتقال للخطوة اللي بعدها.</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PublicPageShell>
  );
}
