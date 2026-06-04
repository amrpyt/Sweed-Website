export type LegacyPageKey =
  | "home"
  | "about"
  | "services"
  | "service-detail"
  | "offers"
  | "products"
  | "portfolio"
  | "articles"
  | "article-detail"
  | "faq"
  | "contact";

export const legacyPageFiles: Record<LegacyPageKey, string> = {
  home: "index.html",
  about: "pages/about.html",
  services: "pages/services.html",
  "service-detail": "pages/service-detail.html",
  offers: "pages/offers.html",
  products: "pages/products.html",
  portfolio: "pages/portfolio.html",
  articles: "pages/blog.html",
  "article-detail": "pages/article.html",
  faq: "pages/faq.html",
  contact: "pages/contact.html",
};

export type LegacyBreadcrumbItem = {
  label: string;
  href?: string;
};

export const legacyBreadcrumbs: Partial<Record<LegacyPageKey, LegacyBreadcrumbItem[]>> = {
  about: [{ label: "من نحن" }],
  services: [{ label: "خدماتنا" }],
  "service-detail": [{ label: "خدماتنا", href: "/services" }, { label: "الاستشارات الإدارية" }],
  offers: [{ label: "العروض" }],
  products: [{ label: "المنتجات" }],
  portfolio: [{ label: "أعمالنا" }],
  articles: [{ label: "المدونة" }],
  "article-detail": [{ label: "المدونة", href: "/articles" }, { label: "10 استراتيجيات مبتكرة للتسويق الرقمي" }],
  faq: [{ label: "الأسئلة الشائعة" }],
  contact: [{ label: "اتصل بنا" }],
};

export const legacyHrefMap: Record<string, string> = {
  "index.html": "/",
  "../index.html": "/",
  "pages/about.html": "/about",
  "about.html": "/about",
  "pages/services.html": "/services",
  "services.html": "/services",
  "pages/service-detail.html": "/services/legacy",
  "service-detail.html": "/services/legacy",
  "pages/offers.html": "/offers",
  "offers.html": "/offers",
  "pages/products.html": "/products",
  "products.html": "/products",
  "pages/portfolio.html": "/portfolio",
  "portfolio.html": "/portfolio",
  "pages/blog.html": "/articles",
  "blog.html": "/articles",
  "pages/article.html": "/articles/legacy",
  "article.html": "/articles/legacy",
  "pages/faq.html": "/faq",
  "faq.html": "/faq",
  "pages/contact.html": "/contact",
  "contact.html": "/contact",
};
