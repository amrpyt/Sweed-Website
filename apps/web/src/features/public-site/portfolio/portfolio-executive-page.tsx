import Link from "next/link";
import { portfolioPageSource, type PortfolioGroupSource, type PortfolioProjectSource } from "@/content/public-site/portfolio-page";
import { PublicPageShell } from "@/features/public-site/pages/public-page-shell";
import { ProofStateLabel } from "@/features/public-site/shared/proof-state-label";
import { PublicPageHero } from "@/features/public-site/shared/public-page-hero";
import { PortfolioFilterStrip } from "./portfolio-filter-strip";
import styles from "./portfolio-executive-page.module.css";

const sectionIds = [
  ...portfolioPageSource.groups.map((group) => group.id),
  portfolioPageSource.sectors.id,
  portfolioPageSource.finalCta.id,
];

export function PortfolioExecutivePage() {
  return (
    <PublicPageShell page="portfolio" sectionIds={sectionIds}>
      <main className={styles.page}>
        <PublicPageHero
          eyebrow={portfolioPageSource.hero.eyebrow}
          title={portfolioPageSource.hero.title}
          summary={portfolioPageSource.hero.summary}
          actions={portfolioPageSource.hero.actions}
          tone="dark"
        >
          <div className={styles.proofHero}>
            <span>{portfolioPageSource.verifiedTrust.label}</span>
            <strong>{portfolioPageSource.verifiedTrust.metric}</strong>
            <p>{portfolioPageSource.verifiedTrust.title}</p>
          </div>
        </PublicPageHero>

        <section className={styles.trustStrip} aria-label="دليل موثق">
          <div className={styles.trustInner}>
            <ProofStateLabel state="verified" label="نتيجة موثقة" />
            <strong>{portfolioPageSource.verifiedTrust.title}</strong>
            <span>{portfolioPageSource.verifiedTrust.metric}</span>
            <p>{portfolioPageSource.verifiedTrust.summary}</p>
          </div>
        </section>

        <PortfolioFilterStrip groups={portfolioPageSource.groups} />

        {portfolioPageSource.groups.map((group, index) => (
          <PortfolioNarrativeGroup group={group} index={index} key={group.id} />
        ))}

        <section className={styles.sectors} id={portfolioPageSource.sectors.id}>
          <div className={styles.container}>
            <SectionIntro title={portfolioPageSource.sectors.title} summary={portfolioPageSource.sectors.summary} />
            <div className={styles.sectorGrid}>
              {portfolioPageSource.sectors.items.map((sector) => (
                <article key={sector.label}>
                  <h3>{sector.label}</h3>
                  <strong>{sector.projects}</strong>
                  <p>{sector.services}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta} id={portfolioPageSource.finalCta.id}>
          <div className={styles.ctaInner}>
            <div>
              <h2>{portfolioPageSource.finalCta.title}</h2>
              <p>{portfolioPageSource.finalCta.summary}</p>
            </div>
            <div className={styles.ctaActions}>
              {portfolioPageSource.finalCta.actions.map((action) => (
                <Link data-variant={action.variant} href={action.href} key={action.href}>
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PublicPageShell>
  );
}

function PortfolioNarrativeGroup({ group, index }: { group: PortfolioGroupSource; index: number }) {
  return (
    <section className={styles.group} data-tone={group.tone ?? "light"} data-layout={index % 3} id={group.id}>
      <div className={styles.container}>
        <SectionIntro label={group.label} title={group.title} summary={group.summary} />
        <div className={styles.projects}>
          {group.projects.map((project, projectIndex) => (
            <ProjectStory project={project} featured={projectIndex === 0} key={project.id} />
          ))}
        </div>
        {group.serviceHref && group.serviceAction ? (
          <Link className={styles.serviceLink} href={group.serviceHref}>
            {group.serviceAction}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function ProjectStory({ project, featured }: { project: PortfolioProjectSource; featured: boolean }) {
  return (
    <article className={styles.project} data-featured={featured || undefined}>
      <div className={styles.projectHead}>
        <ProofStateLabel state={project.proof.state} label={project.proof.label} />
        <h3>{project.title}</h3>
      </div>
      <div className={styles.projectStory}>
        <div>
          <span>التحدي</span>
          <p>{project.challenge}</p>
        </div>
        <div>
          <span>دور SWEED</span>
          <p>{project.role}</p>
        </div>
        <div>
          <span>المخرج</span>
          <p>{project.deliverable}</p>
        </div>
      </div>
      <ul className={styles.facts}>
        {project.facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
      {project.proof.metric ? <strong className={styles.metric}>{project.proof.metric}</strong> : null}
      {project.href ? (
        <Link className={styles.projectLink} href={project.href}>
          افتح المشروع
        </Link>
      ) : null}
    </article>
  );
}

function SectionIntro({ label, title, summary }: { label?: string; title: string; summary: string }) {
  return (
    <header className={styles.sectionIntro}>
      {label ? <p>{label}</p> : null}
      <h2>{title}</h2>
      <span>{summary}</span>
    </header>
  );
}
