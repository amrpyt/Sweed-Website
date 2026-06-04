import { Badge, ButtonLink, Card, Section, SectionHeader } from "@/components/ui";
import styles from "./marketing-page.module.css";

export function HeroBlock({
  eyebrow,
  title,
  description,
  primaryHref = "/contact",
  primaryLabel = "ابدأ مشروعك",
  secondaryHref,
  secondaryLabel,
  metrics = [],
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  metrics?: Array<{ value: string; label: string }>;
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroText}>
        <Badge>{eyebrow}</Badge>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroDescription}>{description}</p>
        <div className={styles.heroActions}>
          <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
          {secondaryHref && secondaryLabel ? (
            <ButtonLink href={secondaryHref} variant="secondary">
              {secondaryLabel}
            </ButtonLink>
          ) : null}
        </div>
      </div>
      <aside className={styles.heroPanel} aria-label="SWEED proof points">
        {metrics.map((metric) => (
          <div className={styles.metric} key={metric.label}>
            <strong className={styles.metricValue}>{metric.value}</strong>
            <span className={styles.metricLabel}>{metric.label}</span>
          </div>
        ))}
      </aside>
    </section>
  );
}

export function CtaBand({
  title,
  description,
  href = "/contact",
  label = "تواصل معنا",
}: {
  title: string;
  description: string;
  href?: string;
  label?: string;
}) {
  return (
    <Section as="div">
      <div className={styles.ctaBand}>
        <h2>{title}</h2>
        <p>{description}</p>
        <ButtonLink href={href}>{label}</ButtonLink>
      </div>
    </Section>
  );
}

export function CardsSection({
  eyebrow,
  title,
  description,
  children,
  columns = "three",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  columns?: "two" | "three";
}) {
  return (
    <Section>
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <div className={columns === "two" ? styles.twoGrid : styles.grid}>{children}</div>
    </Section>
  );
}

export function MarketingCard({
  title,
  summary,
  href,
  items,
}: {
  title: string;
  summary: string;
  href?: string;
  items?: string[];
}) {
  return (
    <Card className={styles.card}>
      <h3>{title}</h3>
      <p>{summary}</p>
      {items?.length ? (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {href ? (
        <ButtonLink href={href} variant="ghost">
          اعرف أكثر
        </ButtonLink>
      ) : null}
    </Card>
  );
}

