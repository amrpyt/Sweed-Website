import { ExactReferencePage } from "@/features/public-site/pages/exact-reference-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "مقالات في الإدارة والتسويق ونمو الأعمال | سويد",
  description: "مقالات وأدلة عملية تساعد أصحاب المشروعات على اتخاذ قرارات أوضح في الإدارة والتسويق والبراند والرقمنة، بخبرة سويد ومنهج البوصلة.",
  path: "/articles",
});

export default function ArticlesPage() {
  return <ExactReferencePage src="/reference-pages/articles.html" title="مقالات سويد" />;
}
