"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Button, TextAreaField, TextField } from "@/components/ui";
import type { ContactFormModel } from "../page-composers/types";
import styles from "./contact-public-page.module.css";

export function ContactInquiryForm({ form }: { form: ContactFormModel }) {
  const searchParams = useSearchParams();

  const defaults = useMemo(() => {
    const services = (searchParams.get("services") ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    return {
      name: searchParams.get("name") ?? "",
      phone: searchParams.get("phone") ?? "",
      services,
      notes: searchParams.get("notes") ?? "",
    };
  }, [searchParams]);

  return (
    <form
      className={styles.formCard}
      id={form.elementId}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className={styles.formHeader}>
        <h2>{form.title}</h2>
        <p>{form.summary}</p>
      </div>

      <div className={styles.formFields}>
        <TextField defaultValue={defaults.name} id="contactName" label="الاسم" placeholder="اكتب اسمك" />
        <TextField
          defaultValue={defaults.phone}
          id="contactPhone"
          inputMode="tel"
          label="رقم الهاتف"
          placeholder="010xxxxxxxx"
        />
        <label className={styles.selectField} htmlFor="serviceSelect">
          <span className={styles.selectLabel}>الخدمات المطلوبة</span>
          <select className={styles.selectInput} defaultValue={defaults.services} id="serviceSelect" multiple>
            {form.serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className={styles.selectHelper}>يمكنك اختيار أكثر من خدمة حسب احتياجك الحالي.</span>
        </label>
        <TextAreaField
          defaultValue={defaults.notes}
          id="contactNotes"
          label={form.notesLabel}
          placeholder="اكتب نبذة سريعة عن المشروع أو التحدي الحالي."
        />
      </div>

      <div className={styles.formActions}>
        <Button type="submit">{form.submitLabel}</Button>
      </div>
    </form>
  );
}
