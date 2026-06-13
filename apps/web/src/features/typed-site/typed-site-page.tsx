import Link from "next/link";
import { CardsGrid, CtaPanel, LegacyDerivedHero, LegacyDerivedSection } from "@/components/sections";
import { LegacyHeader } from "@/features/legacy-site/legacy-header";
import type { LegacyPageKey } from "@/features/legacy-site/legacy-routes";
import { typedPages, type TypedPageKey } from "./typed-site-data";
import styles from "./typed-site-page.module.css";

export function getTypedPageMetadata(page: TypedPageKey) {
  const content = typedPages[page];

  return {
    title: content.seo.title,
    description: content.seo.description,
  };
}

export function TypedSitePage({ page }: { page: TypedPageKey }) {
  const content = typedPages[page];

  return (
    <div className={styles.page}>
      <LegacyHeader page={page as LegacyPageKey} />
      {content.breadcrumb ? <Breadcrumb current={content.breadcrumb} /> : null}
      <LegacyDerivedHero content={content.hero}>
        {content.hero.features?.length ? (
          <aside className={styles.featurePanel}>
            <ul>
              {content.hero.features.map((feature) => (
                <li key={feature.title}>{feature.title}</li>
              ))}
            </ul>
          </aside>
        ) : null}
      </LegacyDerivedHero>
      {content.sections.map((section) => (
        <LegacyDerivedSection header={section.header} key={section.id} tone={section.tone}>
          <CardsGrid items={section.items} />
        </LegacyDerivedSection>
      ))}
      <LegacyDerivedSection>
        <CtaPanel content={content.cta} />
      </LegacyDerivedSection>
      <TypedFooter />
    </div>
  );
}

function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="مسار الصفحة" className={`breadcrumb ${styles.breadcrumb}`}>
      <div className={styles.breadcrumbInner}>
        <Link href="/">الرئيسية</Link>
        {" > "}
        <span>{current}</span>
      </div>
    </nav>
  );
}

function TypedFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <section>
          <h2>SWEED</h2>
          <p>نصنع حضورك. نطلق مستقبل عملك.</p>
        </section>
        <section>
          <h3>روابط سريعة</h3>
          <p>
            <Link href="/services">خدماتنا</Link> | <Link href="/offers">العروض</Link> |{" "}
            <Link href="/contact">تواصل</Link>
          </p>
        </section>
        <section>
          <h3>تواصل معنا</h3>
          <p>01068274662</p>
          <p>info@sweed.com</p>
        </section>
      </div>
      <p className={styles.copyright}>© SWEED Marketing & Advertising</p>
    </footer>
  );
}
