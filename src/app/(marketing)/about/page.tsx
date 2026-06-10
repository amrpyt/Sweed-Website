import { AboutPublicPage } from "@/features/public-site/pages/about-public-page";
import { getAboutPageModel } from "@/features/public-site";

const aboutPage = getAboutPageModel();

export const metadata = {
  title: aboutPage.seo.title,
  description: aboutPage.seo.description,
};

export default AboutPublicPage;
