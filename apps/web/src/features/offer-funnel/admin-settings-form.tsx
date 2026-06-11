"use client";

import { RotateCcw, Save } from "lucide-react";
import type { HTMLAttributes } from "react";
import { useMemo, useState } from "react";
import { defaultOfferFunnelSettings, type OfferFunnelSettings } from "./contracts";
import { normalizeEgyptWhatsAppPhone } from "./whatsapp";
import styles from "./admin-settings-form.module.css";

function parseOverrides(value: string) {
  if (!value.trim()) return {};
  return JSON.parse(value) as Record<string, string>;
}

export function AdminOfferFunnelSettingsForm({ initialSettings }: { initialSettings: OfferFunnelSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [overridesJson, setOverridesJson] = useState(JSON.stringify(initialSettings.sectionLabelOverrides, null, 2));
  const [status, setStatus] = useState("");
  const normalizedPhone = useMemo(() => normalizeEgyptWhatsAppPhone(settings.whatsapp.phone), [settings.whatsapp.phone]);

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
    <main className={styles.page} dir="rtl">
      <form className={styles.shell} onSubmit={handleSubmit}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>SWEED Admin</p>
            <h1>إعدادات العروض والواتساب</h1>
            <p>صفحة بسيطة للتحكم في ظهور العروض ورسالة واتساب بدون تعديل الكود.</p>
          </div>
          <div className={styles.actions}>
            <button className={styles.secondary} type="button" onClick={() => {
              setSettings(defaultOfferFunnelSettings);
              setOverridesJson(JSON.stringify(defaultOfferFunnelSettings.sectionLabelOverrides, null, 2));
              setStatus("رجعنا القيم الافتراضية داخل الصفحة. اضغط حفظ لتثبيتها.");
            }}>
              <RotateCcw size={18} />
              الافتراضي
            </button>
            <button className={styles.primary} type="submit">
              <Save size={18} />
              حفظ
            </button>
          </div>
        </header>

        {status ? <p className={styles.status}>{status}</p> : null}

        <section className={styles.section}>
          <SectionTitle title="تشغيل عام" note="لو قفلت هذا الخيار، كل الـpopups هتتوقف." />
          <ToggleField
            id="enabled"
            label="تشغيل نظام العروض"
            note="المفتاح الرئيسي لكل العروض."
            checked={settings.enabled}
            onChange={(checked) => setSettings((current) => ({ ...current, enabled: checked }))}
          />
        </section>

        <section className={styles.section}>
          <SectionTitle title="عرض السكشن" note="يظهر لما العميل يقف داخل سكشن محدد مدة معينة." />
          <div className={styles.grid}>
            <ToggleField
              id="section-enabled"
              label="تفعيل عرض السكشن"
              note="شغل أو اقفل popup المرتبط بالسكشن."
              checked={settings.sectionOffer.enabled}
              onChange={(checked) =>
                setSettings((current) => ({
                  ...current,
                  sectionOffer: { ...current.sectionOffer, enabled: checked },
                }))
              }
            />
            <FieldNumber
              id="section-dwell-seconds"
              label="وقت الانتظار"
              note="بعد كام ثانية داخل السكشن يظهر العرض."
              value={settings.sectionOffer.dwellSeconds}
              suffix="ثانية"
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
              note="النسبة التي تظهر داخل نص العرض."
              value={settings.sectionOffer.discountPercent}
              suffix="%"
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  sectionOffer: { ...current.sectionOffer, discountPercent: value },
                }))
              }
            />
            <FieldNumber
              id="section-offer-hours"
              label="مدة العرض"
              note="عدد الساعات المكتوبة للعميل."
              value={settings.sectionOffer.offerHours}
              suffix="ساعة"
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  sectionOffer: { ...current.sectionOffer, offerHours: value },
                }))
              }
            />
            <FieldNumber
              id="section-cooldown-hours"
              label="فاصل التكرار"
              note="يمنع ظهور نفس العرض كل مرة."
              value={settings.sectionOffer.cooldownHours}
              suffix="ساعة"
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  sectionOffer: { ...current.sectionOffer, cooldownHours: value },
                }))
              }
            />
            <FieldText
              id="section-title"
              label="عنوان العرض"
              note="العنوان الظاهر أعلى popup."
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
              label="نص الزر"
              note="الكلام المكتوب على زر واتساب."
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
              note="استخدم المتغيرات: {{section}} {{discount}} {{hours}} {{page}}"
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

        <section className={styles.section}>
          <SectionTitle title="عرض الموقع" note="عرض عام يظهر بعد وقت معين في أي صفحة." />
          <div className={styles.grid}>
            <ToggleField
              id="site-enabled"
              label="تفعيل عرض الموقع"
              note="شغل أو اقفل popup العام."
              checked={settings.siteOffer.enabled}
              onChange={(checked) =>
                setSettings((current) => ({
                  ...current,
                  siteOffer: { ...current.siteOffer, enabled: checked },
                }))
              }
            />
            <FieldNumber
              id="site-dwell-seconds"
              label="وقت الانتظار"
              note="بعد كام ثانية داخل الموقع يظهر العرض."
              value={settings.siteOffer.dwellSeconds}
              suffix="ثانية"
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
              note="النسبة الظاهرة في العرض العام."
              value={settings.siteOffer.discountPercent}
              suffix="%"
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  siteOffer: { ...current.siteOffer, discountPercent: value },
                }))
              }
            />
            <FieldText
              id="site-title"
              label="عنوان العرض"
              note="العنوان الظاهر للعرض العام."
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
              note="استخدم المتغيرات: {{section}} {{discount}} {{hours}} {{page}}"
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

        <section className={styles.section}>
          <SectionTitle title="واتساب" note="اكتب الرقم المصري عادي. النظام يحوله تلقائيًا للصيغة الدولية." />
          <div className={styles.grid}>
            <ToggleField
              id="wa-enabled"
              label="تفعيل واتساب"
              note="لو اتقفل، زر واتساب لن يظهر."
              checked={settings.whatsapp.enabled}
              onChange={(checked) =>
                setSettings((current) => ({
                  ...current,
                  whatsapp: { ...current.whatsapp, enabled: checked },
                }))
              }
            />
            <ToggleField
              id="wa-pulse"
              label="نبض الزر"
              note="يجعل زر واتساب أكثر لفتًا للانتباه."
              checked={settings.whatsapp.pulseCta}
              onChange={(checked) =>
                setSettings((current) => ({
                  ...current,
                  whatsapp: { ...current.whatsapp, pulseCta: checked },
                }))
              }
            />
            <FieldText
              id="whatsapp-phone"
              label="رقم واتساب"
              note={`الرابط النهائي يستخدم: ${normalizedPhone || "اكتب الرقم"}`}
              inputMode="tel"
              dir="ltr"
              value={settings.whatsapp.phone}
              onChange={(value) =>
                setSettings((current) => ({
                  ...current,
                  whatsapp: { ...current.whatsapp, phone: value },
                }))
              }
            />
            <FieldText
              id="whatsapp-cta-label"
              label="نص زر واتساب"
              note="النص الظاهر للعميل داخل popup."
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
              note="الرسالة الجاهزة التي تظهر للعميل قبل الإرسال."
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

        <section className={styles.section}>
          <SectionTitle title="أسماء السكاشن" note="اختياري. اربط ID السكشن باسم مفهوم يظهر في الرسالة." />
          <FieldArea
            id="section-overrides"
            label="JSON أسماء السكاشن"
            note='مثال: { "services": "الخدمات" }'
            dir="ltr"
            value={overridesJson}
            onChange={setOverridesJson}
          />
        </section>
      </form>
    </main>
  );
}

function SectionTitle({ title, note }: { title: string; note: string }) {
  return (
    <div className={styles.sectionTitle}>
      <h2>{title}</h2>
      <p>{note}</p>
    </div>
  );
}

function ToggleField({
  id,
  label,
  note,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  note: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className={styles.toggle} htmlFor={id}>
      <input id={id} type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span aria-hidden="true" />
      <span>
        <strong>{label}</strong>
        <small>{note}</small>
      </span>
    </label>
  );
}

function FieldText({
  id,
  label,
  note,
  value,
  inputMode,
  dir,
  onChange,
}: {
  id: string;
  label: string;
  note: string;
  value: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  dir?: "rtl" | "ltr";
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <input id={id} dir={dir} inputMode={inputMode} value={value} onChange={(event) => onChange(event.target.value)} />
      <small>{note}</small>
    </div>
  );
}

function FieldNumber({
  id,
  label,
  note,
  suffix,
  value,
  onChange,
}: {
  id: string;
  label: string;
  note: string;
  suffix?: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.numberWrap}>
        <input
          id={id}
          type="number"
          value={value}
          onChange={(event) => onChange(Number(event.target.value || 0))}
        />
        {suffix ? <span>{suffix}</span> : null}
      </div>
      <small>{note}</small>
    </div>
  );
}

function FieldArea({
  id,
  label,
  note,
  dir,
  value,
  onChange,
}: {
  id: string;
  label: string;
  note: string;
  dir?: "rtl" | "ltr";
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.fieldWide}>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} dir={dir} value={value} onChange={(event) => onChange(event.target.value)} />
      <small>{note}</small>
    </div>
  );
}
