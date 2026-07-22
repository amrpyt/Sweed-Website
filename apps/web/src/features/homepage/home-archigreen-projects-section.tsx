import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { homepageContent } from "@/content/homepage";
import styles from "./home-archigreen-projects-section.module.css";

export function HomeArchigreenProjectsSection() {
  return (
    <section className={styles.section} id="portfolio" aria-labelledby="home-portfolio-title">
      <div className={styles.container}>
        <div className={styles.headingLayout}>
          <div>
            <p className={styles.kicker}>{homepageContent.portfolioHead.label}</p>
            <h2 id="home-portfolio-title">{homepageContent.portfolioHead.title}</h2>
          </div>
          <div className={styles.headingAside}>
            <p>{homepageContent.portfolioHead.description}</p>
            <small>بننشر الأرقام الموثقة فقط. دراسات الحالة الأخرى بتظهر بوضوح كـ«قيد التوثيق» لحد اعتمادها.</small>
          </div>
        </div>

        <div className={styles.projectsGrid}>
          {homepageContent.portfolio.map((project, index) => (
            <Reveal className={styles.projectReveal} delay={index * 100} key={project.title} once variant="soft">
              <article
                className={styles.projectCard}
                data-status={project.verification}
                data-testid="home-portfolio-card"
              >
                <figure className={styles.projectMedia}>
                  <Image
                    src={project.image ?? "/images/hero/custom-image.png"}
                    alt={`عرض بصري لمشروع ${project.title}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 760px) 94vw, (max-width: 1100px) 46vw, 38vw"
                  />
                  <span className={styles.categoryTag}>{project.category}</span>
                  <span className={styles.verificationTag}>{project.meta}</span>
                </figure>

                <div className={styles.projectBody}>
                  <div className={styles.projectMeta}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{project.verification === "verified" ? "نتيجة موثقة" : "لا توجد أرقام منشورة"}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <strong className={styles.result} data-pending={project.verification === "pending" ? "true" : "false"}>
                    {project.result}
                  </strong>
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
