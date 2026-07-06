import type { ReactNode } from "react";
import styles from "./brand-action-button.module.css";

export type BrandActionButtonVariant = "primary" | "secondary" | "light";
export type BrandActionButtonSize = "default" | "hero" | "nav" | "compact";

const variantClassName: Record<BrandActionButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  light: styles.light,
};

const sizeClassName: Record<BrandActionButtonSize, string> = {
  default: "",
  hero: styles.hero,
  nav: styles.nav,
  compact: styles.compact,
};

export function getBrandActionButtonClassName({
  className = "",
  size = "default",
  variant = "primary",
}: {
  className?: string;
  size?: BrandActionButtonSize;
  variant?: BrandActionButtonVariant;
}) {
  return [styles.actionButton, variantClassName[variant], sizeClassName[size], className].filter(Boolean).join(" ");
}

export function BrandActionArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.75"
      viewBox="0 0 24 24"
      width="18"
    >
      <path d="M16 16L8 8" />
      <path d="M9 8h7v7" />
    </svg>
  );
}

export function BrandActionButtonContent({ children, icon = <BrandActionArrowIcon /> }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <>
      <span aria-hidden="true" className={styles.fill} />
      <span className={styles.iconBox}>{icon}</span>
      <span className={styles.label}>{children}</span>
    </>
  );
}
