"use client";

import { useState } from "react";
import { defaultOfferFunnelSettings, type OfferFunnelSettings } from "./contracts";
import styles from "./admin-settings-form.module.css";

function parseOverrides(value: string) {
  if (!value.trim()) return {};
  return JSON.parse(value) as Record<string, string>;
}

export function AdminOfferFunnelSettingsForm({ initialSettings }: { initialSettings: OfferFunnelSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [overridesJson, setOverridesJson] = useState(JSON.stringify(initialSettings.sectionLabelOverrides, null, 2));
  const [status, setStatus] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("جاري الحفظ...");

    try {
      const payload = {
        ...settings,
        sectionLabelOverrides: parseOverrides(overridesJson),
      };

      const response = await fetch("/api/admin/offer-funnel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "تعذر حفظ الإعدادات");
      }

      const data = await response.json();
      setSettings(data.settings);
      setOverridesJson(JSON.stringify(data.settings.sectionLabelOverrides, null, 2));
      setStatus("تم حفظ الإعدادات بنجاح.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "حصل خطأ أثناء الحفظ.");
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div>
          <p>Offer Funnel / WhatsApp</p>
          <h1>لوحة تحكم العروض والواتساب</h1>
          <span>من هنا تقدر تتحكم في توقيتات الـ popup، نصوص العروض، رقم واتساب، الرسالة الجاهزة، وأسماء السكاشن.</span>
        </div>
        <a href="/api/admin/offer-funnel">JSON</a>
      </header>

      <form className={styles.grid} onSubmit={handleSubmit}>
        <section className={styles.panel}>
          <h2>تشغيل عام</h2>
          <div className={styles.checkboxRow}>
            <input
              id="enabled"
              type="checkbox"
              checked={settings.enabled}
              onChange={(event) => setSettings((current) => ({ ...current, enabled: event.target.checked }))}
            />
            <label htmlFor="enabled">تشغيل كل الفيتشر</label>
          </div>
        </section>

        <section className={styles.panel}>
          <h2>Popup السكشن</h2>
          <div className={styles.fields}>
            <div className={styles.checkboxRow}>
              <input
                id="section-enabled"
                type="checkbox"
                checked={settings.sectionOffer.enabled}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    sectionOffer: { ...current.sectionOffer, enabled: event.target.checked },
                  }))
                }
              />
              <label htmlFor="section-enabled">تفعيل Popup السكشن</label>
            </div>
            <FieldNumber
              id="section-dwell-seconds"
              label="عدد الثواني"
              value={settings.sectionOffer.dwellSeconds}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  sectionOffer: { ...current.sectionOffer, dwellSeconds: value },
                }))
              }
            />
            <FieldNumber
              id="section-discount-percent"
              label="نسبة الخصم"
              value={settings.sectionOffer.discountPercent}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  sectionOffer: { ...current.sectionOffer, discountPercent: value },
                }))
              }
            />
            <FieldNumber
              id="section-offer-hours"
              label="مدة العرض بالساعات"
              value={settings.sectionOffer.offerHours}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  sectionOffer: { ...current.sectionOffer, offerHours: value },
                }))
              }
            />
            <FieldNumber
              id="section-cooldown-hours"
              label="Cooldown بالساعات"
              value={settings.sectionOffer.cooldownHours}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  sectionOffer: { ...current.sectionOffer, cooldownHours: value },
                }))
              }
            />
            <FieldText
              id="section-title"
              label="العنوان"
              value={settings.sectionOffer.title}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  sectionOffer: { ...current.sectionOffer, title: value },
                }))
              }
            />
            <FieldText
              id="section-cta-label"
              label="زر CTA"
              value={settings.sectionOffer.ctaLabel}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  sectionOffer: { ...current.sectionOffer, ctaLabel: value },
                }))
              }
            />
            <FieldArea
              id="section-body-template"
              label="نص الرسالة"
              hint="المتاح: {{section}} {{discount}} {{hours}} {{page}}"
              value={settings.sectionOffer.bodyTemplate}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  sectionOffer: { ...current.sectionOffer, bodyTemplate: value },
                }))
              }
            />
          </div>
        </section>

        <section className={styles.panel}>
          <h2>Popup الموقع كله</h2>
          <div className={styles.fields}>
            <div className={styles.checkboxRow}>
              <input
                id="site-enabled"
                type="checkbox"
                checked={settings.siteOffer.enabled}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    siteOffer: { ...current.siteOffer, enabled: event.target.checked },
                  }))
                }
              />
              <label htmlFor="site-enabled">تفعيل Popup الموقع</label>
            </div>
            <FieldNumber
              id="site-dwell-seconds"
              label="عدد الثواني"
              value={settings.siteOffer.dwellSeconds}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  siteOffer: { ...current.siteOffer, dwellSeconds: value },
                }))
              }
            />
            <FieldNumber
              id="site-discount-percent"
              label="نسبة الخصم"
              value={settings.siteOffer.discountPercent}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  siteOffer: { ...current.siteOffer, discountPercent: value },
                }))
              }
            />
            <FieldText
              id="site-title"
              label="العنوان"
              value={settings.siteOffer.title}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  siteOffer: { ...current.siteOffer, title: value },
                }))
              }
            />
            <FieldArea
              id="site-body-template"
              label="نص الرسالة"
              hint="المتاح: {{section}} {{discount}} {{hours}} {{page}}"
              value={settings.siteOffer.bodyTemplate}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  siteOffer: { ...current.siteOffer, bodyTemplate: value },
                }))
              }
            />
          </div>
        </section>

        <section className={styles.panel}>
          <h2>واتساب</h2>
          <div className={styles.fields}>
            <div className={styles.checkboxRow}>
              <input
                id="wa-enabled"
                type="checkbox"
                checked={settings.whatsapp.enabled}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    whatsapp: { ...current.whatsapp, enabled: event.target.checked },
                  }))
                }
              />
              <label htmlFor="wa-enabled">تفعيل واتساب</label>
            </div>
            <div className={styles.checkboxRow}>
              <input
                id="wa-pulse"
                type="checkbox"
                checked={settings.whatsapp.pulseCta}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    whatsapp: { ...current.whatsapp, pulseCta: event.target.checked },
                  }))
                }
              />
              <label htmlFor="wa-pulse">تشغيل النبض على الزر</label>
            </div>
            <FieldText
              id="whatsapp-phone"
              label="رقم واتساب"
              value={settings.whatsapp.phone}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  whatsapp: { ...current.whatsapp, phone: value.replace(/\D+/g, "") },
                }))
              }
            />
            <FieldText
              id="whatsapp-cta-label"
              label="نص الزر"
              value={settings.whatsapp.ctaLabel}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  whatsapp: { ...current.whatsapp, ctaLabel: value },
                }))
              }
            />
            <FieldArea
              id="whatsapp-message-template"
              label="رسالة واتساب"
              hint="المتاح: {{section}} {{discount}} {{hours}} {{page}}"
              value={settings.whatsapp.messageTemplate}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  whatsapp: { ...current.whatsapp, messageTemplate: value },
                }))
              }
            />
          </div>
        </section>

        <section className={styles.panel}>
          <h2>أسماء السكاشن</h2>
          <div className={styles.field}>
            <label htmlFor="section-overrides">JSON لأسماء السكاشن</label>
            <textarea
              id="section-overrides"
              value={overridesJson}
              onChange={(event) => setOverridesJson(event.target.value)}
            />
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.actions}>
            <button className={styles.primary} type="submit">حفظ الإعدادات</button>
            <button
              className={styles.secondary}
              type="button"
              onClick={() => {
                setSettings(defaultOfferFunnelSettings);
                setOverridesJson(JSON.stringify(defaultOfferFunnelSettings.sectionLabelOverrides, null, 2));
                setStatus("رجعنا القيم الافتراضية داخل الصفحة. اضغط حفظ لو عايز تثبتها.");
              }}
            >
              رجع الافتراضي
            </button>
          </div>
          <p className={styles.status}>{status}</p>
        </section>
      </form>
    </main>
  );
}

function FieldText({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}

function FieldNumber({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value || 0))}
      />
    </div>
  );
}

function FieldArea({
  id,
  label,
  hint,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} value={value} onChange={(event) => onChange(event.target.value)} />
      <span>{hint}</span>
    </div>
  );
}
