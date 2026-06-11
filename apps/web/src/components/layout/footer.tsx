import Link from "next/link";
import { primaryNavigation } from "@/content/navigation";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <Link className={styles.logo} href="/">
            SWEED
          </Link>
          <p className={styles.copy}>نصنع مواقع وأنظمة وتجارب AI تساعد العميل يفهم ويقرر بسرعة.</p>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          {primaryNavigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

