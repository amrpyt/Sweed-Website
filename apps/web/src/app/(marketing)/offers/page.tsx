import { ExactReferencePage } from "@/features/public-site/pages/exact-reference-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "العروض والباقات | سويد — اختار نقطة البداية",
  description: "باقات سويد الشاملة وباقات الخدمات بثلاث مستويات لكل خدمة — اختيار واضح يبدأ من احتياجك، ومقارنة ذكية، وطلب تشخيص أو عرض مخصص.",
  path: "/offers",
});

export default function OffersPage() {
  return <ExactReferencePage src="/reference-pages/offers.html" title="العروض والباقات | سويد" />;
}
