import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/content/local-data";
import { ArticleDetailPublicPage } from "@/features/public-site/pages/article-detail-public-page";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) return {};

  return {
    title: `${article.seo.title} | SWEED`,
    description: article.seo.description,
    openGraph: {
      type: "article",
      title: article.seo.title,
      description: article.seo.description,
      images: article.seo.image ? [article.seo.image] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) notFound();

  return <ArticleDetailPublicPage article={article} />;
}
