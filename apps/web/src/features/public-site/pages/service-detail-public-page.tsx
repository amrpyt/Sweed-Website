import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { getServiceDetailExperience } from "@/content/public-site/service-detail-pages";
import type { Service } from "@/content/types";
import { getContactPageModel } from "../page-composers/public-page-models";
import { ContactInquiryForm } from "./contact-inquiry-form";
import { PublicPageShell } from "./public-page-shell";
import { ServicePathTabs } from "./service-path-tabs";
import styles from "./content-detail-public-page.module.css";

export function ServiceDetailPublicPage({ service }: { service: Service }) {
  const experience = getServiceDetailExperience(service.slug);
  const form = getContactPageModel().form;

  if (!experience) {
    return null;
  }

  return (
    <PublicPageShell page="service-detail">
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className={styles.serviceNumber}>{String(service.order).padStart(2, "0")}</span>
              <h1>{service.title}</h1>
              <p className={styles.summary}>{service.description}</p>
              <div className={styles.meta} aria-label="نقطتا ثقة">
                <span>تشخيص قبل التنفيذ</span>
                <span>مخرجات ومؤشرات واضحة</span>
              </div>
              <ButtonLink href={`#service-contact-${service.slug}`} size="hero">
                ناقش خدمة {service.title}
              </ButtonLink>
            </div>

            <div className={styles.heroOutcome}>
              <span>النتيجة اللي بنستهدفها</span>
              <strong>{service.summary}</strong>
              <p>{service.audience}</p>
            </div>
          </div>
        </header>

        <section className={styles.section} aria-labelledby={`${service.slug}-diagnosis`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 id={`${service.slug}-diagnosis`}>اختار أقرب مشكلة لوضعك دلوقتي</h2>
              <p>الاختيار مش بيعطي تشخيص نهائي؛ هو بس بيوجهك لأقرب مسار جوه نفس الخدمة.</p>
            </div>
            <div className={styles.diagnosisGrid}>
              {experience.diagnosis.map((item) => (
                <a href={`#track-${item.trackId}`} key={item.trackId}>
                  <span>{item.label}</span>
                  <i className="fas fa-arrow-left" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.altSection}`} aria-labelledby={`${service.slug}-tracks`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 id={`${service.slug}-tracks`}>مسارات الخدمة</h2>
              <p>كل مسار بيجاوب سؤالين: هل هو مناسب لوضعك؟ وإيه المخرج اللي هتستلمه؟</p>
            </div>
            <ServicePathTabs tracks={experience.tracks} />
            <div className={styles.trackAnchors} aria-hidden="true">
              {experience.tracks.map((track) => <span id={`track-${track.id}`} key={track.id} />)}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.signatureSection}`} aria-labelledby={`${service.slug}-signature`}>
          <div className={styles.container}>
            <Reveal className={styles.signatureScene} once variant="soft">
              <div className={styles.signatureCopy}>
                <h2 id={`${service.slug}-signature`}>{experience.signature.title}</h2>
                <p>{experience.signature.caption}</p>
              </div>
              <div className={styles.signatureFlow} aria-label={`${experience.signature.title}: ${experience.signature.caption}`}>
                <div className={styles.signalCluster}>
                  {experience.signature.inputs.map((input) => <span key={input}>{input}</span>)}
                </div>
                <i className="fas fa-arrow-left-long" aria-hidden="true" />
                <strong>{experience.signature.output}</strong>
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.section} aria-labelledby={`${service.slug}-process`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 id={`${service.slug}-process`}>منهجية الشغل</h2>
              <p>كل خطوة ليها مخرج واضح قبل الانتقال للي بعدها.</p>
            </div>
            <ol className={styles.processList}>
              {service.process.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step}</h3>
                    <p><strong>المخرج:</strong> {experience.processOutputs[index] ?? service.outcomes[index]}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={`${styles.section} ${styles.altSection}`} aria-labelledby={`${service.slug}-scope`}>
          <div className={`${styles.container} ${styles.scopeGrid}`}>
            <div>
              <div className={styles.sectionHeader}>
                <h2 id={`${service.slug}-scope`}>المخرجات والنطاق</h2>
                <p>ده شكل التسليم المتوقع، والتفاصيل النهائية بتتثبت في العرض قبل البداية.</p>
              </div>
              <ul className={styles.checkList}>
                {experience.outputs.map((output) => <li key={output}><i className="fas fa-check" aria-hidden="true" />{output}</li>)}
              </ul>
            </div>
            <aside className={styles.exclusions}>
              <h3>مش داخل تلقائيًا في النطاق</h3>
              <ul>
                {experience.exclusions.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </aside>
          </div>
        </section>

        <section className={styles.section} aria-labelledby={`${service.slug}-proof`}>
          <div className={`${styles.container} ${styles.proofBlock}`}>
            <div>
              <h2 id={`${service.slug}-proof`}>{experience.proof.title}</h2>
              <p>{experience.proof.summary}</p>
            </div>
            <ButtonLink href={experience.proof.href} variant="secondary" size="compact">شاهد أعمالنا</ButtonLink>
          </div>
        </section>

        <section className={`${styles.section} ${styles.altSection}`} aria-labelledby={`${service.slug}-faq`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 id={`${service.slug}-faq`}>أسئلة قبل ما نبدأ</h2>
              <p>إجابات مرتبطة بالخدمة نفسها، مش أسئلة عامة مكررة.</p>
            </div>
            <div className={styles.faqList}>
              {experience.faq.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}<i className="fas fa-plus" aria-hidden="true" /></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.contactSection}`} id={`service-contact-${service.slug}`} aria-labelledby={`${service.slug}-contact`}>
          <div className={`${styles.container} ${styles.contactGrid}`}>
            <div className={styles.contactCopy}>
              <h2 id={`${service.slug}-contact`}>ناقش خدمة {service.title}</h2>
              <p>ابعتلنا وضع مشروعك باختصار. اسم الخدمة ومصدر الطلب بيتسجلوا تلقائيًا عشان نبدأ من السياق الصح.</p>
              <Link href="/privacy">سياسة الخصوصية</Link>
            </div>
            <ContactInquiryForm form={form} defaultService={service.slug} source={`service-${service.slug}`} />
          </div>
        </section>
      </main>
    </PublicPageShell>
  );
}
