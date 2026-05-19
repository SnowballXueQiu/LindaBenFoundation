import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getArticleExact } from "@/lib/content/repository";
import { defaultLocale, getAlternates, isSupportedLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import ArticleDetailPage from "@/components/ArticleDetailPage";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const article = await getArticleExact("blogs", slug, locale) || await getArticle("blogs", slug, locale);
  if (!article) return {};

  return {
    title: `${article.title} — LindaBen Foundation`,
    description: article.excerpt,
    alternates: { canonical: `/${locale}/blogs/${slug}`, languages: getAlternates(`/blogs/${slug}`) },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.coverImage ? [article.coverImage] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const article = await getArticleExact("blogs", slug, locale) || await getArticle("blogs", slug, locale);
  if (!article || article.status !== "published") notFound();
  const dictionary = await getDictionary(locale);
  return <ArticleDetailPage article={article} locale={locale} dictionary={dictionary} />;
}
