import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/content/local-data";
import { ArticleDetailPublicPage } from "@/features/public-site/pages/article-detail-public-page";
import { createPageMetadata } from "@/lib/seo";

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

  const metadata = createPageMetadata({
    title: `${article.seo.title} | SWEED`,
    description: article.seo.description,
    path: `/articles/${article.slug}`,
    image: article.seo.image,
  });

  return {
    ...metadata,
    keywords: article.tags,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: article.publishedAt,
      authors: article.author?.name ? [article.author.name] : undefined,
      tags: article.tags,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) notFound();

  return <ArticleDetailPublicPage article={article} allArticles={articles} />;
}
