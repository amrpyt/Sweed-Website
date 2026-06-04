import { getLegacyMetadata, LegacyPage } from "@/features/legacy-site";

export const metadata = getLegacyMetadata("articles");

export default function ArticlesPage() {
  return <LegacyPage page="articles" />;
}
