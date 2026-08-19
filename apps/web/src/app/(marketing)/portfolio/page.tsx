import { LegacyPage } from "@/features/legacy-site/legacy-page";

export const metadata = {
  title: "أعمال سويد | استشارات وبراند وتسويق ومحتوى ودعاية",
};

export default function PortfolioPage() {
  return <LegacyPage page="portfolio" presentation="exact" />;
}
