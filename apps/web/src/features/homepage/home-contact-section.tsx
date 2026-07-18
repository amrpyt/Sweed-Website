"use client";

import { FormEvent, useMemo, useState } from "react";
import { homepageContent } from "@/content/homepage";
import { useHomeConversion } from "./home-conversion-context";
import styles from "./home-contact-section.module.css";

type FormValues = {
  name: string;
  phone: string;
  interest: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues | "form", string>>;
type SubmitState = "idle" | "submitting" | "success" | "error";

const initialValues: FormValues = {
  name: "",
  phone: "",
  interest: "",
  message: "",
};

export function HomeContactSection() {
  const { selection } = useHomeConversion();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const interestOptions = useMemo(
    () => [
      ...homepageContent.services.map((service) => ({
        value: service.href?.split("#")[1] ?? service.title,
        label: service.title,
      })),
      ...homepageContent.offers.map((offer) => ({ value: offer.title, label: offer.title })),
    ],
    [],
  );

  const contextInterest = selection.offer || selection.service || "";
  const effectiveInterest = values.interest || contextInterest;

  function validate(formValues: FormValues) {
    const nextErrors: FormErrors = {};
    if (formValues.name.trim().length < 2) nextErrors.name = "اكتب اسمك بحرفين على الأقل";
    if (!/^[0-9+()\-\s]{8,40}$/.test(formValues.phone.trim())) nextErrors.phone = "اكتب رقم هاتف صحيح";
    if (!formValues.interest) nextErrors.interest = "اختر الخدمة أو الباقة الأقرب لك";
    if (formValues.message.trim().length < 10) nextErrors.message = "اكتب نبذة من 10 أحرف على الأقل";
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submittedForm = new FormData(event.currentTarget);
    const effectiveValues = { ...values, interest: effectiveInterest };
    const nextErrors = validate(effectiveValues);
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
          ...effectiveValues,
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
          <p>{homepageContent.contact.summary}</p>

          <div className={styles.contactMethods}>
            <a href="tel:+201068274662">
              <i className="fas fa-phone" aria-hidden="true" />
              <span>
                <small>اتصل بنا</small>
                <strong dir="ltr">+20 106 827 4662</strong>
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
            <span>املأ البيانات الأساسية وسنراجع طلبك قبل التواصل.</span>
          </div>

          <div className={styles.fieldsGrid}>
            <label>
              <span>الاسم</span>
              <input
                autoComplete="name"
                name="name"
                type="text"
                value={values.name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "home-contact-name-error" : undefined}
                onChange={(event) => {
                  setValues((current) => ({ ...current, name: event.target.value }));
                  setErrors((current) => ({ ...current, name: undefined, form: undefined }));
                }}
              />
              {errors.name ? <small id="home-contact-name-error" role="alert">{errors.name}</small> : null}
            </label>

            <label>
              <span>رقم الموبايل</span>
              <input
                autoComplete="tel"
                inputMode="tel"
                name="phone"
                type="tel"
                dir="ltr"
                value={values.phone}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "home-contact-phone-error" : undefined}
                onChange={(event) => {
                  setValues((current) => ({ ...current, phone: event.target.value }));
                  setErrors((current) => ({ ...current, phone: undefined, form: undefined }));
                }}
              />
              {errors.phone ? <small id="home-contact-phone-error" role="alert">{errors.phone}</small> : null}
            </label>
          </div>

          <label>
            <span>الخدمة أو الباقة</span>
            <select
              name="interest"
              value={effectiveInterest}
              aria-invalid={Boolean(errors.interest)}
              aria-describedby={errors.interest ? "home-contact-interest-error" : undefined}
              onChange={(event) => {
                setValues((current) => ({ ...current, interest: event.target.value }));
                setErrors((current) => ({ ...current, interest: undefined, form: undefined }));
              }}
            >
              <option value="">اختر الأقرب لاحتياجك</option>
              {interestOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.interest ? <small id="home-contact-interest-error" role="alert">{errors.interest}</small> : null}
          </label>

          <label>
            <span>رسالتك</span>
            <textarea
              name="message"
              rows={4}
              maxLength={2000}
              value={values.message}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "home-contact-message-error" : undefined}
              placeholder="اكتب نبذة سريعة عن مشروعك أو التحدي الحالي"
              onChange={(event) => {
                setValues((current) => ({ ...current, message: event.target.value }));
                setErrors((current) => ({ ...current, message: undefined, form: undefined }));
              }}
            />
            {errors.message ? <small id="home-contact-message-error" role="alert">{errors.message}</small> : null}
          </label>

          <button type="submit" disabled={submitState === "submitting"} aria-busy={submitState === "submitting"}>
            {submitState === "submitting" ? "جاري إرسال الطلب..." : "أرسل طلب الاستشارة"}
            <i className="fas fa-arrow-left" aria-hidden="true" />
          </button>

          <div className={styles.formStatus} aria-live="polite" data-state={submitState}>
            {submitState === "success" ? "تم استلام طلبك بنجاح. سنتواصل معك في أقرب وقت." : null}
            {submitState === "error" && errors.form ? errors.form : null}
          </div>
        </form>
      </div>
    </section>
  );
}
