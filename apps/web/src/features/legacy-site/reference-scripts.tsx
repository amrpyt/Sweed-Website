"use client";

import { useEffect } from "react";
import { wrapReferenceInlineScript } from "./reference-html-normalizer";

type ReferenceScript = {
  id: string;
  src?: string;
  type?: string;
  content?: string;
};

type ScrollTriggerInstance = {
  kill: () => void;
};

type ReferenceWindow = Window & {
  ScrollTrigger?: {
    getAll?: () => ScrollTriggerInstance[];
  };
  gsap?: unknown;
  SplitText?: unknown;
};

export function ReferenceScripts({ scripts }: { scripts: ReferenceScript[] }) {
  useEffect(() => {
    let cancelled = false;
    const inlineScripts: HTMLScriptElement[] = [];
    const browserWindow = window as ReferenceWindow;
    const existingTriggers = new Set(browserWindow.ScrollTrigger?.getAll?.() ?? []);

    const run = async () => {
      for (const script of scripts) {
        if (cancelled) return;

        if (script.src) {
          await loadReferenceLibrary(script);
          continue;
        }

        const element = document.createElement("script");
        element.id = script.id;
        if (script.type) element.type = script.type;
        element.textContent = wrapReferenceInlineScript(script.content ?? "");
        document.body.appendChild(element);
        inlineScripts.push(element);
      }
    };

    void run().catch((error: unknown) => {
      console.error("Failed to initialize SWEED reference scripts", error);
    });

    return () => {
      cancelled = true;
      inlineScripts.forEach((script) => script.remove());
      document.body.style.overflow = "";

      browserWindow.ScrollTrigger?.getAll?.().forEach((trigger) => {
        if (!existingTriggers.has(trigger)) trigger.kill();
      });
    };
  }, [scripts]);

  return null;
}

async function loadReferenceLibrary(script: ReferenceScript) {
  const src = script.src;
  if (!src || referenceLibraryReady(src)) return;

  const existing = Array.from(document.scripts).find((element) => element.src === src);
  if (existing) {
    await waitForScript(existing, src);
    return;
  }

  const element = document.createElement("script");
  element.id = script.id;
  element.src = src;
  element.async = false;
  element.dataset.sweedReferenceLibrary = "true";
  if (script.type) element.type = script.type;

  const loaded = waitForScript(element, src);
  document.head.appendChild(element);
  await loaded;
}

function waitForScript(element: HTMLScriptElement, src: string) {
  if (referenceLibraryReady(src) || element.dataset.sweedReferenceLoaded === "true") {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    const handleLoad = () => {
      element.dataset.sweedReferenceLoaded = "true";
      resolve();
    };
    const handleError = () => reject(new Error(`Reference library failed to load: ${src}`));

    element.addEventListener("load", handleLoad, { once: true });
    element.addEventListener("error", handleError, { once: true });
  });
}

function referenceLibraryReady(src: string) {
  const browserWindow = window as ReferenceWindow;
  if (/\/gsap(?:\.min)?\.js(?:$|\?)/i.test(src)) return Boolean(browserWindow.gsap);
  if (/\/ScrollTrigger(?:\.min)?\.js(?:$|\?)/i.test(src)) return Boolean(browserWindow.ScrollTrigger);
  if (/\/SplitText(?:\.min)?\.js(?:$|\?)/i.test(src)) return Boolean(browserWindow.SplitText);
  return false;
}
