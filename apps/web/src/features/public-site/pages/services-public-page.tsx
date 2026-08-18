import { CtaPanel, LegacyDerivedHero, LegacyDerivedSection } from "@/components/sections";
import { ButtonLink } from "@/components/ui/button";
import { getServicesPageModel } from "../page-composers/public-page-models";
import { PublicPageShell } from "./public-page-shell";
import aboutStyles from "./about-public-page.module.css";
import styles from "./services-public-page.module.css";

export function ServicesPublicPage() {
  const page = getServicesPageModel();

  return (
    <PublicPageShell page="services" sectionIds={[page.section.id]}>
      <main className={aboutStyles.page}>
        <LegacyDerivedHero className={aboutStyles.hero} content={page.hero} />
        <LegacyDerivedSection className={aboutStyles.anchorSection} header={page.section.header} id={page.section.id}>
          <div className={styles.grid}>
            {page.services.map((service) => (
              <article className={styles.card} id={service.slug} key={service.slug}>
                <div className={styles.cardBody}>
                  <p className={styles.eyebrow}>{service.category}</p>
                  <h3>{service.title}</h3>
                  <p className={styles.summary}>{service.summary}</p>
                  <ul className={styles.outcomes}>
                    {service.outcomes.slice(0, 3).map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </div>
                <ButtonLink href={service.detailHref} size="compact">
                  ناقش خدمة {service.title}
                </ButtonLink>
              </article>
            ))}
          </div>
        </LegacyDerivedSection>
        <LegacyDerivedSection>
          <CtaPanel content={page.cta} />
        </LegacyDerivedSection>
      </main>
    </PublicPageShell>
  );
}
