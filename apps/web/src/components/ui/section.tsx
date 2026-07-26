import type { ReactNode } from "react";
import styles from "./section.module.css";

type SectionElement = "main" | "section" | "div";
type SectionWidth = "default" | "narrow" | "wide" | "full";
type SectionSpacing = "compact" | "default" | "feature" | "none";
type HeadingLevel = 1 | 2 | 3;

export function Section({
  children,
  className = "",
  as: Component = "section",
  width = "default",
  spacing = "default",
}: {
  children: ReactNode;
  className?: string;
  as?: SectionElement;
  width?: SectionWidth;
  spacing?: SectionSpacing;
}) {
  return (
    <Component
      className={`${styles.section} ${className}`}
      data-spacing={spacing}
      data-width={width}
    >
      {children}
    </Component>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "start",
  headingLevel = 2,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  headingLevel?: HeadingLevel;
}) {
  const Heading = `h${headingLevel}` as "h1" | "h2" | "h3";

  return (
    <header className={styles.header} data-align={align}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <Heading className={styles.title}>{title}</Heading>
      {description ? <p className={styles.description}>{description}</p> : null}
    </header>
  );
}
