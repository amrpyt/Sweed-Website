import { FaqPublicPage } from "@/features/public-site/pages/faq-public-page";
import { getFaqPageModel } from "@/features/public-site";

const faqPage = getFaqPageModel();

export const metadata = {
  title: faqPage.seo.title,
  description: faqPage.seo.description,
};

export default FaqPublicPage;
