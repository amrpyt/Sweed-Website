"use client";
// @ts-nocheck

import { type ReactNode, useEffect, useState } from "react";
import { PublicPageShell } from "../pages/public-page-shell";
import styles from "./portfolio-executive-page.module.css";

const sections = [
  { id: "consulting-work", label: "استشارات وتطوير" },
  { id: "branding-work", label: "براند وهوية" },
  { id: "marketing-work", label: "تسويق وحملات" },
  { id: "media-work", label: "محتوى مرئي" },
  { id: "advertising-work", label: "دعاية وإعلان" },
  { id: "web-work", label: "مواقع وحلول رقمية" },
] as const;

const marketingProjects = {
  damer: {
    tab: "الضامر العقارية",
    header: "الضامر للتطوير العقاري",
    tags: ["التطوير العقاري", "مستمر"],
    challenge: "بيع المشروع مع الحفاظ على الثقة المؤسسية، وربط الرسائل بالتطورات الفعلية والشراكات والقرارات الرسمية.",
    bullets: ["اتجاه محتوى بيعي وتوعوي وسكريبتات ريلز وفيديوهات", "رسائل خاصة بالقرار الوزاري والشراكات الاستراتيجية", "ربط المحتوى بمنهج مبيعات واضح من غير مبالغة"],
    proof: "نماذج حملات متعددة الأهداف جوه لغة واحدة متماسكة للعلامة",
    href: "/work/damer",
    posts: ["ريلز بيعي", "قرار وزاري", "تغطية رعاية", "فيديو تعريفي"],
  },
  boubyan: {
    tab: "بوبيان العمرانية",
    header: "بوبيان للتنمية العمرانية",
    tags: ["تطوير عمراني", "مستمر"],
    challenge: "التسويق لمشروع لسه في مرحلة الأرض والموافقات — من غير صور إنشاءات مكتملة ولا وعود بصرية مضللة.",
    bullets: ["محتوى بيشرح الرؤية والمكونات والموقع مربوط بالقرارات الرسمية", "نبرة ثقة لا مبالغة — تقويم بيجمع البيع والتعريف والتغطيات", "رسائل الحملة: من نقطة لخريطة… ومن ثقة لأمان"],
    proof: "تحويل غياب الإنشاءات لقصة ثقة مبنية على المعلومة والرؤية",
    href: "/work/boubyan",
    posts: ["من نقطة لخريطة", "رؤية المشروع", "الموافقات", "ريلز توعوي"],
  },
  snap: {
    tab: "سناب شوب",
    header: "سناب شوب",
    tags: ["تكنولوجيا وخدمات", "مستمر"],
    challenge: "تعليم السوق سلوك جديد، وتكوين طلب من العملاء وعرض من الأنشطة وتوافر من الكباتن بالتوازي.",
    bullets: ["محتوى مخصص لـ 3 شرائح وإدارة فيسبوك وإنستجرام وتيك توك", "رسائل تحميل وتفعيل مرتبطة بالمواقف اليومية", "ربط مؤشرات المحتوى بالتحميلات والتفعيل والطلبات"],
    proof: "نتيجة اختيارية بعد الاعتماد: 5,000 تحميلة بصافي 60,000 ج إعلانات خلال 3.5 شهر",
    href: "/work/snap-shop-marketing",
    posts: ["ريلز موقف يومي", "عرض ولاء", "رسالة تاجر", "انضم كابتن"],
  },
} as const;

const mediaProjects = {
  sphinx: {
    tab: "الضامر × سفنكس فاير",
    caption: "فيلم تحالف استراتيجي — التشغيل بالنقر، من غير صوت تلقائي",
    tag: "تطوير عقاري وحماية مدنية",
    challenge: "تقديم تعاون مهني بيمس سلامة الناس من غير تخويف أو استغلال حوادث الحرائق — مع الحفاظ على قوة الرسالة واحترام الضحايا.",
    bullets: ["سيناريو توقيع وتحالف ولقاءات قصيرة مربوطة بالسياق الواقعي", "رسالة إنسانية ومؤسسية من غير مهاجمة المطورين", "دمج وعد الضامر مع هوية سفنكس فاير في خاتمة واحدة"],
    proof: "الخاتمة الإبداعية: حياة مثالية تحت سقف واحد… والحارس الذي لا ينام",
  },
  snapv: {
    tab: "سناب شوب",
    caption: "محتوى قصير يغيّر السلوك — ريلز 9:16",
    tag: "تطبيق خدمات محلية",
    challenge: "إقناع الجمهور بتجربة طريقة طلب جديدة من خلال مواقف حياتية سريعة وسهلة الفهم.",
    bullets: ["Hooks عامية بتبدأ بالموقف مش باسم الخدمة", "تصوير جوه المدينة ومواقف استخدام حقيقية", "ربط كل فيديو بفعل واضح: تحميل، طلب، تسجيل، أو انضمام"],
    proof: "تنوع في الزوايا مع ثبات الهوية الصوتية والرسالة",
  },
  boubyanv: {
    tab: "بوبيان",
    caption: "قصة مشروع قبل ظهور المباني",
    tag: "تطوير عمراني",
    challenge: "خلق محتوى مرئي جذاب والمشروع لسه في مرحلة مبكرة — من غير مبانٍ مكتملة نعتمد عليها.",
    bullets: ["الخرائط والمخططات والموقع أبطال المحتوى", "مونتاج بيربط المعلومة بالرؤية المستقبلية من غير تضليل", "نهايات بتربط كل قطعة بثقة وأمان القرار"],
    proof: "محتوى يقدر يبيع بالمعلومة والرؤية قبل صور الإنشاءات",
  },
} as const;

const sectorProjects = {
  realestate: { label: "التطوير العقاري", projects: "الضامر · بوبيان · الماهر جروب", text: "استراتيجية — محتوى — حملات — فيديو — دعاية ميدانية", href: "?sector=realestate", action: "شوف خبرتنا في القطاع العقاري" },
  tech: { label: "التكنولوجيا والخدمات اليومية", projects: "سناب شوب", text: "دراسة سوق — تموضع — محتوى — حملات — نمو وتشغيل", href: "?sector=tech", action: "شوف خبرتنا في قطاع التكنولوجيا" },
  industry: { label: "الصناعة", projects: "مشروع صناعي — مصر (سري)", text: "خطة نمو — مبيعات — هيكل فريق — مؤشرات", href: "?sector=industry", action: "شوف خبرتنا في القطاع الصناعي" },
  professional: { label: "الاستشارات والخدمات المهنية", projects: "سويد", text: "براند — أدلة — كتالوج — موقع — محتوى", href: "?sector=professional", action: "شوف خبرتنا في قطاع الخدمات المهنية" },
} as const;

function Cta({ href, children, light = false, small = false }: { href: string; children: ReactNode; light?: boolean; small?: boolean }) {
  return <a className={[styles.btn, light ? styles.btnLight : styles.btnGhost, small ? styles.btnSmall : ""].filter(Boolean).join(" ")} href={href}>{children}</a>;
}

function Tag({ children, state, dark }: { children: ReactNode; state?: "secret" | "active"; dark?: boolean }) {
  return <span className={[styles.tag, state === "active" ? styles.stateTag : "", state === "secret" ? styles.secretTag : "", dark ? styles.darkTag : ""].filter(Boolean).join(" ")}>{children}</span>;
}

export function PortfolioExecutivePage() {
  const [marketingKey, setMarketingKey] = useState<keyof typeof marketingProjects>("damer");
  const [mediaKey, setMediaKey] = useState<keyof typeof mediaProjects>("sphinx");
  const [sectorKey, setSectorKey] = useState<keyof typeof sectorProjects>("realestate");
  const [activeDossier, setActiveDossier] = useState(0);

  useEffect(() => {
    const dossiers = [...document.querySelectorAll<HTMLElement>(`.${styles.dossier}`)];
    if (!dossiers.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveDossier(dossiers.indexOf(entry.target as HTMLElement));
      });
    }, { threshold: 0.55 });
    dossiers.forEach((dossier) => observer.observe(dossier));
    return () => observer.disconnect();
  }, []);

  const marketing = marketingProjects[marketingKey];
  const media = mediaProjects[mediaKey];
  const sector = sectorProjects[sectorKey];

  return (
    <PublicPageShell page="portfolio" sectionIds={["work-hero", ...sections.map((section) => section.id), "sectors", "work-cta"]} showBreadcrumb={false}>
      <main className={styles.page}>
        <section id="work-hero" className={styles.hero}>
          <div className={styles.clipSet} aria-hidden="true">
            {["تقرير استراتيجية", "ريلز 9:16", "لوحة طريق 3×18م", "صفحة موقع", "دليل هوية", "لوحة مؤشرات"].map((text, index) => <span key={text} className={styles[`clip${index + 1}`]}>{text}</span>)}
          </div>
          <div className={styles.heroInner}>
            <div className={styles.crumb}>الرئيسية ← <b>أعمالنا</b></div>
            <h1>إحنا مش هنقولك بنعرف نعمل إيه… هنوريك عملناه إزاي</h1>
            <p>من قرار اتبنى على أرقام، لبراند اتأسس، لحملة اتحولت لمسار بيع… دي نماذج مختارة من شغل سويد مع مشروعات مختلفة، وكل مشروع بدأ من اتجاه واضح.</p>
            <div className={styles.heroButtons}>
              <Cta href="#consulting-work">شوف الأعمال</Cta>
              <Cta href="#work-cta" light>ابدأ مشروعك</Cta>
            </div>
          </div>
          <div className={styles.trust}>
            {[["+15", "سنة خبرة ميدانية"], ["+83", "مشروع تم تطويره ودراسته"], ["95%", "رضا العملاء"], ["79%", "إحالات من العملاء"], ["96%", "التسليم في الموعد"]].map(([value, label]) => <div key={label}><b>{value}</b><span>{label}</span></div>)}
          </div>
        </section>
        <div className={styles.footnote}>تعكس الأرقام الخبرة الشخصية للمؤسس والمشروعات التي ساهم في تطويرها عبر أكثر من 15 عامًا — أما الإنجازات تحت اسم سويد فتُعرض وفق بيانات موثقة لكل مشروع.</div>

        <nav className={styles.filters} aria-label="تصنيف الأعمال">
          <a href="#work-hero" className={styles.activeFilter}>الكل</a>
          {sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.label}</a>)}
        </nav>

        <section className={styles.consult} id="consulting-work">
          <div className={styles.container + " " + styles.consultGrid}>
            <div className={styles.consultSide}>
              <span className={styles.eyebrow}>استشارات وتطوير</span>
              <h2>قبل ما نغيّر الشكل… غيّرنا القرار</h2>
              <p>السيكشن ده مش بيعرض أغلفة ملفات — بيعرض إزاي مشكلة مبهمة اتحولت لقرارات وأرقام وسيناريوهات وخطة تنفيذ.</p>
              <i />
            </div>
            <div className={styles.dossiers}>
              {[
                ["سناب شوب | استراتيجية نمو وتشغيل", "مستمر", "التكنولوجيا والخدمات اليومية — مدينة السادات", "سوق محلي مش متعود يطلب خدمات من تطبيق، وتشغيل محتاج نقطة تعادل واضحة تربط العميل والتاجر والكابتن في معادلة واحدة.", ["بحث سوقي واستبيانات شملت 1,025 مشاركة من العملاء والتجار والكباتن", "خطة تسويق ونمو لمدة عامين مرتبطة بالتشغيل والمبيعات", "سيناريوهات مالية لنقطة التعادل وبرنامج ولاء بضوابط تمنع الخسارة"], "1,025 مشاركة في الدراسة", "/work/snap-shop"],
                ["الماهر جروب | خطة نمو 2026–2028", "مكتمل", "التطوير العقاري", "تحويل ميزانية تسويق ودعاية ممتدة لخطة مرحلية الإدارة التنفيذية تقدر تتابعها وتاخد قرار منها.", ["تقسيم الخطة لـ 8 أرباع سنوية بمراجعة ربع سنوية", "فانل بيعي ولوحة مؤشرات ومصفوفة مخاطر", "3 سيناريوهات للميزانية والنمو مربوطين بالتوسع الجغرافي"], "خارطة تنفيذ لمدة عامين — 8 أرباع و3 سيناريوهات قرار", "/work/elmaher-group"],
                ["مشروع صناعي | خطة نمو المبيعات", "سري", "الصناعة — مصر", "تحويل هدف إنتاج ومبيعات كبير لخطة سوق ومندوبين وميزانية وتسلسل تنفيذ قابل للقياس.", ["صياغة هدف مرحلي من 700 طن إلى 1,000 طن شهريًا", "خطة مبيعات وتسويق لمدة عامين وهيكل فريق كامل", "مؤشرات قياس شهرية بتربط الجهد بحجم التعاقدات"], "يُعرض المنهج والهدف المرحلي فقط — من غير اسم العميل أو بيانات حساسة", ""],
              ].map(([title, state, sector, challenge, bullets, proof, href], index) => (
                <article className={[styles.dossier, activeDossier === index ? styles.dossierActive : ""].join(" ")} key={title}>
                  <div><h3>{title}</h3><Tag state={state === "سري" ? "secret" : "active"}>{state}</Tag></div>
                  <p className={styles.sector}>{sector}</p>
                  <div className={styles.challenge}><b>التحدي</b>{challenge}</div>
                  <ul>{(bullets as string[]).map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                  <p className={styles.proof}>{proof}</p>
                  {href ? <Cta href={href as string} light small>شوف المشروع كامل</Cta> : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.brand} id="branding-work">
          <div className={styles.container}>
            <span className={styles.eyebrow}>براند وهوية</span>
            <h2 className={styles.sectionTitle}>مش بنلوّن الاسم… بنبني المعنى اللي الناس تفتكره</h2>
            <p className={styles.lead}>التركيز هنا على التحول: المشروع بدأ إزاي، إيه الفكرة اللي اتثبتت، وإزاي انتقلت للغة وصوت وتطبيقات.</p>
            <div className={styles.layers}><span className={styles.ring1}>التطبيقات</span><span className={styles.ring2}>الهوية البصرية</span><span className={styles.ring3}>الشخصية والصوت</span><span className={styles.ring4}>الرسالة</span><b>البوصلة</b></div>
            <div className={styles.brandProjects}>
              <article>
                <Tag>مشروع رئيسي</Tag><h3>سويد | إعادة بناء شخصية البراند</h3><p className={styles.sector}>استشارات إدارية وتسويقية</p>
                <p><em>التحدي</em><br />تحويل خبرة المؤسس وتعدد الخدمات لشخصية واحدة واضحة — مش وكالة بتنفذ طلبات متفرقة.</p>
                <ul><li>بناء التموضع حول البوصلة وتثبيت السلوجن: معاً ستصل</li><li>صياغة الوعد الذهبي وشخصية الخبير الاستراتيجي الملتزم</li><li>إعداد ملفات الشخصية والدليل الإرشادي والكتالوج</li></ul>
                <p className={styles.proof}>منظومة هوية متكاملة بتربط الاستراتيجية بالصوت والموقع والمواد البيعية</p><Cta href="/work/sweed-brand" small>شوف المشروع كامل</Cta>
              </article>
              <article>
                <Tag>تموضع ورسائل</Tag><h3>سناب شوب | تموضع ورسائل البراند</h3><p className={styles.sector}>تطبيق توصيل وخدمات محلية</p>
                <p><em>التحدي</em><br />إطلاق خدمة جديدة في سوق محتاج يفهم الفكرة بسرعة ويحس إنها قريبة منه — مش تطبيق معقد.</p>
                <ul><li>تثبيت السلوجن: حياتك بقت أسهل — وجملة الحملة: السادات بتطلب بشكل جديد</li><li>هوية صوتية قابلة للتذكر: هوا هوا</li><li>منظومة رسائل للعميل والتاجر والكابتن</li></ul>
                <p className={styles.proof}>رسالة واحدة قادرة تخدم 3 شرائح مختلفة من غير ما تفقد شخصية البراند</p><Cta href="/work/snap-shop-brand" small>شوف المشروع كامل</Cta>
              </article>
            </div>
            <p className={styles.centerCta}>عندك اسم وشعار… لكن لسه الناس مش فاهمة ليه تختارك؟ <Cta href="/services/branding" small>شوف خدمة تأسيس البراند</Cta></p>
          </div>
        </section>

        <section className={styles.marketing} id="marketing-work">
          <div className={styles.container}>
            <span className={styles.eyebrow}>تسويق وحملات</span><h2 className={styles.sectionTitle}>مش بنعرض بوستات منفصلة… بنعرض نظام شغال</h2><p className={styles.lead}>الكارت بيعرض مسار الحملة: هدف، رسالة، قنوات، محتوى، ومؤشر متابعة — مش Feed إنستجرام.</p>
            <div className={styles.marketingGrid}>
              <div className={styles.phone}><div><header>{marketing.header}</header><div>{marketing.posts.map((post, index) => <span className={index === 0 ? styles.accentPost : ""} key={post}>{post}</span>)}</div></div></div>
              <div>
                <div className={styles.tabs}>{(Object.keys(marketingProjects) as (keyof typeof marketingProjects)[]).map((key) => <button type="button" onClick={() => setMarketingKey(key)} className={marketingKey === key ? styles.tabActive : ""} key={key}>{marketingProjects[key].tab}</button>)}</div>
                <Tag>{marketing.tags[0]}</Tag> <Tag state="active">{marketing.tags[1]}</Tag>
                <div className={styles.lightChallenge}><b>التحدي</b>{marketing.challenge}</div>
                <ul className={styles.bulletList}>{marketing.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                <p className={styles.proof}>{marketing.proof}</p><Cta href={marketing.href} small>شوف المشروع كامل</Cta>
              </div>
            </div>
            <p className={styles.centerCta}>عاوز تعرف إذا المشكلة في الإعلان… ولا في الطريق اللي بعده؟ <Cta href="/services/digital-marketing" small>ابدأ تشخيص حملاتك</Cta></p>
          </div>
        </section>

        <section className={styles.media} id="media-work">
          <div className={styles.container}>
            <span className={styles.eyebrow}>محتوى مرئي</span><h2>كل لقطة لها دور… مش مجرد شكل حلو</h2><p>السيكشن بيعرض الفيلم كفكرة ورسالة وإيقاع — كل مشروع بيبدأ بلقطة قوية وبعدها بيكشف السكربت والهدف.</p>
            <div className={styles.tabs}>{(Object.keys(mediaProjects) as (keyof typeof mediaProjects)[]).map((key) => <button type="button" onClick={() => setMediaKey(key)} className={mediaKey === key ? styles.tabActive : ""} key={key}>{mediaProjects[key].tab}</button>)}</div>
            <figure><button type="button" aria-label="شاهد الفيديو">▶</button><figcaption>{media.caption}</figcaption></figure>
            <div className={styles.frames}><span>🎬<b>Hook</b></span><span>🧱<b>بناء</b></span><span>✅<b>لحظة إثبات</b></span><span>🎯<b>CTA</b></span></div>
            <Tag dark>{media.tag}</Tag><div className={styles.mediaChallenge}><b>التحدي</b>{media.challenge}</div><ul>{media.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul><p className={styles.proof}>{media.proof}</p>
            <p className={styles.centerCta}>مش محتاج فيديو أطول… محتاج أول 3 ثواني تعرف تقول إيه <Cta href="/services/media" small>ابدأ مشروع المحتوى</Cta></p>
          </div>
        </section>

        <section className={styles.wall} id="advertising-work"><div className={styles.container}>
          <span className={styles.eyebrow}>دعاية وإعلان</span><h2 className={styles.sectionTitle}>الشغل اللي بيخرج من الشاشة… ويقابل الناس في الطريق</h2><p className={styles.lead}>السيكشن ده بيثبت قدرة سويد على نقل الرسالة من الخطة لخامة ومقاس وموقع واستخدام حقيقي.</p>
          <div className={styles.wallGrid}>
            <article className={styles.wallBig}><div><b>الماهر جروب | منظومة لوحات الطرق</b><small>لوحتان رئيسيتان 3×18م أمام مواقع المشروعات + 3 لوحات 2.5×3م على الطرق — رسائل حسب زمن الرؤية ومكان اللوحة</small><p className={styles.proof}>5 معالجات مختلفة بتخدم موقع اللوحة وقرار الجمهور — مش نسخ رسالة واحدة</p><Cta href="/work/elmaher-ooh" light small>شوف المشروع كامل</Cta></div></article>
            <article><div><b>سويد | الكتالوج التعريفي الرسمي</b><small>رحلة قراءة بيعية بتبدأ بالمشكلة وتنتهي بخطوة تواصل — بنية بتدعم الورقي والرقمي</small></div></article>
            <article><div><b>تطبيقات هوية ميدانية</b><small>واجهات ولافتات ومطبوعات بنفس الرسالة — الصورة الواقعية أولوية والـ Mockup لتوضيح المقاس مش لإخفاء التنفيذ</small></div></article>
          </div>
        </div></section>

        <section className={styles.web} id="web-work"><div className={styles.container}>
          <span className={styles.eyebrow}>مواقع وحلول رقمية</span><h2 className={styles.sectionTitle}>الموقع مش واجهة… ده مسار قرار</h2><p className={styles.lead}>بنعرض تجربة المستخدم ومنطق الصفحة وسرعة الوصول للمعلومة — مش Screenshot طويل مبيتقراش.</p>
          <div className={styles.webGrid}>
            <div className={styles.browser}><header><i /><i /><i /><span>sweed.agency</span></header><div><section>الهيرو — نصنع العلامات التي تقود المستقبل<small>المشكلة قبل تعريف الشركة</small></section><section>هل تواجه هذه المشاكل؟<small>الزائر يلاقي نفسه في أول شاشة</small></section><section>الخدمات — 6 كروت بلينكات مستقلة<small>كل خدمة ليها صفحة قابلة للفهرسة</small></section><section>أعمال مختارة — إثبات بالأرقام<small>تاج + وصف + نتيجة</small></section><section>اتصل بنا — احجز استشارتك المجانية<small>نهاية الرحلة: تحويل</small></section></div></div>
            <div className={styles.notes}><Tag>موقع سويد | بناء تجربة البوصلة</Tag><div><b>ليه الترتيب ده؟</b>هندسة صفحات بتبدأ بالمشكلة قبل تعريف الشركة — الزائر بيتفهم قبل ما حد يبيع له.</div><div><b>التوقيع البصري</b>البوصلة توقيع بصري وحركي في كل الصفحات — مش زخرفة.</div><div><b>الإجراء المطلوب</b>كل سيكشن بيقود لخطوة واحدة واضحة، والرحلة كلها بتنتهي عند الاستشارة المجانية.</div><p className={styles.proof}>تجربة متسقة بين الرئيسية ومن نحن والخدمات وأعمالنا</p><Cta href="https://sweed-demo.coderaai.com/" small>افتح الموقع</Cta></div>
          </div>
        </div></section>

        <section className={styles.sectors} id="sectors"><div className={styles.container}>
          <span className={styles.eyebrow}>القطاعات</span><h2 className={styles.sectionTitle}>خبرة الخدمة مهمة… وفهم القطاع أهم</h2><p className={styles.lead}>بعد الأعمال حسب الخدمة، بنعيد تجميعها حسب القطاع — عشان تلاقي أقرب نموذج لسوقك.</p>
          <div className={styles.sectorTabs}>{(Object.keys(sectorProjects) as (keyof typeof sectorProjects)[]).map((key) => <button type="button" className={sectorKey === key ? styles.tabActive : ""} key={key} onClick={() => setSectorKey(key)}>{sectorProjects[key].label}</button>)}</div>
          <article className={styles.sectorPanel}><b>{sector.label}</b><strong>{sector.projects}</strong><small>{sector.text}</small><Cta href={sector.href} small>{sector.action}</Cta></article>
        </div></section>

        <section className={styles.finalCta} id="work-cta"><div className={styles.container + " " + styles.finalInner}>
          <span className={styles.eyebrow}>من المشاهدة للشراكة</span><h2>شفت شغل قريب من تحدي مشروعك؟</h2><p>خلينا نبدأ من وضعك أنت، مش من قالب جاهز. نفهم المشكلة، نحدد الاتجاه، ونقولك بوضوح إيه اللي محتاج يتنفذ — وإيه اللي مش محتاج تصرف عليه.</p>
          <form onSubmit={(event) => event.preventDefault()}>
            <div><label>اسمك *<input placeholder="اكتب اسمك" /></label><label>اسم المشروع *<input placeholder="اسم مشروعك أو نشاطك" /></label></div>
            <div><label>رقم الهاتف / واتساب *<input type="tel" placeholder="01xxxxxxxxx" /></label><label>الخدمة المطلوبة *<select defaultValue=""><option value="">اختار الخدمة</option>{sections.map((section) => <option key={section.id}>{section.label}</option>)}</select></label></div>
            <label>أقرب عمل أعجبك (اختياري)<select defaultValue=""><option value="">من غير تحديد</option><option>سناب شوب</option><option>الماهر جروب</option><option>الضامر</option><option>بوبيان</option><option>سويد — الهوية والموقع</option><option>المشروع الصناعي</option></select></label>
            <label>إيه التحدي دلوقتي؟ *<textarea rows={3} placeholder="من سطرين لأربعة: وضعك إيه، وأكبر حاجة واقفة قدامك" /></label>
            <div className={styles.formActions}><button type="submit" className={styles.btn}>ابدأ تشخيص مشروعك</button><Cta href="/contact" light>كلمنا مباشرة</Cta></div>
          </form>
        </div></section>
      </main>
    </PublicPageShell>
  );
}
