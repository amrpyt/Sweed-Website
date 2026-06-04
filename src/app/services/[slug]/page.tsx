import { getLegacyMetadata, LegacyPage } from "@/features/legacy-site";

export function generateStaticParams() {
  return [{ slug: "legacy" }];
}

export const metadata = getLegacyMetadata("service-detail");

export default function ServiceDetailPage() {
  return <LegacyPage page="service-detail" />;
}
