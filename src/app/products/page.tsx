import { getLegacyMetadata, LegacyPage } from "@/features/legacy-site";

export const metadata = getLegacyMetadata("products");

export default function ProductsPage() {
  return <LegacyPage page="products" />;
}
