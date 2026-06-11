import { ButtonLink } from "@/components/ui/button";
import styles from "./state-pages.module.css";

export default function NotFound() {
  return (
    <main className={styles.statePage}>
      <p className={styles.eyebrow}>404</p>
      <h1 className={styles.title}>الصفحة دي مش موجودة</h1>
      <p className={styles.description}>ارجع للرئيسية أو تواصل مع فريق SWEED لو كنت تبحث عن خدمة محددة.</p>
      <ButtonLink href="/">العودة للرئيسية</ButtonLink>
    </main>
  );
}

