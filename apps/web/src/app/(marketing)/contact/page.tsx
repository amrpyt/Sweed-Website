import { ContactPublicPage } from "@/features/public-site/pages/contact-public-page";
import { getContactPageModel } from "@/features/public-site";
import { createPageMetadata } from "@/lib/seo";

const contactPage = getContactPageModel();

export const metadata = createPageMetadata({
  title: contactPage.seo.title,
  description: contactPage.seo.description,
  path: "/contact",
});

export default ContactPublicPage;
