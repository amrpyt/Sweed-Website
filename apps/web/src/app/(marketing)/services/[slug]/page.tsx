import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { services } from "@/content/local-data";
import { softwareDevelopmentPageSource } from "@/content/public-site/software-development-page";
import { ServiceDetailPublicPage } from "@/features/public-site/pages/service-detail-public-page";
import { SoftwareDevelopmentPage } from "@/features/public-site/software-development/software-development-page";
import { createPageMetadata } from "@/lib/seo";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [
    ...services.filter((service) => service.slug !== "development").map((service) => ({ slug: service.slug })),
    { slug: "software-development" },
  ];
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "software-development") {
    return createPageMetadata({
      title: softwareDevelopmentPageSource.seo.title,
      description: softwareDevelopmentPageSource.seo.description,
      path: "/services/software-development",
    });
  }

  const service = services.find((item) => item.slug === slug);
  if (!service) return {};

  return createPageMetadata({
    title: `${service.seo.title} | SWEED`,
    description: service.seo.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;

  if (slug === "development") {
    permanentRedirect("/services/software-development");
  }

  if (slug === "software-development") {
    return <SoftwareDevelopmentPage />;
  }

  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return <ServiceDetailPublicPage service={service} />;
}
