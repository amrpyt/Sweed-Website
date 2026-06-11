import Link from "next/link";
import { homepageContent, type HomeAction, type HomeCard } from "@/content/homepage";
import { AiAdvisorWidget } from "@/features/ai-advisor";
import { LegacyFooter, LegacyHeader } from "@/features/legacy-site";
import { OfferFunnelController } from "@/features/offer-funnel";
import styles from "./home-public-page.module.css";

function Icon({ name }: { name: string }) {
  return <i aria-hidden="true" className={name.includes(" ") ? name : `fas ${name}`} />;
}

function ActionLink({ action }: { action: HomeAction }) {
  const className = [styles.action, action.variant === "light" ? styles.actionLight : styles.actionPrimary].join(" ");

  return (
    <Link className={className} href={action.href}>
      <Icon name={action.icon} />
      <span>{action.label}</span>
    </Link>
  );
}

function Card({ card, index }: { card: HomeCard; index: number }) {
  const body = (
    <>
      <span className={styles.cardNumber}>{String(index + 1).padStart(2, "0")}</span>
      <span className={styles.cardIcon}>
        <Icon name={card.icon} />
      </span>
      <h3>{card.title}</h3>
      <p>{card.summary}</p>
      {card.meta ? <small>{card.meta}</small> : null}
    </>
  );

  return card.href ? (
    <Link className={`${styles.card} ${styles.cardLink}`} href={card.href}>
      {body}
    </Link>
  ) : (
    <article className={styles.card}>{body}</article>
  );
}

function SectionHeader({ eyebrow, title, summary }: { eyebrow: string; title: string; summary: string }) {
  return (
    <div className={styles.sectionHeader}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{summary}</p>
    </div>
  );
}

export function HomePublicPage() {
  return (
    <>
      <LegacyHeader page="home" />
      <main className={styles.homepage}>
        <section className={styles.hero} id="home">
          <div className={styles.heroBg} aria-hidden="true" />
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <span className={styles.eyebrow}>{homepageContent.hero.eyebrow}</span>
                <h1>{homepageContent.hero.title}</h1>
                <p>{homepageContent.hero.summary}</p>
                <div className={styles.actions}>
                  {homepageContent.hero.actions.map((action) => (
                    <ActionLink action={action} key={action.label} />
                  ))}
                </div>
              </div>

              <aside className={styles.heroPanel} aria-label="SWEED summary">
                <div className={styles.panelLogo}>SWEED</div>
                <p>خطة واضحة، تنفيذ مرتب، وقياس مستمر بدل العشوائية.</p>
                <div className={styles.metrics}>
                  {homepageContent.hero.metrics.map((metric) => (
                    <div key={metric.label}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.partnerStrip} id="expertise">
          <div className={styles.container}>
            <p>نخدم قطاعات مختلفة بنفس المنهج: فهم، خطة، تنفيذ، قياس.</p>
            <div className={styles.partnerList}>
              {homepageContent.partners.map((partner) => (
                <span key={partner}>{partner}</span>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="problems">
          <div className={styles.container}>
            <SectionHeader eyebrow="مشاكل نحلها" title="لو التسويق مشتت، نرجعه لمسار واضح" summary="نبدأ من المشكلة الحقيقية، لا من شكل إعلان عابر." />
            <div className={styles.cardGrid}>
              {homepageContent.problems.map((card, index) => (
                <Card card={card} index={index} key={card.title} />
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.tint}`} id="offers">
          <div className={styles.container}>
            <SectionHeader eyebrow="العروض" title="باقات واضحة بدل قرارات عشوائية" summary="اختر نقطة البداية، أو احجز استشارة ونرشح لك الأنسب." />
            <div className={styles.cardGrid}>
              {homepageContent.offers.map((card, index) => (
                <Card card={card} index={index} key={card.title} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="services">
          <div className={styles.container}>
            <SectionHeader eyebrow="خدماتنا" title="خدماتنا المتكاملة" summary="كل خدمة لها هدف واضح: بناء ثقة، زيادة طلب، أو تحسين تجربة العميل." />
            <div className={styles.wideGrid}>
              {homepageContent.services.map((card, index) => (
                <Card card={card} index={index} key={card.title} />
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.processSection}`} id="process">
          <div className={styles.container}>
            <SectionHeader
              eyebrow="خطوات عملنا"
              title="كيف نعمل معك خطوة بخطوة"
              summary="مسار واضح من أول مكالمة حتى إطلاق الشغل، بألوان البراند وبدون أي حركة تلقائية تشتت العميل."
            />
            <div className={styles.processGrid}>
              {homepageContent.process.map((step, index) => (
                <article className={styles.processCard} key={step.title}>
                  <div className={styles.processNumber}>{index + 1}</div>
                  <span className={styles.processIcon}>
                    <Icon name={step.icon} />
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.summary}</p>
                  <small>{step.duration}</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="products">
          <div className={styles.container}>
            <SectionHeader eyebrow="منتجات" title="منتجات تساعدك تتحرك أسرع" summary="أدوات وتجارب جاهزة تقلل وقت البداية." />
            <div className={styles.cardGrid}>
              {homepageContent.products.map((card, index) => (
                <Card card={card} index={index} key={card.title} />
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.tint}`} id="portfolio">
          <div className={styles.container}>
            <SectionHeader eyebrow="أعمالنا" title="نماذج من طريقة التفكير والتنفيذ" summary="نركز على المشكلة، الرسالة، والتجربة التي تحرك العميل." />
            <div className={styles.cardGrid}>
              {homepageContent.portfolio.map((card, index) => (
                <Card card={card} index={index} key={card.title} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="blog">
          <div className={styles.container}>
            <SectionHeader eyebrow="المقالات" title="أفكار تساعدك تقرر أفضل" summary="محتوى عملي عن التسويق، الهوية، والنمو." />
            <div className={styles.articleGrid}>
              {homepageContent.articles.map((card, index) => (
                <Card card={card} index={index} key={card.title} />
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.faqSection}`} id="faq">
          <div className={styles.container}>
            <SectionHeader eyebrow="FAQ" title="الأسئلة الشائعة" summary="إجابات مختصرة على أسئلة البداية." />
            <div className={styles.faqGrid}>
              {homepageContent.faq.map((card, index) => (
                <Card card={card} index={index} key={card.title} />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.contactCta} id="contact">
          <div className={styles.container}>
            <div className={styles.contactBox}>
              <div>
                <span className={styles.eyebrow}>ابدأ الآن</span>
                <h2>{homepageContent.contact.title}</h2>
                <p>{homepageContent.contact.summary}</p>
              </div>
              <a className={styles.whatsappCta} href={homepageContent.contact.whatsappHref} rel="noreferrer" target="_blank">
                <Icon name="fab fa-whatsapp" />
                <span>راسلنا على واتساب</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <LegacyFooter />
      <OfferFunnelController page="home" />
      <AiAdvisorWidget />
    </>
  );
}
