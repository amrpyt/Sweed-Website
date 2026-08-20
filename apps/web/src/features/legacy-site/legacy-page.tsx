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

  const run = () => {
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
