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
      url("/images/hero/businessman-laptop-standing.jpg") center / cover no-repeat;
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
          ${page === "about" ? aboutExactPresentationOverride : ""}
        `}</style>
      ) : null}
      {isReference && page === "about" ? (
        <style data-sweed-about-reference-actions="true">
          {aboutReferenceActionOverride + aboutReferencePresentationOverride}
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
      ) : isReference ? (
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
      {isReference || isExact ? null : <LegacyEnhancements page={page} />}
      {!isReference && !isExact && page === "services" ? <AutomationDemo /> : null}
      {isExact ? null : <LegacyFooter />}
      {isReference || isExact ? null : <OfferFunnelController page={page} />}
      {!isExact && showAdvisor ? <AiAdvisorWidget /> : null}
      {page === "home" ? <script dangerouslySetInnerHTML={{ __html: homepageBriefRuntime }} /> : null}
      {isExact ? (
        <Script id={`sweed-exact-reference-navigation-${page}`} strategy="afterInteractive">
          {exactReferenceNavigationRuntime}
        </Script>
      ) : null}
      {!isReference && !isExact && page === "products" ? (
        <script id="sweed-product-action-runtime" dangerouslySetInnerHTML={{ __html: legacyProductActionRuntime }} />
      ) : null}
      {isReference || isExact ? (
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
