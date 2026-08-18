import { Reveal } from "@/components/motion/reveal";
import { homepageContent, type HomeMetric } from "@/content/homepage";
import styles from "./home-why-metrics-section.module.css";

function Metric({ metric }: { metric: HomeMetric }) {
  return (
    <div className={styles.metric} data-testid="home-trust-metric" data-target={metric.value}>
      <strong aria-label={`${metric.value} ${metric.label}`}>{metric.value}</strong>
      <span>{metric.label}</span>
    </div>
  );
}

export function HomeWhyMetricsSection() {
  return (
    <section className={styles.section} id="sweed-why" aria-labelledby="home-why-title">
      <div className={styles.container}>
        <div className={styles.headingLayout}>
          <div>
            <h2 id="home-why-title">ليه تختار سويد؟</h2>
          </div>
          <p className={styles.intro}>
            في مسافة بين قيمة شغلك الحقيقية... وبين اللي السوق شايفه. شغلتنا إننا نقفل المسافة دي.
          </p>
        </div>

        <div className={styles.pointsGrid}>
          {homepageContent.why.map((point, index) => (
            <Reveal className={styles.point} delay={index * 90} key={point.title} once variant="soft">
              <span className={styles.pointIcon} aria-hidden="true">
                <i className={`fas ${point.icon}`} />
              </span>
              <span>
                <strong>{point.title}</strong>
                <small>{point.summary}</small>
              </span>
            </Reveal>
          ))}
        </div>

        <div className={styles.metricsBar} aria-label="أرقام عن خبرة سويد ونتائجها">
          {homepageContent.stats.map((metric) => (
            <Metric key={metric.label} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
}
