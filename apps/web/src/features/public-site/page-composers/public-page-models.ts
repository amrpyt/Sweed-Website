import type {
  AboutPageModel,
  ArticlesPageModel,
  ContactPageModel,
  FaqPageModel,
  PublicSiteShellData,
  ServicesPageModel,
} from "./types";
import { publicSiteContentRepository } from "../repositories/public-site-content-repository";

export function getPublicSiteShellData(): PublicSiteShellData {
  return publicSiteContentRepository.getShellData();
}

export function getAboutPageModel(): AboutPageModel {
  return publicSiteContentRepository.getAboutPageSource();
}

export function getServicesPageModel(): ServicesPageModel {
  const source = publicSiteContentRepository.getServicesPageSource();

  return {
    seo: source.seo,
    breadcrumb: source.breadcrumb,
    hero: source.hero,
    section: source.section,
    services: source.services,
    cta: source.cta,
  };
}

export function getArticlesPageModel(): ArticlesPageModel {
  const source = publicSiteContentRepository.getArticlesPageSource();

  return {
    seo: source.seo,
    breadcrumb: source.breadcrumb,
    hero: source.hero,
    section: source.section,
    articles: source.articles,
    featuredArticle: source.articles[0] ?? null,
    cta: source.cta,
  };
}

export function getFaqPageModel(): FaqPageModel {
  const source = publicSiteContentRepository.getFaqPageSource();

  return {
    seo: source.seo,
    breadcrumb: source.breadcrumb,
    hero: source.hero,
    sections: source.sections,
    cta: source.cta,
  };
}

export function getContactPageModel(): ContactPageModel {
  const source = publicSiteContentRepository.getContactPageSource();

  return {
    seo: source.seo,
    breadcrumb: source.breadcrumb,
    hero: source.hero,
    form: {
      ...source.form,
      elementId: "contact-inquiry-form",
    },
    sections: source.sections,
  };
}
