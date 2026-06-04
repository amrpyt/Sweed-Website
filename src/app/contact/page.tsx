import { getLegacyMetadata, LegacyPage } from "@/features/legacy-site";

export const metadata = getLegacyMetadata("contact");

export default function ContactPage() {
  return <LegacyPage page="contact" />;
}
