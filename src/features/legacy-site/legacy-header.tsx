"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { LegacyPageKey } from "./legacy-routes";

const navItems: Array<{ href: string; label: string; active: LegacyPageKey }> = [
  { href: "/", label: "الرئيسية", active: "home" },
  { href: "/about", label: "من نحن", active: "about" },
  { href: "/services", label: "خدماتنا", active: "services" },
  { href: "/offers", label: "العروض", active: "offers" },
  { href: "/products", label: "منتجاتنا", active: "products" },
  { href: "/portfolio", label: "أعمالنا", active: "portfolio" },
  { href: "/articles", label: "المقالات", active: "articles" },
  { href: "/faq", label: "الاسئلة الشائعه", active: "faq" },
  { href: "/contact", label: "اتصل بنا", active: "contact" },
];

function isActive(page: LegacyPageKey, active: LegacyPageKey) {
  if (page === "service-detail") return active === "services";
  if (page === "article-detail") return active === "articles";
  return page === active;
}

export function LegacyHeader({ page }: { page: LegacyPageKey }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    document.documentElement.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: legacyHeaderCss }} />

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
        <nav className="nav-container">
          <button
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
            <div className="logo-text">
              <div className="logo-main">SWEED</div>
              <div className="logo-subtitle">التسويق والإعلان</div>
            </div>
          </Link>

          <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a className={isActive(page, item.active) ? "active" : undefined} href={item.href} onClick={() => setIsOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-buttons">
            <button className="btn-search" type="button">
              <i className="fas fa-search" />
            </button>
            <button className="btn-download" type="button">
              <i className="fas fa-download" /> تحميل الكتالوج
            </button>
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

const legacyHeaderCss = `
  .sweed-common-top-bar {
    background: var(--primary-purple, #2D2947) !important;
    color: var(--white, #ffffff) !important;
    padding: 0.7rem 0 !important;
    font-size: 0.85rem !important;
    width: 100% !important;
    overflow: hidden !important;
  }

  .sweed-common-top-bar .top-bar-content {
    max-width: 1400px !important;
    width: min(100%, 1400px) !important;
    margin: 0 auto !important;
    padding: 0 2rem !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 1rem !important;
    direction: ltr !important;
  }

  .sweed-common-top-bar .top-bar-left {
    display: flex !important;
    align-items: center !important;
    gap: 1.5rem !important;
    direction: rtl !important;
    min-width: 0 !important;
  }

  .sweed-common-top-bar .top-bar-item {
    display: flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    white-space: nowrap !important;
  }

  .sweed-common-top-bar .top-bar-item i {
    color: var(--primary-pink, #E3256B) !important;
  }

  .sweed-common-top-bar .social-media {
    display: flex !important;
    align-items: center !important;
    gap: 0.65rem !important;
    direction: ltr !important;
    flex: 0 0 auto !important;
  }

  .sweed-common-top-bar .social-media a {
    width: 30px !important;
    height: 30px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 50% !important;
    background: rgba(255,255,255,0.08) !important;
    color: #ffffff !important;
    text-decoration: none !important;
    font-size: 0.85rem !important;
  }

  .sweed-common-header {
    background: var(--white, #ffffff) !important;
    box-shadow: 0 2px 15px rgba(0,0,0,0.1) !important;
    position: sticky !important;
    top: 0 !important;
    z-index: 2200 !important;
    transition: transform 0.3s ease !important;
    width: 100% !important;
    overflow-x: clip !important;
  }

  .sweed-common-header .nav-container {
    max-width: 1400px !important;
    width: min(100%, 1400px) !important;
    margin: 0 auto !important;
    padding: 1rem 2rem !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    gap: 1rem !important;
  }

  .sweed-common-logo {
    display: flex !important;
    align-items: center !important;
    gap: 1rem !important;
    text-decoration: none !important;
    flex: 0 0 auto !important;
  }

  .sweed-common-logo .logo-text {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
  }

  .sweed-common-logo .logo-main {
    font-size: 2rem !important;
    font-weight: 900 !important;
    background: linear-gradient(135deg, var(--primary-pink, #E3256B), var(--primary-purple, #2D2947)) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
    color: transparent !important;
    letter-spacing: -1px !important;
    line-height: 1 !important;
  }

  .sweed-common-logo .logo-subtitle {
    font-size: 0.75rem !important;
    color: var(--dark-silver, #6d6e70) !important;
    font-weight: 600 !important;
    margin-top: 0.2rem !important;
  }

  .sweed-common-header .nav-menu {
    display: flex !important;
    list-style: none !important;
    gap: 1.15rem !important;
    align-items: center !important;
    margin: 0 !important;
    padding: 0 !important;
    min-width: 0 !important;
    flex: 1 1 auto !important;
    justify-content: center !important;
  }

  .sweed-common-header .nav-menu a {
    color: var(--primary-purple, #2D2947) !important;
    text-decoration: none !important;
    font-weight: 600 !important;
    font-size: 0.95rem !important;
    transition: all 0.3s ease !important;
    position: relative !important;
    white-space: nowrap !important;
  }

  .sweed-common-header .nav-menu a::after {
    content: '' !important;
    position: absolute !important;
    bottom: -5px !important;
    right: 0 !important;
    width: 0 !important;
    height: 2px !important;
    background: linear-gradient(90deg, var(--primary-pink, #E3256B), var(--sunset-orange, #FF6B35)) !important;
    transition: width 0.3s ease !important;
  }

  .sweed-common-header .nav-menu a:hover::after,
  .sweed-common-header .nav-menu a.active::after {
    width: 100% !important;
  }

  .sweed-common-header .nav-menu a.active {
    color: var(--primary-pink, #E3256B) !important;
  }

  .sweed-common-header .nav-buttons {
    display: flex !important;
    gap: 1rem !important;
    flex: 0 0 auto !important;
  }

  .sweed-common-header .btn-search {
    width: 52px !important;
    height: 52px !important;
    min-width: 52px !important;
    border-radius: 18px !important;
    border: 2px solid var(--primary-purple, #2D2947) !important;
    background: #ffffff !important;
    color: var(--primary-purple, #2D2947) !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
  }

  .sweed-common-header .btn-download {
    border: 0 !important;
    border-radius: 18px !important;
    background: linear-gradient(135deg, var(--primary-pink, #E3256B), var(--sunset-orange, #FF6B35)) !important;
    color: #ffffff !important;
    padding: 0 1.15rem !important;
    min-height: 52px !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    font-weight: 800 !important;
    cursor: pointer !important;
    white-space: nowrap !important;
  }

  .sweed-common-header .hamburger {
    display: none;
  }

  @media (max-width: 1280px) {
    .sweed-common-top-bar .top-bar-content,
    .sweed-common-header .nav-container {
      padding-inline: 1.25rem !important;
    }

    .sweed-common-header .nav-menu {
      gap: 0.82rem !important;
    }

    .sweed-common-header .nav-menu a {
      font-size: 0.9rem !important;
    }

    .sweed-common-logo .logo-main {
      font-size: 1.65rem !important;
    }

    .sweed-common-logo .logo-subtitle {
      font-size: 0.66rem !important;
    }

    .sweed-common-header .btn-download {
      display: none !important;
    }
  }

  @media (max-width: 1024px) {
    .sweed-common-top-bar .top-bar-left {
      gap: 0.85rem !important;
    }

    .sweed-common-top-bar .top-bar-item:first-child {
      display: none !important;
    }

    .sweed-common-header .nav-container {
      gap: 0.6rem !important;
    }

    .sweed-common-header .nav-menu {
      gap: 0.58rem !important;
    }

    .sweed-common-header .nav-menu a {
      font-size: 0.82rem !important;
    }

    .sweed-common-header .btn-search {
      width: 46px !important;
      height: 46px !important;
      min-width: 46px !important;
      border-radius: 15px !important;
    }
  }

  @media (max-width: 768px) {
    .sweed-common-top-bar {
      display: none !important;
    }

    .sweed-common-header {
      overflow: visible !important;
      background: rgba(255, 255, 255, 0.96) !important;
      box-shadow: 0 8px 28px rgba(45, 41, 71, 0.08) !important;
      backdrop-filter: blur(14px) !important;
      z-index: 2200 !important;
    }

    .sweed-common-header.mobile-menu-open {
      transform: none !important;
    }

    .sweed-common-header .nav-container {
      height: 78px !important;
      padding: 0 18px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
    }

    .sweed-common-logo {
      align-items: flex-end !important;
      min-width: 0 !important;
      max-width: 190px !important;
      overflow: visible !important;
      white-space: nowrap !important;
    }

    .sweed-common-logo .logo-main {
      font-size: 1.8rem !important;
      letter-spacing: 0 !important;
      line-height: 1 !important;
    }

    .sweed-common-logo .logo-subtitle {
      max-width: 160px !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
      font-size: 0.58rem !important;
    }

    .sweed-common-header .hamburger {
      display: flex !important;
      position: fixed !important;
      top: 18px !important;
      left: 16px !important;
      right: auto !important;
      width: 44px !important;
      height: 44px !important;
      min-width: 44px !important;
      min-height: 44px !important;
      z-index: 2301 !important;
      border: 0 !important;
      border-radius: 15px !important;
      background: linear-gradient(135deg, #e3256b, #ff6b35) !important;
      box-shadow: 0 14px 32px rgba(227, 37, 107, 0.32) !important;
      transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease !important;
      flex-direction: column !important;
      justify-content: center !important;
      align-items: center !important;
      cursor: pointer !important;
      padding: 8px !important;
    }

    .sweed-common-header .hamburger.active {
      left: auto !important;
      right: 18px !important;
      background: rgba(255, 255, 255, 0.88) !important;
      border: 1px solid rgba(227, 37, 107, 0.16) !important;
      box-shadow: 0 12px 26px rgba(45, 41, 71, 0.12) !important;
      backdrop-filter: blur(12px) !important;
    }

    .sweed-common-header .hamburger span {
      background: #fff !important;
      width: 22px !important;
      height: 3px !important;
      margin: 3px 0 !important;
      border-radius: 999px !important;
      display: block !important;
      transition: all 0.3s ease !important;
    }

    .sweed-common-header .hamburger.active span {
      width: 18px !important;
      height: 2px !important;
      margin: 2px 0 !important;
      background: #2d2947 !important;
    }

    .sweed-common-header .hamburger.active span:nth-child(1) {
      transform: translateY(6px) rotate(45deg) !important;
    }

    .sweed-common-header .hamburger.active span:nth-child(2) {
      opacity: 0 !important;
    }

    .sweed-common-header .hamburger.active span:nth-child(3) {
      transform: translateY(-6px) rotate(-45deg) !important;
    }

    .mobile-menu-overlay {
      position: fixed !important;
      inset: 0 !important;
      z-index: 2099 !important;
      display: none !important;
      opacity: 0 !important;
      pointer-events: none !important;
      background: rgba(17, 13, 31, 0.06) !important;
      transition: opacity 0.24s ease !important;
    }

    .mobile-menu-overlay.active {
      display: block !important;
      opacity: 1 !important;
      pointer-events: auto !important;
    }

    .sweed-common-header .nav-menu {
      display: flex !important;
      position: fixed !important;
      top: 0 !important;
      right: 0 !important;
      width: min(84vw, 340px) !important;
      height: 100dvh !important;
      box-sizing: border-box !important;
      padding: 72px 14px 88px !important;
      gap: 0.42rem !important;
      z-index: 2300 !important;
      overflow-y: auto !important;
      overflow-x: hidden !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      background:
        radial-gradient(circle at 20% 0%, rgba(255, 107, 53, 0.14), transparent 30%),
        linear-gradient(180deg, #ffffff 0%, #fff7fb 100%) !important;
      box-shadow: -18px 0 55px rgba(45, 41, 71, 0.24) !important;
      border-left: 1px solid rgba(227, 37, 107, 0.16) !important;
      border-radius: 26px 0 0 26px !important;
      isolation: isolate !important;
      transform: translateX(105%) !important;
      transition: transform 0.42s cubic-bezier(.2,.85,.22,1) !important;
    }

    .sweed-common-header .nav-menu::before,
    .sweed-common-header .nav-menu::after {
      position: relative !important;
      z-index: 2 !important;
      width: 100% !important;
      box-sizing: border-box !important;
      white-space: pre-line !important;
      text-align: center !important;
    }

    .sweed-common-header .nav-menu::before {
      content: 'SWEED\\A نصنع حضورك. نطلق مستقبل عملك.' !important;
      display: block !important;
      margin: 0 0 0.75rem !important;
      padding: 0 0 0.85rem !important;
      border-bottom: 1px solid rgba(227, 37, 107, 0.16) !important;
      font-weight: 900 !important;
      font-size: clamp(1.15rem, 5vw, 1.45rem) !important;
      line-height: 1.35 !important;
      background: linear-gradient(135deg, #e3256b, #2d2947) !important;
      -webkit-background-clip: text !important;
      background-clip: text !important;
      color: transparent !important;
    }

    .sweed-common-header .nav-menu::after {
      content: 'جاهز تنمو أعمالك؟\\A استشارة مجانية عبر واتساب' !important;
      display: block !important;
      margin-top: 0.65rem !important;
      padding: 0.85rem !important;
      border-radius: 18px !important;
      background:
        linear-gradient(135deg, rgba(255,255,255,0.86), rgba(255,247,251,0.96)),
        radial-gradient(circle at 85% 18%, rgba(227,37,107,0.14), transparent 28%) !important;
      border: 1px solid rgba(227, 37, 107, 0.16) !important;
      box-shadow: 0 18px 40px rgba(45, 41, 71, 0.10) !important;
      color: #2d2947 !important;
      font-weight: 900 !important;
      line-height: 1.55 !important;
      font-size: 0.9rem !important;
    }

    .sweed-common-header .nav-menu.active {
      transform: translateX(0) !important;
    }

    .sweed-common-header .nav-menu li {
      width: 100% !important;
      min-width: 0 !important;
      border: 0 !important;
      opacity: 1 !important;
      animation: none !important;
      position: relative !important;
      z-index: 2 !important;
    }

    .sweed-common-header .nav-menu a {
      width: 100% !important;
      min-height: 48px !important;
      box-sizing: border-box !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 0.55rem !important;
      padding: 10px 12px !important;
      border-radius: 15px !important;
      background: rgba(255, 255, 255, 0.84) !important;
      color: #2d2947 !important;
      box-shadow: inset 0 0 0 1px rgba(45, 41, 71, 0.06) !important;
      font-size: 1rem !important;
      font-weight: 800 !important;
      text-align: right !important;
      text-decoration: none !important;
    }

    .sweed-common-header .nav-menu li:nth-of-type(n+5) a:not(.active) {
      background: rgba(255, 255, 255, 0.9) !important;
      color: rgba(45, 41, 71, 0.72) !important;
    }

    .sweed-common-header .nav-menu a::before {
      width: 34px !important;
      height: 34px !important;
      border-radius: 12px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      margin-left: 0.58rem !important;
      color: #e3256b !important;
      background: rgba(227, 37, 107, 0.08) !important;
      font-family: "Font Awesome 6 Free" !important;
      font-weight: 900 !important;
      flex-shrink: 0 !important;
      position: static !important;
    }

    .sweed-common-header .nav-menu li:nth-of-type(1) a::before { content: '\\f015' !important; }
    .sweed-common-header .nav-menu li:nth-of-type(2) a::before { content: '\\f0c0' !important; }
    .sweed-common-header .nav-menu li:nth-of-type(3) a::before { content: '\\f0b1' !important; }
    .sweed-common-header .nav-menu li:nth-of-type(4) a::before { content: '\\f02b' !important; }
    .sweed-common-header .nav-menu li:nth-of-type(5) a::before { content: '\\f290' !important; }
    .sweed-common-header .nav-menu li:nth-of-type(6) a::before { content: '\\f03e' !important; }
    .sweed-common-header .nav-menu li:nth-of-type(7) a::before { content: '\\f303' !important; }
    .sweed-common-header .nav-menu li:nth-of-type(8) a::before { content: '\\f059' !important; }
    .sweed-common-header .nav-menu li:nth-of-type(9) a::before { content: '\\f095' !important; }

    .sweed-common-header .nav-menu a::after {
      content: '\\f104' !important;
      display: inline-flex !important;
      font-family: "Font Awesome 6 Free" !important;
      font-weight: 900 !important;
      color: rgba(45, 41, 71, 0.38) !important;
      margin-right: auto !important;
      width: auto !important;
      height: auto !important;
      transform: none !important;
      position: static !important;
      background: transparent !important;
    }

    .sweed-common-header .nav-menu a:hover {
      background: rgba(227, 37, 107, 0.05) !important;
      color: var(--primary-pink, #E3256B) !important;
    }

    .sweed-common-header .nav-menu a.active {
      background: linear-gradient(135deg, #2d2947 0%, #e3256b 100%) !important;
      color: #fff !important;
      box-shadow: 0 16px 32px rgba(45, 41, 71, 0.18) !important;
    }

    .sweed-common-header .nav-menu a.active::before {
      color: #fff !important;
      background: rgba(255, 255, 255, 0.18) !important;
    }

    .sweed-common-header .nav-menu a.active::after {
      color: rgba(255, 255, 255, 0.76) !important;
    }

    .sweed-common-header .nav-buttons {
      display: none !important;
    }
  }
`;
