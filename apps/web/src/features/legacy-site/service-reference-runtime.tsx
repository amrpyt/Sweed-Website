"use client";

import { useEffect } from "react";

import type { ServiceReferenceScript } from "./service-reference-html";

type Props = {
  scripts: readonly ServiceReferenceScript[];
};

function loadExternalScript(src: string) {
  const existing = document.querySelector<HTMLScriptElement>(`script[data-sweed-reference-src="${CSS.escape(src)}"]`);
  if (existing) {
    if (existing.dataset.loaded === "true") return Promise.resolve();
    return new Promise<void>((resolve) => existing.addEventListener("load", () => resolve(), { once: true }));
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset.sweedReferenceSrc = src;
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve();
    });
    script.addEventListener("error", () => reject(new Error(`Failed to load reference script: ${src}`)));
    document.head.appendChild(script);
  });
}

export function ServiceReferenceRuntime({ scripts }: Props) {
  useEffect(() => {
    let cancelled = false;
    const inserted: HTMLScriptElement[] = [];

    const run = async () => {
      for (const item of scripts) {
        if (cancelled) return;
        if (item.src) {
          await loadExternalScript(item.src);
          continue;
        }

        if (!item.content) continue;
        const script = document.createElement("script");
        script.dataset.sweedReferenceInline = "true";
        script.text = item.content;
        document.body.appendChild(script);
        inserted.push(script);
      }
    };

    void run();
    return () => {
      cancelled = true;
      inserted.forEach((script) => script.remove());
    };
  }, [scripts]);

  return null;
}
