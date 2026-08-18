import { servicesPageSource } from "@/content/public-site/services-page";
import { ServicesPublicPage } from "@/features/public-site/pages/services-public-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: servicesPageSource.seo.title,
  description: servicesPageSource.seo.description,
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesPublicPage />;
}
