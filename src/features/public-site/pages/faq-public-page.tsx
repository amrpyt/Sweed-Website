import { AccordionItem } from "@/components/ui";
import { LegacyDerivedHero, LegacyDerivedSection } from "@/components/sections";
import { getFaqPageModel } from "../page-composers/public-page-models";
import { PublicPageShell } from "./public-page-shell";
import aboutStyles from "./about-public-page.module.css";
import styles from "./faq-public-page.module.css";

export function FaqPublicPage() {
  const page = getFaqPageModel();

  return (
    <PublicPageShell page="faq" sectionIds={page.sections.map((section) => section.id)}>
      <main className={aboutStyles.page}>
        <LegacyDerivedHero className={aboutStyles.hero} content={page.hero} />
        {page.sections.map((section) => (
          <LegacyDerivedSection
            className={aboutStyles.anchorSection}
            header={section.header}
            id={section.id}
            key={section.id}
            tone={section.tone}
          >
            <div className={styles.list}>
              {section.items.map((item) => (
                <AccordionItem key={item.title} title={item.title}>
                  <p className={styles.answer}>{item.summary}</p>
                </AccordionItem>
              ))}
            </div>
          </LegacyDerivedSection>
        ))}
      </main>
    </PublicPageShell>
  );
}
