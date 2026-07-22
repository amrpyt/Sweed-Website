import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/content/local-data";
import { ServiceDetailPublicPage } from "@/features/public-site/pages/service-detail-public-page";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) return {};

  return {
    title: `${service.seo.title} | SWEED`,
    description: service.seo.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) notFound();

  return <ServiceDetailPublicPage service={service} />;
}
