import { servicesPageSource } from "@/content/public-site/services-page";
import { LegacyPage } from "@/features/legacy-site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: servicesPageSource.seo.title,
  description: servicesPageSource.seo.description,
  path: "/services",
});

export default function ServicesPage() {
  return <LegacyPage page="services" presentation="reference" />;
}
