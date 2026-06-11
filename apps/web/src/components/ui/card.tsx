import type { ReactNode } from "react";
import styles from "./card.module.css";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <article className={`${styles.card} ${className}`}>{children}</article>;
}

