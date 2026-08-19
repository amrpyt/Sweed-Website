"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PublicPageShell } from "./public-page-shell";
import styles from "./services-public-page.module.css";

const serviceMap = [
  ["consulting", "01", "الاستشارات"],
  ["branding", "02", "الهوية البصرية"],
  ["digital-marketing", "03", "التسويق الرقمي"],
  ["development", "04", "البرمجة والتطوير"],
  ["advertising", "05", "الدعاية والإعلان"],
  ["media", "06", "المحتوى والميديا"],
] as const;

function ActionLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return <Link className={`${styles.button} ${light ? styles.buttonGhostLight : styles.buttonPrimary}`} href={href}>{children}</Link>;
}

export function ServicesPublicPage() {
  const [activeService, setActiveService] = useState<string>("consulting");

  useEffect(() => {
    const sections = serviceMap
      .map(([id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveService(visible.target.id);
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0.05, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <PublicPageShell page="services" sectionIds={["services-hero", "consulting", "branding", "digital-marketing", "development", "advertising", "media", "integrated-path", "services-cta"]} showBreadcrumb={false}>
      <main className={styles.page}>
        <section className={styles.hero} id="services-hero" aria-labelledby="services-page-title">
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div>
                <p className={styles.crumb}>الرئيسية <span>←</span> <b>خدماتنا</b></p>
                <h1 id="services-page-title">مش كل مشكلة محتاجة نفس الخدمة</h1>
                <p className={styles.heroDescription}>قبل ما نبدأ تنفيذ، بنفهم مشروعك واقف فين وإيه اللي ناقصه فعلًا — وبعدها بنحدد الخدمة أو المسار اللي يحرّكه في الاتجاه الصح.</p>
                <div className={styles.heroActions}>
                  <ActionLink href="#services-cta">حدد نقطة البداية</ActionLink>
                  <ActionLink href="#service-map" light>استكشف الخدمات</ActionLink>
                </div>
              </div>
              <svg className={styles.heroCompass} viewBox="0 0 200 200" aria-hidden="true">
                <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="2" />
                <circle cx="100" cy="100" r="66" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="1" strokeDasharray="4 6" />
                <g className={styles.needle}>
                  <polygon points="100,30 112,100 100,112 88,100" fill="#D6246E" />
                  <polygon points="100,170 88,100 100,88 112,100" fill="rgba(255,255,255,.4)" />
                </g>
                <circle cx="100" cy="100" r="7" fill="#fff" />
                <text x="100" y="20" textAnchor="middle" fill="rgba(255,255,255,.6)" fontSize="11" fontFamily="Cairo">N</text>
              </svg>
            </div>
          </div>
          <div className={styles.waypoints} aria-hidden="true"><div className={styles.container}>{serviceMap.map(([, n]) => <span key={n}>{n}</span>)}</div></div>
        </section>

        <nav className={styles.serviceMap} id="service-map" aria-label="خدماتنا">
          <div className={styles.container}>
            {serviceMap.map(([id, number, title]) => <a className={activeService === id ? styles.mapItemActive : styles.mapItem} href={`#${id}`} key={id}><span>{number}</span><b>{title}</b></a>)}
          </div>
        </nav>
        <p className={styles.mapNote}>مش بنرشح لك أغلى خدمة… <b>بنرشح لك أول خدمة منطقية لحالتك</b></p>

        <ServiceSection id="consulting" number="خدمة 01" title="الاستشارات الإدارية والتسويقية" hook="قبل ما تتحرك… محتاج تتأكد إنت رايح فين" description="لما القرار يبقى مبني على إحساس، الفريق بيشتغل كتير والنتيجة بتفضل أقل من المتوقع. هنا بنفهم الصورة كاملة، نكشف نقطة التسرب، ونثبت أولويات قابلة للتنفيذ." chips={["بحث وتحليل سوق ومنافسين", "تحديد أهداف وأولويات", "خطط إدارية وتسويقية", "هيكلة وتشغيل", "مؤشرات أداء ومتابعة"]} kpi="مؤشر النجاح: قرار أوضح، أولويات معتمدة، وخطة تنفيذ قابلة للمتابعة — من غير وعد بنتيجة مالية مسبقة." cta="اعرف تفاصيل الاستشارات" href="/services/consulting">
          <div className={styles.diag}>
            <svg viewBox="0 0 420 300" aria-hidden="true">
              <path className={styles.diagPath} d="M40,250 C120,220 90,140 190,150 C280,160 260,70 360,60" />
              <circle className={styles.diagNode} cx="40" cy="250" r="16" /><text x="40" y="285" textAnchor="middle">الوضع الحالي</text>
              <circle className={styles.diagLeak} cx="190" cy="150" r="16" /><text x="190" y="185" textAnchor="middle">نقطة التسرب</text>
              <circle className={styles.diagDecision} cx="360" cy="60" r="16" /><text className={styles.decisionText} x="360" y="30" textAnchor="middle">قرار واضح</text>
            </svg>
            <p>من التخبط… إلى قرار واضح</p>
          </div>
        </ServiceSection>

        <ServiceSection id="branding" number="خدمة 02" title="التصميم والهوية البصرية" hook="براندك معروف… ولا مجرد اسم وشوية تصميمات؟" description="الهوية مش لوجو منفصل عن شغلك — هي ترجمة واضحة لتميّزك، ورسالة ثابتة بتخلي العميل يفهمك ويعرف ليه يختارك." chips={["استراتيجية البراند", "الجمهور والتموضع", "الرسائل والنبرة", "الهوية البصرية", "دليل الاستخدام", "قوالب المنصات"]} kpi="مؤشر النجاح: رسالة وهوية متسقتان قابلتان للتطبيق على كل نقطة بيشوفها العميل." cta="ابنِ هوية مشروعك" href="/services/branding" reverse white>
          <div className={styles.brandSplit}>
            <div className={styles.brandBefore}><h3>قبل — شكل مختلف في كل مكان</h3><div className={styles.brandTiles}>{["A", "؟", "B", "!", "C", "؟"].map((item, i) => <span key={i}>{item}</span>)}</div></div>
            <div className={styles.brandAfter}><h3>بعد — هوية واحدة ثابتة</h3><div className={styles.brandTiles}>{["س", "س", "س", "س", "س", "س"].map((item, i) => <span className={i === 1 || i === 3 || i === 5 ? styles.tileAccent : undefined} key={i}>{item}</span>)}</div></div>
          </div>
        </ServiceSection>

        <ServiceSection id="digital-marketing" number="خدمة 03" title="التسويق الرقمي" hook="الإعلان مش المشكلة… لو المسار نفسه مش واضح" description="مبنقيسش الشغل بعدد البوستات أو الإعلانات. بنربط كل قناة بهدف، وبنراجع الرسالة والصفحة والعرض قبل ما نطلب ميزانية أكبر." chips={["تأسيس وتأمين المنصات", "إدارة السوشيال", "الحملات الممولة", "المحتوى التسويقي", "SEO عند الحاجة", "تقارير وتحسين دوري"]} kpi="مؤشر النجاح: هدف واضح لكل قناة وتقارير بتشرح قرار التحسين — مش أرقام مبيعات مضمونة." cta="شوف نظام التسويق الرقمي" href="/services/digital-marketing">
          <div className={styles.funnelWrap}><div className={styles.channels}><span>📱</span><span>🔍</span><span>✉️</span><span>📢</span></div><div className={styles.funnel}><b>وعي — الجمهور الصح يشوفك</b><b>اهتمام — رسالة وعرض واضحين</b><b>قرار — خطوة محددة تتقاس</b></div><p>كل قناة ليها هدف واحد… مش نشاط مستمر بلا اتجاه</p></div>
        </ServiceSection>

        <ServiceSection id="development" number="خدمة 04" title="البرمجة والتطوير" hook="لو شغلك كبر… هل نظامك كبر معاه؟" description="الموقع أو النظام مش بند تقني منفصل — لازم يسهّل على العميل الشراء، وعلى الفريق المتابعة، وعلى الإدارة رؤية اللي بيحصل." chips={["مواقع تعريفية", "متاجر إلكترونية", "صفحات هبوط", "CRM وأنظمة تشغيل", "ربط وأتمتة", "تحسين تجربة المستخدم"]} kpi="مؤشر النجاح: تجربة أسهل للعميل وسير عمل أوضح للفريق حسب نطاق المشروع." cta="استكشف حلول التطوير" href="/services/software-development" reverse white>
          <div className={styles.system}><div className={styles.systemGrid}><div><b>العميل</b><small>يشتري ويتابع بسهولة</small></div><div><b>الفريق</b><small>يشتغل بسير عمل واضح</small></div><div><b>الإدارة</b><small>تشوف اللي بيحصل بالأرقام</small></div></div><div className={styles.systemCore}>نظام واحد<br />متصل</div></div>
        </ServiceSection>

        <section className={styles.advertising} id="advertising">
          <div className={styles.container}>
            <ServiceHead number="خدمة 05" title="الدعاية والإعلان" hook="وجودك في السوق لازم يتشاف… ويتميز" description="اللوحة أو المطبوعات مش هدف في نفسها. كل نقطة ظهور لازم تحمل نفس الرسالة، وتخدم مكان ومرحلة وقرار واضح." />
            <div className={styles.touchpoints}>{[["🪧", "لوحات وبنرات", "ظهور في الشارع الصح"], ["🏬", "واجهات ولافتات", "أول انطباع عند الباب"], ["🚚", "إعلانات مركبات", "رسالة بتتحرك في المدينة"], ["📦", "مطبوعات وهدايا", "الهوية في إيد العميل"]].map(([icon, title, copy]) => <div className={styles.touchpoint} key={title}><span>{icon}</span><b>{title}</b><small>{copy}</small></div>)}</div>
            <Chips items={["حملات خارجية", "كتالوجات ومطبوعات", "تطبيقات هوية ميدانية"]} dark />
            <p className={styles.kpi}>مؤشر النجاح: رسالة موحدة وحضور ميداني مقصود في الأماكن المناسبة.</p>
            <ActionLink href="/services/advertising">خطط لظهور براندك</ActionLink>
          </div>
        </section>

        <ServiceSection id="media" number="خدمة 06" title="إنتاج المحتوى والميديا" hook="المحتوى الحلو مش كفاية… لازم يحرّك قرار" description="كل لقطة لازم تعرف دورها: تعرّف، تبني ثقة، تشرح، أو تدفع لخطوة. عشان كده التصوير عندنا بيبدأ من فكرة وسكربت ومسار عميل — مش من الكاميرا." chips={["استراتيجية وخطة محتوى", "كتابة وسكربت", "تصوير منتجات وفعاليات", "فيديو إعلاني وتعريفي", "موشن جرافيك"]} kpi="مؤشر النجاح: محتوى مرئي ليه هدف ومكان معلوم في رحلة العميل — مش إنتاج لمجرد النشر." cta="ابدأ خطة المحتوى المرئي" href="/services/media">
          <div className={styles.storyboard}><div className={styles.storyFrames}>{[["🎬", "اللقطة 1: تعرّف"], ["🤝", "اللقطة 2: ثقة"], ["💡", "اللقطة 3: شرح"], ["🎯", "اللقطة 4: خطوة"]].map(([icon, title]) => <div key={title}><span>{icon}</span><b>{title}</b></div>)}</div><p>وعي <b>←</b> اهتمام <b>←</b> قرار</p></div>
        </ServiceSection>

        <section className={styles.integrated} id="integrated-path">
          <div className={styles.container}>
            <span className={styles.eyebrow}>المسار المتكامل</span>
            <h2>الخدمة الصح في الوقت الصح… مش كل الخدمات مرة واحدة</h2>
            <p>ممكن تبدأ بخدمة واحدة، وممكن مشروعك يحتاج مسار متكامل. الفرق إننا بنرتب الخطوات حسب وضعك الحقيقي — مش حسب قائمة ثابتة.</p>
            <div className={styles.pathsGrid}>{[["فكرة أو بداية مش واضحة", "استشارات ← هوية", "وبعدها عند الحاجة: منصات وموقع ثم إطلاق تسويقي"], ["نشاط قائم وشكله مش متسق", "استشارات تسويقية ← هوية", "وبعدها: محتوى وحملات وظهور ميداني"], ["مبيعات أو تشغيل محتاجين نظام", "استشارات ← برمجة وتطوير", "وبعدها: تسويق رقمي وقياس أداء"], ["ظهور ضعيف رغم جودة الخدمة", "هوية ورسالة ← دعاية أو ميديا", "وبعدها: حملات رقمية مرتبطة بهدف"]].map(([title, route, copy]) => <article key={title}><b>{title}</b><strong>{route}</strong><small>{copy}</small></article>)}</div>
          </div>
        </section>

        <section className={styles.cta} id="services-cta">
          <svg className={styles.ctaCompass} viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="88" fill="none" stroke="#fff" strokeWidth="2"/><polygon points="100,30 112,100 100,112 88,100" fill="#fff"/><polygon points="100,170 88,100 100,88 112,100" fill="#fff"/></svg>
          <div className={`${styles.container} ${styles.ctaInner}`}>
            <span className={styles.eyebrow}>تواصل معانا</span>
            <h2>مش محتاج تختار لوحدك</h2>
            <p>احكيلنا وضع مشروعك في سطرين، وإحنا نبدأ معاك من سؤال واحد: إيه أول خطوة تستحق تتعمل دلوقتي؟</p>
            <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
              <div className={styles.formRow}><label>اسمك<input type="text" placeholder="اكتب اسمك" /></label><label>رقم الموبايل (واتساب)<input type="tel" placeholder="01xxxxxxxxx" /></label></div>
              <div className={styles.formRow}><label>الخدمة اللي بتفكر فيها (اختياري)<select defaultValue=""><option value="">لسه محددتش — ساعدوني</option><option value="consulting">الاستشارات الإدارية والتسويقية</option><option value="branding">التصميم والهوية البصرية</option><option value="digital-marketing">التسويق الرقمي</option><option value="development">البرمجة والتطوير</option><option value="advertising">الدعاية والإعلان</option><option value="media">إنتاج المحتوى والميديا</option></select></label><label>أكبر تحدي عندك دلوقتي<input type="text" placeholder="سطر واحد كفاية" /></label></div>
              <label>احكيلنا عن مشروعك<textarea rows={3} placeholder="نشاطك إيه، وواقف فين دلوقتي" /></label>
              <div className={styles.formActions}><ActionLink href="/contact?source=services">احجز استشارتك المجانية</ActionLink><ActionLink href="https://wa.me/201068274662" light>ابدأ محادثة واتساب</ActionLink></div>
            </form>
          </div>
        </section>
      </main>
    </PublicPageShell>
  );
}

function ServiceHead({ number, title, hook, description }: { number: string; title: string; hook: string; description: string }) {
  return <div className={styles.serviceHead}><span>{number}</span><h2>{title}</h2><p className={styles.hook}>{hook}</p><p className={styles.description}>{description}</p></div>;
}

function Chips({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return <div className={dark ? `${styles.chips} ${styles.chipsDark}` : styles.chips}>{items.map((item) => <span key={item}>{item}</span>)}</div>;
}

function ServiceSection({ id, number, title, hook, description, chips, kpi, cta, href, children, reverse = false, white = false }: { id: string; number: string; title: string; hook: string; description: string; chips: string[]; kpi: string; cta: string; href: string; children: React.ReactNode; reverse?: boolean; white?: boolean }) {
  return <section className={white ? `${styles.service} ${styles.serviceWhite}` : styles.service} id={id}><div className={`${styles.container} ${styles.serviceGrid} ${reverse ? styles.reverse : ""}`}><div><ServiceHead number={number} title={title} hook={hook} description={description}/><Chips items={chips}/><p className={styles.kpi}>{kpi}</p><ActionLink href={href}>{cta}</ActionLink></div><div className={styles.serviceVisual}>{children}</div></div></section>;
}
