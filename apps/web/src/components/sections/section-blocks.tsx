import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import type { CTAContent, HeroContent, IconTextItem, SectionHeaderContent, StatItem } from "@/content/types";
import styles from "./section-blocks.module.css";

export function LegacyDerivedHero({
  content,
  children,
  className,
  id,
}: {
  content: HeroContent;
  children?: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section className={className ? `${styles.hero} ${className}` : styles.hero} id={id}>
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <Reveal variant="hero">
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
        </Reveal>
        {children ? <Reveal variant="slideStart">{children}</Reveal> : null}
      </div>
    </section>
  );
}

export function LegacyDerivedSection({
  header,
  children,
  tone = "default",
  className,
  id,
}: {
  header?: SectionHeaderContent;
  children: React.ReactNode;
  tone?: "default" | "alt";
  className?: string;
  id?: string;
}) {
  return (
    <section
      className={`${styles.section} ${tone === "alt" ? styles.sectionAlt : ""}${className ? ` ${className}` : ""}`}
      id={id}
    >
      <div className={styles.container}>
        {header ? <SectionIntro content={header} /> : null}
        {children}
      </div>
    </section>
  );
}

export function SectionIntro({ content }: { content: SectionHeaderContent }) {
  return (
    <Reveal as="header" className={styles.sectionHeader} variant="soft">
      {content.eyebrow ? <p className={styles.eyebrow}>{content.eyebrow}</p> : null}
      <h2 className={styles.sectionTitle}>{content.title}</h2>
      {content.summary ? <p className={styles.sectionSummary}>{content.summary}</p> : null}
    </Reveal>
  );
}

export function CardsGrid({ items }: { items: IconTextItem[] }) {
  return (
    <div className={styles.grid}>
      {items.map((item, index) => (
        <Reveal as="article" className={styles.card} delay={index * 70} key={`${item.title}-${item.value ?? ""}`} variant="scaleIn">
          <h3>{item.value ?? item.title}</h3>
          {item.value ? <p>{item.title}</p> : null}
          {item.summary ? <p>{item.summary}</p> : null}
        </Reveal>
      ))}
    </div>
  );
}

export function StatsList({ stats }: { stats: StatItem[] }) {
  return (
    <div className={styles.stats}>
      {stats.map((stat, index) => (
        <Reveal className={styles.stat} delay={index * 60} key={`${stat.value}-${stat.label}`} variant="scaleIn">
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </Reveal>
      ))}
    </div>
  );
}

export function CtaPanel({ content }: { content: CTAContent }) {
  return (
    <Reveal className={styles.cta} variant="scaleIn">
      <h2>{content.title}</h2>
      <p>{content.summary}</p>
      <Link href={content.primaryAction.href}>{content.primaryAction.label}</Link>
    </Reveal>
  );
}
