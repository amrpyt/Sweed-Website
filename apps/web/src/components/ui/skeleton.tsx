import type { HTMLAttributes } from "react";
import styles from "./skeleton.module.css";

export function Skeleton({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`${styles.skeleton} ${className}`} role="status" aria-label="Loading..." {...props} />;
}

export function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <Skeleton className={styles.skeletonIcon} />
      <Skeleton className={styles.skeletonTitle} />
      <Skeleton className={styles.skeletonText} />
      <Skeleton className={styles.skeletonText} style={{ width: "80%" }} />
    </div>
  );
}
