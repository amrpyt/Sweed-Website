"use client";

import { Button } from "@/components/ui/button";
import styles from "./state-pages.module.css";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className={styles.statePage}>
      <p className={styles.eyebrow}>حدث خطأ</p>
      <h1 className={styles.title}>الصفحة وقفت لحظة</h1>
      <p className={styles.description}>
        جرب تعيد التحميل. لو المشكلة اتكررت، ابعتلنا تفاصيل الصفحة اللي كنت عليها.
      </p>
      {error.digest ? <p className={styles.digest}>Ref: {error.digest}</p> : null}
      <Button type="button" onClick={reset}>
        حاول مرة تانية
      </Button>
    </main>
  );
}

