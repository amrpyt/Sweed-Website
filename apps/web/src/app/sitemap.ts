import type { MetadataRoute } from "next";
import { contentRepository } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/about", "/services", "/offers", "/products", "/portfolio", "/articles", "/faq", "/contact"];
  const serviceRoutes = contentRepository.getServices().map((service) => `/services/${service.slug}`);
  const articleRoutes = contentRepository.getArticles().map((article) => `/articles/${article.slug}`);

  return [...staticRoutes, ...serviceRoutes, ...articleRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date("2026-05-04"),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
