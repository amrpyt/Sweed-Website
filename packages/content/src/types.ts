export type NavigationItem = {
  label: string;
  href: string;
};

export type LinkTarget = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

export type SiteSettings = {
  brandName: string;
  tagline: string;
  primaryPhone: string;
  primaryEmail: string;
  whatsappUrl: string;
  address?: string;
  workingHours?: string;
  socialLinks?: LinkTarget[];
};
