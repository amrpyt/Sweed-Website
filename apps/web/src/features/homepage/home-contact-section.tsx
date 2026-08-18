"use client";

import { FormEvent, type ReactNode, useState } from "react";
import { BrandActionButtonContent, getBrandActionButtonClassName } from "@/components/ui/brand-action-button";
import { homepageContent } from "@/content/homepage";
import { useHomeConversion } from "./home-conversion-context";
import styles from "./home-contact-section.module.css";

type FormValues = {
  name: string;
  phone: string;
  activityType: string;
  activityLocation: string;
  requestType: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues | "form", string>>;
type SubmitState = "idle" | "submitting" | "success" | "error";

const initialValues: FormValues = {
  name: "",
  phone: "",
  activityType: "",
  activityLocation: "",
  requestType: "",
  message: "",
};

export function HomeContactSection() {
  const { selection } = useHomeConversion();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function updateField<Key extends keyof FormValues>(key: Key, value: FormValues[Key]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined, form: undefined }));
    if (submitState !== "idle") setSubmitState("idle");
  }

  function validate(formValues: FormValues) {
    const nextErrors: FormErrors = {};
    if (formValues.name.trim().length < 2) nextErrors.name = "اكتب اسمك بحرفين على الأقل";
    if (!/^[0-9+()\-\s]{8,40}$/.test(formValues.phone.trim())) nextErrors.phone = "اكتب رقم واتساب صحيح";
    if (formValues.activityType.trim().length < 2) nextErrors.activityType = "اكتب نوع نشاطك";
    if (formValues.activityLocation.trim().length < 3) nextErrors.activityLocation = "اكتب عنوان النشاط أو موقعه";
    if (!formValues.requestType) nextErrors.requestType = "اختار نوع الطلب";
    if (formValues.message.trim().length < 10) nextErrors.message = "اكتب نبذة من 10 أحرف على الأقل";
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submittedForm = new FormData(event.currentTarget);
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setSubmitState("error");
      return;
    }

    setSubmitState("submitting");

    try {
      const response = await fetch("/api/contact-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          interest: selection.offer || selection.service || values.requestType,
          website: submittedForm.get("website"),
          selectedProblem: selection.problem ?? "",
          selectedService: selection.service ?? "",
          selectedOffer: selection.offer ?? "",
          source: selection.source ?? "homepage-contact",
        }),
      });
      const payload = (await response.json()) as { ok?: boolean; errors?: FormErrors };

      if (!response.ok || !payload.ok) {
        setErrors(payload.errors ?? { form: "تعذر إرسال الطلب الآن" });
        setSubmitState("error");
        return;
      }

      setValues(initialValues);
      setErrors({});
      setSubmitState("success");
    } catch {
      setErrors({ form: "تعذر الاتصال بالخادم. جرّب مرة أخرى أو استخدم واتساب." });
      setSubmitState("error");
    }
  }

  return (
    <section className={styles.section} id="contact" aria-labelledby="home-contact-title">
      <div className={styles.container}>
        <div className={styles.copyColumn}>
          <p className={styles.eyebrow}>اتصل بنا</p>
          <h2 id="home-contact-title">{homepageContent.contact.title}</h2>
          <div className={styles.contactIntro}>
            {homepageContent.contact.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <div className={styles.contactMethods}>
            <a href={`tel:${homepageContent.contact.phone.replace(/\s/g, "")}`}>
              <i className="fas fa-phone" aria-hidden="true" />
              <span>
                <small>اتصل بنا</small>
                <strong dir="ltr">{homepageContent.contact.phone}</strong>
              </span>
            </a>
            <a href={homepageContent.contact.whatsappHref} target="_blank" rel="noreferrer">
              <i className="fab fa-whatsapp" aria-hidden="true" />
              <span>
                <small>واتساب</small>
                <strong>ابدأ محادثة مباشرة</strong>
              </span>
            </a>
          </div>

          {selection.problem || selection.offer ? (
            <div className={styles.contextSummary} data-testid="home-contact-context-summary">
              <span>هنكمل معاك من حيث بدأت:</span>
              <strong>{selection.offer || selection.problem}</strong>
            </div>
          ) : null}
        </div>

        <form className={styles.form} data-testid="home-contact-form" noValidate onSubmit={handleSubmit}>
          <label className={styles.honeypot} aria-hidden="true">
            <span>اترك هذا الحقل فارغًا</span>
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
          <input type="hidden" name="selectedProblem" value={selection.problem ?? ""} readOnly />
          <input type="hidden" name="selectedService" value={selection.service ?? ""} readOnly />
          <input type="hidden" name="selectedOffer" value={selection.offer ?? ""} readOnly />
          <input type="hidden" name="source" value={selection.source ?? "homepage-contact"} readOnly />

          <div className={styles.formIntro}>
            <p>احجز استشارتك المجانية</p>
            <span>سطرين عن مشروعك كفاية عشان نبدأ الحوار من مكان واضح.</span>
          </div>

          <div className={styles.fieldsGrid}>
            <Field label="اسمك" error={errors.name} errorId="home-contact-name-error">
              <input
                autoComplete="name"
                name="name"
                type="text"
                placeholder="اكتب اسمك"
                value={values.name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "home-contact-name-error" : undefined}
                onChange={(event) => updateField("name", event.target.value)}
              />
            </Field>

            <Field label="رقم الموبايل (واتساب)" error={errors.phone} errorId="home-contact-phone-error">
              <input
                autoComplete="tel"
                inputMode="tel"
                name="phone"
                type="tel"
                dir="ltr"
                placeholder="01xxxxxxxxx"
                value={values.phone}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "home-contact-phone-error" : undefined}
                onChange={(event) => updateField("phone", event.target.value)}
              />
            </Field>
          </div>

          <div className={styles.fieldsGrid}>
            <Field label="نوع النشاط" error={errors.activityType} errorId="home-contact-activity-error">
              <input
                autoComplete="organization-title"
                name="activityType"
                type="text"
                placeholder="نوع نشاطك إيه؟"
                value={values.activityType}
                aria-invalid={Boolean(errors.activityType)}
                aria-describedby={errors.activityType ? "home-contact-activity-error" : undefined}
                onChange={(event) => updateField("activityType", event.target.value)}
              />
            </Field>

            <Field label="عنوان النشاط" error={errors.activityLocation} errorId="home-contact-location-error">
              <input
                autoComplete="street-address"
                name="activityLocation"
                type="text"
                placeholder="الدولة – المحافظة – المدينة أو المركز"
                value={values.activityLocation}
                aria-invalid={Boolean(errors.activityLocation)}
                aria-describedby={errors.activityLocation ? "home-contact-location-error" : undefined}
                onChange={(event) => updateField("activityLocation", event.target.value)}
              />
            </Field>
          </div>

          <Field label="محتاج إيه؟" error={errors.requestType} errorId="home-contact-request-error">
            <select
              name="requestType"
              value={values.requestType}
              aria-invalid={Boolean(errors.requestType)}
              aria-describedby={errors.requestType ? "home-contact-request-error" : undefined}
              onChange={(event) => updateField("requestType", event.target.value)}
            >
              <option value="">اختار: استشارة / خدمة / باقة</option>
              <option value="استشارة">استشارة</option>
              <option value="خدمة">خدمة</option>
              <option value="باقة">باقة</option>
            </select>
          </Field>

          <Field label="احكيلنا عن مشروعك" error={errors.message} errorId="home-contact-message-error">
            <textarea
              name="message"
              rows={4}
              maxLength={2000}
              value={values.message}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "home-contact-message-error" : undefined}
              placeholder="سطرين كفاية: نشاطك إيه، وأكبر تحدي عندك دلوقتي"
              onChange={(event) => updateField("message", event.target.value)}
            />
          </Field>

          <button
            className={getBrandActionButtonClassName({ size: "compact" })}
            type="submit"
            disabled={submitState === "submitting"}
            aria-busy={submitState === "submitting"}
          >
            <BrandActionButtonContent>
              {submitState === "submitting" ? "جاري إرسال الطلب..." : "ابعت طلبك"}
            </BrandActionButtonContent>
          </button>

          <div className={styles.formStatus} aria-live="polite" data-state={submitState}>
            {submitState === "success" ? homepageContent.contact.successMessage : null}
            {submitState === "error" && errors.form ? errors.form : null}
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  errorId,
  children,
}: {
  label: string;
  error?: string;
  errorId: string;
  children: ReactNode;
}) {
  return (
    <label>
      <span>{label}</span>
      {children}
      {error ? <small id={errorId} role="alert">{error}</small> : null}
    </label>
  );
}
