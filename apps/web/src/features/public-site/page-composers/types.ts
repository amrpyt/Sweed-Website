import type {
  Article,
  CTAContent,
  HeroContent,
  IconTextItem,
  LinkTarget,
  SectionHeaderContent,
  SeoMeta,
  Service,
  SiteSettings,
} from "@/content/types";
import type { NavigationItem } from "@/content/navigation";

export type PublicSectionModel = {
  id: string;
  tone?: "default" | "alt";
  header: SectionHeaderContent;
  items: IconTextItem[];
};

export type PublicSiteShellData = {
  navigation: NavigationItem[];
  contactAction: LinkTarget;
  siteSettings: SiteSettings;
};

export type AboutPageModel = {
  seo: SeoMeta;
  breadcrumb: string;
  hero: HeroContent;
  sections: PublicSectionModel[];
  cta: CTAContent;
};

export type ServicesPageModel = {
  seo: SeoMeta;
  breadcrumb: string;
  hero: HeroContent;
  section: {
    id: string;
    header: SectionHeaderContent;
  };
  services: Service[];
  cta: CTAContent;
};

export type ArticlesPageModel = {
  seo: SeoMeta;
  breadcrumb: string;
  hero: HeroContent;
  section: {
    id: string;
    header: SectionHeaderContent;
  };
  articles: Article[];
  featuredArticle: Article | null;
  cta: CTAContent;
};

export type AboutPageSource = AboutPageModel;

export type FaqPageModel = {
  seo: SeoMeta;
  breadcrumb: string;
  hero: HeroContent;
  sections: PublicSectionModel[];
  cta: CTAContent;
};

export type ContactServiceOption = {
  value: string;
  label: string;
};

export type ContactFormModel = {
  id: string;
  elementId: string;
  title: string;
  summary: string;
  submitLabel: string;
  notesLabel: string;
  serviceOptions: ContactServiceOption[];
};

export type ContactPageModel = {
  seo: SeoMeta;
  breadcrumb: string;
  hero: HeroContent;
  form: ContactFormModel;
  sections: PublicSectionModel[];
};

export type FaqPageSource = Omit<FaqPageModel, "sections">;

export type ServicesPageSource = Omit<ServicesPageModel, "services">;

export type ArticlesPageSource = Omit<ArticlesPageModel, "articles" | "featuredArticle">;

export type ContactPageSource = Omit<ContactPageModel, "form"> & {
  form: Omit<ContactFormModel, "serviceOptions" | "elementId">;
};
