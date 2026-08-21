import { articlesPageSource } from "@/content/public-site/articles-page";
import { ArticlesExecutivePage } from "@/features/public-site/articles/articles-executive-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: articlesPageSource.seo.title,
  description: articlesPageSource.seo.description,
  path: "/articles",
});

export default function ArticlesPage() {
  return <ArticlesExecutivePage />;
}
