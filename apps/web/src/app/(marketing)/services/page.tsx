import { servicesPageSource } from "@/content/public-site/services-page";
import { ServicesExecutivePage } from "@/features/public-site/services/services-executive-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: servicesPageSource.seo.title,
  description: servicesPageSource.seo.description,
  path: "/services",
});

export default ServicesExecutivePage;
