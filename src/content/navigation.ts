export type NavigationItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavigationItem[] = [
  { label: "الرئيسية", href: "/" },
  { label: "من نحن", href: "/about" },
  { label: "الخدمات", href: "/services" },
  { label: "العروض", href: "/offers" },
  { label: "الأعمال", href: "/portfolio" },
  { label: "المقالات", href: "/articles" },
  { label: "تواصل", href: "/contact" },
];

export const contactAction = {
  label: "ابدأ مشروعك",
  href: "/contact",
};

