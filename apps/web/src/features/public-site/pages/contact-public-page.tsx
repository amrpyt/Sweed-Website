import { CardsGrid, LegacyDerivedHero, LegacyDerivedSection } from "@/components/sections";
import { getContactPageModel } from "../page-composers/public-page-models";
import { ContactInquiryForm } from "./contact-inquiry-form";
import { PublicPageShell } from "./public-page-shell";
import aboutStyles from "./about-public-page.module.css";
import styles from "./contact-public-page.module.css";

export function ContactPublicPage() {
  const page = getContactPageModel();

  return (
    <PublicPageShell page="contact" sectionIds={[page.form.id, ...page.sections.map((section) => section.id)]}>
      <main className={aboutStyles.page}>
        <LegacyDerivedHero className={aboutStyles.hero} content={page.hero} />
        <LegacyDerivedSection className={aboutStyles.anchorSection} id={page.form.id}>
          <div className={styles.formLayout}>
            <ContactInquiryForm form={page.form} />
            <aside className={styles.infoPanel}>
              <h2>قبل أن ترسل الطلب</h2>
              <p>اجمع النقاط الأساسية عن مشروعك الحالي أو الخدمة التي تريد تحسينها، وسنرتب معك أول خطوة عملية.</p>
              <ul className={styles.infoList}>
                <li>حدد الخدمة الأقرب لاحتياجك الحالي.</li>
                <li>أضف رقمًا يمكن التواصل معك عليه بسرعة.</li>
                <li>لو عندك موعد مناسب، اذكره في الملاحظات.</li>
              </ul>
            </aside>
          </div>
        </LegacyDerivedSection>
        {page.sections.map((section) => (
          <LegacyDerivedSection
            className={aboutStyles.anchorSection}
            header={section.header}
            id={section.id}
            key={section.id}
            tone={section.tone}
          >
            <CardsGrid items={section.items} />
          </LegacyDerivedSection>
        ))}
      </main>
    </PublicPageShell>
  );
}
