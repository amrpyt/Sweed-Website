"use client";

import { useEffect, useRef, useState } from "react";
import type { LegacyPageKey } from "./legacy-routes";
import { useScrollHeaderVisibility } from "./use-scroll-header-visibility";
import { defaultNavItems, homeNavItems } from "./legacy-header.config";
import {
  HeaderCta,
  HeaderLogo,
  HeaderTopBar,
  MobileMenuButton,
  MobileMenuOverlay,
  PrimaryNavigation,
} from "./legacy-header-parts";
import "./legacy-header.module.css";

export function LegacyHeader({ page }: { page: LegacyPageKey }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navItems = page === "home" ? homeNavItems : defaultNavItems;
  const consultationHref = page === "home" ? "/#contact" : "/contact";
  const isHeaderHidden = useScrollHeaderVisibility({ disabled: isOpen });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    document.documentElement.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    document.body.classList.add("sweed-header-compact");

    return () => {
      document.body.classList.remove("sweed-header-compact");
    };
  }, []);

  useEffect(() => {
    if (page === "home") {
      document.body.classList.add("sweed-header-home");
    } else {
      document.body.classList.remove("sweed-header-home");
    }

    return () => {
      document.body.classList.remove("sweed-header-home");
    };
  }, [page]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setIsOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {page !== "home" && <HeaderTopBar isHeaderHidden={isHeaderHidden} />}

      <header className={`header sweed-common-header compact ${isOpen ? "mobile-menu-open" : ""} ${isHeaderHidden ? "is-scroll-hidden" : ""} ${page === "home" ? "is-home-page" : ""}`} id="mainHeader">
        <nav aria-label="القائمة الرئيسية" className="nav-container">
          <MobileMenuButton ref={menuButtonRef} isOpen={isOpen} onToggle={() => setIsOpen((current) => !current)} />
          <HeaderLogo />
          <PrimaryNavigation isOpen={isOpen} navItems={navItems} page={page} onNavigate={() => setIsOpen(false)} />
          <HeaderCta consultationHref={consultationHref} page={page} />
        </nav>
      </header>

      <MobileMenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
