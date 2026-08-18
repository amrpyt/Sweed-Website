import { ButtonLink } from "@/components/ui/button";
import { softwareDevelopmentPageSource } from "@/content/public-site/software-development-page";
import { PublicPageShell } from "@/features/public-site/pages/public-page-shell";
import { PublicPageHero } from "@/features/public-site/shared/public-page-hero";
import { SoftwareFaultDiagnostic } from "./software-fault-diagnostic";
import { SoftwareModuleExplorer } from "./software-module-explorer";
import styles from "./software-development-page.module.css";

const sectionIds = [
  softwareDevelopmentPageSource.fault.id,
  softwareDevelopmentPageSource.comparison.id,
  "modules",
  "solution-paths",
  "integration-flow",
  "development-method",
  softwareDevelopmentPageSource.finalCta.id,
];

export function SoftwareDevelopmentPage() {
  return (
    <PublicPageShell page="service-detail" sectionIds={sectionIds}>
      <main className={styles.page}>
        <PublicPageHero
          eyebrow={softwareDevelopmentPageSource.hero.eyebrow}
          title={softwareDevelopmentPageSource.hero.title}
          summary={softwareDevelopmentPageSource.hero.summary}
          actions={softwareDevelopmentPageSource.hero.actions}
          tone="dark"
        >
          <div className={styles.layerMap} aria-label="طبقات النظام الست">
            {softwareDevelopmentPageSource.layers.map((layer) => (
              <div className={styles.layer} key={layer.id}>
                <strong>{layer.title}</strong>
                <span>{layer.summary}</span>
              </div>
            ))}
          </div>
        </PublicPageHero>

        <section className={styles.section} id={softwareDevelopmentPageSource.fault.id}>
          <div className={styles.container}>
            <SectionHeading
              eyebrow="اختبار العطل"
              title={softwareDevelopmentPageSource.fault.title}
              summary={softwareDevelopmentPageSource.fault.summary}
            />
            <SoftwareFaultDiagnostic
              options={softwareDevelopmentPageSource.faultOptions}
              note={softwareDevelopmentPageSource.fault.note}
            />
          </div>
        </section>

        <section className={`${styles.section} ${styles.comparisonSection}`} id={softwareDevelopmentPageSource.comparison.id}>
          <div className={styles.container}>
            <SectionHeading eyebrow="ما وراء الشاشة" title={softwareDevelopmentPageSource.comparison.title} />
            <div className={styles.comparison}>
              <ComparisonColumn title="واجهة فقط" items={softwareDevelopmentPageSource.comparison.interfaceOnly} />
              <ComparisonColumn title="منتج رقمي" items={softwareDevelopmentPageSource.comparison.digitalProduct} emphasized />
            </div>
            <p className={styles.sectionNote}>{softwareDevelopmentPageSource.comparison.note}</p>
          </div>
        </section>

        <section className={styles.section} id="modules">
          <div className={styles.container}>
            <SectionHeading
              eyebrow="أقسام الخدمة"
              title="6 وحدات داخل منظومة واحدة"
              summary="الأقسام بتعرّف النطاق الكامل، والمسارات اللي بعدها بتساعدك تختار بداية تناسب هدفك."
            />
            <SoftwareModuleExplorer modules={softwareDevelopmentPageSource.modules} />
          </div>
        </section>

        <section className={`${styles.section} ${styles.pathsSection}`} id="solution-paths">
          <div className={styles.container}>
            <SectionHeading
              eyebrow="مسارات الحل"
              title="اختر هدفك… لا اسم التقنية"
              summary="ممكن يبدأ المشروع بمسار واحد وينتقل لمسار تاني — مش كل عميل محتاج كل الخدمات."
            />
            <div className={styles.useCases}>
              {softwareDevelopmentPageSource.useCases.map((useCase) => (
                <article className={styles.useCase} key={useCase.id}>
                  <span>{useCase.label}</span>
                  <h3>{useCase.title}</h3>
                  <p>{useCase.fit}</p>
                  <ul>
                    {useCase.indicators.map((indicator) => (
                      <li key={indicator}>{indicator}</li>
                    ))}
                  </ul>
                  <small>{useCase.note}</small>
                  <ButtonLink href={`/contact?source=software-development&path=${useCase.id}`} size="compact">
                    ابدأ بهذا المسار
                  </ButtonLink>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="integration-flow">
          <div className={styles.container}>
            <SectionHeading
              eyebrow="ترابط النظام"
              title="من طلب المستخدم لحد الحفظ والتأكيد"
              summary="المشكلة مش نقص أدوات. القيمة تظهر لما الواجهة والمنطق والبيانات والتكاملات يتحركوا كمسار واحد."
            />
            <ol className={styles.integrationFlow}>
              {softwareDevelopmentPageSource.integrationFlow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className={`${styles.section} ${styles.processSection}`} id="development-method">
          <div className={styles.container}>
            <SectionHeading
              eyebrow="منهج التطوير"
              title="7 بوابات قبل ما النظام يبقى Live"
              summary="كل بوابة ليها سؤال ونقطة اعتماد — والمرحلة اللي بعدها مبتبدأش قبل اعتماد اللي قبلها."
            />
            <ol className={styles.process}>
              {softwareDevelopmentPageSource.process.map((step, index) => (
                <li key={step.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.question}</p>
                    <strong>نقطة الاعتماد: {step.approval}</strong>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.finalCta} id={softwareDevelopmentPageSource.finalCta.id}>
          <div className={styles.ctaLayout}>
            <div className={styles.ctaCopy}>
              <p>{softwareDevelopmentPageSource.finalCta.eyebrow}</p>
              <h2>{softwareDevelopmentPageSource.finalCta.title}</h2>
              <span>{softwareDevelopmentPageSource.finalCta.summary}</span>
              <ul>
                {softwareDevelopmentPageSource.finalCta.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <small>{softwareDevelopmentPageSource.finalCta.note}</small>
            </div>
            <div className={styles.ctaActions}>
              {softwareDevelopmentPageSource.finalCta.actions.map((action) => (
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

function SectionHeading({ eyebrow, title, summary }: { eyebrow: string; title: string; summary?: string }) {
  return (
    <header className={styles.sectionHeading}>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {summary ? <span>{summary}</span> : null}
    </header>
  );
}

function ComparisonColumn({ title, items, emphasized = false }: { title: string; items: readonly string[]; emphasized?: boolean }) {
  return (
    <article className={styles.comparisonColumn} data-emphasized={emphasized || undefined}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
