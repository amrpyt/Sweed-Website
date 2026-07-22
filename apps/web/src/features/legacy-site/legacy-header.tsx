"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import type { LegacyPageKey } from "./legacy-routes";
import { defaultNavItems, homeNavItems, isActivePage, primaryNavigationId } from "./legacy-header.config";
import { useScrollHeaderVisibility } from "./use-scroll-header-visibility";
import styles from "./legacy-header.module.css";

export function LegacyHeader({ page }: { page: LegacyPageKey }) {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navItems = page === "home" ? homeNavItems : defaultNavItems;
  const consultationHref = page === "home" ? "/#contact" : "/contact";
  const isHidden = useScrollHeaderVisibility({ disabled: isOpen });

  const closeMenuBeforeNavigation = () => {
    setIsOpen(false);
  };

  const handleNavigationClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;

    if (page === "home" && href.startsWith("/#")) {
      const targetId = href.slice(2);
      const target = document.getElementById(targetId);

      if (target) {
        event.preventDefault();
        closeMenuBeforeNavigation();
        window.history.pushState(null, "", `#${targetId}`);

        window.requestAnimationFrame(() => {
          const headerOffset = headerRef.current?.getBoundingClientRect().height ?? 64;
          const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
          const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
          window.scrollTo({ top: Math.max(0, targetTop), behavior });
        });
      }

      return;
    }

    closeMenuBeforeNavigation();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setIsOpen(false);
      menuButtonRef.current?.focus();
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || headerRef.current?.contains(target)) return;
      setIsOpen(false);
    };

    const handleResize = () => {
      if (window.innerWidth > 1080) setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return (
    <>
      <div aria-hidden="true" className={styles.headerSpacer} />
      <header
        ref={headerRef}
        className={`${styles.header} ${isHidden ? styles.headerHidden : ""} ${isOpen ? styles.headerMenuOpen : ""}`}
        data-header-hidden={isHidden ? "true" : "false"}
        data-testid="sweed-standard-header"
      >
      <nav aria-label="القائمة الرئيسية" className={styles.nav}>
        <Link className={styles.logo} href="/" aria-label="SWEED الرئيسية" onClick={closeMenuBeforeNavigation}>
          <Image alt="SWEED" height={80} priority src="/sweed-logo-official.svg" width={300} />
        </Link>

        <div
          aria-hidden={!isOpen ? undefined : false}
          className={`${styles.menuPanel} ${isOpen ? styles.menuPanelOpen : ""}`}
          data-open={isOpen ? "true" : "false"}
          id={primaryNavigationId}
        >
          <div className={styles.mobileMenuIntro}>
            <strong>استكشف سويد</strong>
            <span>الخدمات، الأعمال، والمحتوى اللي يساعد مشروعك يتحرك صح.</span>
          </div>

          <ul className={styles.navList}>
            {navItems.map((item, index) => {
              const isActive = Boolean(item.active && isActivePage(page, item.active));

              return (
                <li key={item.href}>
                  <Link
                    aria-current={isActive ? "page" : undefined}
                    className={isActive ? styles.activeLink : undefined}
                    href={item.href}
                    onClick={(event) => handleNavigationClick(event, item.href)}
                  >
                    <span className={styles.navIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.navLabel}>{item.label}</span>
                    <i className={`fas fa-arrow-left ${styles.navArrow}`} aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            className={styles.mobileCta}
            href={consultationHref}
            onClick={(event) => handleNavigationClick(event, consultationHref)}
          >
            <span>ابدأ مشروعك</span>
            <i aria-hidden="true" className="fas fa-arrow-left" />
          </Link>
        </div>

        <Link
          className={styles.desktopCta}
          href={consultationHref}
          onClick={(event) => handleNavigationClick(event, consultationHref)}
        >
          <span>{page === "home" ? "دعنا نبدأ" : "احجز استشارة"}</span>
          <i aria-hidden="true" className="fas fa-arrow-left" />
        </Link>

        <button
          ref={menuButtonRef}
          aria-controls={primaryNavigationId}
          aria-expanded={isOpen}
          aria-label={isOpen ? "إغلاق القائمة الرئيسية" : "فتح القائمة الرئيسية"}
          className={`${styles.menuButton} ${isOpen ? styles.menuButtonOpen : ""}`}
          type="button"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
        </nav>
      </header>
    </>
  );
}
