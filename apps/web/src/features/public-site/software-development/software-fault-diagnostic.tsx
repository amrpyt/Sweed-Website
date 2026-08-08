"use client";

import { useState } from "react";
import type { SoftwareFaultOption } from "@/content/public-site/software-development-page";
import styles from "./software-fault-diagnostic.module.css";

export function SoftwareFaultDiagnostic({
  options,
  note,
}: {
  options: readonly SoftwareFaultOption[];
  note: string;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = options.find((option) => option.id === selectedId) ?? null;

  return (
    <div className={styles.diagnostic}>
      <div className={styles.options} role="group" aria-label="اختيار المشكلة التقنية الأقرب">
        {options.map((option) => (
          <button
            className={styles.option}
            type="button"
            aria-pressed={selectedId === option.id}
            key={option.id}
            onClick={() => setSelectedId(option.id)}
          >
            <strong>{option.label}</strong>
            <span>{option.question}</span>
          </button>
        ))}
      </div>

      <div className={styles.result} role="status" aria-live="polite" data-active={Boolean(selected) || undefined}>
        {selected ? (
          <>
            <span>المسار المبدئي</span>
            <p>{selected.recommendation}</p>
          </>
        ) : (
          <p>{note}</p>
        )}
      </div>
    </div>
  );
}
