import { getLegacyMetadata } from "@/features/legacy-site/legacy-html";
import { LegacyPage } from "@/features/legacy-site/legacy-page";

export const metadata = getLegacyMetadata("about");

export default function AboutPage() {
  return <LegacyPage page="about" presentation="exact" />;
}
