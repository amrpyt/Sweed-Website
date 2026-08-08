import Link from "next/link";
import { servicesPageSource, type ExecutiveServiceSource } from "@/content/public-site/services-page";
import { PublicPageShell } from "@/features/public-site/pages/public-page-shell";
import { PublicPageHero } from "@/features/public-site/shared/public-page-hero";
import { ServicesRouteMap } from "./services-route-map";
import styles from "./services-executive-page.module.css";

const serviceIds = servicesPageSource.services.map((service) => service.id);

export function ServicesExecutivePage() {
  return (
    <PublicPageShell
      page="services"
      sectionIds={[...serviceIds, servicesPageSource.integratedPath.id, servicesPageSource.finalCta.id]}
    >
      <main className={styles.page}>
        <PublicPageHero
          eyebrow={servicesPageSource.hero.eyebrow}
          title={servicesPageSource.hero.title}
          summary={servicesPageSource.hero.summary}
          actions={servicesPageSource.hero.actions}
          tone="dark"
        >
          <div className={styles.heroMap} aria-hidden="true">
            <span className={styles.heroCenter}>احتياجك</span>
            {servicesPageSource.services.map((service) => (
              <span className={styles.heroService} key={service.id}>
                {service.label}
              </span>
            ))}
          </div>
        </PublicPageHero>

        <ServicesRouteMap services={servicesPageSource.services} />

        {servicesPageSource.services.map((service) => (
          <ServiceJourneySection key={service.id} service={service} />
        ))}

        <section className={styles.integrated} id={servicesPageSource.integratedPath.id}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionIntro}>
              <p className={styles.contextLabel}>مسارات مقترحة</p>
              <h2>{servicesPageSource.integratedPath.title}</h2>
              <p>{servicesPageSource.integratedPath.summary}</p>
            </div>
            <div className={styles.paths}>
              {servicesPageSource.integratedPath.paths.map((path) => (
                <article className={styles.path} key={path.title}>
                  <h3>{path.title}</h3>
                  <ol>
                    {path.services.map((serviceId) => {
                      const service = servicesPageSource.services.find((item) => item.id === serviceId);
                      return <li key={serviceId}>{service?.label ?? serviceId}</li>;
                    })}
                  </ol>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta} id={servicesPageSource.finalCta.id}>
          <div className={styles.ctaInner}>
            <div>
              <h2>{servicesPageSource.finalCta.title}</h2>
              <p>{servicesPageSource.finalCta.summary}</p>
            </div>
            <Link className={styles.primaryAction} href={servicesPageSource.finalCta.primaryAction.href}>
              {servicesPageSource.finalCta.primaryAction.label}
            </Link>
          </div>
        </section>
      </main>
    </PublicPageShell>
  );
}

function ServiceJourneySection({ service }: { service: ExecutiveServiceSource }) {
  return (
    <section className={styles.serviceSection} data-composition={service.composition} id={service.id}>
      <div className={styles.serviceInner}>
        <div className={styles.serviceIntro}>
          <p className={styles.contextLabel}>{service.label}</p>
          <h2>{service.title}</h2>
          <p className={styles.problem}>{service.problem}</p>
          <p className={styles.role}>{service.role}</p>
        </div>

        <div className={styles.serviceDetails}>
          <div className={styles.scopeBlock}>
            <h3>نطاق يساعدك تبدأ بصورة واضحة</h3>
            <ul>
              {service.scope.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <p className={styles.success}>{service.successIndicator}</p>
          <Link className={styles.serviceAction} href={service.href}>
            {service.actionLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
