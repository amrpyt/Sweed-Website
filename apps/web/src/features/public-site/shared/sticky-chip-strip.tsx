"use client";

import Link from "next/link";
import styles from "./sticky-chip-strip.module.css";

export type StickyChipItem = {
  id: string;
  label: string;
  href: string;
};

type StickyChipStripProps = {
  ariaLabel: string;
  items: readonly StickyChipItem[];
  activeId?: string | null;
  onSelect?: (id: string) => void;
};

export function StickyChipStrip({ ariaLabel, items, activeId, onSelect }: StickyChipStripProps) {
  return (
    <nav className={styles.shell} aria-label={ariaLabel}>
      <div className={styles.scroller}>
        {items.map((item) => {
          const active = item.id === activeId;

          if (onSelect) {
            return (
              <button
                className={styles.chip}
                data-active={active || undefined}
                type="button"
                aria-pressed={active}
                key={item.id}
                onClick={() => onSelect(item.id)}
              >
                {item.label}
              </button>
            );
          }

          return (
            <Link
              className={styles.chip}
              data-active={active || undefined}
              aria-current={active ? "location" : undefined}
              href={item.href}
              key={item.id}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
