"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { homepageContent, type HomeMetric } from "@/content/homepage";
import styles from "./home-why-metrics-section.module.css";

function AnimatedMetric({ metric }: { metric: HomeMetric }) {
  const metricRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const node = metricRef.current;
    if (!node) return;

    const target = Number(metric.value.replace(/[^0-9.]/g, ""));
    const prefix = metric.value.trim().startsWith("+") ? "+" : "";
    const suffix = metric.value.trim().endsWith("%") ? "%" : "";
    const formatter = new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 0 });
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frameId = 0;

    const formatValue = (value: number) => `${prefix}${formatter.format(value)}${suffix}`;
    const stopAnimation = () => {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const showFinalValue = () => {
      stopAnimation();
      setDisplayValue(formatValue(target));
    };

    const resetValue = () => {
      stopAnimation();
      setDisplayValue("0");
    };

    const startAnimation = () => {
      stopAnimation();
      const startedAt = performance.now();
      const duration = 1100;
      setDisplayValue("0");

      const tick = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = 1 - (1 - progress) ** 3;
        setDisplayValue(formatValue(Math.round(target * eased)));

        if (progress < 1) {
          frameId = window.requestAnimationFrame(tick);
        }
      };

      frameId = window.requestAnimationFrame(tick);
    };

    if (reduceMotion) {
      showFinalValue();
      return stopAnimation;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          resetValue();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.18 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      stopAnimation();
    };
  }, [metric.value]);

  return (
    <div ref={metricRef} className={styles.metric} data-testid="home-trust-metric" data-target={metric.value}>
      <strong aria-label={`${metric.value} ${metric.label}`}>{displayValue}</strong>
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
            <AnimatedMetric key={metric.label} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
}
