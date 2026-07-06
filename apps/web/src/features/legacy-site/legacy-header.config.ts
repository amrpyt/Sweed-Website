import type { LegacyPageKey } from "./legacy-routes";

export type NavItem = {
  href: string;
  label: string;
  active?: LegacyPageKey;
};

export const primaryNavigationId = "sweed-primary-navigation";

export const defaultNavItems: NavItem[] = [
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

export const homeNavItems: NavItem[] = [
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

export function isActivePage(page: LegacyPageKey, active: LegacyPageKey) {
  if (page === "service-detail") return active === "services";
  if (page === "article-detail") return active === "articles";
  return page === active;
}
