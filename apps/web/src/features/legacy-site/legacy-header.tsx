"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { BrandActionButtonContent, getBrandActionButtonClassName } from "@/components/ui/brand-action-button";
import type { LegacyPageKey } from "./legacy-routes";
import { siteSettings } from "@/content/local-data";
import { defaultNavItems, homeNavItems, isActivePage, primaryNavigationId } from "./legacy-header.config";
import { useScrollHeaderVisibility } from "./use-scroll-header-visibility";
import styles from "./legacy-header.module.css";

export function LegacyHeader({ page }: { page: LegacyPageKey }) {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navItems = page === "home" ? homeNavItems : defaultNavItems;
  const catalogHref = "/sweed-company-catalog.pdf";
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
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = document.getElementById(primaryNavigationId);
      const trigger = menuButtonRef.current;
      if (!panel || !trigger) return;

      const focusable = [
        trigger,
        ...Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')),
      ].filter((element) => element.getClientRects().length > 0);

      if (focusable.length === 0) return;

      event.preventDefault();
      const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
      const nextIndex = event.shiftKey
        ? currentIndex <= 0
          ? focusable.length - 1
          : currentIndex - 1
        : currentIndex < 0 || currentIndex === focusable.length - 1
          ? 0
          : currentIndex + 1;

      focusable[nextIndex]?.focus();
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

        <button
          aria-hidden="true"
          aria-label="إغلاق قائمة التنقل"
          className={`${styles.menuBackdrop} ${isOpen ? styles.menuBackdropOpen : ""}`}
          tabIndex={-1}
          type="button"
          onClick={closeMenuBeforeNavigation}
        />

        <div
          aria-hidden={isOpen ? false : undefined}
          aria-label={isOpen ? "قائمة التنقل" : undefined}
          aria-modal={isOpen ? true : undefined}
          className={`${styles.menuPanel} ${isOpen ? styles.menuPanelOpen : ""}`}
          data-open={isOpen ? "true" : "false"}
          id={primaryNavigationId}
          role={isOpen ? "dialog" : undefined}
        >
          <span className={styles.sheetHandle} aria-hidden="true" />

          <div className={styles.mobileMenuIntro}>
            <div>
              <strong>استكشف سويد</strong>
              <span>اختار وجهتك، أو تواصل معانا مباشرة.</span>
            </div>
            <span className={styles.sheetStatus}>SWEED</span>
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
                    <span className={styles.navArrow} aria-hidden="true">←</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={styles.contactBlock} aria-label="وسائل التواصل السريع">
            <span className={styles.contactTitle}>السوشيال والتواصل</span>
            <div className={styles.contactActions}>
              <a href={siteSettings.whatsappUrl} target="_blank" rel="noreferrer" aria-label="تواصل عبر واتساب">
                <i className="fab fa-whatsapp" aria-hidden="true" />
                <span>واتساب</span>
              </a>
              <a href={`tel:${siteSettings.primaryPhone.replace(/\s+/g, "")}`} aria-label="اتصل بسويد">
                <i className="fas fa-phone" aria-hidden="true" />
                <span>اتصال</span>
              </a>
              <a href={`mailto:${siteSettings.primaryEmail}`} aria-label="راسل سويد بالبريد الإلكتروني">
                <i className="fas fa-envelope" aria-hidden="true" />
                <span>بريد</span>
              </a>
            </div>
          </div>

          {siteSettings.socialLinks?.length ? (
            <div className={styles.socialBlock} aria-label="حسابات سويد على السوشيال ميديا">
              <span className={styles.contactTitle}>تابعنا</span>
              <div className={styles.socialActions}>
                {siteSettings.socialLinks.map((link) => (
                  <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          <Link
            className={getBrandActionButtonClassName({ className: styles.mobileCta, size: "nav" })}
            href={catalogHref} download="SWEED-Company-Catalog.pdf"
            onClick={(event) => handleNavigationClick(event, catalogHref)}
          >
            <BrandActionButtonContent>تحميل الكتالوج</BrandActionButtonContent>
          </Link>
        </div>

        <Link
          className={getBrandActionButtonClassName({ className: styles.desktopCta, size: "nav" })}
          href={catalogHref} download="SWEED-Company-Catalog.pdf"
          onClick={(event) => handleNavigationClick(event, catalogHref)}
        >
          <BrandActionButtonContent>تحميل الكتالوج</BrandActionButtonContent>
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
          <span className={styles.menuGlyphs} aria-hidden="true">
            <i className={`fas fa-bars ${styles.menuGlyph} ${isOpen ? styles.menuGlyphHidden : ""}`} />
            <i className={`fas fa-xmark ${styles.menuGlyph} ${styles.menuGlyphClose} ${isOpen ? styles.menuGlyphVisible : ""}`} />
          </span>
        </button>
        </nav>
      </header>
    </>
  );
}
