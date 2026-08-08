import type { SoftwareModule } from "@/content/public-site/software-development-page";
import styles from "./software-module-explorer.module.css";

export function SoftwareModuleExplorer({ modules }: { modules: readonly SoftwareModule[] }) {
  return (
    <div className={styles.modules}>
      {modules.map((module, index) => (
        <details className={styles.module} key={module.id} open={index === 0}>
          <summary>
            <span>
              <strong>{module.title}</strong>
              <small>{module.value}</small>
            </span>
            <span className={styles.marker} aria-hidden="true">+</span>
          </summary>
          <div className={styles.panel}>
            <p>{module.fit}</p>
            <ul>
              {module.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        </details>
      ))}
    </div>
  );
}
