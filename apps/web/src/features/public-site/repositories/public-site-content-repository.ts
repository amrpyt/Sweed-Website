import { contactAction, primaryNavigation } from "@/content/navigation";
import { aboutPageSource } from "@/content/public-site/about-page";
import { articlesPageSource } from "@/content/public-site/articles-page";
import { contactPageSource } from "@/content/public-site/contact-page";
import { faqPageSource } from "@/content/public-site/faq-page";
import { publicSiteShellSettings } from "@/content/public-site/shell";
import { servicesPageSource } from "@/content/public-site/services-page";
import { contentRepository } from "@/lib/content/repositories";
import type {
  AboutPageSource,
  ArticlesPageSource,
  ContactPageSource,
  ContactServiceOption,
  FaqPageSource,
  PublicServiceModel,
  PublicSiteShellData,
  ServicesPageSource,
} from "@/features/public-site/page-composers/types";
import type { Article, IconTextItem } from "@/content/types";
import { getServiceDetailHref } from "@/features/public-site/shared/service-route";

export type ServicesPageRepositoryData = ServicesPageSource & {
  services: PublicServiceModel[];
};

export type ArticlesPageRepositoryData = ArticlesPageSource & {
  articles: Article[];
};

export type FaqPageRepositoryData = FaqPageSource & {
  sections: Array<{
    id: string;
    header: {
      title: string;
      summary?: string;
    };
    items: IconTextItem[];
  }>;
};

export type ContactPageRepositoryData = ContactPageSource & {
  form: ContactPageSource["form"] & {
    serviceOptions: ContactServiceOption[];
  };
};

export const publicSiteContentRepository = {
  getShellData(): PublicSiteShellData {
    return {
      navigation: primaryNavigation,
      contactAction,
      siteSettings: publicSiteShellSettings,
    };
  },

  getAboutPageSource(): AboutPageSource {
    return aboutPageSource;
  },

  getServicesPageSource(): ServicesPageRepositoryData {
    return {
      ...servicesPageSource,
      services: contentRepository.getServices().map((service) => ({
        ...service,
        detailHref: getServiceDetailHref(service.slug),
      })),
    };
  },

  getArticlesPageSource(): ArticlesPageRepositoryData {
    return {
      ...articlesPageSource,
      articles: contentRepository.getArticles(),
    };
  },

  getFaqPageSource(): FaqPageRepositoryData {
    const faqGroups = contentRepository.getFAQGroups();

    return {
      ...faqPageSource,
      sections: [
        {
          id: "faq",
          header: {
            title: "الأسئلة الشائعة",
            summary: "هذه الإجابات تغطي أهم الأسئلة العامة عن الخدمات والباقات والتجربة الحالية للموقع.",
          },
          items: faqGroups.flatMap((group) =>
            group.items.map((item) => ({
              title: item.question,
              summary: item.answer,
            })),
          ),
        },
      ],
    };
  },

  getContactPageSource(): ContactPageRepositoryData {
    return {
      ...contactPageSource,
      form: {
        ...contactPageSource.form,
        serviceOptions: contentRepository.getServices().map((service) => ({
          value: service.slug,
          label: service.title,
        })),
      },
    };
  },
};
