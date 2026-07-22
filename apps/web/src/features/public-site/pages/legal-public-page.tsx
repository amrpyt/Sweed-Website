import { AiAdvisorWidget } from "@/features/ai-advisor";
import { LegacyFooter } from "@/features/legacy-site/legacy-footer";
import { LegacyHeader } from "@/features/legacy-site/legacy-header";
import styles from "./legal-public-page.module.css";

type LegalSection = {
  title: string;
  body: string;
};

export function LegalPublicPage({
  title,
  summary,
  sections,
}: {
  title: string;
  summary: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <LegacyHeader page="home" />
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.container}>
            <p>معلومات قانونية</p>
            <h1>{title}</h1>
            <p>{summary}</p>
          </div>
        </header>
        <section className={styles.content}>
          <div className={styles.container}>
            <div className={styles.notice}>
              النص الحالي توضيحي لتجنب الروابط المعطلة، ويجب مراجعته واعتماده قانونيًا قبل الإطلاق الرسمي.
            </div>
            {sections.map((section) => (
              <article key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <LegacyFooter />
      <AiAdvisorWidget />
    </>
  );
}
