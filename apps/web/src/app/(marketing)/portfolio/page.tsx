import { portfolioPageSource } from "@/content/public-site/portfolio-page";
import { PortfolioExecutivePage } from "@/features/public-site/portfolio/portfolio-executive-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: portfolioPageSource.seo.title,
  description: portfolioPageSource.seo.description,
  path: "/portfolio",
});

export default PortfolioExecutivePage;
