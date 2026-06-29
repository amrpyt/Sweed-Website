"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { OfferFunnelSettings } from "./contracts";
import { renderOfferTemplate } from "./contracts";
import styles from "./offer-funnel-controller.module.css";

type PopupState = {
  kind: "section" | "site";
  sectionId: string;
  sectionLabel: string;
};

const VISITOR_ID_KEY = "sweed-offer-funnel-visitor-id";
const SESSION_ID_KEY = "sweed-offer-funnel-session-id";
// ponytail: temporary kill switch, remove when offer popups should return.
const OFFER_POPUPS_ENABLED = false;

function getOrCreateStorageId(storage: Storage, key: string) {
  const existing = storage.getItem(key);
  if (existing) return existing;

  const nextId = crypto.randomUUID();
  storage.setItem(key, nextId);
  return nextId;
}

function normalizeSectionLabel(page: string, sectionId: string, settings: OfferFunnelSettings) {
  if (settings.sectionLabelOverrides[sectionId]) {
    return settings.sectionLabelOverrides[sectionId];
  }

  const section = document.getElementById(sectionId);
  const heading = section?.querySelector("h1, h2, h3, h4");
  const text = heading?.textContent?.trim();
  if (text) return text;

  if (sectionId === "hero") return "بداية الصفحة";
  return `${page} / ${sectionId}`;
}

function getCooldownKey(kind: "section" | "site", sectionId: string) {
  return `sweed-offer-funnel:${kind}:${sectionId || "global"}`;
}

function hasCooldown(storage: Storage, key: string, cooldownHours: number) {
  const raw = storage.getItem(key);
  if (!raw) return false;

  const lastShownAt = Number(raw);
  if (!Number.isFinite(lastShownAt)) return false;

  return Date.now() - lastShownAt < cooldownHours * 60 * 60 * 1000;
}

function markCooldown(storage: Storage, key: string) {
  storage.setItem(key, String(Date.now()));
}

export function OfferFunnelController({ page }: { page: string }) {
  const [settings, setSettings] = useState<OfferFunnelSettings | null>(null);
  const [popup, setPopup] = useState<PopupState | null>(null);
  const activeSectionIdRef = useRef("hero");
  const siteSecondsRef = useRef(0);
  const sectionSecondsRef = useRef<Record<string, number>>({});
  const shownRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    if (!OFFER_POPUPS_ENABLED) return;

    let cancelled = false;

    fetch("/api/offer-funnel", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (cancelled) return;
        setSettings(data.settings ?? null);
      })
      .catch(() => {
        if (!cancelled) setSettings(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!OFFER_POPUPS_ENABLED) return;
    if (!settings?.enabled || typeof window === "undefined") return;

    getOrCreateStorageId(window.localStorage, VISITOR_ID_KEY);
    getOrCreateStorageId(window.sessionStorage, SESSION_ID_KEY);

    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    if (!sections.length) return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        const current = Array.from(ratios.entries()).sort((a, b) => b[1] - a[1])[0];
        if (current?.[1] > 0) {
          activeSectionIdRef.current = current[0];
        }
      },
      {
        threshold: [0.2, 0.4, 0.6, 0.8],
      },
    );

    sections.forEach((section) => observer.observe(section));

    const tick = window.setInterval(() => {
      if (document.visibilityState !== "visible" || popup) return;

      const sectionId = activeSectionIdRef.current;
      siteSecondsRef.current += 1;
      sectionSecondsRef.current[sectionId] = (sectionSecondsRef.current[sectionId] ?? 0) + 1;

      if (settings.sectionOffer.enabled) {
        const sectionCooldownKey = getCooldownKey("section", sectionId);
        if (
          !shownRef.current[sectionCooldownKey] &&
          !hasCooldown(window.localStorage, sectionCooldownKey, settings.sectionOffer.cooldownHours) &&
          sectionSecondsRef.current[sectionId] >= settings.sectionOffer.dwellSeconds
        ) {
          shownRef.current[sectionCooldownKey] = true;
          setPopup({
            kind: "section",
            sectionId,
            sectionLabel: normalizeSectionLabel(page, sectionId, settings),
          });
          return;
        }
      }

      if (settings.siteOffer.enabled) {
        const siteCooldownKey = getCooldownKey("site", "global");
        if (
          !shownRef.current[siteCooldownKey] &&
          !hasCooldown(window.localStorage, siteCooldownKey, settings.siteOffer.cooldownHours) &&
          siteSecondsRef.current >= settings.siteOffer.dwellSeconds
        ) {
          shownRef.current[siteCooldownKey] = true;
          setPopup({
            kind: "site",
            sectionId,
            sectionLabel: normalizeSectionLabel(page, sectionId, settings),
          });
        }
      }
    }, 1000);

    return () => {
      observer.disconnect();
      window.clearInterval(tick);
    };
  }, [page, popup, settings]);

  const popupConfig = useMemo(() => {
    if (!settings || !popup) return null;
    return popup.kind === "section" ? settings.sectionOffer : settings.siteOffer;
  }, [popup, settings]);

  if (!OFFER_POPUPS_ENABLED || !settings?.enabled || !popup || !popupConfig) {
    return null;
  }

  const popupKey = getCooldownKey(popup.kind, popup.kind === "section" ? popup.sectionId : "global");
  const message = renderOfferTemplate(popupConfig.bodyTemplate, {
    section: popup.sectionLabel,
    page,
    discount: String(popupConfig.discountPercent),
    hours: String(popupConfig.offerHours),
  });

  return (
    <div className={styles.shell} data-testid="offer-funnel-popup-shell">
      <aside className={styles.card} role="dialog" aria-live="polite" aria-label="Offer popup">
        <p className={styles.eyebrow}>{popup.kind === "section" ? "عرض حسب اهتمامك الحالي" : "عرض خاص قبل ما تمشي"}</p>
        <h2 className={styles.title}>{popupConfig.title}</h2>
        <p className={styles.body}>{message}</p>
        <span className={styles.sectionTag}>القسم الحالي: {popup.sectionLabel}</span>
        <div className={styles.actions}>
          <a
            className={styles.primary}
            href="/contact#contact-form"
            onClick={() => {
              markCooldown(window.localStorage, popupKey);
              setPopup(null);
            }}
          >
            {popupConfig.ctaLabel}
          </a>
          <button
            className={styles.secondary}
            type="button"
            onClick={() => {
              markCooldown(window.localStorage, popupKey);
              setPopup(null);
            }}
          >
            إغلاق
          </button>
        </div>
      </aside>
    </div>
  );
}
