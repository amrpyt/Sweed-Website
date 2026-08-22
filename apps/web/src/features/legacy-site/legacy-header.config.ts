import type { LegacyPageKey } from "./legacy-routes";

export type NavItem = {
  href: string;
  label: string;
  active?: LegacyPageKey;
};

export const primaryNavigationId = "sweed-primary-navigation";

export const defaultNavItems: NavItem[] = [
  { href: "/#home", label: "الرئيسية", active: "home" },
  { href: "/#about", label: "من نحن", active: "about" },
  { href: "/#services", label: "خدماتنا", active: "services" },
  { href: "/#portfolio", label: "أعمالنا", active: "portfolio" },
  { href: "/#offers", label: "العروض", active: "offers" },
  { href: "/#blog", label: "المقالات", active: "articles" },
  { href: "/#contact", label: "اتصل بنا", active: "contact" },
];

export const homeNavItems: NavItem[] = [
  { href: "/#home", label: "الرئيسية", active: "home" },
  { href: "/#about", label: "من نحن" },
  { href: "/#services", label: "خدماتنا" },
  { href: "/#portfolio", label: "أعمالنا" },
  { href: "/#offers", label: "العروض" },
  { href: "/#blog", label: "المقالات" },
  { href: "/#contact", label: "اتصل بنا" },
];

export const footerQuickLinks: NavItem[] = defaultNavItems.filter((item) => item.active !== "contact");

export function isActivePage(page: LegacyPageKey, active: LegacyPageKey) {
  if (page === "service-detail") return active === "services";
  if (page === "article-detail") return active === "articles";
  return page === active;
}
