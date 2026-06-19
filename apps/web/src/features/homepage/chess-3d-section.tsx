"use client";

import Script from "next/script";
import { createElement } from "react";
import Image from "next/image";
import styles from "./chess-3d-section.module.css";

export function Chess3DSection() {
  return (
    <section className={styles.section} aria-label="SWEED 3D strategy board">
      <Script
        src="https://cdn.jsdelivr.net/npm/@google/model-viewer/dist/model-viewer.min.js"
        strategy="afterInteractive"
        type="module"
      />

      <div className={styles.inner}>
        <div className={styles.viewerShell}>
          {createElement("model-viewer", {
            alt: "Interactive 3D chess model",
            "auto-rotate": "",
            "auto-rotate-delay": "0",
            "camera-controls": "true",
            "camera-orbit": "0deg 75deg 3.2m",
            "camera-target": "0m 0.65m 0m",
            className: styles.viewer,
            "disable-zoom": "",
            "environment-image": "neutral",
            exposure: "2.2",
            "field-of-view": "28deg",
            "interaction-prompt": "none",
            "interaction-prompt-threshold": "0",
            loading: "eager",
            "rotation-per-second": "14deg",
            "shadow-intensity": "0.35",
            src: "/models/chess-3d.glb",
          })}
          <Image
            alt=""
            aria-hidden="true"
            className={styles.horseFallback}
            height={612}
            priority={false}
            src="/images/homepage/strategy-horse.png"
            width={282}
          />
        </div>

        <div className={styles.copy}>
          <span className={styles.eyebrow}>SWEED STRATEGY</span>
          <h2 className={styles.title}>نحرك البراند بخطة واضحة</h2>
          <p className={styles.summary}>
            كل خطوة في التسويق والتصميم لها هدف. نبني لك نظام يربط الهوية، المحتوى، والإعلانات في اتجاه واحد.
          </p>
        </div>
      </div>
    </section>
  );
}
