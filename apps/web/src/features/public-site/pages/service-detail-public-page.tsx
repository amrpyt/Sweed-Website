import { ButtonLink } from "@/components/ui/button";
import type { Service } from "@/content/types";
import { PublicPageShell } from "./public-page-shell";
import styles from "./content-detail-public-page.module.css";

const processDeliverables: Record<string, readonly string[]> = {
  consulting: ["تقرير تشخيص", "خريطة قرار", "خطة أولويات ولوحة مؤشرات", "جدول متابعة"],
  branding: ["وثيقة تموضع", "دليل رسائل ونبرة", "هوية بصرية", "دليل استخدام وقوالب تطبيق"],
  "digital-marketing": ["خطة قنوات", "هيكل حملات", "إعداد تتبع وقياس", "تقرير أداء دوري وتقويم تحسين"],
  development: ["وثيقة متطلبات", "خريطة شاشات", "النظام نفسه", "اختبارات تسليم ودليل تشغيل"],
  advertising: ["خطة مواقع ورسالة", "مقايسة خامات", "ملف تصميمات جاهزة للطباعة", "تنفيذ ميداني موثق بالصور"],
  media: ["خطة محتوى", "سكربتات", "مواد مصورة", "مونتاج نهائي وملفات جاهزة للنشر بالمقاسات"],
};

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
              <ButtonLink href={`/contact?service=${service.slug}&source=service-detail`} size="compact">
                ناقش خدمة {service.title}
              </ButtonLink>
            </aside>

            <div className={styles.sections}>
              {service.process.map((step, index) => (
                <article key={step}>
                  <h3>{String(index + 1).padStart(2, "0")} — {step}</h3>
                  <p>
                    <strong>المخرج:</strong> {processDeliverables[service.slug]?.[index] ?? service.outcomes[index]}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PublicPageShell>
  );
}
