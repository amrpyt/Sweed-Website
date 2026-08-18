import { offersPageSource } from "@/content/public-site/offers-page";
import { OffersExecutivePage } from "@/features/public-site/offers/offers-executive-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: offersPageSource.seo.title,
  description: offersPageSource.seo.description,
  path: "/offers",
});

export default function OffersPage() {
  return <OffersExecutivePage />;
}
