"use client";

import { useEffect, useState } from "react";
import styles from "./toast.module.css";

type ToastType = "success" | "error" | "warning" | "info";

export type Toast = {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
};

const toasts: Toast[] = [];
const listeners: Set<() => void> = new Set();

export function showToast(toast: Omit<Toast, "id">) {
  const id = Math.random().toString(36).slice(2);
  toasts.push({ ...toast, id });
  listeners.forEach((listener) => listener());
  
  const duration = toast.duration ?? 5000;
  setTimeout(() => {
    removeToast(id);
  }, duration);
}

function removeToast(id: string) {
  const index = toasts.findIndex((t) => t.id === id);
  if (index !== -1) {
    toasts.splice(index, 1);
    listeners.forEach((listener) => listener());
  }
}

export function ToastContainer() {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const listener = () => forceUpdate({});
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className={styles.toastContainer} role="region" aria-label="Notifications">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  const icons = {
    success: "✓",
    error: "✕",
    warning: "!",
    info: "i",
  };

  return (
    <div className={`${styles.toast} ${styles[`toast${toast.type.charAt(0).toUpperCase() + toast.type.slice(1)}`]} ${isExiting ? styles.exiting : ""}`} role="alert">
      <div className={styles.toastIcon}>{icons[toast.type]}</div>
      <div className={styles.toastContent}>
        <h3 className={styles.toastTitle}>{toast.title}</h3>
        {toast.message && <p className={styles.toastMessage}>{toast.message}</p>}
      </div>
      <button className={styles.toastClose} onClick={handleClose} aria-label="Close notification" type="button">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
