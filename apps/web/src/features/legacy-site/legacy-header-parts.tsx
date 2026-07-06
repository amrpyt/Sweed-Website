import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";
import type { LegacyPageKey } from "./legacy-routes";
import { BrandActionButtonContent, getBrandActionButtonClassName } from "@/components/ui/brand-action-button";
import { isActivePage, type NavItem, primaryNavigationId } from "./legacy-header.config";

type MobileMenuButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export function HeaderTopBar({ isHeaderHidden }: { isHeaderHidden: boolean }) {
  return (
    <div className={`top-bar sweed-common-top-bar compact ${isHeaderHidden ? "is-scroll-hidden" : ""}`}>
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
  );
}

export const MobileMenuButton = forwardRef<HTMLButtonElement, MobileMenuButtonProps>(function MobileMenuButton(
  { isOpen, onToggle },
  ref,
) {
  return (
    <button
      ref={ref}
      aria-controls={primaryNavigationId}
      aria-expanded={isOpen}
      aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
      className={`hamburger ${isOpen ? "active" : ""}`}
      data-testid="sweed-mobile-menu-button"
      type="button"
      onClick={onToggle}
    >
      <span />
      <span />
      <span />
    </button>
  );
});

export function HeaderLogo() {
  return (
    <Link className="logo-container sweed-common-logo" href="/" aria-label="SWEED الرئيسية">
      <Image alt="SWEED" className="sweed-official-logo" height={80} src="/sweed-logo-official.svg" width={300} />
      <div className="logo-text">
        <div className="logo-main">SWEED</div>
        <div className="logo-subtitle">التسويق والإعلان</div>
      </div>
    </Link>
  );
}

export function PrimaryNavigation({
  isOpen,
  navItems,
  page,
  onNavigate,
}: {
  isOpen: boolean;
  navItems: NavItem[];
  page: LegacyPageKey;
  onNavigate: () => void;
}) {
  return (
    <ul className={`nav-menu ${isOpen ? "active" : ""}`} id={primaryNavigationId}>
      {navItems.map((item) => (
        <li key={item.href}>
          <Link className={item.active && isActivePage(page, item.active) ? "active" : undefined} href={item.href} onClick={onNavigate}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function HeaderCta({ consultationHref, page }: { consultationHref: string; page: LegacyPageKey }) {
  return (
    <div className="nav-buttons">
      <Link className={getBrandActionButtonClassName({ size: "nav" })} href={consultationHref}>
        {page === "home" ? (
          <BrandActionButtonContent>دعنا نبدأ</BrandActionButtonContent>
        ) : (
          <BrandActionButtonContent>احجز استشارة مجانية</BrandActionButtonContent>
        )}
      </Link>
    </div>
  );
}

export function MobileMenuOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return <div className={`mobile-menu-overlay ${isOpen ? "active" : ""}`} role="presentation" onClick={onClose} />;
}
