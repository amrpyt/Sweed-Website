import { CardsGrid, CtaPanel, LegacyDerivedHero, LegacyDerivedSection } from "@/components/sections";
import { getAboutPageModel } from "../page-composers/public-page-models";
import { PublicPageShell } from "./public-page-shell";
import styles from "./about-public-page.module.css";

export function AboutPublicPage() {
  const page = getAboutPageModel();

  return (
    <PublicPageShell page="about" sectionIds={page.sections.map((section) => section.id)}>
      <main className={styles.page}>
        <LegacyDerivedHero className={styles.hero} content={page.hero} />
        {page.sections.map((section) => (
          <LegacyDerivedSection
            className={styles.anchorSection}
            header={section.header}
            id={section.id}
            key={section.id}
            tone={section.tone}
          >
            <CardsGrid items={section.items} />
          </LegacyDerivedSection>
        ))}
        <LegacyDerivedSection>
          <CtaPanel content={page.cta} />
        </LegacyDerivedSection>
      </main>
    </PublicPageShell>
  );
}
