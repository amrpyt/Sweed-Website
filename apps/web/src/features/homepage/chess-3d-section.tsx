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

    let frame = 0;
    const start = performance.now();

    const tintModel = () => {
      const model = (viewer as any).model;
      const materials = model?.materials ?? [];
      for (const material of materials) {
        material.pbrMetallicRoughness?.setBaseColorFactor?.([0.84, 0.84, 0.9, 1]);
        material.pbrMetallicRoughness?.setMetallicFactor?.(0.62);
        material.pbrMetallicRoughness?.setRoughnessFactor?.(0.24);
      }
    };

    const rotate = (now: number) => {
      const angle = 95 + Math.sin((now - start) * 0.001) * 1.5;
      const distance = window.innerWidth <= 520 ? "5.8m" : window.innerWidth <= 860 ? "5.4m" : "5m";
      viewer.setAttribute("camera-target", "1m 0m 0m");
      viewer.setAttribute("camera-orbit", `${angle.toFixed(2)}deg 66deg ${distance}`);
      frame = requestAnimationFrame(rotate);
    };

    viewer.addEventListener("load", tintModel);
    frame = requestAnimationFrame(rotate);
    return () => {
      cancelAnimationFrame(frame);
      viewer.removeEventListener("load", tintModel);
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
