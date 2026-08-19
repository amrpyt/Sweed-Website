import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { services } from "@/content/local-data";
import {
  getServiceReferenceDocument,
  serviceReferenceSlugs,
  type ServiceReferenceSlug,
} from "@/features/legacy-site/service-reference-html";
import { ServiceReferencePage } from "@/features/public-site/pages/service-reference-page";
import { createPageMetadata } from "@/lib/seo";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [
    ...services
      .filter((service) => service.slug !== "development")
      .map((service) => ({ slug: service.slug })),
    { slug: "software-development" },
  ];
}

function isServiceReferenceSlug(slug: string): slug is ServiceReferenceSlug {
  return serviceReferenceSlugs.includes(slug as ServiceReferenceSlug);
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceReferenceSlug(slug)) return {};

  const document = getServiceReferenceDocument(slug);
  return createPageMetadata({
    title: document.title || "SWEED",
    description: document.description || undefined,
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;

  if (slug === "development") {
    permanentRedirect("/services/software-development");
  }

  if (!isServiceReferenceSlug(slug)) notFound();

  return <ServiceReferencePage slug={slug} />;
}
