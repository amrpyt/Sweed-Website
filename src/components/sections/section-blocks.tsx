import Link from "next/link";
import type { CTAContent, HeroContent, IconTextItem, SectionHeaderContent, StatItem } from "@/content/types";
import styles from "./section-blocks.module.css";

export function LegacyDerivedHero({ content, children }: { content: HeroContent; children?: React.ReactNode }) {
  return (
    <section className={styles.hero}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div>
          {content.eyebrow ? <p className={styles.eyebrow}>{content.eyebrow}</p> : null}
          <h1 className={styles.heroTitle}>{content.title}</h1>
          <p className={styles.summary}>{content.summary}</p>
          {content.actions?.length ? (
            <div className={styles.actions}>
              {content.actions.map((action) => (
                <Link href={action.href} key={action.href}>
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}
          {content.stats?.length ? <StatsList stats={content.stats} /> : null}
        </div>
        {children ? <div>{children}</div> : null}
      </div>
    </section>
  );
}

export function LegacyDerivedSection({
  header,
  children,
  tone = "default",
}: {
  header?: SectionHeaderContent;
  children: React.ReactNode;
  tone?: "default" | "alt";
}) {
  return (
    <section className={`${styles.section} ${tone === "alt" ? styles.sectionAlt : ""}`}>
      <div className={styles.container}>
        {header ? <SectionIntro content={header} /> : null}
        {children}
      </div>
    </section>
  );
}

export function SectionIntro({ content }: { content: SectionHeaderContent }) {
  return (
    <header className={styles.sectionHeader}>
      {content.eyebrow ? <p className={styles.eyebrow}>{content.eyebrow}</p> : null}
      <h2 className={styles.sectionTitle}>{content.title}</h2>
      {content.summary ? <p className={styles.sectionSummary}>{content.summary}</p> : null}
    </header>
  );
}

export function CardsGrid({ items }: { items: IconTextItem[] }) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <article className={styles.card} key={`${item.title}-${item.value ?? ""}`}>
          <h3>{item.value ?? item.title}</h3>
          {item.value ? <p>{item.title}</p> : null}
          {item.summary ? <p>{item.summary}</p> : null}
        </article>
      ))}
    </div>
  );
}

export function StatsList({ stats }: { stats: StatItem[] }) {
  return (
    <div className={styles.stats}>
      {stats.map((stat) => (
        <div className={styles.stat} key={`${stat.value}-${stat.label}`}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

export function CtaPanel({ content }: { content: CTAContent }) {
  return (
    <div className={styles.cta}>
      <h2>{content.title}</h2>
      <p>{content.summary}</p>
      <Link href={content.primaryAction.href}>{content.primaryAction.label}</Link>
    </div>
  );
}
