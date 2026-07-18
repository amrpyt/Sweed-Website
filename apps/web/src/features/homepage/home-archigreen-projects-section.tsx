"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { homepageContent } from "@/content/homepage";
import styles from "./home-archigreen-projects-section.module.css";

const allProjectsFilter = "الكل";

export function HomeArchigreenProjectsSection() {
  const filters = useMemo(
    () => [allProjectsFilter, ...new Set(homepageContent.portfolio.map((project) => project.category).filter(Boolean))],
    [],
  );
  const [activeFilter, setActiveFilter] = useState(allProjectsFilter);

  const visibleProjects =
    activeFilter === allProjectsFilter
      ? homepageContent.portfolio
      : homepageContent.portfolio.filter((project) => project.category === activeFilter);

  return (
    <section className={styles.section} id="portfolio" aria-labelledby="home-portfolio-title">
      <div className={styles.container}>
        <div className={styles.headingLayout}>
          <div>
            <p className={styles.kicker}>أعمال مختارة</p>
            <h2 id="home-portfolio-title">مشاريع مصممة عشان تحقق نتيجة، مش بس تبان حلوة.</h2>
          </div>
          <div className={styles.headingAside}>
            <p>البيانات الحالية أمثلة توضيحية بنفس الهيكل النهائي، وتستبدل بالمشاريع والأرقام المعتمدة قبل الإطلاق.</p>
            <div className={styles.filters} aria-label="فلترة الأعمال حسب نوع الخدمة">
              {filters.map((filter) => (
                <button
                  className={styles.filterButton}
                  data-active={activeFilter === filter ? "true" : "false"}
                  key={filter}
                  type="button"
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.projectsGrid} aria-live="polite">
          {visibleProjects.map((project, index) => (
            <Reveal className={styles.projectReveal} delay={index * 70} key={project.title} variant="soft">
              <article className={styles.projectCard} data-testid="home-portfolio-card">
                <figure className={styles.projectMedia}>
                  <Image
                    src={project.image ?? "/images/hero/custom-image.png"}
                    alt={`عرض بصري لمشروع ${project.title}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 760px) 94vw, (max-width: 1100px) 46vw, 38vw"
                  />
                  <span className={styles.categoryTag}>{project.category}</span>
                </figure>

                <div className={styles.projectBody}>
                  <div className={styles.projectMeta}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{project.meta}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <strong className={styles.result}>{project.result}</strong>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className={styles.footerAction}>
          <Link href="/portfolio">
            شاهد كل الأعمال
            <i className="fas fa-arrow-left" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
