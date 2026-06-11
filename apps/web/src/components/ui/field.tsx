import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import styles from "./field.module.css";

type SharedFieldProps = {
  label: string;
  helper?: ReactNode;
  error?: ReactNode;
};

export function TextField({
  label,
  helper,
  error,
  id,
  ...props
}: SharedFieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={styles.field} htmlFor={id}>
      <span className={styles.label}>{label}</span>
      <input className={styles.input} id={id} aria-invalid={Boolean(error)} {...props} />
      {helper ? <span className={styles.helper}>{helper}</span> : null}
      {error ? <span className={styles.error}>{error}</span> : null}
    </label>
  );
}

export function TextAreaField({
  label,
  helper,
  error,
  id,
  ...props
}: SharedFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className={styles.field} htmlFor={id}>
      <span className={styles.label}>{label}</span>
      <textarea className={styles.textarea} id={id} aria-invalid={Boolean(error)} {...props} />
      {helper ? <span className={styles.helper}>{helper}</span> : null}
      {error ? <span className={styles.error}>{error}</span> : null}
    </label>
  );
}

