import { getContactPageModel, getPublicSiteShellData } from "@/features/public-site";
import { PublicPageHero } from "@/features/public-site/shared/public-page-hero";
import { ContactInquiryForm } from "./contact-inquiry-form";
import { PublicPageShell } from "./public-page-shell";
import styles from "./contact-public-page.module.css";

export function ContactPublicPage() {
  const page = getContactPageModel();
  const shell = getPublicSiteShellData();
  const contactInfo = page.sections.find((section) => section.id === "contact-info");

  return (
    <PublicPageShell page="contact" sectionIds={[page.form.id, "contact-info"]}>
      <main className={styles.page}>
        <PublicPageHero
          eyebrow={page.hero.eyebrow}
          title={page.hero.title}
          summary={page.hero.summary}
          tone="dark"
        >
          <div className={styles.primaryMethods} aria-label="طرق التواصل السريع">
            <a href={`tel:${shell.siteSettings.primaryPhone.replace(/\s/g, "")}`}>
              <span>اتصل الآن</span>
              <strong dir="ltr">{shell.siteSettings.primaryPhone}</strong>
            </a>
            <a href={shell.siteSettings.whatsappUrl} target="_blank" rel="noreferrer">
              <span>واتساب</span>
              <strong>ابدأ محادثة مباشرة</strong>
            </a>
          </div>
        </PublicPageHero>

        <div className={styles.contactJourney}>
          <section className={styles.formSection} id={page.form.id} aria-labelledby="contact-form-title">
            <ContactInquiryForm form={page.form} />
          </section>

          <section className={styles.detailsSection} id="contact-info" aria-labelledby="contact-info-title">
            <header className={styles.detailsHeader}>
              <p>تواصل مباشر</p>
              <h2 id="contact-info-title">{contactInfo?.header.title ?? "معلومات التواصل"}</h2>
              <span>{contactInfo?.header.summary}</span>
            </header>

            <div className={styles.contactMethods}>
              <a href={`tel:${shell.siteSettings.primaryPhone.replace(/\s/g, "")}`}>
                <span>المبيعات</span>
                <strong dir="ltr">{shell.siteSettings.primaryPhone}</strong>
              </a>
              <a href={shell.siteSettings.whatsappUrl} target="_blank" rel="noreferrer">
                <span>واتساب</span>
                <strong dir="ltr">{shell.siteSettings.primaryPhone}</strong>
              </a>
              <a href={`mailto:${shell.siteSettings.primaryEmail}`}>
                <span>البريد الإلكتروني</span>
                <strong dir="ltr">{shell.siteSettings.primaryEmail}</strong>
              </a>
            </div>
          </section>
        </div>
      </main>
    </PublicPageShell>
  );
}
