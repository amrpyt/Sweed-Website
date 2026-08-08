import Link from "next/link";
import type { ReactNode } from "react";
import type { LinkTarget } from "@/content/types";
import styles from "./public-page-hero.module.css";

type PublicPageHeroProps = {
  eyebrow?: string;
  title: string;
  summary: string;
  actions?: readonly LinkTarget[];
  children?: ReactNode;
  tone?: "light" | "dark";
};

export function PublicPageHero({
  eyebrow,
  title,
  summary,
  actions = [],
  children,
  tone = "light",
}: PublicPageHeroProps) {
  return (
    <header className={styles.hero} data-tone={tone} data-has-visual={Boolean(children) || undefined}>
      <div className={styles.layout}>
        <div className={styles.copy}>
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.summary}>{summary}</p>
          {actions.length > 0 ? (
            <div className={styles.actions}>
              {actions.map((action) => (
                <Link
                  className={styles.action}
                  data-variant={action.variant ?? "primary"}
                  href={action.href}
                  key={`${action.href}-${action.label}`}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
        {children ? <div className={styles.visual}>{children}</div> : null}
      </div>
    </header>
  );
}
