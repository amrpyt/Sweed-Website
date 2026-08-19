import { services } from "@/content/local-data";
import type { ServiceReferenceSlug } from "@/features/legacy-site/service-reference-html";

const publicOrigin = "https://sweed.com";

export function getServiceReferenceModel(slug: ServiceReferenceSlug) {
  const sourceSlug = slug === "software-development" ? "development" : slug;
  const service = services.find((item) => item.slug === sourceSlug);

  if (!service) {
    throw new Error(`Missing public service content for ${slug}`);
  }

  return {
    slug,
    title: service.title,
    description: service.seo.description || service.description,
    url: `${publicOrigin}/services/${slug}`,
  } as const;
}

export function createServiceJsonLd(slug: ServiceReferenceSlug): Record<string, unknown> {
  const service = getServiceReferenceModel(slug);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.title,
    url: service.url,
    provider: {
      "@type": "Organization",
      name: "SWEED",
      url: publicOrigin,
    },
    areaServed: {
      "@type": "Country",
      name: "Egypt",
    },
  };
}
