import Link from "next/link";
import { BrandActionButtonContent, getBrandActionButtonClassName } from "@/components/ui/brand-action-button";
import { homepageContent } from "@/content/homepage";
import { footerQuickLinks } from "./legacy-header.config";
import styles from "./legacy-footer.module.css";

const serviceLinks = [
  { href: "/services#consulting", label: "الاستشارات" },
  { href: "/services#branding", label: "الهوية البصرية" },
  { href: "/services#digital-marketing", label: "التسويق الرقمي" },
  { href: "/services#development", label: "البرمجة والتطوير" },
  { href: "/services#advertising", label: "الدعاية والإعلان" },
  { href: "/services#media", label: "إنتاج الميديا" },
] as const;

export function LegacyFooter() {
  const contact = homepageContent.contact;

  return (
    <footer className={`${styles.footer} sweed-common-footer`}>
      <div className={styles.inner}>
        <div className={styles.topGrid}>
          <div className={styles.brandBlock}>
            <Link className={styles.brandName} href="/">
              SWEED
            </Link>
            <p>{homepageContent.footer.description}</p>
            <a
              className={getBrandActionButtonClassName({ className: styles.whatsappAction, size: "compact", variant: "secondary" })}
              href={contact.whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              <BrandActionButtonContent>تواصل عبر واتساب</BrandActionButtonContent>
            </a>
          </div>

          <div className={styles.linkGroups}>
            <nav className={styles.linkGroup} aria-label="روابط سريعة">
              <p className={styles.groupTitle}>استكشف</p>
              {footerQuickLinks.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <nav className={styles.linkGroup} aria-label="خدمات SWEED">
              <p className={styles.groupTitle}>خدماتنا</p>
              {serviceLinks.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <address className={styles.contactGroup}>
              <p className={styles.groupTitle}>تواصل معانا</p>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} dir="ltr">
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <span>{contact.location}</span>
            </address>
          </div>
        </div>

        <div className={styles.legalRow}>
          <p>{homepageContent.footer.rights}</p>
          <nav aria-label="روابط قانونية">
            <Link href="/privacy">سياسة الخصوصية</Link>
            <Link href="/terms">شروط الاستخدام</Link>
          </nav>
        </div>

        <Link className={styles.wordmark} href="/" aria-label="SWEED - الرئيسية">
          <span className={styles.wordmarkAccent}>S</span>
          <span>WEED</span>
        </Link>
      </div>
    </footer>
  );
}
