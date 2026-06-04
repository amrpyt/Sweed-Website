import { getLegacyMetadata, LegacyPage } from "@/features/legacy-site";

export const metadata = getLegacyMetadata("home");

export default function HomePage() {
  return <LegacyPage page="home" />;
}
