import { portfolioPageSource } from "@/content/public-site/portfolio-page";
import { LegacyPage } from "@/features/legacy-site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: portfolioPageSource.seo.title,
  description: portfolioPageSource.seo.description,
  path: "/portfolio",
});

export default function PortfolioPage() {
  return <LegacyPage page="portfolio" presentation="reference" />;
}
