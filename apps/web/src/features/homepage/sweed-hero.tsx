import Link from "next/link";
import styles from "./sweed-hero.module.css";

const navItems = [
  { href: "/#home", label: "الرئيسية", active: true },
  { href: "/about", label: "من نحن" },
  { href: "/services", label: "خدماتنا" },
  { href: "/portfolio", label: "أعمالنا" },
  { href: "/articles", label: "المقالات" },
  { href: "/contact", label: "تواصل معنا" },
];

const stats = [
  { value: "+150", label: "مشروع مكتمل" },
  { value: "15", label: "سنة خبرة" },
  { value: "92%", label: "معدل الاحتفاظ بالعملاء" },
];

function CalendarIcon() {
  return (
    <svg aria-hidden="true" className={styles.icon} viewBox="0 0 24 24">
      <path d="M7 3v3M17 3v3M4.5 9.25h15M6.5 5.25h11A2.25 2.25 0 0 1 19.75 7.5v10A2.25 2.25 0 0 1 17.5 19.75h-11A2.25 2.25 0 0 1 4.25 17.5v-10A2.25 2.25 0 0 1 6.5 5.25Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className={styles.icon} viewBox="0 0 24 24">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function SweedHero() {
  return (
    <section className={styles.hero} id="home" dir="rtl" aria-label="SWEED hero">
      <header className={styles.header}>
        <Link className={styles.logo} href="/" aria-label="SWEED home">
          <span>S</span>WEED
        </Link>

        <nav className={styles.nav} aria-label="روابط الموقع">
          {navItems.map((item) => (
            <Link className={item.active ? styles.activeNav : undefined} href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className={styles.headerCta} href="/contact?services=consulting#contact-form">
          <CalendarIcon />
          <span>احجز استشارة مجانية</span>
        </Link>
      </header>

      <div className={styles.stage}>
        <div className={styles.copyColumn}>
          <div className={styles.eyebrow}>
            <span>وكالة تسويق واعلان</span>
            <i aria-hidden="true" />
          </div>

          <h1 className={styles.title}>
            نبني علامات
            <br />
            تسيطر على السوق<span className={styles.dot}>.</span>
          </h1>

          <p className={styles.subtitle}>
            نساعد الشركات على زيادة المبيعات، بناء الهوية،
            <br />
            وتحويل التسويق إلى نمو حقيقي مستدام.
          </p>

          <div className={styles.actions}>
            <Link className={styles.primaryButton} href="/contact?services=consulting#contact-form">
              <ArrowIcon />
              <span>احجز استشارة مجانية</span>
            </Link>
            <Link className={styles.secondaryButton} href="/portfolio">
              <ArrowIcon />
              <span>شاهد أعمالنا</span>
            </Link>
          </div>

          <dl className={styles.stats}>
            {stats.map((stat) => (
              <div className={styles.stat} key={stat.label}>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.visualColumn} aria-label="Architectural SWEED brand visual" role="img">
          <div className={styles.signage}>
            <strong>SWEED</strong>
            <span>استراتيجية • إبداع • نمو</span>
          </div>
          <span className={styles.dashedLine} aria-hidden="true" />
          <span className={styles.diagonalLine} aria-hidden="true" />
          <span className={styles.topMarker} aria-hidden="true" />
          <span className={styles.rightBlock} aria-hidden="true" />
          <span className={styles.bottomBlock} aria-hidden="true" />
          <span className={styles.horizontalLine} aria-hidden="true" />
          <span className={`${styles.numberLabel} ${styles.labelOne}`} aria-hidden="true">01</span>
          <span className={`${styles.numberLabel} ${styles.labelTwo}`} aria-hidden="true">02</span>
          <span className={`${styles.numberLabel} ${styles.labelThree}`} aria-hidden="true">03</span>
        </div>
      </div>
    </section>
  );
}
