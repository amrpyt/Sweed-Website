"use client";

import Script from "next/script";
import { createElement, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./chess-3d-section.module.css";

export function Chess3DSection() {
  const viewerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const tintModel = () => {
      const model = (viewer as any).model;
      const materials = model?.materials ?? [];
      for (const [index, material] of materials.entries()) {
        const color = index % 2 === 0 ? [0.96, 0.96, 0.96, 1] : [0.02, 0.02, 0.025, 1];
        material.pbrMetallicRoughness?.setBaseColorFactor?.(color);
        material.pbrMetallicRoughness?.setMetallicFactor?.(0.35);
        material.pbrMetallicRoughness?.setRoughnessFactor?.(0.32);
      }
    };

    const frameModel = () => {
      const distance = window.innerWidth <= 520 ? "7m" : window.innerWidth <= 860 ? "6.2m" : "5.6m";
      viewer.setAttribute("camera-target", "1m 0m 0m");
      viewer.setAttribute("camera-orbit", `95deg 66deg ${distance}`);
    };

    viewer.addEventListener("load", tintModel);
    window.addEventListener("resize", frameModel);
    frameModel();

    return () => {
      viewer.removeEventListener("load", tintModel);
      window.removeEventListener("resize", frameModel);
    };
  }, []);

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
            "camera-controls": "true",
            "camera-orbit": "95deg 66deg 5.2m",
            "camera-target": "1m 0m 0m",
            className: styles.viewer,
            "disable-zoom": "",
            "environment-image": "neutral",
            exposure: "3.1",
            "field-of-view": "34deg",
            "interaction-prompt": "none",
            "interaction-prompt-threshold": "0",
            loading: "eager",
            "shadow-intensity": "0.35",
            ref: viewerRef,
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
