import { ServicesPublicPage } from "@/features/public-site/pages/services-public-page";
import { getServicesPageModel } from "@/features/public-site";

const servicesPage = getServicesPageModel();

export const metadata = {
  title: servicesPage.seo.title,
  description: servicesPage.seo.description,
};

export default ServicesPublicPage;
