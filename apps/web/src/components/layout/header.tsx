"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { contactAction, primaryNavigation } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/button";
import { MobileNavigation } from "./mobile-navigation";
import styles from "./header.module.css";

export function Header() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsCompact(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isCompact ? styles.compact : ""}`}>
      <div className={styles.inner}>
        <Link className={styles.logo} href="/" aria-label="SWEED home">
          <Image alt="" aria-hidden className={styles.logoImage} height={36} priority src="/sweed-logo.png" width={36} />
          <span>SWEED</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {primaryNavigation.map((item) => (
            <Link className={styles.navLink} href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <ButtonLink href={contactAction.href}>{contactAction.label}</ButtonLink>
          <MobileNavigation items={primaryNavigation} action={contactAction} />
        </div>
      </div>
    </header>
  );
}
