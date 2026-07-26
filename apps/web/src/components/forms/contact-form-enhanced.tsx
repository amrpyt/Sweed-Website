"use client";

import { useState } from "react";
import { showToast } from "@/components/ui/toast";
import { InputEnhanced } from "@/components/ui/input-enhanced";
import styles from "./contact-form-enhanced.module.css";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export function ContactFormEnhanced() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "الاسم مطلوب";
        if (value.trim().length < 2) return "الاسم يجب أن يكون على الأقل حرفين";
        return "";
      case "email":
        if (!value.trim()) return "البريد الإلكتروني مطلوب";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "البريد الإلكتروني غير صحيح";
        return "";
      case "phone":
        if (!value.trim()) return "رقم الهاتف مطلوب";
        if (!/^[0-9+\-\s()]{10,}$/.test(value)) return "رقم الهاتف غير صحيح";
        return "";
      case "message":
        if (!value.trim()) return "الرسالة مطلوبة";
        if (value.trim().length < 10) return "الرسالة يجب أن تكون على الأقل 10 أحرف";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    const error = validateField(name as keyof FormData, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key as keyof FormData, formData[key as keyof FormData]);
      if (error) newErrors[key as keyof FormData] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({
        name: true,
        email: true,
        phone: true,
        message: true,
      });
      showToast({
        type: "error",
        title: "خطأ في النموذج",
        message: "يرجى تصحيح الأخطاء وإعادة المحاولة",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      showToast({
        type: "success",
        title: "تم إرسال الرسالة بنجاح",
        message: "سنتواصل معك في أقرب وقت ممكن",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setTouched({});
    } catch {
      showToast({
        type: "error",
        title: "حدث خطأ",
        message: "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGrid}>
        <InputEnhanced
          label="الاسم الكامل"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          errorText={touched.name ? errors.name : ""}
          isRequired
          placeholder="أدخل اسمك الكامل"
          disabled={isSubmitting}
        />

        <InputEnhanced
          label="البريد الإلكتروني"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          errorText={touched.email ? errors.email : ""}
          isRequired
          placeholder="example@email.com"
          disabled={isSubmitting}
        />
      </div>

      <InputEnhanced
        label="رقم الهاتف"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        errorText={touched.phone ? errors.phone : ""}
        helperText="مثال: 01012345678"
        isRequired
        placeholder="01XXXXXXXXX"
        disabled={isSubmitting}
      />

      <div className={styles.textareaGroup}>
        <label htmlFor="message" className={styles.label}>
          الرسالة
          <span className={styles.required}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          className={`${styles.textarea} ${touched.message && errors.message ? styles.textareaError : ""}`}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="اكتب رسالتك هنا..."
          rows={5}
          maxLength={500}
          disabled={isSubmitting}
          aria-invalid={touched.message && !!errors.message}
          aria-describedby={touched.message && errors.message ? "message-error" : undefined}
        />
        {touched.message && errors.message && (
          <p id="message-error" className={styles.errorText} role="alert">
            {errors.message}
          </p>
        )}
        <p className={styles.characterCount}>
          {formData.message.length} / 500
        </p>
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className={styles.spinner} aria-hidden="true" />
            <span>جاري الإرسال...</span>
          </>
        ) : (
          <>
            <span>إرسال الرسالة</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
