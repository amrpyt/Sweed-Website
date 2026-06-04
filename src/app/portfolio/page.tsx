import { getLegacyMetadata, LegacyPage } from "@/features/legacy-site";

export const metadata = getLegacyMetadata("portfolio");

export default function PortfolioPage() {
  return <LegacyPage page="portfolio" />;
}
