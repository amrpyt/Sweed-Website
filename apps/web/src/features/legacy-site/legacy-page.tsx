import Script from "next/script";
import { AiAdvisorWidget, AutomationDemo } from "@/features/ai-advisor";
import { OfferFunnelController } from "@/features/offer-funnel";
import { LegacyBreadcrumb } from "./legacy-breadcrumb";
import { LegacyEnhancements } from "./legacy-enhancements";
import { LegacyFooter } from "./legacy-footer";
import { getLegacyPage, type LegacyPresentation } from "./legacy-html";
import { LegacyHeader } from "./legacy-header";
import { legacyProductActionRuntime } from "./legacy-product-action-theme";
import type { LegacyPageKey } from "./legacy-routes";
import { ReferenceScripts } from "./reference-scripts";

const exactReferenceNavigationRuntime = `
(() => {
  const hrefByLabel = {
    "الرئيسية": "/#home",
    "من نحن": "/#about",
    "خدماتنا": "/#services",
    "أعمالنا": "/#portfolio",
    "العروض": "/#offers",
    "المقالات": "/#blog",
  };

  document.querySelectorAll("nav ul a").forEach((link) => {
    const label = link.textContent?.trim();
    const href = hrefByLabel[label];
    if (href) link.setAttribute("href", href);
  });

  document.querySelectorAll("nav .logo").forEach((link) => {
    link.setAttribute("href", "/#home");
  });

  document.querySelectorAll("nav .btn").forEach((link) => {
    link.setAttribute("href", "/sweed-company-catalog.pdf");
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noreferrer");
    link.textContent = "حمل الكتالوج";
  });
})();
`;

const portfolioExactRuntime = `
(() => {
  if (window.__sweedPortfolioRefreshReady) return;
  window.__sweedPortfolioRefreshReady = true;

  const images = [
    "/images/hero/sweed-building.png",
    "/images/hero/entrepreneur-laptop-office.jpg",
    "/images/hero/two-men-consultation.jpg",
    "/images/hero/businessman-laptop-standing.jpg"
  ];

  const ensurePortfolioPolish = () => {
    if (document.getElementById("sweed-portfolio-polish")) return;
    const style = document.createElement("style");
    style.id = "sweed-portfolio-polish";
    style.textContent = [
      ".sweed-reference-page #marketing-work .mkt-grid { grid-template-columns: minmax(14rem, 19rem) minmax(0, 1fr) !important; align-items: stretch !important; gap: clamp(1.4rem, 3.5vw, 3rem) !important; }",
      ".sweed-reference-page #marketing-work .mkt-grid > div:last-child { display: flex; min-width: 0; flex-direction: column; }",
      ".sweed-reference-page #marketing-work .mkt-proj.show { position: relative; display: block !important; height: 25.5rem; min-height: 25.5rem; text-align: right !important; }",
      ".sweed-reference-page #marketing-work .mkt-proj :is(h3, .challenge, ul, li, .status, .tag, .proof) { margin-inline: 0 !important; text-align: right !important; text-align-last: right !important; }",
      ".sweed-reference-page #marketing-work .mkt-proj ul { width: 100% !important; justify-items: stretch; padding-inline: 0 !important; }",
      ".sweed-reference-page #marketing-work .marketing-project-action-row { position: absolute; inset-inline: clamp(1.25rem, 2.7vw, 2.1rem); bottom: clamp(1.25rem, 2.7vw, 2.1rem); display: flex !important; justify-content: flex-start; margin: 0 !important; }",
      ".sweed-reference-page #marketing-work .mkt-proj .btn { width: 17.5rem !important; min-width: 17.5rem !important; max-width: 100% !important; min-height: 3.25rem !important; align-self: auto !important; justify-self: auto !important; overflow: hidden !important; white-space: nowrap !important; }",
      ".sweed-reference-page .portfolio-service-link, .sweed-reference-page #web-work .ux-notes .btn { display: inline-grid !important; grid-template-columns: 2.75rem minmax(0, 1fr) !important; width: max-content !important; max-width: 100% !important; min-width: 17.5rem !important; align-self: center !important; justify-self: center !important; overflow: visible !important; white-space: nowrap !important; }",
      ".sweed-reference-page #media-work .portfolio-film-lead { width: 100%; max-width: none !important; margin-inline: auto !important; white-space: nowrap; font-size: clamp(.78rem, 1vw, 1rem) !important; text-align: center !important; text-align-last: center !important; }",
      ".sweed-reference-page #media-work .film-tabs { justify-content: center; gap: .55rem; margin-top: 1rem !important; }",
      ".sweed-reference-page #media-work .frames { gap: .65rem !important; margin-top: .65rem !important; }",
      ".sweed-reference-page #media-work .frame { display: flex !important; height: 4rem !important; min-height: 4rem !important; align-items: center; justify-content: center; gap: .45rem; padding: .45rem .65rem !important; }",
      ".sweed-reference-page #media-work .frame span { display: inline-grid; width: 1.65rem !important; height: 1.65rem !important; flex: 0 0 1.65rem; place-items: center; margin: 0 !important; font-size: .7rem !important; }",
      ".sweed-reference-page .portfolio-service-link { margin: 1.45rem auto 0 !important; }",
      ".sweed-reference-page #advertising-work { padding-bottom: clamp(2.5rem, 3.5vw, 3.25rem) !important; }",
      ".sweed-reference-page #advertising-work .portfolio-service-action-row { display: flex; width: 100%; justify-content: center; margin-top: .65rem; }",
      ".sweed-reference-page #advertising-work .portfolio-service-link { width: 17.5rem !important; min-width: 17.5rem !important; margin: 0 !important; overflow: hidden !important; }",
      ".sweed-reference-page #web-work .ux-notes .btn { margin: 1.2rem auto 0 !important; }",
      ".sweed-reference-page #web-work .web-grid { align-items: stretch !important; }",
      ".sweed-reference-page #web-work .ux-notes { display: grid !important; grid-template-rows: repeat(5, minmax(0, 1fr)) auto; align-content: stretch !important; gap: .55rem !important; }",
      ".sweed-reference-page #web-work .web-solution-card { display: grid !important; grid-template-columns: 2.1rem minmax(0, 1fr); min-height: 0 !important; align-items: center; gap: .75rem; margin: 0 !important; padding: .7rem .9rem !important; overflow: hidden; border: 1px solid rgba(38,27,62,.13) !important; border-radius: .9rem !important; background: rgba(255,255,255,.92) !important; box-shadow: 0 .55rem 1.25rem rgba(38,27,62,.06) !important; color: #261b3e !important; text-align: right !important; transition: border-color .35s ease, box-shadow .35s ease, transform .35s ease; }",
      ".sweed-reference-page #web-work .web-solution-card.is-active { border-color: #ed2062 !important; box-shadow: 0 .7rem 1.5rem rgba(237,32,98,.12) !important; transform: translateX(-.2rem); }",
      ".sweed-reference-page #web-work .web-solution-number { display: inline-grid; width: 2.1rem; height: 2.1rem; place-items: center; border-radius: .7rem; background: #261b3e; color: #fff; font-family: Arial, sans-serif !important; font-size: .72rem; font-weight: 800; }",
      ".sweed-reference-page #web-work .web-solution-copy { display: grid; gap: .15rem; min-width: 0; }",
      ".sweed-reference-page #web-work .web-solution-copy b { color: #261b3e !important; font-size: .94rem; line-height: 1.35; }",
      ".sweed-reference-page #web-work .web-solution-copy small { color: #6f6682 !important; font-size: .8rem; line-height: 1.45; }",
      ".sweed-reference-page #web-work .web-service-action-row { display: flex !important; width: 100%; align-items: center; justify-content: center; margin: .2rem 0 0 !important; }",
      ".sweed-reference-page #web-work .web-service-action-row .btn { width: 17.5rem !important; min-width: 17.5rem !important; margin: 0 !important; overflow: hidden !important; }",
      ".sweed-reference-page .portfolio-contact-actions > .container > div { display: flex !important; width: 100%; align-items: center; justify-content: center; }",
      ".sweed-reference-page .portfolio-contact-actions .btn { display: inline-flex !important; width: auto !important; min-width: 12.75rem !important; min-height: 3.25rem !important; align-items: center !important; justify-content: center !important; padding-inline: 1.3rem !important; overflow: visible !important; white-space: nowrap !important; }",
      ".sweed-reference-page #web-work .browser { min-height: 27rem; }",
      ".sweed-reference-page .portfolio-system-slider { position: relative; display: grid; min-height: 27rem; overflow: hidden; isolation: isolate; background: #261b3e; }",
      ".sweed-reference-page .portfolio-system-slide { position: absolute; inset: 0; background-position: center; background-size: cover; opacity: 1; transition: opacity .65s ease, transform .65s ease; }",
      ".sweed-reference-page .portfolio-system-slider::after { position: absolute; z-index: 1; inset: 0; background: linear-gradient(180deg, rgba(38,27,62,.08) 28%, rgba(38,27,62,.78)); content: ''; pointer-events: none; }",
      ".sweed-reference-page .portfolio-system-caption { position: relative; z-index: 2; align-self: end; padding: 1.35rem; color: #fff; text-align: right; }",
      ".sweed-reference-page .portfolio-system-caption b { display: block; font-size: clamp(1.1rem, 1.7vw, 1.45rem); }",
      ".sweed-reference-page .portfolio-system-caption span { display: block; margin-top: .35rem; color: rgba(255,255,255,.84); font-size: .94rem; }",
      ".sweed-reference-page .portfolio-system-dots { position: absolute; z-index: 3; right: 1.35rem; bottom: 1rem; display: flex; gap: .35rem; direction: ltr; }",
      ".sweed-reference-page .portfolio-system-dots i { width: .5rem; height: .5rem; border-radius: 50%; background: rgba(255,255,255,.45); transition: width .28s ease, background .28s ease; }",
      ".sweed-reference-page .portfolio-system-dots i.active { width: 1.35rem; border-radius: 999px; background: #ed2062; }",
      ".sweed-reference-page #web-work .portfolio-system-slide { opacity: 0; transform: translateY(100%); transition: opacity .75s ease, transform .75s cubic-bezier(.22,1,.36,1); }",
      ".sweed-reference-page #web-work .portfolio-system-slide.is-active { opacity: 1; transform: translateY(0); }",
      ".sweed-reference-page #web-work .portfolio-system-slide.is-leaving { opacity: 0; transform: translateY(-100%); }",
      "@media (max-width: 48rem) { .sweed-reference-page #media-work .portfolio-film-lead { white-space: normal; font-size: .96rem !important; } .sweed-reference-page #media-work .film-tabs { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)); } .sweed-reference-page #media-work .film-tab { width: 100%; } .sweed-reference-page #media-work .frames { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } .sweed-reference-page #marketing-work .mkt-grid { grid-template-columns: 1fr !important; } .sweed-reference-page #marketing-work .mkt .phone { width: min(100%, 16rem); margin-inline: auto; } .sweed-reference-page #marketing-work .mkt-proj.show { height: auto; min-height: 0; padding-bottom: 1.25rem !important; } .sweed-reference-page #marketing-work .marketing-project-action-row { position: static; margin-top: 1rem !important; } .sweed-reference-page #marketing-work .mkt-proj .btn, .sweed-reference-page .portfolio-service-link, .sweed-reference-page #web-work .ux-notes .btn { width: min(100%, 17.5rem) !important; min-width: min(100%, 17.5rem) !important; } .sweed-reference-page #web-work .browser, .sweed-reference-page .portfolio-system-slider { min-height: 20rem; } }",
      "@media (prefers-reduced-motion: reduce) { .sweed-reference-page .portfolio-system-slide { transition: none; } }"
    ].join("\\n");
    document.head.appendChild(style);
  };

  const makeBrandCard = (title, sector, copy, proof, image) => {
    const card = document.createElement("article");
    card.className = "bp-card portfolio-proof-card reveal";
    card.dataset.portfolioImage = image;
    card.innerHTML = '<span class="tag">تطبيقات الهوية</span><h3>' + title + '</h3><div class="sector">' + sector + '</div><p>' + copy + '</p><div class="proof">' + proof + '</div>';
    return card;
  };

  // Add any future consulting project here; the card and marquee are created automatically.
  const consultingProjectCatalog = [
    {
      title: "الضامر للتطوير العقاري | استراتيجية إطلاق ومبيعات",
      state: "مستمر",
      sector: "التطوير العقاري — مدينة السادات",
      challenge: "إطلاق مشروع تجاري وإداري برسالة واضحة تربط العرض بالمستثمرين وأصحاب الأنشطة.",
      points: ["صياغة المبادرة والعرض والرسائل البيعية", "خطة متكاملة للتسويق الرقمي والميداني", "مسار متابعة يربط الاهتمام بالمبيعات"],
      proof: "خطة إطلاق تربط الهوية والعرض وقنوات الوصول"
    },
    {
      title: "بوبيان للتطوير العقاري | خطة ظهور المشروع",
      state: "مستمر",
      sector: "التطوير العقاري — أكتوبر",
      challenge: "بناء حضور واضح لمشروع جديد مع ربط سرعة التنفيذ بالثقة والطلب.",
      points: ["تحديد الرسالة والجمهور ونقاط القوة", "خطة محتوى وحملات مرتبطة بمراحل المشروع", "متابعة دورية للنتائج وفرص التحسين"],
      proof: "مسار ظهور يربط التنفيذ بالمبيعات"
    },
    {
      title: "سفنكس فاير | استراتيجية نمو ومبيعات B2B",
      state: "مستمر",
      sector: "أنظمة الحماية ومكافحة الحريق — مصر",
      challenge: "تحويل خبرة فنية قوية لرسالة تفتح فرصًا مع المشروعات والشركات.",
      points: ["تحديد القطاعات والفرص ذات الأولوية", "رسائل ثقة تربط الالتزام الفني بقيمة القرار", "محتوى ومتابعة يدعمان فريق المبيعات"],
      proof: "مسار نمو مهني يدعم الثقة والطلبات"
    }
  ];

  const prepareConsulting = () => {
    const section = document.getElementById("consulting-work");
    const container = section?.querySelector(".consult-grid");
    const intro = section?.querySelector(".consult-side");
    const existingCards = Array.from(section?.querySelectorAll(".dossier") ?? []);
    const cardList = existingCards[0]?.parentElement;
    if (!section || !container || !intro || !cardList || existingCards.length !== 3 || section.dataset.sweedConsultingReady === "true") return;

    section.dataset.sweedConsultingReady = "true";
    const style = document.createElement("style");
    style.id = "sweed-consulting-cards";
    style.textContent = [
      ".sweed-reference-page #consulting-work { padding-block: clamp(2.4rem, 3.4vw, 3.1rem) !important; }",
      ".sweed-reference-page #consulting-work .consult-grid { display: block !important; }",
      ".sweed-reference-page #consulting-work .consult-side { max-width: 62rem; margin: 0 auto 1rem !important; text-align: center; }",
      ".sweed-reference-page #consulting-work .consult-side .eyebrow, .sweed-reference-page #consulting-work .consult-side .sec-title, .sweed-reference-page #consulting-work .consult-side p { margin-inline: auto !important; text-align: center !important; text-align-last: center !important; }",
      ".sweed-reference-page #consulting-work .consult-side .line { display: none !important; }",
      ".sweed-reference-page #consulting-work .consult-card-viewport { width: 100%; overflow: hidden; padding-block: .2rem .65rem; direction: ltr; }",
      ".sweed-reference-page #consulting-work .consult-card-track { display: flex; width: max-content; gap: 1rem; padding-inline: .15rem; direction: ltr; animation: sweed-consulting-cards-rtl 32s linear infinite; will-change: transform; }",
      ".sweed-reference-page #consulting-work .consult-card-viewport:hover .consult-card-track { animation-play-state: paused; }",
      ".sweed-reference-page #consulting-work .dossier.consult-marquee-card { display: flex !important; width: clamp(18rem, 27vw, 22rem); min-height: 0 !important; padding: 1.1rem !important; flex: 0 0 clamp(18rem, 27vw, 22rem); flex-direction: column; direction: rtl; border: 1px solid rgba(237,32,98,.78) !important; border-radius: 1.1rem !important; background: #fff !important; box-shadow: 0 .8rem 2rem rgba(12,5,27,.15); color: #261b3e !important; }",
      ".sweed-reference-page #consulting-work .dossier.consult-marquee-card :is(h3, .sector, .challenge, li, .proof) { color: #261b3e !important; }",
      ".sweed-reference-page #consulting-work .dossier.consult-marquee-card .top { min-height: 3rem; margin-bottom: .45rem !important; align-items: flex-start; }",
      ".sweed-reference-page #consulting-work .dossier.consult-marquee-card .top h3 { font-size: 1.04rem; line-height: 1.55; }",
      ".sweed-reference-page #consulting-work .dossier.consult-marquee-card .sector { min-height: 1.9rem; margin-bottom: .55rem !important; color: #6f6682 !important; }",
      ".sweed-reference-page #consulting-work .dossier.consult-marquee-card .challenge { min-height: 5rem; margin: .45rem 0 .6rem !important; padding: .75rem !important; background: #f6f2fa !important; border-radius: .8rem; font-size: .86rem; line-height: 1.55 !important; }",
      ".sweed-reference-page #consulting-work .dossier.consult-marquee-card ul { display: grid; gap: .3rem; min-height: 6.3rem; margin-block: .55rem !important; padding-inline: 0 !important; }",
      ".sweed-reference-page #consulting-work .dossier.consult-marquee-card li { font-size: .84rem; line-height: 1.55 !important; }",
      ".sweed-reference-page #consulting-work .dossier.consult-marquee-card .proof { min-height: 2.2rem; margin-top: auto; padding-right: .7rem; border-right: .18rem solid #ed2062; font-size: .84rem; line-height: 1.55 !important; font-weight: 800; }",
      ".sweed-reference-page #consulting-work .dossier.consult-marquee-card .cta-line { display: flex; width: 100%; margin-top: .75rem; }",
      ".sweed-reference-page #consulting-work .dossier.consult-marquee-card .consult-card-action { display: inline-flex !important; width: 100% !important; min-height: 3rem !important; align-items: center !important; justify-content: center !important; padding: .55rem .9rem !important; overflow: visible !important; border: 1px solid #261b3e !important; border-radius: .8rem !important; background: #261b3e !important; color: #fff !important; font-size: .9rem !important; font-weight: 800 !important; line-height: 1.2 !important; text-align: center !important; text-decoration: none !important; white-space: nowrap; }",
      ".sweed-reference-page #consulting-work .dossier.consult-marquee-card .consult-card-action::before { display: none !important; content: none !important; }",
      ".sweed-reference-page #consulting-work .dossier.consult-marquee-card .consult-card-action:hover { background: #ed2062 !important; border-color: #ed2062 !important; transform: translateY(-2px); }",
      "@keyframes sweed-consulting-cards-rtl { from { transform: translateX(0); } to { transform: translateX(calc(-50% - .5rem)); } }",
      "@media (max-width: 48rem) { .sweed-reference-page #consulting-work { padding-block: 2.6rem !important; } .sweed-reference-page #consulting-work .consult-side { margin-bottom: 1rem !important; } .sweed-reference-page #consulting-work .dossier.consult-marquee-card { width: min(82vw, 21rem); min-height: 24rem; flex-basis: min(82vw, 21rem); } .sweed-reference-page #consulting-work .consult-card-track { animation-duration: 25s; } }",
      "@media (prefers-reduced-motion: reduce) { .sweed-reference-page #consulting-work .consult-card-track { animation: none; flex-wrap: wrap; width: auto; justify-content: center; } .sweed-reference-page #consulting-work .consult-card-track [aria-hidden='true'] { display: none; } }"
    ].join("\\n");
    document.head.appendChild(style);

    const createCard = (project) => {
      const card = document.createElement("article");
      card.className = "dossier consult-marquee-card";
      card.innerHTML = '<div class="top"><h3>' + project.title + '</h3><span class="tag state">' + project.state + '</span></div><div class="sector">' + project.sector + '</div><div class="challenge"><b>التحدي</b>' + project.challenge + '</div><ul>' + project.points.map((point) => '<li>' + point + '</li>').join("") + '</ul><div class="proof">' + project.proof + '</div><div class="cta-line"><a class="btn consult-card-action" href="/contact">شوف المشروع كامل</a></div>';
      return card;
    };

    existingCards.forEach((card) => {
      card.classList.add("consult-marquee-card");
      const actionRow = card.querySelector(".cta-line") ?? card.appendChild(document.createElement("div"));
      actionRow.classList.add("cta-line");
      let action = actionRow.querySelector("a");
      if (!action) {
        action = document.createElement("a");
        action.setAttribute("href", "/contact");
        actionRow.appendChild(action);
      }
      action.className = "btn consult-card-action";
      action.textContent = "شوف المشروع كامل";
    });

    const cards = [...existingCards, ...consultingProjectCatalog.map(createCard)];
    const viewport = document.createElement("div");
    viewport.className = "consult-card-viewport";
    const track = document.createElement("div");
    track.className = "consult-card-track";
    cards.forEach((card) => track.appendChild(card));
    cards.forEach((card) => {
      const duplicate = card.cloneNode(true);
      duplicate.setAttribute("aria-hidden", "true");
      duplicate.querySelectorAll("a").forEach((link) => link.setAttribute("tabindex", "-1"));
      track.appendChild(duplicate);
    });
    viewport.appendChild(track);
    cardList.replaceWith(viewport);
  };

  const prepareBranding = () => {
    const section = document.getElementById("branding-work");
    const projects = section?.querySelector(".brand-projects");
    if (!section || !projects || projects.dataset.sweedExpanded === "true") return;

    projects.dataset.sweedExpanded = "true";
    projects.append(
      makeBrandCard("دليل هوية قابل للاستخدام", "منظومة مرئية متكاملة", "نحوّل عناصر الهوية إلى قواعد بسيطة يستخدمها الفريق بثبات.", "ألوان وخطوط وتطبيقات تحافظ على نفس الانطباع.", images[3]),
      makeBrandCard("نماذج تطبيقات حيّة", "من الشعار إلى كل نقطة تواصل", "نختبر الهوية على الواجهات والمطبوعات والمحتوى قبل اعتمادها.", "هوية واضحة في الاستخدام اليومي، وليست ملفًا نظريًا.", images[0])
    );
  };

  const prepareMarketing = () => {
    const section = document.getElementById("marketing-work");
    if (!section || section.dataset.sweedShortened === "true") return;
    section.dataset.sweedShortened = "true";
    const lead = section.querySelector(".sec-lead");
    if (lead) lead.textContent = "كل مشروع له رسالة وقنوات ومتابعة واضحة تربط المحتوى بهدفه.";
    section.querySelectorAll(".mkt-proj ul li:nth-child(n+3)").forEach((item) => item.remove());
    section.querySelectorAll(".mkt-proj .challenge").forEach((item) => item.classList.add("portfolio-compact-copy"));
    section.querySelectorAll('a[href="/work/damer"], a[href="/work/boubyan"], a[href="/work/snap-shop-marketing"]').forEach((link) => {
      link.classList.add("portfolio-full-project-link");
      link.parentElement?.classList.add("marketing-project-action-row");
    });
  };

  const prepareFilm = () => {
    const section = document.getElementById("media-work");
    if (!section || section.dataset.sweedShortened === "true") return;
    section.dataset.sweedShortened = "true";
    const lead = section.querySelector(".sec-lead") ?? section.querySelector(":scope > .container > p");
    if (lead) {
      lead.classList.add("portfolio-film-lead");
      lead.textContent = "السيكشن بيعرض الفيلم كفكرة ورسالة وإيقاع — كل مشروع بيبدأ بلقطة قوية وبعدها بيكشف السكربت والهدف.";
    }

    const tabs = section.querySelector(".film-tabs");
    const extraProjects = [
      {
        key: "elmaher",
        label: "الماهر جروب",
        caption: "قصة تطور المشروع — من الأرض لخطوة تنفيذ موثقة",
        tag: "تطوير عقاري",
        challenge: "تحويل تطورات التنفيذ والقرارات الرسمية لمحتوى يرفع الثقة ويخدم قرار الشراء.",
        points: ["لقطات موقع وتحديثات تنفيذ مرتبطة برسالة واضحة", "مونتاج سريع يوازن بين المعلومة والمشهد"],
        proof: "كل فيديو يوثق خطوة فعلية ويقود الجمهور للخطوة التالية"
      },
      {
        key: "aqarshop",
        label: "عقار شوب",
        caption: "محتوى عقاري يختصر القرار — ريلز 9:16",
        tag: "منصة عقارية",
        challenge: "شرح الاختيارات العقارية بلغة سريعة وواضحة من غير تعقيد أو تفاصيل تشتت المشاهد.",
        points: ["هوك يبدأ بسؤال العميل الحقيقي", "عرض المعلومة والاختيار المناسب في وقت قصير"],
        proof: "محتوى يربط الوضوح بسرعة الوصول للعقار المناسب"
      },
      {
        key: "sweed",
        label: "سويد",
        caption: "محتوى استشاري يحول الفكرة لقرار",
        tag: "استشارات وأعمال",
        challenge: "تقديم الأفكار الإدارية والتسويقية بصورة بسيطة تحافظ على قيمة الخبرة وتشد الانتباه.",
        points: ["افتتاحية مباشرة من مشكلة حقيقية", "أمثلة عملية وخاتمة تقود لقرار واضح"],
        proof: "فيديو تعليمي قصير يحتفظ بنبرة سويد الاستشارية"
      }
    ];

    const captions = {
      sphinx: "فيلم تحالف استراتيجي — التشغيل بالنقر، من غير صوت تلقائي",
      snapv: "محتوى قصير يغيّر السلوك — ريلز 9:16",
      boubyanv: "قصة مشروع قبل ظهور المباني"
    };

    extraProjects.forEach((project) => {
      if (!tabs?.querySelector('[data-f="' + project.key + '"]')) {
        const tab = document.createElement("button");
        tab.className = "film-tab";
        tab.type = "button";
        tab.dataset.f = project.key;
        tab.textContent = project.label;
        tabs.appendChild(tab);
      }

      if (!section.querySelector("#f-" + project.key)) {
        const panel = document.createElement("div");
        panel.className = "film-info";
        panel.id = "f-" + project.key;
        panel.innerHTML = '<span class="tag dark">' + project.tag + '</span><div class="challenge"><b>التحدي</b>' + project.challenge + '</div><ul style="list-style:none;font-size:.88rem;color:rgba(255,255,255,.8)">' + project.points.map((point) => '<li style="padding-right:18px;position:relative;margin-bottom:5px"><span style="position:absolute;right:0;color:var(--fuchsia)">—</span> ' + point + '</li>').join("") + '</ul><div class="proof" style="color:#fff">' + project.proof + '</div>';
        section.querySelector(".film-info:last-of-type")?.after(panel);
      }

      captions[project.key] = project.caption;
    });

    section.querySelectorAll(".film-tab").forEach((tab) => {
      if (tab.dataset.sweedFilmBound === "true") return;
      tab.dataset.sweedFilmBound = "true";
      tab.addEventListener("click", () => {
        section.querySelectorAll(".film-tab").forEach((item) => item.classList.remove("active"));
        section.querySelectorAll(".film-info").forEach((panel) => panel.classList.remove("show"));
        tab.classList.add("active");
        section.querySelector("#f-" + tab.dataset.f)?.classList.add("show");
        const caption = section.querySelector("#filmCap");
        if (caption) caption.textContent = captions[tab.dataset.f] ?? "مشروع محتوى مرئي";
      });
    });

    section.querySelectorAll(".film-info ul li:nth-child(n+3)").forEach((item) => item.remove());
    section.querySelectorAll(".frame span").forEach((icon, index) => {
      icon.textContent = String(index + 1).padStart(2, "0");
      icon.setAttribute("aria-hidden", "true");
    });
  };

  const prepareAdvertising = () => {
    const section = document.getElementById("advertising-work");
    const grid = section?.querySelector(".wall-grid");
    if (!section || !grid || grid.dataset.sweedGallery === "true") return;
    grid.dataset.sweedGallery = "true";
    const sideItems = Array.from(grid.querySelectorAll(".w-item:not(.big)"));
    const options = [
      { title: "الكتالوج التعريفي", text: "رسالة واضحة تدعم العرض الورقي والرقمي.", image: images[0] },
      { title: "تطبيقات هوية ميدانية", text: "واجهات ومطبوعات تظهر الهوية في مكانها الحقيقي.", image: images[1] },
      { title: "لوحات الطرق", text: "رسالة سريعة ومقروءة حسب مكان الرؤية.", image: images[2] },
      { title: "مواد البيع والعروض", text: "نماذج تساعد العميل على الفهم واتخاذ الخطوة.", image: images[3] }
    ];
    let index = 0;
    const update = () => {
      sideItems.forEach((item, offset) => {
        const current = options[(index + offset) % options.length];
        const title = item.querySelector(".meta b");
        const text = item.querySelector(".meta small");
        if (title) title.textContent = current.title;
        if (text) text.textContent = current.text;
        item.style.backgroundImage = 'linear-gradient(135deg, rgba(38,27,62,.68), rgba(38,27,62,.16)), url("' + current.image + '")';
      });
    };
    const controls = document.createElement("div");
    controls.className = "portfolio-wall-controls";
    controls.innerHTML = '<button type="button" aria-label="المشروع السابق">→</button><button type="button" aria-label="المشروع التالي">←</button>';
    controls.querySelectorAll("button")[0].addEventListener("click", () => { index = (index + options.length - 1) % options.length; update(); });
    controls.querySelectorAll("button")[1].addEventListener("click", () => { index = (index + 1) % options.length; update(); });
    grid.after(controls);
    update();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.setInterval(() => { index = (index + 1) % options.length; update(); }, 4800);
    }
    const actionRow = document.createElement("div");
    actionRow.className = "portfolio-service-action-row";
    const service = document.createElement("a");
    service.className = "btn btn-primary portfolio-service-link";
    service.href = "/services/advertising";
    service.innerHTML = '<span aria-hidden="true" class="sweed-action-fill"></span><span aria-hidden="true" class="sweed-action-icon"><svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.75" viewBox="0 0 24 24" width="18"><path d="M7 17L17 7"></path><path d="M7 7h10v10"></path></svg></span><span class="sweed-action-label">شوف خدمة الدعاية والإعلان</span>';
    actionRow.appendChild(service);
    controls.after(actionRow);
  };

  const prepareWeb = () => {
    const section = document.getElementById("web-work");
    if (!section || section.dataset.sweedClientFocused === "true") return;
    section.dataset.sweedClientFocused = "true";
    const tag = section.querySelector(".ux-notes .tag");
    const notes = Array.from(section.querySelectorAll(".ux-notes .note"));
    const proof = section.querySelector(".ux-notes .proof");
    const solutionCards = [tag, ...notes, proof].filter(Boolean);
    const cardCopy = [
      ["تجربة تبدأ بالعميل", "نرتب الصفحة حول السؤال الذي يحتاج عميلك إجابته أولًا."],
      ["مسار واضح", "كل محتوى يقود للخطوة التالية بدون تشتيت أو زحمة."],
      ["تحويل قابل للقياس", "نربط الطلبات والنماذج والأعمال في رحلة واحدة مفهومة."],
      ["سرعة وأداء", "صفحات خفيفة وسريعة تحافظ على تركيز العميل وتسهّل وصوله."],
      ["متابعة وتطوير", "نظام مرن سهل التحديث ويتطور مع احتياجات مشروعك."]
    ];
    solutionCards.forEach((card, index) => {
      if (!cardCopy[index]) return;
      card.classList.add("web-solution-card");
      card.innerHTML = '<span class="web-solution-number">' + String(index + 1).padStart(2, "0") + '</span><span class="web-solution-copy"><b>' + cardCopy[index][0] + '</b><small>' + cardCopy[index][1] + '</small></span>';
    });
    const button = section.querySelector(".ux-notes .btn");
    if (button) {
      button.setAttribute("href", "/services/software-development");
      button.removeAttribute("target");
      button.innerHTML = '<span aria-hidden="true" class="sweed-action-fill"></span><span aria-hidden="true" class="sweed-action-icon"><svg fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.75" viewBox="0 0 24 24" width="18"><path d="M7 17L17 7"></path><path d="M7 7h10v10"></path></svg></span><span class="sweed-action-label">شوف خدمة المواقع والحلول</span>';
      const actionRow = button.parentElement;
      if (actionRow) {
        actionRow.classList.add("web-service-action-row");
        actionRow.style.marginTop = "";
      }
    }
    const browser = section.querySelector(".browser");
    if (browser && browser.dataset.sweedProjectSlider !== "true") {
      browser.dataset.sweedProjectSlider = "true";
      const slides = [
        { title: "تجربة تتمحور حول العميل", copy: "واجهة تبدأ من احتياج الزائر وتقوده للمعلومة المناسبة.", image: "/images/hero/entrepreneur-laptop-office.jpg" },
        { title: "مسار واضح للقرار", copy: "بنية منظمة توصل العميل للخطوة التالية بدون تشتيت.", image: "/images/hero/sweed-building.png" },
        { title: "تحويل قابل للقياس", copy: "طلبات ونماذج ومؤشرات مترابطة في رحلة واحدة.", image: "/images/portfolio/blit-scroll-effect-demo-poster.png" },
        { title: "سرعة وأداء مستقر", copy: "تجربة خفيفة تحافظ على تركيز العميل وسهولة الاستخدام.", image: "/images/hero/businessman-laptop-standing.jpg" },
        { title: "متابعة وتطوير مستمر", copy: "حل رقمي مرن يتحدث ويتطور مع احتياجات المشروع.", image: "/images/hero/two-men-consultation.jpg" }
      ];
      browser.innerHTML = '<div class="portfolio-system-slider" aria-label="نماذج مواقع وحلول رقمية">' + slides.map((item, index) => '<div class="portfolio-system-slide' + (index === 0 ? ' is-active' : '') + '" style="background-image:url(&quot;' + item.image + '&quot;)" aria-hidden="' + (index === 0 ? 'false' : 'true') + '"></div>').join("") + '<div class="portfolio-system-caption"><b></b><span></span></div><div class="portfolio-system-dots">' + slides.map(() => '<i></i>').join("") + '</div></div>';
      const slider = browser.querySelector(".portfolio-system-slider");
      const slideElements = Array.from(browser.querySelectorAll(".portfolio-system-slide"));
      const title = browser.querySelector(".portfolio-system-caption b");
      const copyText = browser.querySelector(".portfolio-system-caption span");
      const dots = Array.from(browser.querySelectorAll(".portfolio-system-dots i"));
      let slideIndex = 0;
      let transitionTimer = 0;
      const renderSlide = (nextIndex, animate) => {
        const previousIndex = slideIndex;
        const current = slides[nextIndex];
        if (animate && previousIndex !== nextIndex) {
          slideElements[previousIndex]?.classList.remove("is-active");
          slideElements[previousIndex]?.classList.add("is-leaving");
        }
        slideElements[nextIndex]?.classList.remove("is-leaving");
        slideElements[nextIndex]?.classList.add("is-active");
        slideElements.forEach((slide, index) => slide.setAttribute("aria-hidden", index === nextIndex ? "false" : "true"));
        if (title) title.textContent = current.title;
        if (copyText) copyText.textContent = current.copy;
        dots.forEach((dot, index) => dot.classList.toggle("active", index === nextIndex));
        solutionCards.forEach((card, index) => card.classList.toggle("is-active", index === nextIndex));
        slider?.setAttribute("data-slide", String(nextIndex + 1));
        slideIndex = nextIndex;
        window.clearTimeout(transitionTimer);
        transitionTimer = window.setTimeout(() => slideElements.forEach((slide, index) => {
          if (index !== slideIndex) slide.classList.remove("is-leaving");
        }), 800);
      };
      renderSlide(0, false);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.setInterval(() => {
          renderSlide((slideIndex + 1) % slides.length, true);
        }, 4200);
      }
    }
    section.querySelectorAll(".mini-sec").forEach((item, index) => {
      const labels = ["رسالة واضحة", "خدمة مناسبة", "دليل ثقة", "خطوة تواصل", "متابعة أسهل"];
      item.childNodes[0].textContent = labels[index] || "";
    });
  };

  const prepareSectors = () => {
    const section = document.getElementById("sectors");
    if (!section || section.dataset.sweedVisuals === "true") return;
    section.dataset.sweedVisuals = "true";
    section.querySelectorAll(".sector-panel").forEach((panel, index) => {
      const content = document.createElement("div");
      content.className = "sector-content";
      Array.from(panel.childNodes).forEach((node) => content.appendChild(node));
      const visual = document.createElement("div");
      visual.className = "sector-visual";
      visual.style.backgroundImage = 'linear-gradient(135deg, rgba(38,27,62,.1), rgba(237,32,98,.08)), url("' + images[index % images.length] + '")';
      panel.append(visual, content);
    });
  };

  const prepareContact = () => {
    const cta = document.getElementById("work-cta");
    if (!cta || cta.dataset.sweedContactReady === "true") return;
    cta.dataset.sweedContactReady = "true";
    const compact = document.createElement("section");
    compact.className = "portfolio-contact-actions";
    compact.innerHTML = '<div class="container"><span class="eyebrow">جاهز نبدأ</span><h2>خلينا نعرف مشروعك أقرب</h2><p>اختار الطريقة المريحة لك، وفريق سويد هيتابع معك من صفحة التواصل.</p><div><a class="btn btn-primary" href="/contact">احجز استشارتك المجانية</a><a class="btn btn-ghost" href="/contact">تواصل معنا</a></div></div>';
    cta.replaceWith(compact);
    document.querySelectorAll('a[href="#work-cta"]').forEach((link) => link.setAttribute("href", "/contact"));
  };

  const run = () => {
    ensurePortfolioPolish();
    prepareConsulting();
    prepareBranding();
    prepareMarketing();
    prepareFilm();
    prepareAdvertising();
    prepareWeb();
    prepareSectors();
    prepareContact();
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => window.setTimeout(run, 500), { once: true });
  else window.setTimeout(run, 500);
})();
`;

const aboutReferenceActionOverride = `
.sweed-reference-page .cta .btn-ghost {
  background: var(--sweed-action-bg);
  border-color: var(--sweed-action-border);
  color: var(--sweed-action-color);
}
.sweed-reference-page .cta .btn-ghost:hover,
.sweed-reference-page .cta .btn-ghost:focus-visible {
  border-color: #261b3e;
  color: #ffffff;
}
`;

const aboutExactPresentationOverride = `
  .sweed-exact-reference-page {
    --about-ink: #261b3e;
    --about-pink: #ed2062;
    --about-soft: #faf8fc;
    background: #faf9fc;
  }

  .sweed-exact-reference-page > section {
    isolation: isolate;
  }

  .sweed-exact-reference-page > section:not(.about-hero) {
    padding-block: clamp(3.85rem, 5vw, 4.85rem);
  }

  .sweed-exact-reference-page > section:nth-of-type(even):not(.about-hero):not(.promise):not(.numbers):not(.cta) {
    background: #ffffff;
  }

  .sweed-exact-reference-page > section:nth-of-type(odd):not(.about-hero):not(.promise):not(.numbers):not(.cta) {
    background: var(--about-soft);
  }

  .sweed-exact-reference-page .reveal {
    opacity: 1 !important;
    transform: none !important;
    visibility: visible !important;
  }

  .sweed-exact-reference-page .sec-title,
  .sweed-exact-reference-page .about-hero h1 {
    position: relative;
    width: max-content;
    max-width: 100%;
    margin-inline: auto;
    text-align: center !important;
    white-space: nowrap;
    letter-spacing: -.02em;
  }

  .sweed-exact-reference-page .sec-title::after,
  .sweed-exact-reference-page .about-hero h1::after {
    content: "";
    display: block;
    width: 3.55rem;
    height: .2rem;
    margin: .85rem auto 0;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--about-ink) 0 45%, var(--about-pink) 45% 100%);
    box-shadow: 0 5px 14px rgba(237, 32, 98, .16);
  }

  .sweed-exact-reference-page .eyebrow {
    display: table;
    margin-inline: auto;
    padding: .42rem .85rem;
    border: 1px solid rgba(237, 32, 98, .2);
    border-radius: 999px;
    background: rgba(237, 32, 98, .06);
    color: var(--about-pink);
    text-align: center !important;
  }

  .sweed-exact-reference-page :is(
    .story-text p,
    .founder-sign,
    .sec-lead,
    .card p,
    .pledge-box p,
    .step p,
    .ally p,
    .member p,
    .t-card p,
    .cta p
  ) {
    text-align: justify !important;
    text-justify: inter-word;
    text-align-last: auto;
    line-height: 1.9;
  }

  /* القصة: صورة فعلية + مساحة أقل + خط زمني 2×2 */
  .sweed-exact-reference-page > section:nth-of-type(2) {
    padding-block: clamp(3.5rem, 5vw, 4.5rem) !important;
  }

  .sweed-exact-reference-page .story-grid {
    grid-template-columns: minmax(0, 1.1fr) minmax(21rem, .9fr);
    gap: clamp(2rem, 4vw, 3.25rem);
    margin-top: 2.3rem !important;
    align-items: start;
  }

  .sweed-exact-reference-page .story-text {
    display: grid;
    gap: .7rem;
  }

  .sweed-exact-reference-page .story-text p {
    margin: 0 !important;
  }

  .sweed-exact-reference-page .video-frame {
    min-height: 0;
    aspect-ratio: 16 / 10;
    background:
      linear-gradient(135deg, rgba(38, 27, 62, .22), rgba(38, 27, 62, .64)),
      url("/images/hero/two-men-consultation.jpg") center / cover no-repeat;
    box-shadow: 0 20px 42px rgba(38, 27, 62, .2);
  }

  .sweed-exact-reference-page .video-frame::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    border: 1px solid rgba(255,255,255,.24);
    border-radius: inherit;
  }

  .sweed-exact-reference-page .video-frame .play {
    width: 4.25rem;
    height: 4.25rem;
    transition: transform .35s ease, box-shadow .35s ease;
  }

  .sweed-exact-reference-page .video-frame:hover .play {
    transform: scale(1.09);
    box-shadow: 0 0 0 18px rgba(237, 32, 98, .2);
  }

  .sweed-exact-reference-page .timeline {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: .8rem;
    margin-top: 1rem;
    padding: 0;
    border: 0;
  }

  .sweed-exact-reference-page .tl-item {
    min-height: 6.4rem;
    padding: 1rem 1rem 1rem 2.1rem;
    border: 1px solid rgba(38, 27, 62, .1);
    border-radius: 1rem;
    background: rgba(255,255,255,.92);
    box-shadow: 0 8px 20px rgba(38, 27, 62, .055);
    transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease;
  }

  .sweed-exact-reference-page .tl-item::before {
    right: auto;
    left: .9rem;
    top: 1rem;
    width: .58rem;
    height: .58rem;
    box-shadow: 0 0 0 4px rgba(237, 32, 98, .13);
  }

  .sweed-exact-reference-page .tl-item:hover {
    transform: translateY(-4px);
    border-color: rgba(237, 32, 98, .35);
    box-shadow: 0 14px 26px rgba(38, 27, 62, .1);
  }

  .sweed-exact-reference-page .tl-item b {
    margin-bottom: .25rem;
  }

  .sweed-exact-reference-page .tl-item small {
    display: block;
    line-height: 1.65;
  }

  /* صورة للمؤسس بدل الحرف الافتراضي */
  .sweed-exact-reference-page .founder {
    padding-block: 4rem !important;
  }

  .sweed-exact-reference-page .founder-card {
    gap: 2.5rem;
    padding: clamp(1.5rem, 4vw, 2.6rem);
    background: linear-gradient(135deg, #f2edf8, #ffffff);
    border: 1px solid rgba(38, 27, 62, .08);
    box-shadow: 0 18px 40px rgba(38, 27, 62, .08);
  }

  .sweed-exact-reference-page .avatar {
    overflow: hidden;
    color: transparent;
    background:
      linear-gradient(180deg, rgba(38, 27, 62, 0), rgba(38, 27, 62, .42)),
      url("/images/hero/mohamed-sweed-portrait.jpeg") center / cover no-repeat;
    box-shadow: 0 14px 28px rgba(38, 27, 62, .18);
  }

  /* الوعد: أقصر وأدفأ وأكثر حركة */
  .sweed-exact-reference-page .promise {
    position: relative;
    overflow: hidden;
    min-height: 0 !important;
    padding-block: clamp(3.6rem, 5vw, 4.75rem) !important;
    background:
      radial-gradient(circle at 15% 18%, rgba(237, 32, 98, .24), transparent 22rem),
      radial-gradient(circle at 86% 82%, rgba(119, 93, 173, .34), transparent 21rem),
      #261b3e !important;
  }

  .sweed-exact-reference-page .promise::before,
  .sweed-exact-reference-page .promise::after {
    content: "";
    position: absolute;
    border: 1px solid rgba(255,255,255,.11);
    border-radius: 50%;
    pointer-events: none;
  }

  .sweed-exact-reference-page .promise::before {
    width: 17rem;
    height: 17rem;
    top: -10rem;
    right: 7%;
  }

  .sweed-exact-reference-page .promise::after {
    width: 11rem;
    height: 11rem;
    bottom: -6rem;
    left: 9%;
  }

  .sweed-exact-reference-page .promise .container {
    position: relative;
    z-index: 1;
  }

  .sweed-exact-reference-page .promise .half {
    font-size: clamp(1.35rem, 2.5vw, 2.05rem);
    line-height: 1.45;
  }

  .sweed-exact-reference-page .promise .compass {
    filter: drop-shadow(0 8px 16px rgba(237, 32, 98, .34));
    animation: sweedAboutCompass 4.5s ease-in-out infinite;
  }

  .sweed-exact-reference-page .pledge-box h3 {
    max-width: none;
    white-space: nowrap;
    font-size: clamp(1rem, 1.55vw, 1.3rem);
  }

  .sweed-exact-reference-page .promise .sub {
    max-width: 48rem;
    margin: 1rem auto 0;
    color: rgba(255,255,255,.8) !important;
    text-align: center !important;
  }

  /* المبادئ: كروت ملونة وخفيفة وتفاعلية */
  .sweed-exact-reference-page .cards-2,
  .sweed-exact-reference-page .cards-3 {
    gap: 1rem;
    margin-top: 2rem !important;
  }

  .sweed-exact-reference-page .cards-2 {
    margin-bottom: 1rem;
  }

  .sweed-exact-reference-page .cards-2 .card,
  .sweed-exact-reference-page .cards-3 .card {
    position: relative;
    min-height: 0;
    padding: clamp(1.25rem, 2.4vw, 1.8rem);
    overflow: hidden;
    border: 1px solid rgba(38, 27, 62, .1);
    border-radius: 1.15rem;
    box-shadow: 0 12px 28px rgba(38, 27, 62, .065);
    transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
  }

  .sweed-exact-reference-page .cards-2 .card::before,
  .sweed-exact-reference-page .cards-3 .card::before {
    content: "";
    position: absolute;
    inset: auto 0 0;
    height: .24rem;
    background: linear-gradient(90deg, #261b3e, #ed2062);
    transform: scaleX(.32);
    transform-origin: right;
    transition: transform .35s ease;
  }

  .sweed-exact-reference-page .cards-2 .card:nth-child(odd),
  .sweed-exact-reference-page .cards-3 .card:nth-child(3n + 1) {
    background: linear-gradient(135deg, #ffffff, #faf0f5);
  }

  .sweed-exact-reference-page .cards-2 .card:nth-child(even),
  .sweed-exact-reference-page .cards-3 .card:nth-child(3n + 2) {
    background: linear-gradient(135deg, #ffffff, #f0ecf7);
  }

  .sweed-exact-reference-page .cards-3 .card:nth-child(3n) {
    background: linear-gradient(135deg, #ffffff, #f8f5ee);
  }

  .sweed-exact-reference-page .cards-2 .card:hover,
  .sweed-exact-reference-page .cards-3 .card:hover {
    transform: translateY(-6px);
    border-color: rgba(237, 32, 98, .38);
    box-shadow: 0 18px 34px rgba(38, 27, 62, .13);
  }

  .sweed-exact-reference-page .cards-2 .card:hover::before,
  .sweed-exact-reference-page .cards-3 .card:hover::before {
    transform: scaleX(1);
  }

  .sweed-exact-reference-page .cards-2 .card .ic,
  .sweed-exact-reference-page .cards-3 .card .ic {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
    border-radius: .9rem;
    background: linear-gradient(135deg, #261b3e, #45316d);
    color: #ffffff;
    box-shadow: 0 8px 18px rgba(38, 27, 62, .18);
  }

  .sweed-exact-reference-page .cards-2 .card h3,
  .sweed-exact-reference-page .cards-3 .card h3 {
    margin-bottom: .55rem;
    text-align: right !important;
  }

  /* بطاقات فريق القيادة تصبح مرئية بصور موجودة */
  .sweed-exact-reference-page .team-swiper {
    margin-top: 2rem !important;
  }

  .sweed-exact-reference-page .member .photo {
    color: transparent;
    background:
      linear-gradient(180deg, rgba(38, 27, 62, 0), rgba(38, 27, 62, .32)),
      url("/images/hero/entrepreneur-laptop-office.jpg") center / cover no-repeat;
  }

  .sweed-exact-reference-page .swiper-slide:nth-child(even) .member .photo {
    background:
      linear-gradient(180deg, rgba(38, 27, 62, 0), rgba(38, 27, 62, .36)),
      url("/images/hero/businessman-laptop-standing.jpg") center / cover no-repeat;
  }

  .sweed-exact-reference-page .swiper-slide:first-child .member .photo {
    background:
      linear-gradient(180deg, rgba(38, 27, 62, 0), rgba(38, 27, 62, .3)),
      url("/images/hero/mohamed-sweed-portrait.jpeg") center / cover no-repeat;
  }

  .sweed-exact-reference-page .member,
  .sweed-exact-reference-page .ally,
  .sweed-exact-reference-page .t-card {
    border-radius: 1.15rem;
  }

  .sweed-exact-reference-page .founder *,
  .sweed-exact-reference-page .promise *,
  .sweed-exact-reference-page .pledge *,
  .sweed-exact-reference-page .numbers *,
  .sweed-exact-reference-page .cta * {
    opacity: 1 !important;
    visibility: visible !important;
  }


  /* الرؤية والرسالة: شريط واحد أخف وأقرب للهوية */
  .sweed-exact-reference-page #values {
    padding-bottom: clamp(3.25rem, 4vw, 4rem) !important;
  }

  .sweed-exact-reference-page #values .cards-2 {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0;
    margin: 2rem 0 0 !important;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.11);
    border-radius: 1.55rem;
    background:
      radial-gradient(circle at 10% 8%, rgba(237,32,98,.22), transparent 18rem),
      linear-gradient(120deg, #261b3e, #32224f);
    box-shadow: 0 18px 38px rgba(38,27,62,.18);
  }

  .sweed-exact-reference-page #values .cards-2 .card {
    min-height: 0;
    padding: clamp(1.5rem, 3vw, 2.25rem);
    border: 0 !important;
    border-radius: 0;
    background: transparent !important;
    box-shadow: none !important;
    color: #ffffff;
  }

  .sweed-exact-reference-page #values .cards-2 .card + .card {
    border-inline-start: 1px solid rgba(255,255,255,.16) !important;
  }

  .sweed-exact-reference-page #values .cards-2 .card::before,
  .sweed-exact-reference-page #values .cards-2 .card .ic {
    display: none;
  }

  .sweed-exact-reference-page #values .cards-2 .card h3 {
    margin: 0 0 .75rem;
    color: #ff96b9 !important;
    font-size: 1.08rem;
    text-align: center !important;
  }

  .sweed-exact-reference-page #values .cards-2 .card p {
    margin: 0;
    color: rgba(255,255,255,.93) !important;
    font-size: clamp(1rem, 1.45vw, 1.2rem);
    font-weight: 700;
    text-align: center !important;
    text-align-last: center;
    line-height: 1.85;
  }

  .sweed-exact-reference-page #values .cards-3 {
    display: none !important;
  }

  /* القصة: الفيديو والنص ثم السنوات الأربع في صف واحد */
  @media (min-width: 59rem) {
    .sweed-exact-reference-page .story-grid {
      display: grid;
      grid-template-columns: minmax(0, .95fr) minmax(0, 1.05fr);
      grid-template-areas:
        "media copy"
        "timeline timeline";
      gap: 2.25rem 3.25rem;
    }

    .sweed-exact-reference-page .story-text {
      grid-area: copy;
    }

    .sweed-exact-reference-page .story-grid > div:last-child {
      display: contents;
    }

    .sweed-exact-reference-page .video-frame {
      grid-area: media;
      align-self: start;
    }

    .sweed-exact-reference-page .timeline {
      grid-area: timeline;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      margin-top: 0;
    }
  }

  .sweed-exact-reference-page .timeline .tl-item {
    display: flex;
    min-height: 0;
    padding: 1.1rem 1rem;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
  }

  .sweed-exact-reference-page .timeline .tl-item::before {
    position: static;
    display: block;
    width: .58rem;
    height: .58rem;
    margin: 0 auto .65rem;
    box-shadow: 0 0 0 4px rgba(237,32,98,.13);
  }

  .sweed-exact-reference-page .timeline .tl-item b {
    min-height: 1.75rem;
    margin: 0 0 .38rem;
    white-space: nowrap;
    text-align: center;
  }

  .sweed-exact-reference-page .timeline .tl-item small {
    flex: 1;
    text-align: center;
    line-height: 1.65;
  }

  /* المنهجية: توازن ثابت تحت كل رقم */
  .sweed-exact-reference-page .method {
    padding-block: clamp(3.7rem, 5vw, 4.6rem) !important;
  }

  .sweed-exact-reference-page .method .sec-lead,
  .sweed-exact-reference-page #team .sec-lead,
  .sweed-exact-reference-page #alliances .sec-lead {
    max-width: 52rem;
    margin: 1rem auto 0;
    text-align: center !important;
    text-align-last: center;
  }

  .sweed-exact-reference-page .method-track {
    margin-top: 2.7rem;
  }

  .sweed-exact-reference-page .steps {
    align-items: stretch;
    gap: .95rem;
  }

  .sweed-exact-reference-page .step {
    display: flex;
    min-width: 0;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .sweed-exact-reference-page .step > div:last-child {
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }

  .sweed-exact-reference-page .step .dot {
    flex: 0 0 3.35rem;
    width: 3.35rem;
    height: 3.35rem;
    margin-bottom: .9rem;
  }

  .sweed-exact-reference-page .step b {
    min-height: 1.65rem;
    margin: 0 0 .42rem;
    white-space: nowrap;
    text-align: center;
  }

  .sweed-exact-reference-page .step p {
    min-height: 4.9rem;
    margin: 0;
    text-align: center !important;
    text-align-last: center;
    line-height: 1.72;
  }

  .sweed-exact-reference-page .step small {
    min-height: 2.9rem;
    margin-top: auto;
    text-align: center;
  }

  /* ليه سويد: عنوان بجانب الأيقونة وكروت أصغر */
  .sweed-exact-reference-page #why {
    padding-block: clamp(3.5rem, 4.7vw, 4.25rem) !important;
  }

  .sweed-exact-reference-page #why .cards-3 {
    margin-top: 1.8rem !important;
    gap: .85rem;
  }

  .sweed-exact-reference-page #why .cards-3 .card {
    display: grid;
    grid-template-columns: 2.8rem minmax(0, 1fr);
    gap: 0 .85rem;
    min-height: 0;
    padding: 1.15rem 1.2rem;
    align-items: center;
  }

  .sweed-exact-reference-page #why .cards-3 .card .ic {
    grid-column: 1;
    grid-row: 1;
    width: 2.8rem;
    height: 2.8rem;
    margin: 0;
    border-radius: .8rem;
  }

  .sweed-exact-reference-page #why .cards-3 .card h3 {
    grid-column: 2;
    grid-row: 1;
    margin: 0;
    font-size: 1rem;
    white-space: nowrap;
  }

  .sweed-exact-reference-page #why .cards-3 .card p {
    grid-column: 1 / -1;
    margin: .8rem 0 0;
    font-size: .9rem;
    line-height: 1.7;
  }

  /* عنوان الفريق والجملة أسفله متوازنان */
  .sweed-exact-reference-page #team {
    padding-block: clamp(3.8rem, 5vw, 4.8rem) !important;
  }

  .sweed-exact-reference-page #team .team-swiper {
    margin-top: 2rem !important;
  }

  /* التحالفات: ستة عناصر وشعارات مرئية في مسار متحرك */
  .sweed-exact-reference-page #alliances {
    padding-block: clamp(3.6rem, 4.7vw, 4.3rem) !important;
  }

  .sweed-exact-reference-page #alliances .ally-grid.sweed-about-ally-marquee,
  .sweed-exact-reference-page #partners .logo-cloud.sweed-about-logo-marquee,
  .sweed-exact-reference-page #testimonials .testi-swiper.sweed-about-testimonial-marquee {
    display: block !important;
    overflow: hidden;
    direction: ltr;
  }

  .sweed-exact-reference-page .sweed-about-ally-track,
  .sweed-exact-reference-page .sweed-about-logo-track,
  .sweed-exact-reference-page .sweed-about-testimonial-track {
    display: flex;
    width: max-content;
    align-items: stretch;
    animation: sweedAboutMarquee 33s linear infinite;
    will-change: transform;
  }

  .sweed-exact-reference-page #alliances .sweed-about-ally-track {
    gap: 1rem;
    padding: .25rem 0 .5rem;
  }

  .sweed-exact-reference-page #alliances .ally-grid:hover .sweed-about-ally-track,
  .sweed-exact-reference-page #partners .logo-cloud:hover .sweed-about-logo-track,
  .sweed-exact-reference-page #testimonials .testi-swiper:hover .sweed-about-testimonial-track {
    animation-play-state: paused;
  }

  .sweed-exact-reference-page #alliances .ally {
    flex: 0 0 15rem;
    min-height: 0;
    padding: 1.2rem;
    border-radius: 1.15rem;
    box-shadow: 0 10px 24px rgba(38,27,62,.08);
  }

  .sweed-exact-reference-page #alliances .ally .lg {
    height: 3.7rem;
    margin-bottom: .85rem;
    background: linear-gradient(135deg, #f2edf8, #fff);
  }

  .sweed-exact-reference-page #alliances .ally .lg img,
  .sweed-exact-reference-page #partners .plogo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .sweed-exact-reference-page #alliances .ally {
    flex-basis: 10.75rem;
    padding: .7rem;
  }

  .sweed-exact-reference-page #alliances .ally .lg {
    height: 4.35rem;
    margin: 0;
  }

  .sweed-exact-reference-page #alliances .ally :is(b, p) {
    display: none !important;
  }

  /* الدعوة الختامية: الجملة في منتصف العنوان مباشرة */
  .sweed-exact-reference-page .cta .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .sweed-exact-reference-page .cta h2,
  .sweed-exact-reference-page .cta p {
    width: 100%;
    text-align: center !important;
    text-align-last: center;
  }

  .sweed-exact-reference-page .cta p {
    max-width: none;
    margin: .85rem auto 1.55rem;
  }

  .sweed-exact-reference-page #alliances .ally b {
    min-height: 1.55rem;
  }

  .sweed-exact-reference-page #alliances .ally p {
    margin: 0;
    line-height: 1.65;
  }

  /* شعارات العملاء: سطر واحد وستة شعارات متحركة */
  .sweed-exact-reference-page #partners {
    padding-block: clamp(3.45rem, 4.5vw, 4.1rem) !important;
  }

  .sweed-exact-reference-page #partners .logo-cloud {
    margin-top: 1.85rem !important;
  }

  .sweed-exact-reference-page #partners .sweed-about-logo-track {
    gap: 1rem;
    animation-duration: 25s;
  }

  .sweed-exact-reference-page #partners .plogo {
    flex: 0 0 10.5rem;
    height: 4.45rem;
    padding: .75rem 1rem;
    border-radius: 1rem;
    background: #ffffff;
    filter: none;
  }

  /* آراء عملاء أكثر، شريط متحرك خفيف */
  .sweed-exact-reference-page #testimonials {
    padding-block: clamp(3.8rem, 5vw, 4.6rem) !important;
  }

  .sweed-exact-reference-page #testimonials .testi-swiper {
    margin-top: 1.9rem !important;
  }

  .sweed-exact-reference-page #testimonials .sweed-about-testimonial-track {
    gap: 1rem;
    animation-duration: 43s;
  }

  .sweed-exact-reference-page #testimonials .swiper-slide {
    display: block;
    flex: 0 0 22rem;
    width: 22rem !important;
    height: auto;
  }

  .sweed-exact-reference-page #testimonials .t-card {
    min-height: 15.25rem;
    padding: 1.45rem;
    border: 1px solid rgba(38,27,62,.08);
    border-radius: 1.2rem;
  }

  .sweed-exact-reference-page #testimonials .t-card p {
    min-height: 7.25rem;
    margin-bottom: 1rem;
    line-height: 1.78;
  }

  .sweed-exact-reference-page #testimonials .swiper-pagination {
    display: none !important;
  }

  @keyframes sweedAboutMarquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @keyframes sweedAboutCompass {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-6px) rotate(7deg); }
  }

  @media (prefers-reduced-motion: reduce) {
    .sweed-exact-reference-page *,
    .sweed-exact-reference-page *::before,
    .sweed-exact-reference-page *::after {
      animation-duration: .01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: .01ms !important;
    }
  }

  @media (max-width: 58rem) {
    .sweed-exact-reference-page .story-grid {
      grid-template-columns: 1fr;
    }

    .sweed-exact-reference-page .timeline {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 48rem) {
    .sweed-exact-reference-page > section:not(.about-hero) {
      padding-block: 3rem;
    }

    .sweed-exact-reference-page .sec-title,
    .sweed-exact-reference-page .about-hero h1 {
      width: auto;
      white-space: normal;
      font-size: clamp(1.55rem, 7vw, 2.15rem);
    }

    .sweed-exact-reference-page .story-grid {
      margin-top: 1.65rem !important;
    }

    .sweed-exact-reference-page .timeline,
    .sweed-exact-reference-page .cards-2,
    .sweed-exact-reference-page .cards-3 {
      grid-template-columns: 1fr;
    }

    .sweed-exact-reference-page .founder-card {
      gap: 1.5rem;
    }
  }
`;

const aboutReferencePresentationOverride = aboutExactPresentationOverride.replaceAll(
  "sweed-exact-reference-page",
  "sweed-reference-page",
);

const portfolioExactPresentationOverride = `
  .sweed-exact-reference-page {
    --portfolio-ink: #261b3e;
    --portfolio-pink: #ed2062;
    --portfolio-soft: #f7f4fb;
    background: #fbfafe;
    font-family: "SWEED Helvetica Arabic", "SF Arabic", sans-serif !important;
  }

  .sweed-exact-reference-page,
  .sweed-exact-reference-page * {
    font-family: "SWEED Helvetica Arabic", "SF Arabic", sans-serif !important;
  }

  .sweed-exact-reference-page > section {
    position: relative;
    isolation: isolate;
    padding-block: clamp(4rem, 5.5vw, 5.35rem);
  }

  .sweed-exact-reference-page .reveal {
    opacity: 1 !important;
    transform: none !important;
    visibility: visible !important;
  }

  .sweed-exact-reference-page .sec-title,
  .sweed-exact-reference-page .w-hero h1,
  .sweed-exact-reference-page .w-cta h2 {
    position: relative;
    max-width: 100%;
    margin-inline: auto;
    text-align: center !important;
    letter-spacing: -.02em;
  }

  .sweed-exact-reference-page .sec-title::after,
  .sweed-exact-reference-page .w-hero h1::after,
  .sweed-exact-reference-page .w-cta h2::after {
    content: "";
    display: block;
    width: 3.6rem;
    height: .2rem;
    margin: .9rem auto 0;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--portfolio-ink) 0 43%, var(--portfolio-pink) 43% 100%);
  }

  .sweed-exact-reference-page :is(.consult .sec-title, .film .sec-title, .w-hero h1, .w-cta h2)::after {
    background: linear-gradient(90deg, #ffffff 0 43%, var(--portfolio-pink) 43% 100%);
  }

  .sweed-exact-reference-page .eyebrow {
    display: table;
    margin-inline: auto;
    padding: .38rem .82rem;
    border: 1px solid rgba(237, 32, 98, .22);
    border-radius: 999px;
    background: rgba(237, 32, 98, .06);
    color: var(--portfolio-pink);
    text-align: center !important;
  }

  .sweed-exact-reference-page .sec-lead {
    margin: 1rem auto 0;
    max-width: 48rem;
    text-align: center !important;
    text-align-last: center;
  }

  .sweed-exact-reference-page :is(.challenge, .dossier li, .bp-card p, .mkt-proj li, .film-info .challenge, .w-item .meta small, .ux-notes .note, .sector-panel small) {
    text-align: justify;
    text-justify: inter-word;
    line-height: 1.82;
  }

  /* الهيرو: لغة بصرية مرتبطة بأنواع المخرجات بدل بطاقات نصية عائمة */
  .sweed-exact-reference-page .w-hero {
    min-height: min(50rem, 86vh);
    background: linear-gradient(105deg, rgba(24, 11, 40, .94), rgba(38, 27, 62, .67)) !important;
  }

  .sweed-exact-reference-page .w-hero::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    background: linear-gradient(105deg, rgba(24, 11, 40, .95), rgba(38, 27, 62, .52)), url("/images/hero/two-men-consultation.jpg") center / cover no-repeat;
  }

  .sweed-exact-reference-page .w-hero .inner,
  .sweed-exact-reference-page .w-hero .trust {
    position: relative;
    z-index: 1;
  }

  .sweed-exact-reference-page .w-hero .clip {
    position: absolute;
    z-index: 1;
    display: block;
    overflow: hidden;
    padding: 0;
    color: transparent;
    font-size: 0;
    pointer-events: none;
    opacity: .72;
    border-color: rgba(255,255,255,.18);
    background: rgba(255,255,255,.055);
    box-shadow: 0 16px 38px rgba(8, 3, 18, .18);
  }

  .sweed-exact-reference-page .w-hero .clip::before,
  .sweed-exact-reference-page .w-hero .clip::after {
    position: absolute;
    content: "";
    border-radius: inherit;
  }

  /* استراتيجية: أعمدة قياس، فيديو: فريم، هوية: ألوان، موقع: واجهة، دليل: شبكة، طريق: محطات */
  .sweed-exact-reference-page .w-hero .c1::before {
    inset: 1.2rem;
    background:
      linear-gradient(180deg, transparent 0 25%, rgba(255,255,255,.14) 25% 28%, transparent 28% 54%, rgba(255,255,255,.14) 54% 57%, transparent 57%),
      linear-gradient(180deg, var(--portfolio-pink) 0 76%, transparent 76%) 12% 100% / 16% 100% no-repeat,
      linear-gradient(180deg, rgba(255,255,255,.82) 0 52%, transparent 52%) 44% 100% / 16% 100% no-repeat,
      linear-gradient(180deg, rgba(255,255,255,.45) 0 88%, transparent 88%) 76% 100% / 16% 100% no-repeat;
    border-bottom: 1px solid rgba(255,255,255,.34);
  }

  .sweed-exact-reference-page .w-hero .c2::before {
    inset: 1rem;
    border: 1px solid rgba(255,255,255,.42);
    background: repeating-linear-gradient(180deg, transparent 0 1.7rem, rgba(255,255,255,.16) 1.7rem 1.9rem);
  }

  .sweed-exact-reference-page .w-hero .c2::after {
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    transform: translate(-38%, -50%);
    border-top: .8rem solid transparent;
    border-bottom: .8rem solid transparent;
    border-left: 1.25rem solid var(--portfolio-pink);
  }

  .sweed-exact-reference-page .w-hero .c3::before {
    inset: 1.1rem;
    border-radius: .75rem;
    background:
      linear-gradient(135deg, #ed2062 0 49%, #f9b4ce 49% 100%) 0 0 / 30% 100% no-repeat,
      linear-gradient(135deg, #55409a 0 49%, #f6ebff 49% 100%) 50% 0 / 30% 100% no-repeat,
      linear-gradient(135deg, #ffffff 0 49%, #a897d7 49% 100%) 100% 0 / 30% 100% no-repeat;
  }

  .sweed-exact-reference-page .w-hero .c4::before {
    inset: 1rem;
    border: 1px solid rgba(255,255,255,.42);
    background:
      linear-gradient(90deg, var(--portfolio-pink) 0 26%, transparent 26%) 15% 18% / 64% .35rem no-repeat,
      linear-gradient(90deg, rgba(255,255,255,.8) 0 75%, transparent 75%) 15% 42% / 72% .25rem no-repeat,
      linear-gradient(90deg, rgba(255,255,255,.5) 0 56%, transparent 56%) 15% 57% / 72% .25rem no-repeat,
      linear-gradient(135deg, rgba(255,255,255,.14), rgba(237,32,98,.36)) 15% 78% / 72% 1.35rem no-repeat;
  }

  .sweed-exact-reference-page .w-hero .c5::before {
    inset: 1rem;
    background:
      radial-gradient(circle, var(--portfolio-pink) 0 .48rem, transparent .52rem) 15% 15% / 42% 42% no-repeat,
      radial-gradient(circle, rgba(255,255,255,.86) 0 .48rem, transparent .52rem) 85% 15% / 42% 42% no-repeat,
      radial-gradient(circle, rgba(255,255,255,.56) 0 .48rem, transparent .52rem) 15% 85% / 42% 42% no-repeat,
      radial-gradient(circle, rgba(255,255,255,.32) 0 .48rem, transparent .52rem) 85% 85% / 42% 42% no-repeat;
    border: 1px solid rgba(255,255,255,.18);
  }

  .sweed-exact-reference-page .w-hero .c6::before {
    inset: 1.1rem;
    background:
      radial-gradient(circle, var(--portfolio-pink) 0 .35rem, transparent .39rem) 0 50% / 33% 100% no-repeat,
      radial-gradient(circle, rgba(255,255,255,.8) 0 .35rem, transparent .39rem) 50% 18% / 33% 100% no-repeat,
      radial-gradient(circle, rgba(255,255,255,.52) 0 .35rem, transparent .39rem) 100% 70% / 33% 100% no-repeat,
      linear-gradient(145deg, transparent 48%, rgba(255,255,255,.46) 49% 51%, transparent 52%);
  }

  .sweed-exact-reference-page .w-hero .crumb {
    margin-bottom: 1rem;
    color: rgba(255,255,255,.74);
    font-size: clamp(.95rem, 1.35vw, 1.05rem) !important;
    font-weight: 700;
    letter-spacing: 0;
  }

  .sweed-exact-reference-page .w-hero .inner { max-width: 60rem; }
  .sweed-exact-reference-page .w-hero h1 { font-size: clamp(2rem, 4vw, 3.35rem); text-wrap: balance; }
  .sweed-exact-reference-page .w-hero p { max-width: 50rem; margin-inline: auto; text-align: center !important; text-align-last: center; }
  .sweed-exact-reference-page .w-hero .btn { min-width: 13.75rem; }

  .sweed-exact-reference-page .trust {
    position: absolute !important;
    inset: auto 50% 1.3rem auto !important;
    width: min(73rem, calc(100% - 3rem));
    transform: translateX(50%);
    padding: .78rem 1rem;
    border: 1px solid rgba(255,255,255,.16);
    border-radius: 1rem;
    background: rgba(24, 11, 40, .56);
    box-shadow: 0 16px 34px rgba(10, 4, 19, .2);
    backdrop-filter: blur(10px);
  }

  .sweed-exact-reference-page .trust .container {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    align-items: center;
    gap: 0;
  }

  .sweed-exact-reference-page .trust .t-item {
    display: flex;
    min-width: 0;
    align-items: baseline;
    justify-content: center;
    gap: .42rem;
    padding: .15rem .8rem;
    border-inline-start: 1px solid rgba(255,255,255,.13);
    white-space: nowrap;
  }

  .sweed-exact-reference-page .trust .t-item:first-child { border-inline-start: 0; }
  .sweed-exact-reference-page .trust .t-item b { display: inline; flex: 0 0 auto; font-size: 1.25rem; }
  .sweed-exact-reference-page .trust .t-item span { overflow: hidden; color: rgba(255,255,255,.78); font-size: .76rem; text-overflow: ellipsis; }
  .sweed-exact-reference-page .footnote { padding-block: .8rem; background: #f1edf8; }

  /* الاستشارات: الإطار المرجعي نفسه، مع صور خفيفة داخل الحالات دون تغيير توزيعها */
  .sweed-exact-reference-page .consult {
    background: radial-gradient(circle at 10% 15%, rgba(237, 32, 98, .16), transparent 18rem), #261b3e;
  }

  .sweed-exact-reference-page .consult-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 2.25rem;
  }

  .sweed-exact-reference-page .consult-side {
    width: min(100%, 48rem);
    margin-inline: auto;
    text-align: center;
  }

  .sweed-exact-reference-page .consult-side p {
    max-width: 44rem;
    margin-inline: auto;
    text-align: center !important;
    text-align-last: center;
  }

  .sweed-exact-reference-page .consult-grid > div:last-child {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: stretch;
    gap: 1rem;
  }

  .sweed-exact-reference-page .dossier {
    position: relative;
    overflow: hidden;
    margin-bottom: 0;
    padding: clamp(1.2rem, 2vw, 1.55rem);
    background: linear-gradient(100deg, rgba(38,27,62,.93), rgba(38,27,62,.65)), url("/images/hero/two-men-consultation.jpg") center / cover;
    transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease;
  }

  .sweed-exact-reference-page .dossier:nth-child(2) {
    background-image: linear-gradient(100deg, rgba(38,27,62,.94), rgba(38,27,62,.65)), url("/images/hero/sweed-building.png");
  }

  .sweed-exact-reference-page .dossier:nth-child(3) {
    background-image: linear-gradient(100deg, rgba(38,27,62,.94), rgba(38,27,62,.66)), url("/images/hero/entrepreneur-laptop-office.jpg");
  }

  .sweed-exact-reference-page .dossier:hover {
    transform: translateY(-4px);
    border-color: rgba(237, 32, 98, .7);
    box-shadow: 0 18px 30px rgba(0,0,0,.18);
  }

  .sweed-exact-reference-page .dossier .challenge { background: rgba(15, 8, 26, .48); }

  @media (max-width: 58rem) {
    .sweed-exact-reference-page .consult-grid > div:last-child { grid-template-columns: 1fr; }
  }

  /* براند وهوية: صور تطبيقات حية في أعلى كل حالة، من غير حذف أي بيانات */
  .sweed-exact-reference-page .brandw { background: linear-gradient(180deg, #ffffff, #faf8fd); }
  .sweed-exact-reference-page .brand-projects { gap: 1.2rem; margin-top: 2.6rem; }

  .sweed-exact-reference-page .bp-card {
    position: relative;
    overflow: hidden;
    padding-top: 9.5rem;
    border-radius: 1.15rem;
    transition: transform .3s ease, box-shadow .3s ease;
  }

  .sweed-exact-reference-page .bp-card::before {
    content: "";
    position: absolute;
    inset: 0 0 auto;
    height: 8rem;
    background: linear-gradient(90deg, rgba(38,27,62,.18), rgba(38,27,62,.02)), url("/images/hero/sweed-building.png") center / cover;
  }

  .sweed-exact-reference-page .bp-card:nth-child(2)::before {
    background-image: linear-gradient(90deg, rgba(38,27,62,.18), rgba(38,27,62,.02)), url("/images/hero/entrepreneur-laptop-office.jpg");
  }

  .sweed-exact-reference-page .bp-card:hover { transform: translateY(-5px); box-shadow: 0 18px 34px rgba(38,27,62,.12); }

  /* التسويق والمحتوى: صور غلاف حقيقية فوق العناصر التفاعلية الموجودة */
  .sweed-exact-reference-page .mkt { background: radial-gradient(circle at 85% 15%, rgba(237,32,98,.11), transparent 17rem), var(--portfolio-soft); }
  .sweed-exact-reference-page .phone { background: #261b3e; box-shadow: 0 18px 34px rgba(38,27,62,.18); }
  .sweed-exact-reference-page .phone .screen { background: linear-gradient(180deg, rgba(38,27,62,.12), rgba(38,27,62,.62)), url("/images/hero/entrepreneur-laptop-office.jpg") center / cover; }
  .sweed-exact-reference-page .feed-head { background: rgba(38,27,62,.78); }
  .sweed-exact-reference-page .post { background: rgba(255,255,255,.9); }

  .sweed-exact-reference-page .film { background: radial-gradient(circle at 12% 18%, rgba(237,32,98,.18), transparent 20rem), #191027; }
  .sweed-exact-reference-page .film .screen16 {
    min-height: clamp(16rem, 34vw, 25rem);
    background: linear-gradient(90deg, rgba(20,9,31,.58), rgba(20,9,31,.13)), url("/images/hero/two-men-consultation.jpg") center / cover;
    box-shadow: 0 22px 46px rgba(0,0,0,.25);
  }
  .sweed-exact-reference-page .film .screen16 .play { transition: transform .3s ease, box-shadow .3s ease; }
  .sweed-exact-reference-page .film .screen16:hover .play { transform: scale(1.08); box-shadow: 0 0 0 18px rgba(237,32,98,.18); }
  .sweed-exact-reference-page .frame { transition: transform .25s ease, background .25s ease; }
  .sweed-exact-reference-page .frame:hover { transform: translateY(-4px); background: rgba(237,32,98,.15); }
  .sweed-exact-reference-page .frame span { color: var(--portfolio-pink); filter: grayscale(1) sepia(.2) saturate(8); }

  /* الدعاية والمواقع: خلفيات أعمال تدعم المعنى، مع بقاء النص والروابط كما هي */
  .sweed-exact-reference-page .wall-grid { gap: 1rem; margin-top: 2.3rem; }
  .sweed-exact-reference-page .w-item { border: 1px solid rgba(38,27,62,.1); background: linear-gradient(135deg, rgba(38,27,62,.5), rgba(38,27,62,.1)), url("/images/hero/sweed-building.png") center / cover; }
  .sweed-exact-reference-page .w-item.big { background-image: linear-gradient(135deg, rgba(38,27,62,.66), rgba(38,27,62,.22)), url("/images/hero/two-men-consultation.jpg"); }
  .sweed-exact-reference-page .w-item:nth-child(3) { background-image: linear-gradient(135deg, rgba(38,27,62,.55), rgba(38,27,62,.16)), url("/images/hero/entrepreneur-laptop-office.jpg"); }
  .sweed-exact-reference-page .webw { background: linear-gradient(135deg, #f1edf8, #faf9fc); }
  .sweed-exact-reference-page .browser { border: 1px solid rgba(38,27,62,.1); box-shadow: 0 18px 38px rgba(38,27,62,.1); }

  .sweed-exact-reference-page .w-cta { background: radial-gradient(circle at 84% 18%, rgba(237,32,98,.22), transparent 18rem), #261b3e; }
  .sweed-exact-reference-page .w-cta .inner { max-width: 48rem; text-align: center; }
  .sweed-exact-reference-page .w-cta p { max-width: 43rem; margin: 1rem auto 1.65rem; text-align: center !important; text-align-last: center; }
  .sweed-exact-reference-page .w-cta .form { padding: clamp(1rem, 3vw, 1.6rem); border: 1px solid rgba(255,255,255,.13); border-radius: 1.15rem; background: rgba(255,255,255,.06); text-align: right; }
  .sweed-exact-reference-page .w-cta .form > div:last-child { justify-content: center; margin-top: .9rem !important; }

  /* إعادة بناء أقسام أعمالنا: محتوى أخف وصور أوضح وتفاعل مستقل لكل خدمة */
  .sweed-exact-reference-page .brand-projects {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
  }

  .sweed-exact-reference-page .brand-projects .bp-card {
    display: flex;
    min-height: 24rem;
    flex-direction: column;
  }

  .sweed-exact-reference-page .brand-projects .proof { margin-top: auto; }

  .sweed-exact-reference-page .portfolio-proof-card {
    animation: portfolio-card-drift 5.8s ease-in-out infinite;
  }

  .sweed-exact-reference-page .portfolio-proof-card:nth-child(4) { animation-delay: -2.1s; }

  .sweed-exact-reference-page .portfolio-proof-card::before {
    background-image: linear-gradient(90deg, rgba(38,27,62,.28), rgba(38,27,62,.03)), var(--portfolio-card-image);
  }

  .sweed-exact-reference-page .portfolio-proof-card[data-portfolio-image="/images/hero/businessman-laptop-standing.jpg"] { --portfolio-card-image: url("/images/hero/businessman-laptop-standing.jpg"); }
  .sweed-exact-reference-page .portfolio-proof-card[data-portfolio-image="/images/hero/sweed-building.png"] { --portfolio-card-image: url("/images/hero/sweed-building.png"); }

  @keyframes portfolio-card-drift {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-7px); }
  }

  .sweed-exact-reference-page .mkt-grid {
    grid-template-columns: minmax(14rem, 19rem) minmax(0, 1fr);
    align-items: stretch;
    gap: clamp(1.4rem, 3.5vw, 3rem);
  }

  .sweed-exact-reference-page .mkt .phone { position: relative; top: auto; width: min(100%, 18rem); min-height: 31rem; }
  .sweed-exact-reference-page .mkt-proj { min-height: 25rem; padding: clamp(1.25rem, 2.7vw, 2.1rem); border-radius: 1.15rem; background: rgba(255,255,255,.88); box-shadow: 0 14px 30px rgba(38,27,62,.08); }
  .sweed-exact-reference-page .mkt-proj .challenge { margin-bottom: .9rem; }
  .sweed-exact-reference-page .portfolio-compact-copy { max-width: 46rem; }
  .sweed-exact-reference-page .mkt-proj ul { display: grid; gap: .35rem; }

  .sweed-exact-reference-page .film .sec-lead { max-width: 60rem; text-align: center !important; text-align-last: center; }
  .sweed-exact-reference-page .film .frames { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .7rem; margin-top: .85rem; }
  .sweed-exact-reference-page .film .frame { min-height: 5.8rem; padding: .8rem .55rem; }
  .sweed-exact-reference-page .film .frame span { display: grid; width: 1.9rem; height: 1.9rem; place-items: center; margin: 0 auto .4rem; border: 1px solid rgba(237,32,98,.42); border-radius: 50%; background: rgba(237,32,98,.08); color: var(--portfolio-pink); font-family: Arial, sans-serif !important; font-size: .75rem; font-weight: 700; }
  .sweed-exact-reference-page .film .film-info { max-width: 60rem; margin: 1.35rem auto 0; }
  .sweed-exact-reference-page .film .film-info .challenge { padding: .9rem 1.05rem; }

  .sweed-exact-reference-page .wall { background: linear-gradient(135deg, #ffffff, #f5f1fa); }
  .sweed-exact-reference-page .wall-grid { align-items: stretch; }
  .sweed-exact-reference-page .wall-grid .w-item:not(.big) { transition: opacity .35s ease, transform .35s ease, background-image .35s ease; }
  .sweed-exact-reference-page .wall-grid .w-item:not(.big):hover { transform: translateY(-5px); }
  .sweed-exact-reference-page .portfolio-wall-controls { display: flex; justify-content: center; gap: .65rem; margin-top: 1.15rem; }
  .sweed-exact-reference-page .portfolio-wall-controls button { width: 2.65rem; height: 2.65rem; border: 1px solid rgba(38,27,62,.22); border-radius: .8rem; background: #fff; color: var(--portfolio-ink); font-size: 1.2rem; cursor: pointer; transition: transform .22s ease, border-color .22s ease, background .22s ease; }
  .sweed-exact-reference-page .portfolio-wall-controls button:hover { border-color: var(--portfolio-pink); background: rgba(237,32,98,.08); transform: translateY(-2px); }
  .sweed-exact-reference-page .portfolio-service-link { display: grid; width: fit-content; margin: 1rem auto 0; }

  .sweed-exact-reference-page .webw { overflow: hidden; }
  .sweed-exact-reference-page .webw .browser { position: relative; overflow: hidden; background: linear-gradient(135deg, rgba(38,27,62,.06), rgba(237,32,98,.08)); }
  .sweed-exact-reference-page .webw .browser::before { content: ""; position: absolute; inset: auto -8% -18% auto; width: 14rem; height: 14rem; border-radius: 50%; background: url("/images/hero/businessman-laptop-standing.jpg") center / cover; opacity: .16; filter: grayscale(1); pointer-events: none; }
  .sweed-exact-reference-page .webw .ux-notes { display: grid; align-content: center; gap: .85rem; }
  .sweed-exact-reference-page .webw .note { min-height: 0; padding: 1rem 1.15rem; border-radius: .9rem; background: rgba(255,255,255,.86); box-shadow: 0 10px 22px rgba(38,27,62,.07); }

  .sweed-exact-reference-page #sectors .sector-panel.show { display: grid; grid-template-columns: minmax(12rem, .7fr) minmax(0, 1.3fr); align-items: stretch; gap: 1.35rem; overflow: hidden; padding: 1.2rem; }
  .sweed-exact-reference-page #sectors .sector-visual { min-height: 12rem; border-radius: .95rem; background-position: center; background-size: cover; }
  .sweed-exact-reference-page #sectors .sector-content { display: grid; align-content: center; gap: .65rem; min-width: 0; }
  .sweed-exact-reference-page #sectors .sector-content > div[style] { margin-top: .4rem !important; }

  .sweed-exact-reference-page > footer { display: none; }
  .portfolio-contact-actions { padding: clamp(3.4rem, 6vw, 5rem) 0; background: radial-gradient(circle at 18% 12%, rgba(237,32,98,.18), transparent 18rem), #261b3e; color: #fff; text-align: center; }
  .portfolio-contact-actions .container { display: grid; justify-items: center; gap: 1rem; }
  .portfolio-contact-actions h2 { color: #fff; font-size: clamp(1.75rem, 3vw, 2.65rem); }
  .portfolio-contact-actions p { max-width: 42rem; margin: 0; color: rgba(255,255,255,.8); }
  .portfolio-contact-actions > .container > div { display: flex; flex-wrap: wrap; justify-content: center; gap: .85rem; margin-top: .55rem; }
  .portfolio-contact-actions .btn.btn-ghost { border-color: rgba(255,255,255,.75); background: transparent; color: #fff; }

  @media (prefers-reduced-motion: reduce) {
    .sweed-exact-reference-page .portfolio-proof-card { animation: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .sweed-exact-reference-page *, .sweed-exact-reference-page *::before, .sweed-exact-reference-page *::after { transition-duration: .01ms !important; }
  }

  @media (max-width: 48rem) {
    .sweed-exact-reference-page > section { padding-block: 3.35rem; }
    .sweed-exact-reference-page .w-hero { min-height: 43rem; }
    .sweed-exact-reference-page .w-hero h1, .sweed-exact-reference-page .sec-title, .sweed-exact-reference-page .w-cta h2 { font-size: clamp(1.65rem, 8vw, 2.35rem); }
    .sweed-exact-reference-page .trust { width: min(31rem, calc(100% - 1.5rem)); padding: .7rem .45rem; }
    .sweed-exact-reference-page .trust .container { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .38rem 0; }
    .sweed-exact-reference-page .trust .t-item { padding-inline: .35rem; }
    .sweed-exact-reference-page .trust .t-item:nth-child(odd) { border-inline-start: 0; }
    .sweed-exact-reference-page .trust .t-item:last-child { grid-column: 1 / -1; }
    .sweed-exact-reference-page .bp-card { padding-top: 8.7rem; }
    .sweed-exact-reference-page .brand-projects { grid-template-columns: 1fr; }
    .sweed-exact-reference-page .brand-projects .bp-card { min-height: 0; }
    .sweed-exact-reference-page .mkt-grid { grid-template-columns: 1fr; }
    .sweed-exact-reference-page .mkt .phone { width: min(100%, 16rem); min-height: 27rem; }
    .sweed-exact-reference-page .mkt-proj { min-height: 0; }
    .sweed-exact-reference-page .film .frames { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .sweed-exact-reference-page #sectors .sector-panel.show { grid-template-columns: 1fr; }
    .sweed-exact-reference-page #sectors .sector-visual { min-height: 10rem; }
  }
`;

const offersExactPresentationOverride = `
  .sweed-exact-reference-page {
    --offers-ink: #261b3e;
    --offers-pink: #ed2062;
    --offers-soft: #faf8fc;
    background: var(--offers-soft);
  }

  .sweed-exact-reference-page > section {
    isolation: isolate;
  }

  .sweed-exact-reference-page > section:not(.o-hero) {
    padding-block: clamp(4rem, 5vw, 5rem);
  }

  .sweed-exact-reference-page .sec-title {
    position: relative;
    margin-bottom: 1.5rem;
    text-wrap: balance;
    animation: offers-title-reveal .46s cubic-bezier(.22,1,.36,1) both;
  }

  .sweed-exact-reference-page .sec-title::after {
    content: "";
    display: block;
    width: 3.4rem;
    height: .22rem;
    margin: .9rem auto 0;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--offers-ink) 0 48%, var(--offers-pink) 48% 100%);
    box-shadow: 0 5px 12px rgba(237, 32, 98, .14);
  }

  .sweed-exact-reference-page .sec-lead {
    max-width: 60ch;
    margin-inline: auto;
    text-align: center !important;
    text-align-last: center;
  }

  .sweed-exact-reference-page > section:not(.o-hero) > .container > .eyebrow {
    display: inline-flex;
    width: fit-content;
    min-height: 2rem;
    align-items: center;
    margin-bottom: .75rem;
    padding: .3rem .7rem;
    border-radius: 999px;
    background: rgba(237,32,98,.09);
    color: var(--offers-pink);
    font-weight: 800;
    animation: offers-title-reveal .36s cubic-bezier(.22,1,.36,1) both;
  }

  .sweed-exact-reference-page :is(.mcard .fit, .mcard li, .pk .fit, .pk li, .offer-card p, .faq-a, .o-cta p) {
    text-align: justify;
    text-justify: inter-word;
    line-height: 1.82;
  }

  .sweed-exact-reference-page .o-hero {
    min-height: min(78vh, 49rem);
    background:
      linear-gradient(100deg, rgba(24, 11, 40, .96), rgba(38, 27, 62, .66)),
      url("/images/hero/two-men-consultation.jpg") center / cover no-repeat;
  }

  .sweed-exact-reference-page .o-hero .grid {
    align-items: center;
    grid-template-columns: minmax(0, 1.08fr) minmax(17rem, .72fr);
  }

  .sweed-exact-reference-page .o-hero h1 {
    max-width: 44rem;
    color: #fff !important;
    text-shadow: 0 .45rem 1.7rem rgba(0, 0, 0, .32);
    text-wrap: balance;
  }

  .sweed-exact-reference-page .o-hero p {
    max-width: 39rem;
    color: rgba(255, 255, 255, .92) !important;
    text-shadow: 0 .18rem .85rem rgba(0, 0, 0, .28);
    text-align: justify;
    text-justify: inter-word;
  }

  /* نفس شريط الرئيسية: الشعار يسار، القائمة في المنتصف، والإجراء الرئيسي يمين */
  .sweed-exact-reference-page > .nav {
    position: sticky !important;
    top: 0;
    z-index: 80;
    min-height: 7.4rem !important;
    border-bottom: 1px solid #ece7f2 !important;
    background: rgba(255, 255, 255, .98) !important;
    box-shadow: 0 .25rem 1rem rgba(38, 27, 62, .035);
    backdrop-filter: blur(16px);
  }

  .sweed-exact-reference-page > .nav .container {
    display: grid !important;
    width: min(calc(100% - 8rem), 76.25rem) !important;
    min-height: 7.4rem;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 1.28rem;
    direction: ltr;
  }

  .sweed-exact-reference-page > .nav .logo {
    display: inline-flex !important;
    width: 7.7rem;
    min-height: 3.05rem;
    align-items: center;
    justify-content: flex-start;
    color: transparent !important;
  }

  .sweed-exact-reference-page > .nav .logo img {
    display: block;
    width: 100%;
    height: auto;
  }

  .sweed-exact-reference-page > .nav ul {
    display: flex !important;
    align-items: center;
    justify-content: center;
    gap: clamp(1rem, 1.7vw, 1.45rem) !important;
    margin: 0 !important;
    padding: 0 !important;
    direction: rtl;
  }

  .sweed-exact-reference-page > .nav ul a {
    position: relative;
    display: inline-flex;
    min-height: 3rem;
    align-items: center;
    color: #261b3e !important;
    font-size: 1rem !important;
    font-weight: 700 !important;
    text-decoration: none;
  }

  .sweed-exact-reference-page > .nav ul a::after {
    position: absolute;
    right: 50%;
    bottom: .22rem;
    width: 0;
    height: .17rem;
    border-radius: 999px;
    background: #ed2062;
    content: "";
    transform: translateX(50%);
    transition: width .24s ease;
  }

  .sweed-exact-reference-page > .nav ul a:hover,
  .sweed-exact-reference-page > .nav ul a.active { color: #ed2062 !important; }
  .sweed-exact-reference-page > .nav ul a:hover::after,
  .sweed-exact-reference-page > .nav ul a.active::after { width: 1.35rem; }

  .sweed-exact-reference-page > .nav .btn {
    display: inline-flex !important;
    min-width: 8.65rem;
    min-height: 3.1rem;
    align-items: center;
    justify-content: center;
    padding: .55rem 1.18rem !important;
    border: 0 !important;
    border-radius: 999px !important;
    background: #e02269 !important;
    box-shadow: 0 .65rem 1.35rem rgba(224, 34, 105, .2) !important;
    color: #fff !important;
    font-size: 1rem !important;
    font-weight: 800 !important;
    transform: translateY(0);
    transition: transform .24s ease, box-shadow .24s ease, background .24s ease;
  }

  .sweed-exact-reference-page > .nav .btn:hover {
    background: #261b3e !important;
    box-shadow: 0 .85rem 1.55rem rgba(38, 27, 62, .18) !important;
    transform: translateY(-2px);
  }

  /* صفحة العروض: هوية موحّدة، عناصر مرئية خفيفة، وقراءة عربية أوضح */
  .sweed-exact-reference-page,
  .sweed-exact-reference-page :is(button, input, select, textarea) {
    font-family: "SWEED Helvetica Arabic", "SF Arabic", sans-serif !important;
  }

  .sweed-exact-reference-page .o-hero .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: .45rem;
    min-height: 2.2rem;
    padding: .35rem .8rem;
    border: 1px solid rgba(255,255,255,.36);
    border-radius: 999px;
    background: rgba(237,32,98,.18);
    color: #fff !important;
    font-size: clamp(.9rem, 1.2vw, 1.08rem);
    font-weight: 800;
    letter-spacing: 0;
  }

  .sweed-exact-reference-page .o-hero .eyebrow::before {
    width: .48rem;
    height: .48rem;
    border-radius: 50%;
    background: #ed2062;
    box-shadow: 0 0 0 .25rem rgba(237,32,98,.16);
    content: "";
  }

  .sweed-exact-reference-page .o-hero .crumb {
    display: inline-flex;
    margin-bottom: 1.35rem;
    color: #ffffff !important;
    font-size: clamp(1rem, 1.25vw, 1.12rem) !important;
    font-weight: 800;
    text-shadow: 0 2px 14px rgba(0,0,0,.4);
  }

  .sweed-exact-reference-page .offers-hero-visual {
    position: relative;
    width: min(100%, 25rem);
    min-height: 20rem;
    margin-inline: auto;
    border: 1px solid rgba(255,255,255,.17);
    border-radius: 1.45rem;
    background: linear-gradient(145deg, rgba(255,255,255,.12), rgba(237,32,98,.1));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.14), 0 1.5rem 3rem rgba(0,0,0,.18);
    overflow: hidden;
  }

  .sweed-exact-reference-page .offers-hero-visual::before,
  .sweed-exact-reference-page .offers-hero-visual::after {
    position: absolute;
    width: 15rem;
    height: 15rem;
    border: 1px solid rgba(255,255,255,.18);
    border-radius: 50%;
    content: "";
  }

  .sweed-exact-reference-page .offers-hero-visual::before { inset: 2.15rem auto auto 50%; transform: translateX(-50%); }
  .sweed-exact-reference-page .offers-hero-visual::after { inset: 4.35rem auto auto 50%; width: 10.6rem; height: 10.6rem; transform: translateX(-50%); border-color: rgba(237,32,98,.62); animation: offers-orbit 9s linear infinite; }
  .sweed-exact-reference-page .offers-hero-core { position: absolute; inset: 50% auto auto 50%; display: grid; width: 4.3rem; height: 4.3rem; place-items: center; border-radius: 1.2rem; background: #ed2062; color: #fff; font-weight: 900; transform: translate(-50%, -50%) rotate(45deg); box-shadow: 0 0 0 .65rem rgba(237,32,98,.14), 0 .8rem 1.5rem rgba(237,32,98,.25); }
  .sweed-exact-reference-page .offers-hero-core span { transform: rotate(-45deg); }
  .sweed-exact-reference-page .offers-hero-node { position: absolute; display: inline-flex; align-items: center; gap: .45rem; color: #fff; font-size: .92rem; font-weight: 800; }
  .sweed-exact-reference-page .offers-hero-node::before { width: .7rem; height: .7rem; border: .2rem solid #fff; border-radius: 50%; background: #ed2062; box-shadow: 0 0 0 .32rem rgba(237,32,98,.2); content: ""; }
  .sweed-exact-reference-page .offers-hero-node.one { inset: 3.3rem 2.25rem auto auto; }
  .sweed-exact-reference-page .offers-hero-node.two { inset: auto 2rem 4rem auto; }
  .sweed-exact-reference-page .offers-hero-node.three { inset: auto auto 4rem 2rem; }
  .sweed-exact-reference-page .hero-map.offers-hero-map-enhanced {
    padding: 1rem;
    border: 1px solid rgba(255,255,255,.16);
    border-radius: 1.45rem;
    background: linear-gradient(145deg, rgba(255,255,255,.1), rgba(237,32,98,.08));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.12), 0 1.5rem 3rem rgba(0,0,0,.16);
  }
  .sweed-exact-reference-page .hero-map.offers-hero-map-enhanced svg { filter: drop-shadow(0 .7rem 1rem rgba(0,0,0,.18)); }
  .sweed-exact-reference-page .offers-hero-signal {
    position: absolute;
    z-index: 3;
    display: inline-flex;
    min-height: 2.05rem;
    align-items: center;
    gap: .42rem;
    padding: .35rem .68rem;
    border: 1px solid rgba(255,255,255,.28);
    border-radius: 999px;
    background: rgba(38,27,62,.58);
    box-shadow: 0 .55rem 1.2rem rgba(0,0,0,.16);
    color: #fff;
    font-size: .78rem;
    font-weight: 800;
    backdrop-filter: blur(.55rem);
    animation: offers-signal-float 3.8s ease-in-out infinite;
  }
  .sweed-exact-reference-page .offers-hero-signal::before {
    width: .48rem;
    height: .48rem;
    border-radius: 50%;
    background: #ed2062;
    box-shadow: 0 0 0 .22rem rgba(237,32,98,.16);
    content: "";
    animation: offers-signal-pulse 2s ease-in-out infinite;
  }
  .sweed-exact-reference-page .offers-hero-signal.signal-one { top: 12%; right: 8%; }
  .sweed-exact-reference-page .offers-hero-signal.signal-two { bottom: 17%; right: 9%; animation-delay: -.9s; }
  .sweed-exact-reference-page .offers-hero-signal.signal-three { bottom: 11%; left: 8%; animation-delay: -1.7s; }

  .sweed-exact-reference-page .quiz {
    background: linear-gradient(110deg, #fff 0 54%, #f5f1fa 54% 100%);
  }

  .sweed-exact-reference-page .quiz > .container {
    display: grid;
    grid-template-columns: minmax(16rem, .8fr) minmax(23rem, 1.2fr);
    align-items: center;
    gap: clamp(2rem, 5vw, 6rem);
  }

  .sweed-exact-reference-page .offers-quiz-copy {
    display: grid;
    align-content: center;
    justify-items: start;
    text-align: right;
  }

  .sweed-exact-reference-page .offers-quiz-copy .sec-title,
  .sweed-exact-reference-page .offers-quiz-copy .sec-lead {
    margin-inline: 0;
    text-align: right !important;
    text-align-last: right;
  }

  .sweed-exact-reference-page .offers-quiz-copy .sec-title::after {
    margin-inline: 0 auto;
  }

  .sweed-exact-reference-page .offers-quiz-copy .sec-lead { max-width: 36rem; color: #766c8e; font-size: clamp(1rem, 1.3vw, 1.18rem); }
  .sweed-exact-reference-page .quiz-box { width: 100%; max-width: none; margin: 0; padding: clamp(1.5rem, 3vw, 2.35rem); }
  .sweed-exact-reference-page .q-opts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .78rem; }
  .sweed-exact-reference-page .q-opt { min-height: 4rem; padding: .75rem .55rem; border-radius: .9rem; font-size: .92rem; text-align: center; }
  .sweed-exact-reference-page .q-skip { position: relative; width: fit-content; margin: 1.45rem auto 0; padding: .35rem .65rem; color: #ed2062; font-size: .98rem; font-weight: 800; text-decoration: none; animation: offers-skip-pulse 2.5s ease-in-out infinite; }
  .sweed-exact-reference-page .q-skip::after { position: absolute; right: .65rem; bottom: .1rem; left: .65rem; height: .14rem; border-radius: 999px; background: linear-gradient(90deg, #261b3e, #ed2062); content: ""; }

  .sweed-exact-reference-page .mains .sec-lead { max-width: 52rem; }
  .sweed-exact-reference-page .mains-grid { align-items: stretch; padding-top: 1.6rem; overflow: visible; }
  .sweed-exact-reference-page .mcard { position: relative; display: flex; padding: 2rem 1.7rem 1.65rem; flex-direction: column; }
  .sweed-exact-reference-page .mcard .badge { z-index: 2; top: -1.08rem; left: 50%; display: inline-flex; max-width: calc(100% - 2rem); min-height: 2.15rem; align-items: center; justify-content: center; padding-inline: .85rem; border: 1px solid rgba(255,255,255,.45); background: #ed2062; color: #fff; font-size: .76rem; text-align: center; transform: translateX(-50%); box-shadow: 0 .7rem 1.25rem rgba(237,32,98,.18); }
  .sweed-exact-reference-page .mcard .fit { display: block; min-height: 3.5em; }
  .sweed-exact-reference-page .mcard.dark .fit { color: rgba(255,255,255,.82); }
  .sweed-exact-reference-page .mcard h3,
  .sweed-exact-reference-page .mcard .promise,
  .sweed-exact-reference-page .mcard .price,
  .sweed-exact-reference-page .pk h4,
  .sweed-exact-reference-page .pk .price { position: relative; z-index: 1; }
  .sweed-exact-reference-page .mcard h3,
  .sweed-exact-reference-page .pk h4 { color: #261b3e; font-size: clamp(1.35rem, 1.7vw, 1.66rem); font-weight: 900; line-height: 1.25; }
  .sweed-exact-reference-page .mcard.dark h3 { color: #fff; }
  .sweed-exact-reference-page .svc-panel.dark-band .pk h4,
  .sweed-exact-reference-page .svc-panel.dark-band .pk .price { color: #fff; }
  .sweed-exact-reference-page .mcard .promise { color: #ed2062; font-weight: 800; }
  .sweed-exact-reference-page .mcard .price,
  .sweed-exact-reference-page .pk .price { margin-top: 1rem; color: #261b3e; font-size: clamp(1.28rem, 1.65vw, 1.6rem); font-weight: 900; }
  .sweed-exact-reference-page .mcard.dark .price { color: #fff; }
  .sweed-exact-reference-page .mcard ul li:nth-child(n+5),
  .sweed-exact-reference-page .mcard .more { display: none; }
  .sweed-exact-reference-page .mcard .drawer-btn { margin-top: .4rem; }
  .sweed-exact-reference-page .mcard .price small { min-height: 2.5em; }

  .sweed-exact-reference-page .svc-panel > .container > :is(.eyebrow, .sec-title) { display: block; width: 100%; text-align: right; }
  .sweed-exact-reference-page .svc-panel > .container > .sec-title::after { margin-inline: 0 auto; }
  .sweed-exact-reference-page .svc-panel > .container > .eyebrow { margin-bottom: .7rem; }
  .sweed-exact-reference-page #panel-brand { background: linear-gradient(180deg, #fff, #f8f5fc) !important; }
  .sweed-exact-reference-page #panel-brand .pk { filter: none; border-color: #eee9f5; }
  .sweed-exact-reference-page #panel-brand .pk::before { background: linear-gradient(90deg, #261b3e, #ed2062); opacity: 1; }
  .sweed-exact-reference-page #panel-brand .pk::after { display: none; }
  .sweed-exact-reference-page #panel-media .frame-top { display: grid; min-height: 6rem; aspect-ratio: auto; margin-bottom: 1rem; background: linear-gradient(135deg, rgba(237,32,98,.84), rgba(38,27,62,.98)); }
  .sweed-exact-reference-page #panel-media .frame-top::after { width: 3.1rem; height: 3.1rem; background: #ed2062; box-shadow: 0 0 0 .45rem rgba(255,255,255,.1); }
  .sweed-exact-reference-page .svc-panel .pk ul li:nth-child(n+4) { display: none; }
  .sweed-exact-reference-page .svc-panel .pk .price small { min-height: 2.5em; }
  .sweed-exact-reference-page .svc-panel .compare-btn-row { text-align: left; }

  .sweed-exact-reference-page .pkg-image {
    display: block;
    width: 100%;
    height: 8.1rem;
    margin: 0 0 1.2rem;
    border-radius: .82rem;
    object-fit: cover;
    filter: saturate(.84) contrast(.96);
  }

  .sweed-exact-reference-page .pk {
    position: relative;
    display: flex;
    min-height: 100%;
    flex-direction: column;
  }

  .sweed-exact-reference-page .pk .offers-favorite {
    position: absolute;
    z-index: 4;
    top: .85rem;
    right: .85rem;
    display: inline-flex;
    min-height: 1.9rem;
    align-items: center;
    padding: .3rem .68rem;
    border-radius: 999px;
    background: #ed2062;
    box-shadow: 0 .5rem 1rem rgba(237,32,98,.2);
    color: #fff;
    font-size: .74rem;
    font-weight: 900;
  }

  .sweed-exact-reference-page .pk > .btn,
  .sweed-exact-reference-page .mcard > .btn {
    align-self: flex-end;
    margin-top: auto;
    width: fit-content !important;
    min-width: 11.2rem;
    justify-content: center;
  }

  .sweed-exact-reference-page .svc-panel .compare-btn-row,
  .sweed-exact-reference-page .mains .compare-btn-row {
    display: flex;
    margin-top: 1.55rem;
    justify-content: flex-start;
    direction: ltr;
    text-align: left;
  }

  .sweed-exact-reference-page .svc-panel .compare-btn-row .btn,
  .sweed-exact-reference-page .mains .compare-btn-row .btn {
    display: inline-flex;
    min-width: 11.8rem;
    justify-content: center;
    direction: rtl;
  }

  .sweed-exact-reference-page .offers-sec .offer-card .btn {
    width: fit-content !important;
    min-width: 10.8rem;
    margin-left: 0;
    margin-right: auto;
  }

  .sweed-exact-reference-page .counters { display: none !important; }

  .sweed-exact-reference-page .offers-sec .sec-lead { max-width: 54rem; }
  .sweed-exact-reference-page .offers-sec .offer { min-height: 100%; border-radius: 1rem; }

  @keyframes offers-orbit { to { transform: translateX(-50%) rotate(360deg); } }
  @keyframes offers-skip-pulse { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); text-shadow: 0 .4rem 1rem rgba(237,32,98,.22); } }
  @keyframes offers-signal-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-.45rem); } }
  @keyframes offers-signal-pulse { 0%, 100% { opacity: .72; transform: scale(.9); } 50% { opacity: 1; transform: scale(1.15); } }

  .sweed-exact-reference-page .mains {
    background:
      radial-gradient(circle at 84% 12%, rgba(237, 32, 98, .1), transparent 19rem),
      #f1edf8;
  }

  .sweed-exact-reference-page .mcard,
  .sweed-exact-reference-page .pk,
  .sweed-exact-reference-page .offer-card {
    border-radius: 1.05rem;
    overflow: hidden;
  }

  .sweed-exact-reference-page .mcard,
  .sweed-exact-reference-page .pk {
    transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease;
  }

  .sweed-exact-reference-page .mcard:hover,
  .sweed-exact-reference-page .pk:hover {
    box-shadow: 0 18px 34px rgba(38, 27, 62, .13);
  }

  .sweed-exact-reference-page .svc-panel {
    background: linear-gradient(180deg, #ffffff, #faf8fc);
  }

  .sweed-exact-reference-page .svc-panel.dark-band {
    background:
      radial-gradient(circle at 13% 20%, rgba(237, 32, 98, .18), transparent 20rem),
      #261b3e;
  }

  .sweed-exact-reference-page .pk-grid {
    align-items: stretch;
  }

  .sweed-exact-reference-page .pk {
    min-height: 100%;
  }

  .sweed-exact-reference-page :is(.mcard, .pk) > :is(h3, h4, .promise, .fit, .price, ul, .btn) {
    width: 100%;
  }

  .sweed-exact-reference-page :is(.mcard, .pk) > ul {
    flex: 1 1 auto;
  }

  .sweed-exact-reference-page .pk::before {
    content: "";
    display: block;
    width: 3rem;
    height: .24rem;
    margin-bottom: 1.1rem;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--offers-ink), var(--offers-pink));
  }

  .sweed-exact-reference-page .offer-card {
    transition: transform .3s ease, box-shadow .3s ease;
  }

  .sweed-exact-reference-page .offer-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 30px rgba(38, 27, 62, .11);
  }

  .sweed-exact-reference-page .faq-item {
    transition: border-color .25s ease, box-shadow .25s ease, transform .25s ease;
  }

  .sweed-exact-reference-page .faq-item:hover {
    transform: translateX(-4px);
    border-color: rgba(237, 32, 98, .38);
    box-shadow: 0 10px 22px rgba(38, 27, 62, .08);
  }

  .sweed-exact-reference-page .o-cta {
    background:
      linear-gradient(100deg, rgba(24, 11, 40, .96), rgba(38, 27, 62, .68)),
      url("/images/hero/custom-image.png") 14% 82% / min(34rem, 44%) auto no-repeat,
      #261b3e;
  }

  .sweed-exact-reference-page .o-cta .wrap {
    text-align: center;
  }

  .sweed-exact-reference-page .o-cta :is(h2, p) {
    color: #fff !important;
    text-shadow: 0 .28rem 1.1rem rgba(0,0,0,.3);
  }

  .sweed-exact-reference-page .o-cta .eyebrow {
    color: #ff8fba !important;
    font-weight: 900;
  }

  .sweed-exact-reference-page .o-cta p {
    max-width: 46rem;
    margin-inline: auto;
    text-align: center !important;
    text-align-last: center;
  }

  @media (prefers-reduced-motion: reduce) {
    .sweed-exact-reference-page *,
    .sweed-exact-reference-page *::before,
    .sweed-exact-reference-page *::after {
      animation-duration: .01ms !important;
      transition-duration: .01ms !important;
    }
  }

  @media (max-width: 48rem) {
    .sweed-exact-reference-page > .nav { min-height: 5.2rem !important; }
    .sweed-exact-reference-page > .nav .container { width: min(calc(100% - 2rem), 76.25rem) !important; min-height: 5.2rem; grid-template-columns: auto 1fr auto; gap: .75rem; }
    .sweed-exact-reference-page > .nav .logo { width: 5.3rem; min-height: 2.5rem; }
    .sweed-exact-reference-page > .nav ul { display: none !important; }
    .sweed-exact-reference-page > .nav .btn { min-width: 6.75rem; min-height: 2.6rem; padding-inline: .85rem !important; font-size: .84rem !important; }
    .sweed-exact-reference-page > section:not(.o-hero) { padding-block: 3.4rem; }
    .sweed-exact-reference-page .o-hero { min-height: 42rem; }
    .sweed-exact-reference-page .o-hero h1 { font-size: clamp(1.8rem, 8.5vw, 2.55rem); }
    .sweed-exact-reference-page .o-hero .grid,
    .sweed-exact-reference-page .quiz > .container { grid-template-columns: 1fr; }
    .sweed-exact-reference-page .offers-hero-visual { min-height: 15rem; max-width: 22rem; }
    .sweed-exact-reference-page .offers-hero-node { font-size: .8rem; }
    .sweed-exact-reference-page .q-opts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .sweed-exact-reference-page .offers-quiz-copy { justify-items: stretch; }
    .sweed-exact-reference-page .svc-panel > .container > :is(.eyebrow, .sec-title) { text-align: center; }
    .sweed-exact-reference-page .svc-panel > .container > .sec-title::after { margin-inline: auto; }
  }


  /* توحيد عناوين العروض وبطاقات الباقات مع الصفحة الرئيسية */
  .sweed-exact-reference-page :is(h1, h2, h3, h4, h5, h6, .sec-title, .eyebrow, .promise, .price strong, .price b) {
    font-family: var(--font-display, "SWEED Helvetica Arabic", "SF Arabic", Arial, sans-serif) !important;
    font-style: normal !important;
    font-weight: 700 !important;
    letter-spacing: 0 !important;
  }
  .sweed-exact-reference-page :is(p, li, small, .fit, .price) {
    font-family: var(--font-body, "SWEED Helvetica Arabic", "SF Arabic", Arial, sans-serif) !important;
    font-style: normal !important;
  }
  .sweed-exact-reference-page .o-hero h1 {
    font-size: var(--type-display-size, clamp(3rem, 5.4vw, 5rem)) !important;
    font-weight: 700 !important;
    line-height: var(--type-display-leading, 1.08) !important;
  }
  .sweed-exact-reference-page .sec-title {
    font-size: var(--type-section-title-size, clamp(2.125rem, 3.4vw, 3.25rem)) !important;
    font-weight: 700 !important;
    line-height: var(--type-title-leading, 1.16) !important;
  }
  .sweed-exact-reference-page .o-hero p,
  .sweed-exact-reference-page .sec-lead {
    font-size: var(--type-lead-size, clamp(1.125rem, 1.2vw, 1.35rem)) !important;
    line-height: var(--type-lead-leading, 1.65) !important;
  }
  .sweed-exact-reference-page :is(.mcard h3, .pk h4, .offer-card h3) {
    font-size: var(--type-card-title-size, clamp(1.35rem, 1.8vw, 2rem)) !important;
    line-height: var(--type-title-leading, 1.16) !important;
  }
  .sweed-exact-reference-page :is(.mcard .fit, .mcard li, .pk .fit, .pk li, .offer-card p, .faq-a, .o-cta p) {
    font-size: var(--type-body-size, 1rem) !important;
    line-height: var(--type-body-leading, 1.75) !important;
  }
  .sweed-exact-reference-page :is(.eyebrow, .badge, .st-btn, .mcard .promise, .price small) {
    font-size: var(--type-label-size, .875rem) !important;
  }
  .sweed-exact-reference-page #main-packages,
  .sweed-exact-reference-page #main-packages .mains-grid { overflow: visible !important; }
  .sweed-exact-reference-page #main-packages .mains-grid { padding-top: 2.65rem !important; }
  .sweed-exact-reference-page #main-packages .mcard {
    min-height: 100%;
    padding-top: 2.15rem !important;
    overflow: visible !important;
  }
  .sweed-exact-reference-page #main-packages .mcard .badge {
    position: absolute !important;
    z-index: 8 !important;
    top: -1.18rem !important;
    left: 50% !important;
    min-height: 2.25rem !important;
    overflow: visible !important;
    white-space: nowrap;
  }
  /* الباقات الرئيسية تستخدم صورًا حقيقية مختلفة؛ الخدمات الست تحتفظ بمربع فيديو واحد فقط. */
  .sweed-exact-reference-page #main-packages .mcard .pkg-image {
    display: block !important;
    width: 100%;
    height: clamp(10.5rem, 14vw, 12.75rem);
    margin: 0 0 1.2rem;
    border-radius: .9rem;
    object-fit: cover;
    object-position: center;
    box-shadow: 0 .55rem 1.35rem rgba(38,27,62,.12);
  }
  .sweed-exact-reference-page #main-packages .mcard.dark .pkg-image {
    filter: saturate(.8) contrast(.9) brightness(.78);
  }
  .sweed-exact-reference-page .svc-panel .pk .pkg-image {
    display: none !important;
  }
  .sweed-exact-reference-page :is(#main-packages .mcard, .svc-panel .pk) :is(.frame-top, .material, .chrome) {
    display: none !important;
  }
  .sweed-exact-reference-page #main-packages .mcard .pkg-video {
    display: none !important;
  }
  .sweed-exact-reference-page .svc-panel .pk .pkg-video {
    position: relative;
    display: grid !important;
    width: 100%;
    height: clamp(8.25rem, 12vw, 10.5rem);
    place-items: center;
    margin: 0 0 1rem;
    overflow: hidden;
    border: 1px solid rgba(38, 27, 62, .12);
    border-radius: .9rem;
    background:
      radial-gradient(circle at 50% 50%, rgba(237,32,98,.17) 0 16%, transparent 16.5%),
      linear-gradient(135deg, #f5f0fa, #e8e0f2);
    box-shadow: 0 .55rem 1.35rem rgba(38, 27, 62, .1);
    isolation: isolate;
  }
  .sweed-exact-reference-page .svc-panel .pk .pkg-video::before,
  .sweed-exact-reference-page .svc-panel .pk .pkg-video::after {
    position: absolute;
    z-index: -1;
    border: 1px solid rgba(38, 27, 62, .13);
    border-radius: 50%;
    content: "";
    transition: transform .55s cubic-bezier(.22,1,.36,1), opacity .35s ease;
  }
  .sweed-exact-reference-page .svc-panel .pk .pkg-video::before { width: 8.8rem; height: 8.8rem; }
  .sweed-exact-reference-page .svc-panel .pk .pkg-video::after { width: 12.6rem; height: 12.6rem; opacity: .64; }
  .sweed-exact-reference-page .svc-panel .pk:hover .pkg-video::before { transform: scale(1.16) rotate(18deg); }
  .sweed-exact-reference-page .svc-panel .pk:hover .pkg-video::after { transform: scale(.89) rotate(-14deg); opacity: 1; }
  .sweed-exact-reference-page .pkg-video-play {
    display: grid;
    width: 3.35rem;
    height: 3.35rem;
    place-items: center;
    border: 0;
    border-radius: 50%;
    background: #ed2062;
    box-shadow: 0 0 0 .58rem rgba(237,32,98,.14), 0 .72rem 1.2rem rgba(237,32,98,.22);
    color: #fff;
    font-family: Arial, sans-serif !important;
    font-size: .94rem;
    line-height: 1;
  }
  .sweed-exact-reference-page .svc-panel.dark-band .pkg-video {
    border-color: rgba(255,255,255,.2);
    background:
      radial-gradient(circle at 50% 50%, rgba(237,32,98,.31) 0 16%, transparent 16.5%),
      linear-gradient(135deg, #2f1d4a, #1f1234);
  }
  .sweed-exact-reference-page .svc-panel.dark-band .pkg-video::before,
  .sweed-exact-reference-page .svc-panel.dark-band .pkg-video::after { border-color: rgba(255,255,255,.2); }

  /* نفس روح الدائرة خلف الصورة، لكن بتكوين مختلف لكل واحدة من الخدمات الست. */
  .sweed-exact-reference-page #panel-consult .pkg-video { background: radial-gradient(circle at 50% 50%, rgba(237,32,98,.12) 0 18%, transparent 18.5%), repeating-radial-gradient(circle at 50% 50%, transparent 0 1.35rem, rgba(59,33,96,.08) 1.4rem 1.47rem), #faf8fc; }
  .sweed-exact-reference-page #panel-brand .pkg-video { background: radial-gradient(circle at 30% 32%, rgba(237,32,98,.35), transparent 26%), radial-gradient(circle at 74% 70%, rgba(59,33,96,.22), transparent 32%), #f7f3fb; }
  .sweed-exact-reference-page #panel-mkt .pkg-video { background: linear-gradient(rgba(59,33,96,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,33,96,.08) 1px, transparent 1px), radial-gradient(circle at center, rgba(237,32,98,.2) 0 16%, transparent 16.5%), #f8f5fc; background-size: 1.3rem 1.3rem, 1.3rem 1.3rem, auto; }
  .sweed-exact-reference-page #panel-media .pkg-video { background: radial-gradient(circle at center, transparent 0 1.7rem, rgba(237,32,98,.4) 1.76rem 1.88rem, transparent 1.94rem), radial-gradient(circle at center, transparent 0 3.5rem, rgba(255,255,255,.14) 3.56rem 3.68rem, transparent 3.74rem), linear-gradient(135deg, #2e1b47, #1e1231); }
  .sweed-exact-reference-page #panel-ads .pkg-video { background: repeating-linear-gradient(135deg, rgba(237,32,98,.14) 0 .7rem, transparent .7rem 1.4rem), radial-gradient(circle at center, rgba(59,33,96,.16) 0 23%, transparent 23.5%), #f8f3fa; }
  .sweed-exact-reference-page #panel-web .pkg-video { background: linear-gradient(90deg, rgba(59,33,96,.1) 1px, transparent 1px), linear-gradient(rgba(59,33,96,.1) 1px, transparent 1px), radial-gradient(circle at center, rgba(237,32,98,.21) 0 18%, transparent 18.5%), #f8f5fc; background-size: 1.8rem 1.8rem, 1.8rem 1.8rem, auto; }

  /* شريط الخدمات الست: السهم يظهر ويتحرك مع المرور، واللوحة تدخل بحركة ناعمة عند الاختيار. */
  .sweed-exact-reference-page .st-btn { position: relative; padding-inline-start: 2.5rem; }
  .sweed-exact-reference-page .st-btn::after {
    position: absolute;
    inset-inline-start: .9rem;
    top: 50%;
    color: currentColor;
    content: "←";
    font-family: Arial, sans-serif !important;
    font-size: 1rem;
    font-weight: 700;
    opacity: 0;
    transform: translate(0, -50%);
    transition: opacity .22s ease, transform .28s cubic-bezier(.22,1,.36,1);
  }
  .sweed-exact-reference-page .st-btn:hover::after,
  .sweed-exact-reference-page .st-btn:focus-visible::after,
  .sweed-exact-reference-page .st-btn.active::after { opacity: 1; transform: translate(-.28rem, -50%); }
  .sweed-exact-reference-page .st-btn:hover { border-color: #ed2062; color: #ed2062; transform: translateY(-2px); box-shadow: 0 .55rem 1rem rgba(237,32,98,.11); }
  .sweed-exact-reference-page .st-btn.active:hover { color: #fff; }
  .sweed-exact-reference-page .svc-panel.show { animation: offers-service-enter .46s cubic-bezier(.22,1,.36,1) both; }
  @keyframes offers-service-enter { from { opacity: 0; transform: translateY(1.25rem); } to { opacity: 1; transform: translateY(0); } }

  .sweed-exact-reference-page .svc-tabs .container {
    scroll-snap-type: x proximity;
    -webkit-overflow-scrolling: touch;
  }
  .sweed-exact-reference-page .svc-tabs .st-btn {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }
  .sweed-exact-reference-page #offers-hero h1 {
    max-width: 48rem;
    font-size: clamp(2.8rem, 4vw, 3.35rem) !important;
    line-height: 1.22 !important;
  }
  .sweed-exact-reference-page #offers-hero .btns a[href="#main-packages"],
  .sweed-exact-reference-page #main-packages .compare-btn-row .btn {
    display: inline-grid !important;
    grid-template-columns: var(--sweed-action-icon-size) minmax(0, 1fr) !important;
    width: 17.5rem !important;
    min-width: 17.5rem !important;
    max-width: 100% !important;
    justify-content: initial !important;
    overflow: hidden !important;
    direction: ltr !important;
  }
  .sweed-exact-reference-page #panel-web {
    padding-block: clamp(2.5rem, 3.2vw, 3rem) !important;
  }
  .sweed-exact-reference-page #panel-web .pk-grid {
    margin-top: 1.25rem !important;
  }
  .sweed-exact-reference-page #panel-web .compare-btn-row {
    margin-top: .85rem !important;
  }
  .sweed-exact-reference-page #panel-web .compare-btn-row .compare-svc {
    display: inline-grid !important;
    grid-template-columns: var(--sweed-action-icon-size) minmax(0, 1fr) !important;
    width: 14rem !important;
    min-width: 14rem !important;
    max-width: 100% !important;
    justify-content: initial !important;
    overflow: hidden !important;
    direction: ltr !important;
  }
  .sweed-exact-reference-page #panel-consult {
    padding-block: clamp(2.5rem, 3.2vw, 3rem) !important;
  }
  .sweed-exact-reference-page #panel-consult .pk-grid {
    margin-top: 1.25rem !important;
  }
  .sweed-exact-reference-page #panel-consult .compare-btn-row {
    margin-top: .85rem !important;
  }
  .sweed-exact-reference-page #panel-consult .compare-btn-row .compare-svc {
    display: inline-grid !important;
    grid-template-columns: var(--sweed-action-icon-size) minmax(0, 1fr) !important;
    width: 14rem !important;
    min-width: 14rem !important;
    max-width: 100% !important;
    justify-content: initial !important;
    overflow: hidden !important;
    direction: ltr !important;
  }
  @media (max-width: 700px) {
    .sweed-exact-reference-page .o-hero h1 { font-size: clamp(2.15rem, 11vw, 3.2rem) !important; }
    .sweed-exact-reference-page #main-packages .mains-grid { padding-top: 2.3rem !important; }
    .sweed-exact-reference-page .svc-panel .pk .pkg-video { height: 8.5rem !important; }
  }

  @keyframes offers-title-reveal {
    from { opacity: 0; transform: translateY(.7rem); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const offersExactRuntime = `
(() => {
  if (window.__sweedOffersRefreshReady) return;
  window.__sweedOffersRefreshReady = true;

  const removeGeneratedMarks = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const parent = node.parentElement;
      if (!parent || /^(SCRIPT|STYLE|TEXTAREA|OPTION)$/i.test(parent.tagName)) return;
      node.nodeValue = (node.nodeValue || "")
        .replace(/[\\[\\]{}]/g, "")
        .replace(/[()]/g, "")
        .replace(/\\s{2,}/g, " ");
    });
  };

  const prepareHeroVisual = () => {
    const map = document.querySelector("#offers-hero .hero-map");
    if (!map || map.dataset.sweedOfferVisualReady === "true") return;
    map.dataset.sweedOfferVisualReady = "true";
    map.classList.add("offers-hero-map-enhanced");
    ["بداية واضحة", "قيمة مضافة", "مسار نمو"].forEach((label, index) => {
      const signal = document.createElement("span");
      signal.className = "offers-hero-signal signal-" + ["one", "two", "three"][index];
      signal.textContent = label;
      map.appendChild(signal);
    });
  };

  const prepareMainHeader = () => {
    const nav = document.querySelector(".sweed-exact-reference-page > .nav");
    const logo = nav?.querySelector(".logo");
    if (!nav || !logo || nav.dataset.sweedHomeHeaderReady === "true") return;
    nav.dataset.sweedHomeHeaderReady = "true";
    logo.setAttribute("aria-label", "SWEED الرئيسية");
    logo.innerHTML = '<img src="/sweed-logo-official.svg" alt="SWEED" />';
  };

  const prepareNeedQuiz = () => {
    const section = document.getElementById("need-quiz");
    const container = section?.querySelector(".container");
    const box = section?.querySelector(".quiz-box");
    if (!section || !container || !box || section.dataset.sweedOfferQuizReady === "true") return;
    section.dataset.sweedOfferQuizReady = "true";

    const copy = document.createElement("div");
    copy.className = "offers-quiz-copy";
    const intro = [container.querySelector(":scope > .eyebrow"), container.querySelector(":scope > .sec-title"), container.querySelector(":scope > .sec-lead")];
    intro.forEach((node) => node && copy.appendChild(node));
    container.prepend(copy);

    const lead = copy.querySelector(".sec-lead");
    if (lead) lead.textContent = "مش لازم تعرف أسماء الخدمات — ابدأ باللي حاسس بيه، والترشيح يظهر في 3 أسئلة بس.";
    const skip = box.querySelector(".q-skip");
    if (skip) {
      skip.classList.add("offers-skip-link");
      skip.textContent = "تخطى الأسئلة وشوف الباقات مباشرة";
    }
  };

  const compactPackages = () => {
    document.querySelectorAll("#main-packages .mcard").forEach((card) => {
      card.querySelectorAll("ul li:nth-child(n+5), .more, .drawer-btn, .compare-hint").forEach((node) => node.remove());
    });
    const mainLead = document.querySelector("#main-packages .sec-lead");
    if (mainLead) mainLead.remove();

    document.querySelectorAll(".svc-panel .pk").forEach((card) => {
      card.querySelectorAll("ul li:nth-child(n+4)").forEach((node) => node.remove());
    });
  };

  const prepareServicePanels = () => {
    const brand = document.getElementById("panel-brand");
    if (brand) brand.classList.add("offers-brand-panel");
    const media = document.getElementById("panel-media");
    if (media) {
      media.querySelectorAll(".frame-top").forEach((frame) => {
        frame.setAttribute("aria-label", "عرض فيديو الخدمة");
      });
    }

    const addPackageVideo = (card) => {
      card.querySelectorAll(".pkg-image, .pkg-video, .frame-top, .material, .chrome").forEach((node) => node.remove());
      const video = document.createElement("div");
      video.className = "pkg-video";
      video.setAttribute("role", "img");
      video.setAttribute("aria-label", "فيديو باقة " + (card.querySelector("h3, h4")?.textContent?.trim() || "سويد"));
      const play = document.createElement("span");
      play.className = "pkg-video-play";
      play.setAttribute("aria-hidden", "true");
      play.textContent = "▶";
      video.appendChild(play);
      const heading = card.querySelector("h3, h4");
      if (heading) card.insertBefore(video, heading);
      else card.prepend(video);
    };

    const mainPackageImages = [
      { src: "/images/hero/sweed-building.png", alt: "مقر سويد - بداية واضحة" },
      { src: "/images/hero/businessman-laptop-standing.jpg", alt: "تنفيذ احترافي لمسار المشروع" },
      { src: "/images/hero/entrepreneur-laptop-office.jpg", alt: "عمل وتسويق مستمران ضمن شراكة الوصول" },
    ];

    const addPackageImage = (card, asset) => {
      card.querySelectorAll(".pkg-image, .pkg-video, .frame-top, .material, .chrome").forEach((node) => node.remove());
      const image = document.createElement("img");
      image.className = "pkg-image";
      image.src = asset.src;
      image.alt = asset.alt;
      image.loading = "lazy";
      const heading = card.querySelector("h3, h4");
      if (heading) card.insertBefore(image, heading);
      else card.prepend(image);
    };

    document.querySelectorAll("#main-packages .mcard").forEach((card, index) => {
      addPackageImage(card, mainPackageImages[index] || mainPackageImages[0]);
    });

    document.querySelectorAll(".svc-panel .pk-grid").forEach((grid) => {
      grid.querySelectorAll(":scope > .pk").forEach((card, cardIndex) => {
        if (cardIndex === 1 && !card.querySelector(".offers-favorite")) {
          const favorite = document.createElement("span");
          favorite.className = "offers-favorite";
          favorite.textContent = "الباقة المفضلة";
          card.prepend(favorite);
        }
        addPackageVideo(card);
      });
    });

    const liveLead = document.querySelector("#live-offers .sec-lead");
    if (liveLead) liveLead.remove();
  };

  const removeCounters = () => document.getElementById("numbers")?.remove();

  const start = () => {
    prepareMainHeader();
    prepareHeroVisual();
    prepareNeedQuiz();
    compactPackages();
    prepareServicePanels();
    removeCounters();
    removeGeneratedMarks();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
`;

const aboutLiveLayoutRuntime = `
(() => {
  if (window.__sweedAboutLiveLayoutRuntime) return;
  window.__sweedAboutLiveLayoutRuntime = true;

  const logoSvg = (name, accent, ink) => {
    const safe = String(name).replace(/[&<>"]/g, "");
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 88" role="img" aria-label="' + safe + '"><rect width="260" height="88" rx="20" fill="#ffffff"/><circle cx="42" cy="44" r="21" fill="' + accent + '"/><path d="M34 44h16M42 36v16" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/><text x="76" y="53" fill="' + ink + '" font-family="Arial, sans-serif" font-size="27" font-weight="700" letter-spacing="1.5">' + safe + '</text></svg>';
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  };

  const decorateLogo = (node, name, accent, ink) => {
    if (!node || node.dataset.sweedLogoReady === "true") return;
    node.dataset.sweedLogoReady = "true";
    const image = document.createElement("img");
    image.alt = "شعار تجريبي " + name;
    image.src = logoSvg(name, accent, ink);
    node.replaceChildren(image);
  };

  const prepareAlliances = () => {
    const grid = document.querySelector("#alliances .ally-grid");
    if (!grid || grid.dataset.sweedMarqueeReady === "true") return;

    const cards = Array.from(grid.children).filter((node) => node.classList?.contains("ally"));
    if (!cards.length) return;

    const logoNames = ["NEXA", "FRAME", "TEK", "MASAR", "NOVA", "NORTH"];
    const accents = ["#ed2062", "#4f347d", "#ed2062", "#694d96", "#ed2062", "#4f347d"];
    const allCards = cards.slice(0, 4);
    while (allCards.length < 6) {
      const clone = cards[allCards.length - 4].cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      allCards.push(clone);
    }

    allCards.forEach((card, index) => {
      const logo = card.querySelector(".lg");
      decorateLogo(logo, logoNames[index], accents[index], "#261b3e");
    });

    const track = document.createElement("div");
    track.className = "sweed-about-ally-track";
    allCards.forEach((card) => track.appendChild(card));
    allCards.forEach((card) => {
      const copy = card.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      track.appendChild(copy);
    });

    grid.replaceChildren(track);
    grid.classList.add("sweed-about-ally-marquee");
    grid.dataset.sweedMarqueeReady = "true";
  };

  const preparePartners = () => {
    const cloud = document.querySelector("#partners .logo-cloud");
    if (!cloud || cloud.dataset.sweedMarqueeReady === "true") return;

    const logos = Array.from(cloud.querySelectorAll(".plogo")).slice(0, 6);
    if (!logos.length) return;

    const names = ["VISTA", "ORBIT", "MADA", "LINEA", "CIRCA", "NOVA"];
    const accents = ["#ed2062", "#4f347d", "#ed2062", "#694d96", "#ed2062", "#4f347d"];
    logos.forEach((logo, index) => decorateLogo(logo, names[index], accents[index], "#261b3e"));

    const track = document.createElement("div");
    track.className = "sweed-about-logo-track";
    logos.forEach((logo) => track.appendChild(logo));
    logos.forEach((logo) => {
      const copy = logo.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      track.appendChild(copy);
    });

    cloud.replaceChildren(track);
    cloud.classList.add("sweed-about-logo-marquee");
    cloud.dataset.sweedMarqueeReady = "true";
  };

  const prepareTestimonials = () => {
    const slider = document.querySelector("#testimonials .testi-swiper");
    const wrapper = slider?.querySelector(".swiper-wrapper");
    if (!slider || !wrapper || slider.dataset.sweedMarqueeReady === "true") return;

    if (slider.swiper && typeof slider.swiper.destroy === "function") {
      slider.swiper.destroy(true, true);
    }

    const reviews = Array.from(wrapper.children).slice(0, 5);
    if (!reviews.length) return;

    const track = document.createElement("div");
    track.className = "sweed-about-testimonial-track";
    for (let repeat = 0; repeat < 2; repeat += 1) {
      reviews.forEach((review) => {
        const card = repeat === 0 ? review : review.cloneNode(true);
        if (repeat > 0) card.setAttribute("aria-hidden", "true");
        track.appendChild(card);
      });
    }
    reviews.forEach((review) => {
      const copy = review.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      track.appendChild(copy);
    });
    reviews.forEach((review) => {
      const copy = review.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      track.appendChild(copy);
    });

    wrapper.replaceWith(track);
    slider.querySelector(".swiper-pagination")?.remove();
    slider.classList.add("sweed-about-testimonial-marquee");
    slider.dataset.sweedMarqueeReady = "true";
  };

  const prepareFounderPortrait = () => {
    const portrait = "/images/hero/mohamed-sweed-portrait.jpeg";

    const applyPortrait = (node, alt) => {
      if (!node || node.dataset.sweedPortraitReady === "true") return;
      node.dataset.sweedPortraitReady = "true";
      node.replaceChildren();
      node.style.overflow = "hidden";
      const image = document.createElement("img");
      image.src = portrait;
      image.alt = alt;
      image.loading = "eager";
      image.decoding = "async";
      image.style.cssText = "display:block;width:100%;height:100%;object-fit:cover;object-position:center;";
      node.appendChild(image);
    };

    applyPortrait(document.querySelector("#founder .avatar"), "محمد سويد — المؤسس والمدير التنفيذي");
    applyPortrait(document.querySelector("#team .swiper-slide:first-child .member .photo"), "محمد سويد — المؤسس والمدير التنفيذي");
  };

  const moveAboutSectionsIntoOrder = () => {
    const why = document.querySelector("#why");
    if (!why?.parentElement) return;
    const parent = why.parentElement;
    ["#team", "#partners", "#alliances"].map((selector) => document.querySelector(selector)).forEach((section) => {
      if (section?.parentElement === parent) parent.insertBefore(section, why);
    });
  };

  const run = () => {
    prepareFounderPortrait();
    moveAboutSectionsIntoOrder();
    prepareAlliances();
    preparePartners();
    prepareTestimonials();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => window.setTimeout(run, 1400), { once: true });
  } else {
    window.setTimeout(run, 1400);
  }
})();
`;

const homepageBriefRuntime = `
(() => {
  if (window.__sweedHomepageBriefRuntime) return;
  window.__sweedHomepageBriefRuntime = true;

  const ensureMarqueeStyle = () => {
    if (document.getElementById("sweed-home-brief-style")) return;
    const style = document.createElement("style");
    style.id = "sweed-home-brief-style";
    style.textContent = \`
      @keyframes sweedPartnersMarquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      .partners-grid[data-brief-marquee="true"] {
        display: block !important;
        overflow: hidden !important;
        direction: ltr !important;
      }
      .partners-grid[data-brief-marquee="true"] .partners-brief-track {
        display: flex !important;
        align-items: stretch !important;
        gap: 1rem !important;
        width: max-content !important;
        animation: sweedPartnersMarquee 26s linear infinite !important;
      }
      .partners-grid[data-brief-marquee="true"] .partner-card {
        min-width: 180px !important;
        flex: 0 0 180px !important;
      }
    \`;
    document.head.appendChild(style);
  };

  const createQuickServiceOption = (value, label) => {
    const option = document.createElement("label");
    option.style.minWidth = "220px";
    option.style.display = "flex";
    option.style.alignItems = "center";
    option.style.gap = "0.75rem";
    option.style.padding = "1rem 1.1rem";
    option.style.borderRadius = "18px";
    option.style.background = "rgba(255,255,255,0.14)";
    option.style.border = "1px solid rgba(255,255,255,0.18)";
    option.style.color = "#ffffff";
    option.style.cursor = "pointer";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "quickServices";
    input.value = value;

    const text = document.createElement("span");
    text.textContent = label;
    option.append(input, text);
    return option;
  };

  const bindQuickJourney = (helpSection) => {
    const button = helpSection.querySelector(".help-form button");
    if (!button || button.dataset.quickJourneyBound === "true") return;

    button.dataset.quickJourneyBound = "true";
    button.type = "button";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const params = new URLSearchParams();
      const name = document.querySelector("#quickName")?.value?.trim();
      const phone = document.querySelector("#quickPhone")?.value?.trim();
      const services = Array.from(document.querySelectorAll('input[name="quickServices"]:checked'))
        .map((input) => input.value)
        .filter(Boolean);

      if (services.length) params.set("services", services.join(","));
      if (name) params.set("name", name);
      if (phone) params.set("phone", phone);

      window.location.href = params.toString() ? \`/contact?\${params.toString()}#contact-form\` : "/contact#contact-form";
    });
  };

  const repeatPopup = () => {
    const popup = document.getElementById("welcomePopup");
    if (!popup || popup.dataset.briefRepeatReady === "true") return;

    popup.dataset.briefRepeatReady = "true";
    window.setTimeout(() => popup.classList.add("active"), 30000);
    window.setInterval(() => {
      if (!popup.classList.contains("active")) {
        popup.classList.add("active");
      }
    }, 120000);
  };

  const setup = () => {
    const helpSection = document.querySelector(".help-section");
    const servicesSection = document.querySelector(".services-section");
    const partnersGrid = document.querySelector(".partners-grid");
    if (!helpSection || !servicesSection || !partnersGrid) return false;

    helpSection.id = "contact";

    const helpInputs = helpSection.querySelectorAll(".help-form input");
    if (helpInputs[0] && !helpInputs[0].id) helpInputs[0].id = "quickName";
    if (helpInputs[1] && !helpInputs[1].id) helpInputs[1].id = "quickPhone";

    const quickService = helpSection.querySelector(".help-form select");
    if (quickService && !helpSection.querySelector('[data-home-services="true"]')) {
      const wrapper = document.createElement("div");
      wrapper.dataset.homeServices = "true";
      wrapper.style.display = "grid";
      wrapper.style.gap = "0.85rem";

      const helper = document.createElement("p");
      helper.textContent = "اختر خدمة أو أكثر حسب احتياجك الحالي";
      helper.style.margin = "0";
      helper.style.color = "rgba(255,255,255,0.82)";
      helper.style.fontSize = "0.95rem";
      helper.style.fontWeight = "700";

      const rail = document.createElement("div");
      rail.style.display = "flex";
      rail.style.gap = "0.85rem";
      rail.style.overflowX = "auto";
      rail.style.paddingBottom = "0.3rem";
      rail.style.scrollbarWidth = "thin";

      rail.append(
        createQuickServiceOption("consulting", "استشارات إدارية وتسويقية"),
        createQuickServiceOption("branding", "تأسيس البراندات"),
        createQuickServiceOption("digital", "التسويق الرقمي"),
        createQuickServiceOption("development", "البرمجة والتطوير"),
        createQuickServiceOption("advertising", "الدعايا والإعلان"),
        createQuickServiceOption("content", "الإنتاج الإبداعي")
      );

      wrapper.append(helper, rail);
      quickService.replaceWith(wrapper);
    }

    bindQuickJourney(helpSection);

    const servicesTitle = servicesSection.querySelector(".section-title");
    if (servicesTitle) servicesTitle.textContent = "خدماتنا المتكاملة";

    const servicesSubtitle = servicesSection.querySelector(".section-subtitle");
    if (servicesSubtitle) {
      servicesSubtitle.textContent = "حلول شاملة لجميع احتياجاتك التسويقية والإدارية وتطوير الاعمال";
    }

    servicesSection.querySelectorAll(".service-link").forEach((link) => {
      link.href = "/services";
    });

    if (partnersGrid.dataset.briefMarquee !== "true") {
      ensureMarqueeStyle();
      partnersGrid.dataset.briefMarquee = "true";
      const cards = Array.from(partnersGrid.querySelectorAll(".partner-card"));
      if (cards.length) {
        const track = document.createElement("div");
        track.className = "partners-brief-track";
        cards.forEach((card) => track.appendChild(card));
        for (let repeat = 0; repeat < 2; repeat += 1) {
          cards.forEach((card) => {
            const clone = card.cloneNode(true);
            clone.setAttribute("aria-hidden", "true");
            track.appendChild(clone);
          });
        }
        partnersGrid.replaceChildren(track);
      }
    }

    repeatPopup();
    return true;
  };

  const start = () => {
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (setup() || tries > 40) {
        window.clearInterval(timer);
      }
    }, 400);
    setup();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
`;

export function LegacyPage({
  page,
  presentation = "legacy",
  showAdvisor = true,
}: {
  page: LegacyPageKey;
  presentation?: LegacyPresentation;
  showAdvisor?: boolean;
}) {
  const isReference = presentation === "reference";
  const isExact = presentation === "exact";
  const isBranded = presentation === "branded";
  const document = getLegacyPage(page, { presentation });
  const bodyHasMainLandmark = /<main\b/i.test(document.bodyHtml);
  const legacyBodyClassName = `sweed-legacy-page sweed-legacy-page-${page}`;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: document.headHtml }} />
      {isExact ? (
        <style>{`
          .sweed-exact-reference-page .about-hero h1,
          .sweed-exact-reference-page .w-hero h1,
          .sweed-exact-reference-page .promise .half,
          .sweed-exact-reference-page .pledge-box h3,
          .sweed-exact-reference-page .cta h2,
          .sweed-exact-reference-page .w-cta h2 {
            color: inherit;
          }
          /* أزرار القوالب المرجعية: نفس منطق زر سويد المعتمد (سهم + مساحة ملونة متحركة) */
          .sweed-exact-reference-page .btn {
            position: relative;
            display: inline-grid !important;
            grid-template-columns: 2.75rem minmax(0, 1fr);
            min-width: 13.75rem;
            min-height: 3.5rem;
            align-items: center;
            gap: .65rem;
            padding: .34rem 1.15rem .34rem .34rem;
            overflow: hidden;
            border: 1px solid #261b3e;
            border-radius: 1rem;
            background: #261b3e;
            color: #ffffff;
            box-shadow: 0 10px 24px rgba(38,27,62,.18);
            font-family: "SWEED Helvetica Arabic", "SF Arabic", sans-serif !important;
            font-size: 1rem;
            font-weight: 700;
            line-height: 1.2;
            text-align: center;
            text-decoration: none;
            transition: transform .24s ease, border-color .24s ease, box-shadow .24s ease, color .24s ease;
          }
          .sweed-exact-reference-page .btn::before {
            display: grid;
            grid-column: 1;
            place-items: center;
            width: 2.75rem;
            height: 2.75rem;
            border-radius: .72rem;
            background: #ed2062;
            color: #ffffff;
            content: "↗";
            font-family: Arial, sans-serif !important;
            font-size: 1.22rem;
            font-weight: 700;
            line-height: 1;
            transition: transform .24s ease, background .24s ease, color .24s ease;
          }
          .sweed-exact-reference-page .btn:hover,
          .sweed-exact-reference-page .btn:focus-visible {
            border-color: #ed2062;
            color: #ffffff;
            box-shadow: 0 15px 30px rgba(237,32,98,.22);
            transform: translateY(-2px);
          }
          .sweed-exact-reference-page .btn:hover::before,
          .sweed-exact-reference-page .btn:focus-visible::before { transform: translateY(-1px) rotate(5deg); }
          .sweed-exact-reference-page .btn.btn-primary { background: #261b3e; color: #ffffff; }
          .sweed-exact-reference-page .btn.btn-ghost { background: #ffffff; border-color: rgba(38,27,62,.22); color: #261b3e; }
          .sweed-exact-reference-page .btn.btn-ghost.light { background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.72); color: #ffffff; }
          .sweed-exact-reference-page .btn.btn-ghost.light:hover,
          .sweed-exact-reference-page .btn.btn-ghost.light:focus-visible { border-color: #ed2062; }
          .sweed-exact-reference-page .btn.btn-sm { min-width: 10.75rem; min-height: 2.8rem; padding: .28rem .8rem .28rem .28rem; font-size: .88rem; }
          .sweed-exact-reference-page .btn.btn-sm::before { width: 2.24rem; height: 2.24rem; font-size: 1rem; }
          .sweed-exact-reference-page .crumb { font-size: clamp(.95rem, 1.35vw, 1.05rem) !important; font-weight: 700; }
          /* شريط التنقل الموحد للقوالب المرجعية: نفس توزيع الرئيسية على كل صفحة */
          .sweed-exact-reference-page > .nav {
            position: sticky !important;
            top: 0;
            z-index: 90;
            border-bottom: 1px solid rgba(38,27,62,.09) !important;
            background: rgba(255,255,255,.96) !important;
            box-shadow: none !important;
            backdrop-filter: blur(12px);
          }
          .sweed-exact-reference-page > .nav > .container {
            width: min(calc(100% - 7rem), 1360px) !important;
            min-height: 7.4rem;
            padding: 0 !important;
          }
          .sweed-exact-reference-page > .nav .logo {
            color: #261b3e !important;
            font-family: "SWEED Helvetica Arabic", "SF Arabic", sans-serif !important;
            font-size: clamp(1.7rem, 2.2vw, 2.05rem) !important;
            letter-spacing: -.045em;
          }
          .sweed-exact-reference-page > .nav ul { gap: clamp(1.1rem, 2.1vw, 2.5rem) !important; }
          .sweed-exact-reference-page > .nav ul a { color: #261b3e !important; font-size: clamp(.96rem, 1.1vw, 1.08rem) !important; font-weight: 700; }
          .sweed-exact-reference-page > .nav ul a.active { color: #ed2062 !important; }
          .sweed-exact-reference-page > .nav .btn {
            display: inline-flex !important;
            min-width: 8.6rem !important;
            min-height: 3rem !important;
            align-items: center;
            justify-content: center;
            padding: .55rem 1.25rem !important;
            border: 0 !important;
            border-radius: 999px !important;
            background: #e02269 !important;
            box-shadow: 0 12px 24px rgba(224,34,105,.2) !important;
            color: #fff !important;
            font-size: .96rem !important;
          }
          .sweed-exact-reference-page > .nav .btn::before { display: none !important; content: none !important; }
          .sweed-exact-reference-page > .nav .btn:hover { background: #c91555 !important; transform: translateY(-2px); }
          @media (max-width: 48rem) {
            .sweed-exact-reference-page .btn { min-width: 12.6rem; min-height: 3.25rem; font-size: .93rem; }
            .sweed-exact-reference-page .btn::before { width: 2.5rem; height: 2.5rem; }
            .sweed-exact-reference-page > .nav > .container { width: min(calc(100% - 2rem), 1360px) !important; min-height: 4.7rem; }
            .sweed-exact-reference-page > .nav .logo { font-size: 1.45rem !important; }
            .sweed-exact-reference-page > .nav .btn { min-width: auto !important; min-height: 2.65rem !important; padding-inline: .95rem !important; font-size: .85rem !important; }
          }
          ${page === "about" ? aboutExactPresentationOverride : page === "portfolio" ? portfolioExactPresentationOverride : page === "offers" ? offersExactPresentationOverride : ""}
        `}</style>
      ) : null}
      {isReference && page === "about" ? (
        <style data-sweed-about-reference-actions="true">
          {aboutReferenceActionOverride + aboutReferencePresentationOverride}
        </style>
      ) : null}
      {isBranded && page === "portfolio" ? (
        <style data-sweed-portfolio-branded-layout="true">
          {portfolioExactPresentationOverride.replaceAll("sweed-exact-reference-page", "sweed-reference-page")}
        </style>
      ) : null}
      {isBranded && page === "offers" ? (
        <style data-sweed-offers-branded-layout="true">
          {offersExactPresentationOverride.replaceAll("sweed-exact-reference-page", "sweed-reference-page")}
        </style>
      ) : null}
      {isExact ? null : (
        <a className="sweed-skip-link" href="#main-content">
          تخطي إلى المحتوى
        </a>
      )}
      {isExact ? null : <LegacyHeader page={page} />}
      {isReference || isExact ? null : <LegacyBreadcrumb page={page} />}
      {isExact ? (
        <main
          className="sweed-exact-reference-page"
          id="main-content"
          tabIndex={-1}
          dangerouslySetInnerHTML={{ __html: document.bodyHtml }}
        />
      ) : isReference || isBranded ? (
        <main
          className="sweed-reference-page"
          id="main-content"
          tabIndex={-1}
          dangerouslySetInnerHTML={{ __html: document.bodyHtml }}
        />
      ) : bodyHasMainLandmark ? (
        <div className={legacyBodyClassName} dangerouslySetInnerHTML={{ __html: document.bodyHtml }} />
      ) : (
        <main className={legacyBodyClassName} id="main-content" tabIndex={-1} dangerouslySetInnerHTML={{ __html: document.bodyHtml }} />
      )}
      {isReference || isExact || isBranded ? null : <LegacyEnhancements page={page} />}
      {!isReference && !isExact && !isBranded && page === "services" ? <AutomationDemo /> : null}
      {isExact ? (page === "portfolio" ? <LegacyFooter /> : null) : <LegacyFooter />}
      {isReference || isExact || isBranded ? null : <OfferFunnelController page={page} />}
      {!isExact && !isBranded && showAdvisor ? <AiAdvisorWidget /> : null}
      {page === "home" ? <script dangerouslySetInnerHTML={{ __html: homepageBriefRuntime }} /> : null}
      {isReference && page === "about" ? (
        <Script id="sweed-about-live-layout" strategy="afterInteractive">
          {aboutLiveLayoutRuntime}
        </Script>
      ) : null}
      {isExact ? (
        <Script id={`sweed-exact-reference-navigation-${page}`} strategy="afterInteractive">
          {exactReferenceNavigationRuntime}
        </Script>
      ) : null}
      {isExact && page === "portfolio" ? (
        <Script id="sweed-portfolio-refresh" strategy="afterInteractive">
          {portfolioExactRuntime}
        </Script>
      ) : null}
      {isBranded && page === "portfolio" ? (
        <Script id="sweed-portfolio-branded-refresh" strategy="afterInteractive">
          {portfolioExactRuntime}
        </Script>
      ) : null}
      {isExact && page === "offers" ? (
        <Script id="sweed-offers-refresh" strategy="afterInteractive">
          {offersExactRuntime}
        </Script>
      ) : null}
      {isBranded && page === "offers" ? (
        <Script id="sweed-offers-branded-refresh" strategy="afterInteractive">
          {offersExactRuntime}
        </Script>
      ) : null}
      {!isReference && !isExact && !isBranded && page === "products" ? (
        <script id="sweed-product-action-runtime" dangerouslySetInnerHTML={{ __html: legacyProductActionRuntime }} />
      ) : null}
      {isReference || isExact || isBranded ? (
        <ReferenceScripts scripts={document.scripts} />
      ) : (
        document.scripts.map((script) =>
          page === "products" && !script.src ? (
            <script
              dangerouslySetInnerHTML={{ __html: script.content ?? "" }}
              id={script.id}
              key={script.id}
              type={script.type}
            />
          ) : script.src ? (
            <Script id={script.id} key={script.id} src={script.src} strategy="afterInteractive" type={script.type} />
          ) : (
            <Script id={script.id} key={script.id} strategy="afterInteractive" type={script.type}>
              {script.content}
            </Script>
          ),
        )
      )}
    </>
  );
}
