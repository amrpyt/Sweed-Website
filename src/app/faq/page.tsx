import { getLegacyMetadata, LegacyPage } from "@/features/legacy-site";

export const metadata = getLegacyMetadata("faq");

export default function FAQPage() {
  return <LegacyPage page="faq" />;
}
