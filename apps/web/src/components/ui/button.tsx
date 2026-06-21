import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
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
    <button className={`${styles.button} ${styles[variant]} ${className}`} {...props}>
      <span aria-hidden="true" className={styles.starIcon}>
        {"\u2726"}
      </span>
      {children}
    </button>
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
    <Link className={`${styles.button} ${styles[variant]} ${className}`} href={href} {...props}>
      <span aria-hidden="true" className={styles.starIcon}>
        {"\u2726"}
      </span>
      {children}
    </Link>
  );
}
