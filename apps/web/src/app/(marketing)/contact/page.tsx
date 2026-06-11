import { ContactPublicPage } from "@/features/public-site/pages/contact-public-page";
import { getContactPageModel } from "@/features/public-site";

const contactPage = getContactPageModel();

export const metadata = {
  title: contactPage.seo.title,
  description: contactPage.seo.description,
};

export default ContactPublicPage;
