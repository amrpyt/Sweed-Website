import styles from "./state-pages.module.css";

export default function Loading() {
  return (
    <main className={styles.statePage} aria-label="Loading page">
      <div className={styles.skeletonBlock} />
      <div className={styles.skeletonLine} />
      <div className={styles.skeletonLineShort} />
    </main>
  );
}

