import { offersPageSource } from "@/content/public-site/offers-page";
import { LegacyPage } from "@/features/legacy-site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: offersPageSource.seo.title,
  description: offersPageSource.seo.description,
  path: "/offers",
});

export default function OffersPage() {
  return <LegacyPage page="offers" presentation="reference" />;
}
