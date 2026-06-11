import Link from "next/link";
import { homepageContent } from "@/content/homepage";
import styles from "./home-v2-page.module.css";

const navItems = [
  ["home", "البداية"],
  ["signals", "التشخيص"],
  ["offers", "العروض"],
  ["process", "الطريقة"],
  ["proof", "الدليل"],
  ["contact", "ابدأ"],
] as const;

function Icon({ name }: { name: string }) {
  return <i aria-hidden="true" className={`fas ${name}`} />;
}

export function HomeV2Page() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Homepage V2 navigation">
        <Link className={styles.brand} href="/">
          <span>S</span>
          <strong>SWEED</strong>
        </Link>
        <div className={styles.navLinks}>
          {navItems.map(([id, label]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </div>
        <Link className={styles.navCta} href="/contact?services=consulting#contact-form">
          احجز مكالمة
        </Link>
      </nav>

      <section className={styles.hero} id="home">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Homepage V2 Preview</p>
          <h1>
            لا نبيع إعلان.
            <span> نبني مسار نمو.</span>
          </h1>
          <p className={styles.heroText}>
            نسخة أكثر جرأة من الصفحة الرئيسية: أقل زحمة، أوضح في القرار، وأقرب لشركة تسويق تفكر كفريق نمو.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact?services=consulting#contact-form">ابدأ مشروعك</Link>
            <a href="#process">شوف الطريقة</a>
          </div>
        </div>

        <aside className={styles.commandPanel} aria-label="SWEED growth command panel">
          <div className={styles.panelHeader}>
            <span>Growth OS</span>
            <strong>48h</strong>
          </div>
          <div className={styles.radar}>
            <span />
            <b>SWEED</b>
          </div>
          <dl>
            {homepageContent.hero.metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <section className={styles.signalStrip} id="signals">
        <div>
          <span>01</span>
          <h2>نبدأ من الإشارة، مش من التصميم.</h2>
        </div>
        <p>قبل أي حملة: نفهم أين الطلب، أين التعطيل، وأي رسالة تستحق الإنفاق.</p>
      </section>

      <section className={styles.problemBoard}>
        {homepageContent.problems.map((problem, index) => (
          <article className={styles.problemCard} key={problem.title}>
            <span>{`0${index + 1}`}</span>
            <Icon name={problem.icon} />
            <h3>{problem.title}</h3>
            <p>{problem.summary}</p>
          </article>
        ))}
      </section>

      <section className={styles.offerLab} id="offers">
        <header>
          <span>02</span>
          <h2>عروض مصممة كقرارات، لا كقائمة أسعار.</h2>
        </header>
        <div className={styles.offerGrid}>
          {homepageContent.offers.map((offer, index) => (
            <Link className={index === 0 ? styles.offerHero : styles.offerCard} href={offer.href ?? "/offers"} key={offer.title}>
              <small>{offer.meta}</small>
              <Icon name={offer.icon} />
              <h3>{offer.title}</h3>
              <p>{offer.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.process} id="process">
        <div className={styles.processIntro}>
          <span>03</span>
          <h2>كيف نعمل معك خطوة بخطوة</h2>
          <p>{homepageContent.process[0].summary}</p>
        </div>
        <div className={styles.timeline}>
          {homepageContent.process.map((step, index) => (
            <article key={step.title}>
              <b>{index + 1}</b>
              <h3>{step.title}</h3>
              <p>{step.summary}</p>
              <small>{step.duration}</small>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.proof} id="proof">
        <div className={styles.proofCopy}>
          <span>04</span>
          <h2>الشكل مختلف، لكن الهدف ثابت: قرار أسرع من العميل.</h2>
          <p>هذه النسخة تختبر لغة بصرية أكثر حدة: مساحات كبيرة، تباين أعلى، وبطاقات أقل تكرارا.</p>
        </div>
        <div className={styles.proofTiles}>
          {homepageContent.portfolio.map((item) => (
            <Link href={item.href ?? "/portfolio"} key={item.title}>
              <Icon name={item.icon} />
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.contact} id="contact">
        <div>
          <span>05</span>
          <h2>{homepageContent.contact.title}</h2>
          <p>{homepageContent.contact.summary}</p>
        </div>
        <a href={homepageContent.contact.whatsappHref} rel="noreferrer" target="_blank">
          راسلنا على واتساب
        </a>
      </section>

    </main>
  );
}
