"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { NavigationItem } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/button";
import styles from "./mobile-navigation.module.css";

export function MobileNavigation({
  items,
  action,
}: {
  items: NavigationItem[];
  action: NavigationItem;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.root}>
      <button
        className={styles.trigger}
        type="button"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X aria-hidden size={22} /> : <Menu aria-hidden size={22} />}
      </button>

      {isOpen ? (
        <div className={styles.panel}>
          <nav className={styles.nav} aria-label="Mobile navigation">
            {items.map((item) => (
              <Link className={styles.link} href={item.href} key={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
          <ButtonLink href={action.href} onClick={() => setIsOpen(false)}>
            {action.label}
          </ButtonLink>
        </div>
      ) : null}
    </div>
  );
}

