import { articles, faqGroups, offers, portfolioItems, products, services, siteSettings } from "@/content/local-data";
import type { Article, FAQGroup, Offer, PortfolioItem, Product, Service, SiteSettings } from "@/content/types";

export type ContentRepository = {
  getSiteSettings(): SiteSettings;
  getServices(): Service[];
  getServiceBySlug(slug: string): Service | null;
  getOffers(): Offer[];
  getOfferBySlug(slug: string): Offer | null;
  getProducts(): Product[];
  getProductBySlug(slug: string): Product | null;
  getPortfolioItems(): PortfolioItem[];
  getPortfolioItemBySlug(slug: string): PortfolioItem | null;
  getArticles(): Article[];
  getArticleBySlug(slug: string): Article | null;
  getFAQGroups(): FAQGroup[];
  getFAQGroupBySlug(slug: string): FAQGroup | null;
};

function byOrder<T extends { order: number }>(items: T[]) {
  return [...items].sort((a, b) => a.order - b.order);
}

function bySlug<T extends { slug: string }>(items: T[], slug: string) {
  return items.find((item) => item.slug === slug) ?? null;
}

// Future Sanity integration should replace these repository implementations,
// while keeping the public function contracts stable for pages and features.
export const localContentRepository: ContentRepository = {
  getSiteSettings() {
    return siteSettings;
  },
  getServices() {
    return byOrder(services);
  },
  getServiceBySlug(slug: string) {
    return bySlug(services, slug);
  },
  getOffers() {
    return byOrder(offers);
  },
  getOfferBySlug(slug: string) {
    return bySlug(offers, slug);
  },
  getProducts() {
    return byOrder(products);
  },
  getProductBySlug(slug: string) {
    return bySlug(products, slug);
  },
  getPortfolioItems() {
    return byOrder(portfolioItems);
  },
  getPortfolioItemBySlug(slug: string) {
    return bySlug(portfolioItems, slug);
  },
  getArticles() {
    return byOrder(articles);
  },
  getArticleBySlug(slug: string) {
    return bySlug(articles, slug);
  },
  getFAQGroups() {
    return byOrder(faqGroups);
  },
  getFAQGroupBySlug(slug: string) {
    return bySlug(faqGroups, slug);
  },
};

export const contentRepository: ContentRepository = localContentRepository;
