import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { StarBorder } from "./star-border";
import styles from "./button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost";

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkButtonProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <StarBorder
      as="button"
      className={`${styles.buttonFrame} ${className}`}
      color={variant === "primary" ? "white" : "#ed2062"}
      contentClassName={`${styles.button} ${styles[variant]}`}
      {...props}
    >
      <span aria-hidden="true" className={styles.starIcon}>
        {"\u2726"}
      </span>
      {children}
    </StarBorder>
  );
}

export function ButtonLink({
  children,
  variant = "primary",
  className = "",
  href,
  ...props
}: LinkButtonProps) {
  return (
    <StarBorder
      as={Link}
      className={`${styles.buttonFrame} ${className}`}
      color={variant === "primary" ? "white" : "#ed2062"}
      contentClassName={`${styles.button} ${styles[variant]}`}
      href={href}
      {...props}
    >
      <span aria-hidden="true" className={styles.starIcon}>
        {"\u2726"}
      </span>
      {children}
    </StarBorder>
  );
}
