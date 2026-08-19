import { getLegacyMetadata } from "@/features/legacy-site/legacy-html";
import { LegacyPage } from "@/features/legacy-site/legacy-page";

export const metadata = getLegacyMetadata("portfolio");

export default function PortfolioPage() {
  return <LegacyPage page="portfolio" presentation="exact" />;
}
