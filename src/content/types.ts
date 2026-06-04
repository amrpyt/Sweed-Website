export type SeoMeta = {
  title: string;
  description: string;
  image?: string;
};

export type MediaAsset = {
  src: string;
  alt: string;
};

export type ContentSection = {
  id: string;
  eyebrow?: string;
  title: string;
  summary: string;
  items?: string[];
};

export type LinkTarget = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

export type IconTextItem = {
  icon?: string;
  title: string;
  summary?: string;
  value?: string;
};

export type StatItem = {
  value: string;
  label: string;
  summary?: string;
};

export type HeroContent = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  summary: string;
  icon?: string;
  actions?: LinkTarget[];
  stats?: StatItem[];
  features?: IconTextItem[];
  media?: MediaAsset;
};

export type SectionHeaderContent = {
  eyebrow?: string;
  title: string;
  summary?: string;
};

export type CTAContent = {
  title: string;
  summary: string;
  primaryAction: LinkTarget;
  secondaryAction?: LinkTarget;
};

export type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  company?: string;
};

export type ComparisonColumn = {
  label: string;
  values: string[];
  highlighted?: boolean;
};

export type ComparisonTable = {
  headers: string[];
  rows: Array<{
    label: string;
    values: string[];
  }>;
};

export type PageContent = {
  slug: string;
  title: string;
  seo: SeoMeta;
  hero?: HeroContent;
  sections: ContentSection[];
  cta?: CTAContent;
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  audience: string;
  outcomes: string[];
  process: string[];
  seo: SeoMeta;
  order: number;
  icon?: string;
  hero?: HeroContent;
  relatedServices?: string[];
};

export type Offer = {
  slug: string;
  title: string;
  summary: string;
  priceLabel: string;
  bestFor: string;
  features: string[];
  highlighted?: boolean;
  seo: SeoMeta;
  order: number;
  category?: string;
  savingsLabel?: string;
  cta?: LinkTarget;
};

export type Product = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  status: "available" | "planned" | "custom";
  seo: SeoMeta;
  order: number;
  features?: string[];
  industries?: string[];
  cta?: LinkTarget;
};

export type PortfolioItem = {
  slug: string;
  title: string;
  clientType: string;
  summary: string;
  services: string[];
  result: string;
  image?: MediaAsset;
  seo: SeoMeta;
  order: number;
  category?: string;
  metrics?: StatItem[];
};

export type Article = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  body: ContentSection[];
  seo: SeoMeta;
  order: number;
  hero?: HeroContent;
  tags?: string[];
  author?: {
    name: string;
    role?: string;
    bio?: string;
    avatar?: MediaAsset;
  };
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQGroup = {
  slug: string;
  title: string;
  items: FAQItem[];
  order: number;
  icon?: string;
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
