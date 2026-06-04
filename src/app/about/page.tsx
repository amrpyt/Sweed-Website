import { getLegacyMetadata, LegacyPage } from "@/features/legacy-site";

export const metadata = getLegacyMetadata("about");

export default function AboutPage() {
  return <LegacyPage page="about" />;
}
