"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { OfferComparisonSource } from "@/content/public-site/offers-page";
import styles from "./package-comparison.module.css";

type PackageComparisonProps = {
  comparison: OfferComparisonSource;
  open: boolean;
  onClose: () => void;
};

export function PackageComparison({ comparison, open, onClose }: PackageComparisonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const [showLastPair, setShowLastPair] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
      setShowLastPair(false);
      requestAnimationFrame(() => dialog.querySelector<HTMLElement>("button")?.focus());
      return;
    }

    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      onClose();
      returnFocusRef.current?.focus();
    };
    const handleCancel = (event: Event) => {
      event.preventDefault();
      dialog.close();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = [...dialog.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])')]
        .filter((element) => element.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("keydown", handleKeyDown);
    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const hiddenColumn = showLastPair ? 0 : 2;

  return (
    <dialog className={styles.dialog} ref={dialogRef} aria-labelledby={`${comparison.id}-comparison-title`}>
      <div className={styles.panel}>
        <header className={styles.header}>
          <div>
            <p>مقارنة واضحة</p>
            <h2 id={`${comparison.id}-comparison-title`}>{comparison.title}</h2>
          </div>
          <button className={styles.close} type="button" aria-label="إغلاق المقارنة" onClick={() => dialogRef.current?.close()}>
            ×
          </button>
        </header>

        <div className={styles.mobileSwitch}>
          <span>{showLastPair ? `${comparison.columns[1]} + ${comparison.columns[2]}` : `${comparison.columns[0]} + ${comparison.columns[1]}`}</span>
          <button type="button" onClick={() => setShowLastPair((current) => !current)}>
            {showLastPair ? "اعرض أول باقتين" : "اعرض الباقة الثالثة"}
          </button>
        </div>

        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th scope="col">البند</th>
                {comparison.columns.map((column, index) => (
                  <th className={index === hiddenColumn ? styles.mobileHidden : undefined} scope="col" key={column}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {row.values.map((value, index) => (
                    <td className={index === hiddenColumn ? styles.mobileHidden : undefined} key={`${row.label}-${index}`}>
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </dialog>
  );
}

export function PackageComparisonButton({
  comparison,
  label = "قارن الباقات",
  className,
}: {
  comparison: OfferComparisonSource;
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className={className} size="compact" type="button" onClick={() => setOpen(true)}>
        {label}
      </Button>
      <PackageComparison comparison={comparison} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
