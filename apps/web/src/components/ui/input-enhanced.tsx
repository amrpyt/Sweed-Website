import type { InputHTMLAttributes } from "react";
import styles from "./input-enhanced.module.css";

type InputEnhancedProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  errorText?: string;
  successText?: string;
  showCharacterCount?: boolean;
  isRequired?: boolean;
};

export function InputEnhanced({
  label,
  helperText,
  errorText,
  successText,
  showCharacterCount,
  isRequired,
  maxLength,
  value,
  className = "",
  id,
  ...props
}: InputEnhancedProps) {
  const inputId = id || `input-${Math.random().toString(36).slice(2)}`;
  const hasError = !!errorText;
  const hasSuccess = !!successText && !hasError;
  const currentLength = value?.toString().length || 0;
  const isOverLimit = maxLength ? currentLength > maxLength : false;

  return (
    <div className={styles.inputGroup}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {isRequired && <span className={styles.required} aria-label="required">*</span>}
        </label>
      )}
      
      <div className={styles.inputWrapper}>
        <input
          id={inputId}
          className={`${styles.input} ${hasError ? styles.inputError : ""} ${hasSuccess ? styles.inputSuccess : ""} ${hasError || hasSuccess ? styles.inputWithIcon : ""} ${className}`}
          value={value}
          maxLength={maxLength}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          {...props}
        />
        
        {hasError && (
          <span className={`${styles.inputIcon} ${styles.inputIconError}`} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          </span>
        )}
        
        {hasSuccess && (
          <span className={`${styles.inputIcon} ${styles.inputIconSuccess}`} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
        )}
      </div>
      
      {errorText && (
        <p id={`${inputId}-error`} className={styles.errorText} role="alert">
          {errorText}
        </p>
      )}
      
      {successText && !errorText && (
        <p className={styles.successText}>
          {successText}
        </p>
      )}
      
      {helperText && !errorText && !successText && (
        <p id={`${inputId}-helper`} className={styles.helperText}>
          {helperText}
        </p>
      )}
      
      {showCharacterCount && maxLength && (
        <p className={`${styles.characterCount} ${isOverLimit ? styles.characterCountOver : ""}`}>
          {currentLength} / {maxLength}
        </p>
      )}
    </div>
  );
}
