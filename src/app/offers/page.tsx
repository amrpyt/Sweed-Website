import { getLegacyMetadata, LegacyPage } from "@/features/legacy-site";

export const metadata = getLegacyMetadata("offers");

export default function OffersPage() {
  return <LegacyPage page="offers" />;
}
