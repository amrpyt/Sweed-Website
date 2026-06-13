"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { LegacyPageKey } from "./legacy-routes";
import "./legacy-header.module.css";

type NavItem = {
  href: string;
  label: string;
  active?: LegacyPageKey;
};

const defaultNavItems: NavItem[] = [
  { href: "/", label: "الرئيسية", active: "home" },
  { href: "/about", label: "من نحن", active: "about" },
  { href: "/offers", label: "العروض", active: "offers" },
  { href: "/services", label: "خدماتنا", active: "services" },
  { href: "/products", label: "منتجاتنا", active: "products" },
  { href: "/portfolio", label: "أعمالنا", active: "portfolio" },
  { href: "/articles", label: "المقالات", active: "articles" },
  { href: "/faq", label: "الأسئلة الشائعة", active: "faq" },
  { href: "/contact", label: "اتصل بنا", active: "contact" },
];

const homeNavItems: NavItem[] = [
  { href: "/#home", label: "الرئيسية", active: "home" },
  { href: "/#about", label: "من نحن" },
  { href: "/#offers", label: "العروض" },
  { href: "/#services", label: "خدماتنا" },
  { href: "/#products", label: "منتجاتنا" },
  { href: "/#portfolio", label: "أعمالنا" },
  { href: "/#blog", label: "المقالات" },
  { href: "/#faq", label: "الأسئلة الشائعة" },
  { href: "/#contact", label: "اتصل بنا" },
];

const primaryNavigationId = "sweed-primary-navigation";

function isActive(page: LegacyPageKey, active: LegacyPageKey) {
  if (page === "service-detail") return active === "services";
  if (page === "article-detail") return active === "articles";
  return page === active;
}

export function LegacyHeader({ page }: { page: LegacyPageKey }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navItems = page === "home" ? homeNavItems : defaultNavItems;
  const consultationHref = page === "home" ? "/#contact" : "/contact";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    document.documentElement.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

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
      <div className="top-bar sweed-common-top-bar">
        <div className="top-bar-content">
          <div className="top-bar-left">
            <div className="top-bar-item">
              <i className="fas fa-phone" />
              <span>01068274662</span>
            </div>
            <div className="top-bar-item">
              <i className="fas fa-envelope" />
              <span>info@sweed.com</span>
            </div>
            <div className="top-bar-item">
              <i className="fas fa-clock" />
              <span>السبت - الخميس: 9:00 ص - 6:00 م</span>
            </div>
          </div>
          <div className="social-media">
            <a href="#" aria-label="فيسبوك"><i className="fab fa-facebook-f" /></a>
            <a href="#" aria-label="إنستجرام"><i className="fab fa-instagram" /></a>
            <a href="#" aria-label="لينكد إن"><i className="fab fa-linkedin-in" /></a>
            <a href="#" aria-label="يوتيوب"><i className="fab fa-youtube" /></a>
            <a href="#" aria-label="واتساب"><i className="fab fa-whatsapp" /></a>
            <a href="#" aria-label="تيك توك"><i className="fab fa-tiktok" /></a>
          </div>
        </div>
      </div>

      <header className={`header sweed-common-header ${isOpen ? "mobile-menu-open" : ""}`} id="mainHeader">
        <nav aria-label="القائمة الرئيسية" className="nav-container">
          <button
            ref={menuButtonRef}
            aria-controls={primaryNavigationId}
            aria-expanded={isOpen}
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
            className={`hamburger ${isOpen ? "active" : ""}`}
            data-testid="sweed-mobile-menu-button"
            type="button"
            onClick={() => setIsOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>

          <Link className="logo-container sweed-common-logo" href="/" aria-label="SWEED الرئيسية">
            <Image alt="SWEED" className="sweed-official-logo" height={80} src="/sweed-logo-official.svg" width={300} />
            <div className="logo-text">
              <div className="logo-main">SWEED</div>
              <div className="logo-subtitle">التسويق والإعلان</div>
            </div>
          </Link>

          <ul className={`nav-menu ${isOpen ? "active" : ""}`} id={primaryNavigationId}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className={item.active && isActive(page, item.active) ? "active" : undefined} href={item.href} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-buttons">
            <Link className="btn-consultation" href={consultationHref}>
              احجز استشارة مجانية
            </Link>
          </div>
        </nav>
      </header>

      <div
        className={`mobile-menu-overlay ${isOpen ? "active" : ""}`}
        role="presentation"
        onClick={() => setIsOpen(false)}
      />
    </>
  );
}

