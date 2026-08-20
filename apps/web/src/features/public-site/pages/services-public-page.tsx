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


const servicesPageRefinementCss = `
  .sweed-services-refine {
    --sweed-ink: #261b3e;
    --sweed-pink: #ed2062;
    --sweed-soft: #faf8fc;
    background: var(--sweed-soft);
  }

  .sweed-services-refine .sweed-services-hero-section {
    isolation: isolate;
    min-height: clamp(37rem, 68vh, 44rem);
    background:
      linear-gradient(90deg, rgba(38, 27, 62, .98) 0%, rgba(38, 27, 62, .9) 47%, rgba(38, 27, 62, .62) 100%);
  }

  .sweed-services-refine .sweed-services-hero-section > :not(.sweed-services-hero-photo) {
    position: relative;
    z-index: 2;
  }

  .sweed-services-hero-photo {
    position: absolute;
    inset: 0 0 0 auto;
    z-index: 0;
    width: min(48vw, 48rem);
    background:
      linear-gradient(90deg, #261b3e 0%, rgba(38, 27, 62, .26) 62%, rgba(38, 27, 62, .48) 100%),
      url("/images/hero/two-men-consultation.jpg") center / cover no-repeat;
    clip-path: polygon(16% 0, 100% 0, 100% 100%, 0 100%);
    opacity: .94;
    animation: sweedServicesPhotoFloat 12s ease-in-out infinite alternate;
    pointer-events: none;
  }

  .sweed-services-refine .sweed-services-hero-grid {
    grid-template-columns: minmax(0, 1.55fr) minmax(14rem, .45fr);
    gap: clamp(1rem, 2vw, 1.6rem);
  }

  .sweed-services-refine .sweed-services-hero-section h1 {
    max-width: none;
    font-size: clamp(2.3rem, 3.45vw, 3.55rem);
    line-height: 1.26;
    white-space: nowrap;
  }

  .sweed-services-refine .sweed-services-hero-section h1::after,
  .sweed-services-refine .sweed-services-head h2::after,
  .sweed-services-refine .sweed-services-integrated h2::after,
  .sweed-services-refine .sweed-services-cta h2::after {
    content: "";
    display: block;
    width: 3.65rem;
    height: .21rem;
    margin-top: .78rem;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--sweed-ink) 0 43%, var(--sweed-pink) 43% 100%);
    box-shadow: 0 5px 14px rgba(237, 32, 98, .18);
  }

  .sweed-services-refine .sweed-services-hero-section h1::after,
  .sweed-services-refine .sweed-services-cta h2::after {
    background: linear-gradient(90deg, rgba(255,255,255,.95) 0 43%, var(--sweed-pink) 43% 100%);
  }

  .sweed-services-refine .sweed-services-action {
    position: relative;
    overflow: hidden;
    min-height: 3rem;
    transition: transform .25s ease, box-shadow .25s ease, background-color .25s ease, color .25s ease;
  }

  .sweed-services-refine .sweed-services-action::after {
    content: "↗";
    display: inline-block;
    margin-inline-start: .55rem;
    font-size: 1.05em;
    transition: transform .25s ease;
  }

  .sweed-services-refine .sweed-services-action:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(38, 27, 62, .18);
  }

  .sweed-services-refine .sweed-services-action:hover::after {
    transform: translate(-2px, -2px);
  }

  .sweed-services-refine .sweed-services-map {
    border-top: 1px solid rgba(38, 27, 62, .08);
  }

  .sweed-services-refine .sweed-services-map-note {
    min-height: 2.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-block: .72rem;
  }

  .sweed-services-refine .sweed-services-service-section {
    position: relative;
    isolation: isolate;
    padding-block: clamp(4.2rem, 6vw, 5.8rem);
  }

  .sweed-services-refine .sweed-services-service-section::before {
    content: "";
    position: absolute;
    inset: 0 6% auto;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(38, 27, 62, .1), transparent);
  }

  .sweed-services-refine .sweed-services-grid {
    gap: clamp(2.25rem, 5vw, 4.35rem);
  }

  .sweed-services-refine .sweed-services-head {
    max-width: 41rem;
  }

  .sweed-services-refine .sweed-services-head > span,
  .sweed-services-refine .sweed-services-integrated > div > .sweed-services-eyebrow,
  .sweed-services-refine .sweed-services-cta .sweed-services-eyebrow {
    display: inline-flex;
    align-items: center;
    min-height: 2rem;
    padding: .34rem .76rem;
    border: 1px solid rgba(237, 32, 98, .24);
    border-radius: 999px;
    background: rgba(237, 32, 98, .06);
    color: var(--sweed-pink);
    font-weight: 800;
    line-height: 1;
  }

  .sweed-services-refine .sweed-services-head h2,
  .sweed-services-refine .sweed-services-integrated h2,
  .sweed-services-refine .sweed-services-cta h2 {
    max-width: 100%;
    margin-block: .7rem 1rem;
    letter-spacing: -.015em;
    text-wrap: balance;
  }

  .sweed-services-refine .sweed-services-head .sweed-services-hook {
    margin-bottom: .75rem;
    line-height: 1.65;
  }

  .sweed-services-refine .sweed-services-copy,
  .sweed-services-refine .sweed-services-kpi,
  .sweed-services-refine .sweed-services-integrated > div > p,
  .sweed-services-refine .sweed-services-paths small,
  .sweed-services-refine .sweed-services-cta-inner > p {
    text-align: justify;
    text-justify: inter-word;
    text-align-last: auto;
    line-height: 1.95;
  }

  .sweed-services-refine .sweed-services-copy {
    max-width: 39rem;
  }

  .sweed-services-refine .sweed-services-chips {
    gap: .55rem;
    margin-block: 1.35rem;
  }

  .sweed-services-refine .sweed-services-chips span {
    transition: transform .22s ease, background-color .22s ease, color .22s ease;
  }

  .sweed-services-refine .sweed-services-chips span:hover {
    transform: translateY(-2px);
    background: var(--sweed-pink);
    color: #fff;
  }

  .sweed-services-refine .sweed-services-kpi {
    min-height: 4.1rem;
    margin-block: 1.2rem;
    border-right-width: 4px;
    border-radius: 0 .35rem .35rem 0;
    background: linear-gradient(90deg, rgba(237, 32, 98, .04), transparent);
  }

  .sweed-services-refine .sweed-services-visual {
    position: relative;
    transition: transform .35s ease;
  }

  .sweed-services-refine .sweed-services-service-section:hover .sweed-services-visual {
    transform: translateY(-4px);
  }

  .sweed-services-refine .sweed-services-advertising,
  .sweed-services-refine .sweed-services-integrated,
  .sweed-services-refine .sweed-services-cta {
    position: relative;
    isolation: isolate;
    padding-block: clamp(4.25rem, 6vw, 5.7rem);
  }

  .sweed-services-refine #branding {
    background:
      radial-gradient(circle at 88% 20%, rgba(237, 32, 98, .09), transparent 18rem),
      linear-gradient(125deg, #ffffff 0%, #ffffff 66%, #faf6fb 100%);
  }

  .sweed-services-refine #digital-marketing {
    background:
      radial-gradient(circle at 9% 24%, rgba(105, 77, 150, .11), transparent 20rem),
      var(--sweed-soft);
  }

  .sweed-services-refine #development {
    background:
      radial-gradient(circle at 91% 76%, rgba(237, 32, 98, .08), transparent 18rem),
      linear-gradient(125deg, #ffffff 0%, #ffffff 72%, #f8f4fb 100%);
  }

  .sweed-services-refine .sweed-services-integrated {
    overflow: hidden;
    background:
      radial-gradient(circle at 10% 16%, rgba(237, 32, 98, .13), transparent 20rem),
      radial-gradient(circle at 90% 78%, rgba(105, 77, 150, .16), transparent 23rem),
      var(--purple-100);
  }

  .sweed-services-refine .sweed-services-integrated::before {
    content: "";
    position: absolute;
    inset: auto -4rem -7rem auto;
    width: 18rem;
    height: 18rem;
    border: 1px solid rgba(237, 32, 98, .22);
    border-radius: 50%;
    box-shadow: 0 0 0 2.75rem rgba(105, 77, 150, .045), 0 0 0 5.5rem rgba(237, 32, 98, .03);
    pointer-events: none;
  }

  .sweed-services-refine .sweed-services-integrated > .sweed-services-container {
    position: relative;
    z-index: 1;
  }

  .sweed-services-refine .sweed-services-advertising .sweed-services-head h2::after,
  .sweed-services-refine .sweed-services-cta h2::after {
    background: linear-gradient(90deg, rgba(255,255,255,.95) 0 43%, var(--sweed-pink) 43% 100%);
  }

  .sweed-services-refine .sweed-services-advertising .sweed-services-head {
    max-width: 45rem;
  }

  .sweed-services-refine .sweed-services-touchpoints {
    gap: 1rem;
  }

  .sweed-services-refine .sweed-services-touchpoints > div {
    min-height: 10.5rem;
    display: grid;
    align-content: center;
    gap: .25rem;
    transition: transform .28s ease, background-color .28s ease, border-color .28s ease;
  }

  .sweed-services-refine .sweed-services-touchpoints > div:hover {
    transform: translateY(-5px);
    border-color: rgba(237, 32, 98, .75);
    background: rgba(255,255,255,.11);
  }

  .sweed-services-refine .sweed-services-integrated > div {
    text-align: center;
  }

  .sweed-services-refine .sweed-services-integrated > div > p {
    margin-inline: auto;
    text-align-last: center;
  }

  .sweed-services-refine .sweed-services-integrated h2::after,
  .sweed-services-refine .sweed-services-cta h2::after {
    margin-inline: auto;
  }

  .sweed-services-refine .sweed-services-paths {
    gap: 1rem;
    margin-top: 2.25rem;
    text-align: right;
  }

  .sweed-services-refine .sweed-services-paths article {
    min-height: 8.8rem;
    padding: 1.2rem 1.35rem;
  }

  .sweed-services-refine .sweed-services-paths.sweed-services-path-marquee {
    display: block;
    width: calc(100% + 8vw);
    margin-inline: -4vw;
    overflow: hidden;
    direction: ltr;
  }

  .sweed-services-refine .sweed-services-path-track {
    display: flex;
    width: max-content;
    gap: 1rem;
    padding: .35rem 4vw .75rem;
    animation: sweedServicesPathMarquee 34s linear infinite;
    will-change: transform;
  }

  .sweed-services-refine .sweed-services-path-marquee:hover .sweed-services-path-track {
    animation-play-state: paused;
  }

  .sweed-services-refine .sweed-services-path-track article {
    display: grid;
    flex: 0 0 17.5rem;
    min-height: 8.5rem;
    align-content: center;
    gap: .65rem;
    direction: rtl;
    border-color: rgba(38, 27, 62, .1);
    background: rgba(255,255,255,.94);
    text-align: right;
  }

  .sweed-services-refine .sweed-services-path-track article:nth-child(3n + 2) {
    border-color: rgba(237, 32, 98, .42);
    background: linear-gradient(135deg, rgba(255,255,255,.98), rgba(255,244,249,.95));
  }

  .sweed-services-refine .sweed-services-path-track article:nth-child(3n) {
    background: linear-gradient(135deg, #33224f, #261b3e);
  }

  .sweed-services-refine .sweed-services-path-track article:nth-child(3n) :is(b, strong) {
    color: #fff;
  }

  @keyframes sweedServicesPathMarquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  .sweed-services-refine .sweed-services-photo-panel {
    position: relative;
    min-height: 21.25rem;
    overflow: hidden;
    border: 1px solid rgba(38, 27, 62, .1);
    border-radius: 1.15rem;
    background: #261b3e;
    box-shadow: 0 18px 36px rgba(38, 27, 62, .15);
  }

  .sweed-services-refine .sweed-services-photo-panel::after {
    content: "";
    position: absolute;
    inset: 0;
    border: 1px solid rgba(255,255,255,.22);
    border-radius: inherit;
    pointer-events: none;
  }

  .sweed-services-refine .sweed-services-media-poster {
    position: relative;
    min-height: 11.5rem;
    overflow: hidden;
    margin-bottom: 1rem;
    border: 1px solid rgba(38, 27, 62, .08);
    border-radius: 1rem;
    background:
      linear-gradient(100deg, rgba(38, 27, 62, .72), rgba(38, 27, 62, .15)),
      url("/images/hero/entrepreneur-laptop-office.jpg") center / cover no-repeat;
    box-shadow: 0 16px 32px rgba(38, 27, 62, .14);
  }

  .sweed-services-refine .sweed-services-media-poster::after {
    content: "";
    position: absolute;
    inset: 0;
    border: 1px solid rgba(255,255,255,.26);
    border-radius: inherit;
    pointer-events: none;
  }

  .sweed-services-refine .sweed-services-media-poster span {
    position: absolute;
    inset: 50% auto auto 50%;
    display: grid;
    width: 4rem;
    height: 4rem;
    place-items: center;
    border-radius: 50%;
    background: var(--sweed-pink);
    box-shadow: 0 0 0 .75rem rgba(237, 32, 98, .18);
    color: #fff;
    font-size: 1.2rem;
    transform: translate(-50%, -50%);
  }

  .sweed-services-refine .sweed-services-cta-inner {
    text-align: center;
  }

  .sweed-services-refine .sweed-services-cta-inner > p {
    margin-inline: auto;
    text-align-last: center;
  }

  .sweed-services-refine .sweed-services-form {
    text-align: right;
  }

  @keyframes sweedServicesPhotoFloat {
    from { transform: scale(1.02) translateX(0); }
    to { transform: scale(1.08) translateX(-1.4%); }
  }


  .sweed-services-refine .sweed-services-chips {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: .6rem;
    margin-block: 1.35rem;
  }

  .sweed-services-refine .sweed-services-chips span {
    display: flex;
    min-height: 2.85rem;
    align-items: center;
    justify-content: center;
    padding: .45rem .55rem;
    border: 1px solid rgba(38, 27, 62, .06);
    border-radius: .8rem;
    text-align: center;
  }

  .sweed-services-refine .sweed-services-service-section .sweed-services-action {
    margin-top: .35rem;
  }

  .sweed-services-refine .sweed-services-business-carousel {
    background: #261b3e;
  }

  .sweed-services-refine .sweed-services-business-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    animation: sweedServicesBusinessSlide 10s ease-in-out infinite;
  }

  .sweed-services-refine .sweed-services-business-slide-one {
    background-image: linear-gradient(120deg, rgba(38, 27, 62, .74), rgba(38, 27, 62, .14)), url("/images/hero/two-men-consultation.jpg");
  }

  .sweed-services-refine .sweed-services-business-slide-two {
    background-image: linear-gradient(120deg, rgba(38, 27, 62, .68), rgba(38, 27, 62, .12)), url("/images/hero/entrepreneur-laptop-office.jpg");
    animation-delay: 5s;
  }

  .sweed-services-refine .sweed-services-business-carousel::before {
    content: "أعمال واستشارات تُبنى على فهم الصورة كاملة";
    position: absolute;
    z-index: 2;
    inset: auto 1rem 1rem auto;
    max-width: 15rem;
    padding: .55rem .8rem;
    border: 1px solid rgba(255,255,255,.26);
    border-radius: 999px;
    background: rgba(38, 27, 62, .48);
    color: #fff;
    font-size: .78rem;
    backdrop-filter: blur(8px);
  }

  @keyframes sweedServicesBusinessSlide {
    0%, 42% { opacity: 1; transform: scale(1); }
    50%, 92% { opacity: 0; transform: scale(1.06); }
    100% { opacity: 1; transform: scale(1); }
  }

  .sweed-services-refine #branding .brandSplit {
    overflow: hidden;
    border-radius: 1.15rem;
    box-shadow: 0 18px 34px rgba(38, 27, 62, .08);
  }

  .sweed-services-refine .sweed-brand-mockups {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: .7rem;
    margin-top: 1rem;
  }

  .sweed-services-refine .sweed-brand-mockup {
    position: relative;
    min-height: 6.4rem;
    overflow: hidden;
    border-radius: .8rem;
  }

  .sweed-services-refine .sweed-brand-before-mockups .sweed-brand-mockup:nth-child(1) {
    background: linear-gradient(135deg, #ffba66 0 42%, #536be2 42% 100%);
  }

  .sweed-services-refine .sweed-brand-before-mockups .sweed-brand-mockup:nth-child(2) {
    background: linear-gradient(145deg, #20c9a3 0 48%, #f17caa 48% 100%);
  }

  .sweed-services-refine .sweed-brand-before-mockups .sweed-brand-mockup:nth-child(3) {
    background: linear-gradient(135deg, #fe7c5b 0 42%, #ffe2a5 42% 100%);
  }

  .sweed-services-refine .sweed-brand-before-mockups .sweed-brand-mockup::before,
  .sweed-services-refine .sweed-brand-before-mockups .sweed-brand-mockup::after {
    content: "";
    position: absolute;
    border-radius: 999px;
    background: rgba(255,255,255,.85);
  }

  .sweed-services-refine .sweed-brand-before-mockups .sweed-brand-mockup::before {
    width: 62%;
    height: .42rem;
    inset: 1.1rem auto auto 1rem;
  }

  .sweed-services-refine .sweed-brand-before-mockups .sweed-brand-mockup::after {
    width: 42%;
    height: 2.15rem;
    inset: auto 1rem .9rem auto;
  }

  .sweed-services-refine .sweed-brand-after-mockups .sweed-brand-mockup {
    border: 1px solid rgba(255,255,255,.22);
    background: linear-gradient(145deg, #3b285c, #261b3e);
  }

  .sweed-services-refine .sweed-brand-after-mockups .sweed-brand-mockup::before {
    content: "";
    position: absolute;
    inset: 1rem auto auto 1rem;
    width: 2rem;
    height: 2rem;
    border-radius: .58rem;
    background: linear-gradient(90deg, transparent 42%, #fff 42% 58%, transparent 58%), linear-gradient(#ed2062 42%, transparent 42% 58%, #ed2062 58%);
    box-shadow: 0 0 0 .35rem rgba(237, 32, 98, .14);
  }

  .sweed-services-refine .sweed-brand-after-mockups .sweed-brand-mockup::after {
    content: "";
    position: absolute;
    inset: auto 1rem 1rem 1rem;
    height: .48rem;
    border-radius: 999px;
    background: linear-gradient(90deg, #fff 0 44%, #ed2062 44% 100%);
  }

  .sweed-services-refine .sweed-services-digital-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: .75rem;
    padding: .8rem;
    border: 1px solid rgba(38, 27, 62, .09);
    border-radius: 1.15rem;
    background: rgba(255,255,255,.78);
    box-shadow: 0 17px 34px rgba(38, 27, 62, .08);
  }

  .sweed-services-refine .sweed-services-digital-card {
    overflow: hidden;
    min-height: 10.3rem;
    border: 1px solid rgba(38, 27, 62, .09);
    border-radius: .85rem;
    background: #fff;
    color: var(--sweed-ink);
  }

  .sweed-services-refine .sweed-services-digital-card b,
  .sweed-services-refine .sweed-services-digital-card small {
    display: block;
    padding-inline: .7rem;
  }

  .sweed-services-refine .sweed-services-digital-card b {
    margin-top: .7rem;
    font-size: .91rem;
  }

  .sweed-services-refine .sweed-services-digital-card small {
    padding-block: .25rem .8rem;
    color: rgba(38, 27, 62, .7);
    font-size: .75rem;
    line-height: 1.55;
  }

  .sweed-services-refine .sweed-services-digital-photo {
    height: 5.1rem;
    background-position: center;
    background-size: cover;
    filter: saturate(.72) contrast(.98);
  }

  .sweed-services-refine .sweed-services-digital-photo-one,
  .sweed-services-refine .sweed-services-digital-photo-four {
    background-image: linear-gradient(rgba(38,27,62,.15), rgba(38,27,62,.15)), url("/images/hero/two-men-consultation.jpg");
  }

  .sweed-services-refine .sweed-services-digital-photo-two,
  .sweed-services-refine .sweed-services-digital-photo-five {
    background-image: linear-gradient(rgba(38,27,62,.12), rgba(38,27,62,.12)), url("/images/hero/entrepreneur-laptop-office.jpg");
  }

  .sweed-services-refine .sweed-services-digital-photo-three,
  .sweed-services-refine .sweed-services-digital-photo-six {
    background-image: linear-gradient(rgba(38,27,62,.18), rgba(38,27,62,.18)), url("/images/hero/businessman-laptop-standing.jpg");
  }

  .sweed-services-refine .sweed-services-advertising-icon {
    width: 2rem;
    height: 2rem;
    stroke: var(--sweed-pink);
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.8;
  }

  .sweed-services-refine .sweed-services-touchpoints > div > span {
    display: grid;
    place-items: center;
    color: var(--sweed-pink);
  }

  .sweed-services-refine #advertising .sweed-services-action {
    display: inline-flex;
    margin-top: 1.55rem;
  }

  .sweed-services-refine .sweed-services-media-frames {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .sweed-services-refine .sweed-services-media-frames > div {
    display: grid;
    min-height: 6.4rem;
    align-content: center;
    gap: .35rem;
    padding: .75rem;
    border: 1px solid rgba(38, 27, 62, .1);
    border-radius: .8rem;
    background: #fff;
  }

  .sweed-services-refine .sweed-services-media-frames > div b {
    color: var(--sweed-ink);
  }

  .sweed-services-refine .sweed-services-media-frames > div small {
    color: rgba(38, 27, 62, .64);
    line-height: 1.45;
  }

  .sweed-services-refine .sweed-services-form-actions {
    justify-content: center;
    margin-top: 2rem;
  }


  @media (max-width: 900px) {
    .sweed-services-hero-photo {
      width: 66vw;
      opacity: .45;
    }

    .sweed-services-refine .sweed-services-service-section {
      padding-block: 4rem;
    }
  }

  @media (max-width: 700px) {
    .sweed-services-refine .sweed-services-hero-section {
      min-height: auto;
    }

    .sweed-services-hero-photo {
      inset: auto 0 0;
      width: 100%;
      height: 48%;
      clip-path: none;
      opacity: .36;
    }

    .sweed-services-refine .sweed-services-hero-section h1 {
      max-width: 14ch;
      font-size: clamp(2rem, 9vw, 2.55rem);
      white-space: normal;
    }

    .sweed-services-refine .sweed-services-head h2,
    .sweed-services-refine .sweed-services-integrated h2,
    .sweed-services-refine .sweed-services-cta h2 {
      font-size: clamp(1.7rem, 7.5vw, 2.2rem);
    }

    .sweed-services-refine .sweed-services-kpi {
      min-height: 0;
    }

    .sweed-services-refine .sweed-services-photo-panel {
      min-height: 17rem;
    }

    .sweed-services-refine .sweed-services-touchpoints > div,
    .sweed-services-refine .sweed-services-paths article {
      min-height: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sweed-services-refine *,
    .sweed-services-refine *::before,
    .sweed-services-refine *::after {
      animation-duration: .01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: .01ms !important;
    }
  }
`;

function ActionLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return <Link className={`sweed-services-action ${styles.button} ${light ? styles.buttonGhostLight : styles.buttonPrimary}`} href={href}>{children}</Link>;
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

  useEffect(() => {
    const rail = document.querySelector<HTMLElement>("#integrated-path .sweed-services-paths");
    if (!rail || rail.dataset.sweedPathMarqueeReady === "true") return;

    const cards = Array.from(rail.children);
    if (!cards.length) return;

    const track = document.createElement("div");
    track.className = "sweed-services-path-track";
    cards.forEach((card) => track.appendChild(card));
    cards.forEach((card) => {
      const copy = card.cloneNode(true) as HTMLElement;
      copy.setAttribute("aria-hidden", "true");
      track.appendChild(copy);
    });

    rail.replaceChildren(track);
    rail.classList.add("sweed-services-path-marquee");
    rail.dataset.sweedPathMarqueeReady = "true";
  }, []);

  return (
    <PublicPageShell page="services" sectionIds={["services-hero", "consulting", "branding", "digital-marketing", "development", "advertising", "media", "integrated-path", "services-cta"]} showBreadcrumb={false}>
      <main className={`${styles.page} sweed-services-refine`}><style>{servicesPageRefinementCss}</style>
        <section className={`${styles.hero} sweed-services-hero-section`} id="services-hero" aria-labelledby="services-page-title"><div className="sweed-services-hero-photo" aria-hidden="true" />
          <div className={`${styles.container} sweed-services-container`}>
            <div className={`${styles.heroGrid} sweed-services-hero-grid`}>
              <div>
                <p className={styles.crumb}>الرئيسية <span>←</span> <b>خدماتنا</b></p>
                <h1 id="services-page-title">مش كل مشكلة محتاجة نفس الخدمة</h1>
                <p className={styles.heroDescription}>بنحدد مكان مشروعك، ثم نرشح أول خدمة أو مسار يحرّكه في الاتجاه الصح.</p>
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

        <nav className={`${styles.serviceMap} sweed-services-map`} id="service-map" aria-label="خدماتنا">
          <div className={styles.container}>
            {serviceMap.map(([id, number, title]) => <a className={activeService === id ? styles.mapItemActive : styles.mapItem} href={`#${id}`} key={id}><span>{number}</span><b>{title}</b></a>)}
          </div>
        </nav>
        <p className={`${styles.mapNote} sweed-services-map-note`}>مش بنرشح لك أغلى خدمة… <b>بنرشح لك أول خدمة منطقية لحالتك</b></p>

        <ServiceSection id="consulting" number="خدمة 01" title="الاستشارات الإدارية والتسويقية" hook="قبل ما تتحرك… محتاج تتأكد إنت رايح فين" description="بنحلل الصورة، نكشف نقطة التسرب، ونثبت أولويات قابلة للتنفيذ." chips={["بحث السوق", "تحليل المنافسين", "تحديد الأهداف", "خطط إدارية وتسويقية", "هيكلة وتشغيل", "مؤشرات أداء"]} kpi="مؤشر النجاح: قرار أوضح، أولويات معتمدة، وخطة تنفيذ قابلة للمتابعة — من غير وعد بنتيجة مالية مسبقة." cta="اعرف تفاصيل الاستشارات" href="/services/consulting">
          <div className="sweed-services-photo-panel sweed-services-business-carousel" aria-label="صور أعمال لخدمة الاستشارات">
            <span className="sweed-services-business-slide sweed-services-business-slide-one" />
            <span className="sweed-services-business-slide sweed-services-business-slide-two" />
          </div>
        </ServiceSection>

        <ServiceSection id="branding" number="خدمة 02" title="التصميم والهوية البصرية" hook="براندك معروف… ولا مجرد اسم وشوية تصميمات؟" description="نحوّل تميّزك إلى رسالة وهوية ثابتة يعرف بها العميل ليه يختارك." chips={["استراتيجية البراند", "الجمهور والتموضع", "الرسائل والنبرة", "الهوية البصرية", "دليل الاستخدام", "قوالب المنصات"]} kpi="مؤشر النجاح: رسالة وهوية متسقتان قابلتان للتطبيق على كل نقطة بيشوفها العميل." cta="ابنِ هوية مشروعك" href="/services/branding" reverse white>
          <div className={styles.brandSplit}>
            <div className={styles.brandBefore}><h3>قبل — شكل مختلف في كل مكان</h3><div className="sweed-brand-mockups sweed-brand-before-mockups">{Array.from({ length: 3 }).map((_, i) => <span className="sweed-brand-mockup" key={i} />)}</div></div>
            <div className={styles.brandAfter}><h3>بعد — هوية واحدة ثابتة</h3><div className="sweed-brand-mockups sweed-brand-after-mockups">{Array.from({ length: 3 }).map((_, i) => <span className="sweed-brand-mockup" key={i} />)}</div></div>
          </div>
        </ServiceSection>

        <ServiceSection id="digital-marketing" number="خدمة 03" title="التسويق الرقمي" hook="الإعلان مش المشكلة… لو المسار نفسه مش واضح" description="نربط كل قناة بهدف، ونراجع الرسالة والعرض قبل زيادة الميزانية." chips={["تأسيس وتأمين المنصات", "إدارة السوشيال", "الحملات الممولة", "المحتوى التسويقي", "SEO عند الحاجة", "تقارير وتحسين دوري"]} kpi="مؤشر النجاح: هدف واضح لكل قناة وتقارير بتشرح قرار التحسين — مش أرقام مبيعات مضمونة." cta="شوف نظام التسويق الرقمي" href="/services/digital-marketing">
          <div className="sweed-services-digital-grid" aria-label="مراحل التسويق الرقمي">{[["one", "وعي", "الجمهور الصح يشوفك"], ["two", "اهتمام", "رسالة واضحة"], ["three", "ثقة", "محتوى يثبت القيمة"], ["four", "عرض", "خطوة مقنعة"], ["five", "تحويل", "صفحة أسهل للقرار"], ["six", "قياس", "تحسين مستمر"]].map(([photo, title, copy]) => <article className="sweed-services-digital-card" key={title}><div className={"sweed-services-digital-photo sweed-services-digital-photo-" + photo} /><b>{title}</b><small>{copy}</small></article>)}</div>
        </ServiceSection>

        <ServiceSection id="development" number="خدمة 04" title="البرمجة والتطوير" hook="لو شغلك كبر… هل نظامك كبر معاه؟" description="نبني موقعًا أو نظامًا يسهّل الشراء والمتابعة ورؤية الأرقام." chips={["مواقع تعريفية", "متاجر إلكترونية", "صفحات هبوط", "CRM وأنظمة تشغيل", "ربط وأتمتة", "تحسين تجربة المستخدم"]} kpi="مؤشر النجاح: تجربة أسهل للعميل وسير عمل أوضح للفريق حسب نطاق المشروع." cta="استكشف حلول التطوير" href="/services/software-development" reverse white>
          <div className={styles.system}><div className={styles.systemGrid}><div><b>العميل</b><small>يشتري ويتابع بسهولة</small></div><div><b>الفريق</b><small>يشتغل بسير عمل واضح</small></div><div><b>الإدارة</b><small>تشوف اللي بيحصل بالأرقام</small></div></div><div className={styles.systemCore}>نظام واحد<br />متصل</div></div>
        </ServiceSection>

        <section className={`${styles.advertising} sweed-services-advertising`} id="advertising">
          <div className={styles.container}>
            <ServiceHead number="خدمة 05" title="الدعاية والإعلان" hook="وجودك في السوق لازم يتشاف… ويتميز" description="كل نقطة ظهور تحمل نفس الرسالة وتخدم قرارًا واضحًا." />
            <div className={styles.touchpoints + " sweed-services-touchpoints"}>{[["billboard", "لوحات وبنرات", "ظهور في الشارع الصح"], ["storefront", "واجهات ولافتات", "أول انطباع عند الباب"], ["truck", "إعلانات مركبات", "رسالة بتتحرك في المدينة"], ["print", "مطبوعات وهدايا", "الهوية في إيد العميل"]].map(([icon, title, copy]) => <div className={styles.touchpoint} key={title}><span><AdvertisingIcon type={icon as AdvertisingIconType} /></span><b>{title}</b><small>{copy}</small></div>)}</div>
            <ActionLink href="/services/advertising">خطط لظهور براندك</ActionLink>
          </div>
        </section>

        <ServiceSection id="media" number="خدمة 06" title="إنتاج المحتوى والميديا" hook="المحتوى الحلو مش كفاية… لازم يحرّك قرار" description="نبدأ من فكرة وسكربت ومسار عميل، لا من الكاميرا فقط." chips={["استراتيجية وخطة محتوى", "كتابة وسكربت", "تصوير منتجات وفعاليات", "فيديو إعلاني وتعريفي", "موشن جرافيك", "خطة نشر"]} kpi="مؤشر النجاح: محتوى مرئي ليه هدف ومكان معلوم في رحلة العميل — مش إنتاج لمجرد النشر." cta="ابدأ خطة المحتوى المرئي" href="/services/media">
          <div className={styles.storyboard}><div className="sweed-services-media-poster" aria-hidden="true"><span>▶</span></div><div className={styles.storyFrames + " sweed-services-media-frames"}>{[["تعرّف", "فكرة واضحة"], ["ثقة", "قصة تقرّبك"], ["قرار", "خطوة تتحرك"]].map(([title, copy]) => <div key={title}><b>{title}</b><small>{copy}</small></div>)}</div><p>وعي <b>←</b> اهتمام <b>←</b> قرار</p></div>
        </ServiceSection>

        <section className={`${styles.integrated} sweed-services-integrated`} id="integrated-path">
          <div className={`${styles.container} sweed-services-container`}>
            <span className={`${styles.eyebrow} sweed-services-eyebrow`}>المسار المتكامل</span>
            <h2>الخدمة الصح في الوقت الصح… مش كل الخدمات مرة واحدة</h2>
            <p>بنرتب البداية حسب وضع مشروعك الحقيقي، مش حسب قائمة ثابتة.</p>
            <div className={`${styles.pathsGrid} sweed-services-paths`}>{[["فكرة أو بداية مش واضحة", "استشارات ← هوية"], ["رسالتك مش واضحة", "هوية ← محتوى"], ["محتاج عملاء أكثر", "تسويق رقمي ← صفحة هبوط"], ["مبيعات أو تشغيل محتاجين نظام", "استشارات ← برمجة وتطوير"], ["ظهورك أقل من جودة خدمتك", "هوية ← دعاية أو ميديا"], ["محتاج ثقة أسرع", "محتوى ← ميديا"]].map(([title, route]) => <article key={title}><b>{title}</b><strong>{route}</strong></article>)}</div>
          </div>
        </section>

        <section className={`${styles.cta} sweed-services-cta`} id="services-cta">
          <svg className={styles.ctaCompass} viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="88" fill="none" stroke="#fff" strokeWidth="2"/><polygon points="100,30 112,100 100,112 88,100" fill="#fff"/><polygon points="100,170 88,100 100,88 112,100" fill="#fff"/></svg>
          <div className={`${styles.container} ${styles.ctaInner} sweed-services-cta-inner`}>
            <span className={`${styles.eyebrow} sweed-services-eyebrow`}>تواصل معانا</span>
            <h2>مش محتاج تختار لوحدك</h2>
            <p>احكيلنا وضع مشروعك في سطرين، ونحدد معاك أول خطوة تستحق تتعمل.</p>
            <form className={`${styles.form} sweed-services-form`} onSubmit={(event) => event.preventDefault()}>
              <div className={styles.formRow}><label>اسمك<input type="text" placeholder="اكتب اسمك" /></label><label>رقم الموبايل (واتساب)<input type="tel" placeholder="01xxxxxxxxx" /></label></div>
              <div className={styles.formRow}><label>الخدمة اللي بتفكر فيها (اختياري)<select defaultValue=""><option value="">لسه محددتش — ساعدوني</option><option value="consulting">الاستشارات الإدارية والتسويقية</option><option value="branding">التصميم والهوية البصرية</option><option value="digital-marketing">التسويق الرقمي</option><option value="development">البرمجة والتطوير</option><option value="advertising">الدعاية والإعلان</option><option value="media">إنتاج المحتوى والميديا</option></select></label><label>أكبر تحدي عندك دلوقتي<input type="text" placeholder="سطر واحد كفاية" /></label></div>
              <label>احكيلنا عن مشروعك<textarea rows={3} placeholder="نشاطك إيه، وواقف فين دلوقتي" /></label>
              <div className={styles.formActions + " sweed-services-form-actions"}><ActionLink href="/contact?source=services">احجز استشارتك المجانية</ActionLink><ActionLink href="https://wa.me/201068274662" light>ابدأ محادثة واتساب</ActionLink></div>
            </form>
          </div>
        </section>
      </main>
    </PublicPageShell>
  );
}

type AdvertisingIconType = "billboard" | "storefront" | "truck" | "print";

function AdvertisingIcon({ type }: { type: AdvertisingIconType }) {
  const common = { viewBox: "0 0 32 32", "aria-hidden": true };
  if (type === "billboard") return <svg className="sweed-services-advertising-icon" {...common}><rect x="5" y="5" width="22" height="13" rx="2" /><path d="M11 27l2-9m8 9l-2-9M8 27h16" /></svg>;
  if (type === "storefront") return <svg className="sweed-services-advertising-icon" {...common}><path d="M4 12h24v15H4zM3 7h26l-2 5H5zM10 27v-8h5v8m4-8h5" /></svg>;
  if (type === "truck") return <svg className="sweed-services-advertising-icon" {...common}><path d="M3 9h17v13H3zM20 14h5l4 4v4h-9zM8 25a2 2 0 100-4 2 2 0 000 4zm15 0a2 2 0 100-4 2 2 0 000 4z" /></svg>;
  return <svg className="sweed-services-advertising-icon" {...common}><path d="M7 5h18v22H7zM11 10h10M11 14h10M11 18h6M20 25v-5" /></svg>;
}

function ServiceHead({ number, title, hook, description }: { number: string; title: string; hook: string; description: string }) {
  return <div className={`${styles.serviceHead} sweed-services-head`}><span>{number}</span><h2>{title}</h2><p className={`${styles.hook} sweed-services-hook`}>{hook}</p><p className={`${styles.description} sweed-services-copy`}>{description}</p></div>;
}

function Chips({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return <div className={dark ? `${styles.chips} ${styles.chipsDark} sweed-services-chips` : `${styles.chips} sweed-services-chips`}>{items.slice(0, 6).map((item) => <span key={item}>{item}</span>)}</div>;
}

function ServiceSection({ id, number, title, hook, description, chips, kpi: _kpi, cta, href, children, reverse = false, white = false }: { id: string; number: string; title: string; hook: string; description: string; chips: string[]; kpi: string; cta: string; href: string; children: React.ReactNode; reverse?: boolean; white?: boolean }) {
  return <section className={white ? `${styles.service} ${styles.serviceWhite} sweed-services-service-section` : `${styles.service} sweed-services-service-section`} id={id}><div className={`${styles.container} ${styles.serviceGrid} sweed-services-grid ${reverse ? styles.reverse : ""}`}><div><ServiceHead number={number} title={title} hook={hook} description={description}/><Chips items={chips}/><ActionLink href={href}>{cta}</ActionLink></div><div className={`${styles.serviceVisual} sweed-services-visual`}>{children}</div></div></section>;
}
