import { getLegacyMetadata, LegacyPage } from "@/features/legacy-site";

export function generateStaticParams() {
  return [{ slug: "legacy" }];
}

export const metadata = getLegacyMetadata("article-detail");

export default function ArticlePage() {
  return <LegacyPage page="article-detail" />;
}
