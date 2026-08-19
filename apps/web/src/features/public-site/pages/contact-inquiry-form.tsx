"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { ContactFormModel } from "../page-composers/types";
import {
  buildContactLeadPayload,
  type ContactInquiryContext,
  type ContactInquiryErrors,
  type ContactInquiryValues,
  validateContactInquiry,
} from "./contact-inquiry-form.logic";
import styles from "./contact-public-page.module.css";

type SubmitState = "idle" | "submitting" | "success" | "error";

const emptyValues: ContactInquiryValues = {
  name: "",
  company: "",
  phone: "",
  service: "",
  notes: "",
};

export function ContactInquiryForm({
  form,
  defaultService,
  source = "contact-page",
}: {
  form: ContactFormModel;
  defaultService?: string;
  source?: string;
}) {
  const searchParams = useSearchParams();
  const initialState = useMemo(
    () => getInitialState(form, searchParams, { defaultService, source }),
    [defaultService, form, searchParams, source],
  );
  const [values, setValues] = useState<ContactInquiryValues>(initialState.values);
  const [errors, setErrors] = useState<ContactInquiryErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function updateField<Key extends keyof ContactInquiryValues>(key: Key, value: ContactInquiryValues[Key]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined, form: undefined }));
    if (submitState !== "idle") setSubmitState("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextErrors = validateContactInquiry(values);
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
        body: JSON.stringify(
          buildContactLeadPayload(values, initialState.context, String(formData.get("website") ?? "")),
        ),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        errors?: Record<string, string>;
      };

      if (!response.ok || !payload.ok) {
        setErrors(mapServerErrors(payload.errors));
        setSubmitState("error");
        return;
      }

      setValues(emptyValues);
      setErrors({});
      setSubmitState("success");
    } catch {
      setErrors({ form: "تعذر الاتصال بالخادم. جرّب مرة أخرى أو استخدم واتساب." });
      setSubmitState("error");
    }
  }

  return (
    <form className={styles.formCard} id={form.elementId} noValidate onSubmit={handleSubmit} data-testid="contact-inquiry-form">
      <div className={styles.honeypot} aria-hidden="true">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      </div>

      <div className={styles.formHeader}>
        <h2 id="contact-form-title">{form.title}</h2>
        <p>{form.summary}</p>
      </div>

      <div className={styles.formFields}>
        <div className={styles.fieldGrid}>
          <Field label="الاسم الكامل" required error={errors.name} errorId="contact-name-error">
            <input
              id="contactName"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              placeholder="اكتب اسمك"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              onChange={(event) => updateField("name", event.target.value)}
            />
          </Field>

          <Field label="الشركة" errorId="contact-company-error">
            <input
              id="contactCompany"
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={160}
              value={values.company}
              placeholder="اسم الشركة (اختياري)"
              onChange={(event) => updateField("company", event.target.value)}
            />
          </Field>

          <Field label="رقم الهاتف" required error={errors.phone} errorId="contact-phone-error">
            <input
              id="contactPhone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              dir="ltr"
              value={values.phone}
              placeholder="01xxxxxxxxx"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "contact-phone-error" : undefined}
              onChange={(event) => updateField("phone", event.target.value)}
            />
          </Field>
        </div>

        <Field label="نوع الخدمة المطلوبة" required error={errors.service} errorId="contact-service-error">
          <select
            id="contactService"
            name="service"
            value={values.service}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "contact-service-error" : undefined}
            onChange={(event) => updateField("service", event.target.value)}
          >
            <option value="">اختر الخدمة</option>
            {form.serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label={form.notesLabel} required error={errors.notes} errorId="contact-notes-error">
          <textarea
            id="contactNotes"
            name="notes"
            rows={5}
            maxLength={2000}
            value={values.notes}
            placeholder="احكيلنا عن مشروعك والتحدي اللي عايز تبدأ منه"
            aria-invalid={Boolean(errors.notes)}
            aria-describedby={errors.notes ? "contact-notes-error" : undefined}
            onChange={(event) => updateField("notes", event.target.value)}
          />
        </Field>
      </div>

      <div className={styles.formActions}>
        <Button type="submit" size="compact" disabled={submitState === "submitting"} aria-busy={submitState === "submitting"}>
          {submitState === "submitting" ? "جاري إرسال الرسالة..." : form.submitLabel}
        </Button>
        {initialState.context.selectedOffer ? (
          <p className={styles.contextNote}>هنحتفظ بسياق الباقة اللي اخترتها: {initialState.context.selectedOffer}</p>
        ) : null}
      </div>

      <div className={styles.formStatus} aria-live="polite" data-state={submitState}>
        {submitState === "success" ? "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً" : null}
        {submitState === "error" && errors.form ? errors.form : null}
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  errorId,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  errorId: string;
  children: React.ReactNode;
}) {
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </span>
      {children}
      {error ? <span className={styles.fieldError} id={errorId}>{error}</span> : null}
    </label>
  );
}

function getInitialState(
  form: ContactFormModel,
  searchParams: URLSearchParams,
  defaults: { defaultService?: string; source: string },
) {
  const requestedService =
    searchParams.get("service") ??
    searchParams.get("selectedService") ??
    searchParams.get("services")?.split(",")[0]?.trim() ??
    defaults.defaultService ??
    "";
  const normalizedService = requestedService === "software-development" ? "development" : requestedService;
  const service = form.serviceOptions.some((option) => option.value === normalizedService) ? normalizedService : "";
  const selectedOffer = searchParams.get("package") ?? searchParams.get("offer") ?? searchParams.get("selectedOffer") ?? "";
  const context: ContactInquiryContext = {
    source: searchParams.get("source") ?? defaults.source,
    selectedService: service || undefined,
    selectedOffer: selectedOffer || undefined,
  };

  return {
    context,
    values: {
      name: searchParams.get("name") ?? "",
      company: searchParams.get("company") ?? "",
      phone: searchParams.get("phone") ?? "",
      service,
      notes: searchParams.get("notes") ?? "",
    } satisfies ContactInquiryValues,
  };
}

function mapServerErrors(errors?: Record<string, string>): ContactInquiryErrors {
  if (!errors) return { form: "تعذر إرسال الطلب الآن. جرّب مرة أخرى أو استخدم واتساب." };

  return {
    name: errors.name,
    phone: errors.phone,
    service: errors.interest,
    notes: errors.message,
    form: errors.form,
  };
}
