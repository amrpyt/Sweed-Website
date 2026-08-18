import { AccordionItem } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { offersPageSource, type OfferPackageSource, type OfferServiceGroupSource } from "@/content/public-site/offers-page";
import { PublicPageShell } from "@/features/public-site/pages/public-page-shell";
import { PublicPageHero } from "@/features/public-site/shared/public-page-hero";
import { StickyChipStrip } from "@/features/public-site/shared/sticky-chip-strip";
import { NeedsSelector } from "./needs-selector";
import { PackageComparisonButton } from "./package-comparison";
import styles from "./offers-executive-page.module.css";

const serviceSectionIds = offersPageSource.serviceGroups.map((group) => `offers-${group.id}`);
const sectionIds = [offersPageSource.quiz.id, offersPageSource.integrated.id, ...serviceSectionIds, "offers-faq", offersPageSource.finalCta.id];

export function OffersExecutivePage() {
  const integratedComparison = offersPageSource.comparisons.find((item) => item.id === "integrated")!;

  return (
    <PublicPageShell page="offers" sectionIds={sectionIds}>
      <main className={styles.page}>
        <PublicPageHero
          eyebrow={offersPageSource.hero.eyebrow}
          title={offersPageSource.hero.title}
          summary={offersPageSource.hero.summary}
          actions={offersPageSource.hero.actions}
          tone="dark"
        >
          <div className={styles.heroChoices} aria-hidden="true">
            {offersPageSource.integratedPackages.map((pack) => (
              <span key={pack.id}>{pack.title}</span>
            ))}
          </div>
        </PublicPageHero>

        <section className={styles.quizSection} id={offersPageSource.quiz.id}>
          <div className={styles.container}>
            <SectionIntro title={offersPageSource.quiz.title} summary={offersPageSource.quiz.summary} />
            <NeedsSelector />
          </div>
        </section>

        <section className={styles.integratedSection} id={offersPageSource.integrated.id}>
          <div className={styles.container}>
            <SectionIntro title={offersPageSource.integrated.title} summary={offersPageSource.integrated.summary} />
            <div className={styles.integratedPackages}>
              {offersPageSource.integratedPackages.map((pack) => (
                <PackageCard packageSource={pack} key={pack.id} />
              ))}
            </div>
            <PackageComparisonButton comparison={integratedComparison} label="قارن الباقات الشاملة" />
          </div>
        </section>

        <StickyChipStrip
          ariaLabel="اختيار نوع باقات SWEED"
          items={offersPageSource.serviceGroups.map((group) => ({
            id: group.id,
            label: group.label,
            href: `#offers-${group.id}`,
          }))}
        />

        {offersPageSource.serviceGroups.map((group, index) => (
          <ServicePackageGroup group={group} index={index} key={group.id} />
        ))}

        <section className={styles.faqSection} id="offers-faq">
          <div className={styles.container}>
            <SectionIntro
              title="اعتراضات لازم تتقفل قبل التواصل"
              summary="إجابات مباشرة على الأسئلة اللي بتفرق فعلًا قبل اختيار النطاق والتعاقد."
            />
            <div className={styles.faqList}>
              {offersPageSource.faq.map((item) => (
                <AccordionItem title={item.question} key={item.question}>
                  <p>{item.answer}</p>
                </AccordionItem>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta} id={offersPageSource.finalCta.id}>
          <div className={styles.ctaInner}>
            <div>
              <h2>{offersPageSource.finalCta.title}</h2>
              <p>{offersPageSource.finalCta.summary}</p>
            </div>
            <div className={styles.ctaActions}>
              {offersPageSource.finalCta.actions.map((action) => (
                <ButtonLink href={action.href} key={action.href} variant={action.variant}>
                  {action.label}
                </ButtonLink>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PublicPageShell>
  );
}

function ServicePackageGroup({ group, index }: { group: OfferServiceGroupSource; index: number }) {
  const comparison = offersPageSource.comparisons.find((item) => item.id === group.comparisonId)!;

  return (
    <section className={styles.serviceSection} data-tone={index % 3} id={`offers-${group.id}`}>
      <div className={styles.container}>
        <SectionIntro label={group.label} title={group.title} summary="اختار مستوى الخدمة حسب حجم القرار والنطاق — وكل باقة تتسعّر بعد تثبيت المطلوب." />
        <div className={styles.servicePackages}>
          {group.packages.map((pack) => (
            <PackageCard packageSource={pack} key={pack.id} />
          ))}
        </div>
        <PackageComparisonButton comparison={comparison} />
      </div>
    </section>
  );
}

function PackageCard({ packageSource }: { packageSource: OfferPackageSource }) {
  return (
    <article className={styles.packageCard} data-featured={packageSource.highlighted || undefined} id={`package-${packageSource.id}`}>
      <div className={styles.packageHead}>
        {packageSource.highlighted ? <span>المستوى الأوسط</span> : null}
        <h3>{packageSource.title}</h3>
        {packageSource.summary ? <p>{packageSource.summary}</p> : null}
        <strong>{packageSource.priceLabel}</strong>
      </div>
      <ul>
        {packageSource.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <ButtonLink href={packageSource.href} size="compact">{packageSource.actionLabel}</ButtonLink>
    </article>
  );
}

function SectionIntro({ label, title, summary }: { label?: string; title: string; summary: string }) {
  return (
    <header className={styles.sectionIntro}>
      {label ? <p>{label}</p> : null}
      <h2>{title}</h2>
      <span>{summary}</span>
    </header>
  );
}
