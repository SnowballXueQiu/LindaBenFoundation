import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle } from "@/lib/content/repository";
import { defaultLocale, getAlternates, isSupportedLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import ArticleDetailPage from "@/components/ArticleDetailPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const article = await getArticle("newsletter", slug, locale);
  if (!article) return {};

  return {
    title: `${article.title} — LindaBen Foundation`,
    description: article.excerpt,
    alternates: { canonical: `/${locale}/newsletter/${slug}`, languages: getAlternates(`/newsletter/${slug}`) },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.coverImage ? [article.coverImage] : undefined,
    },
  };
}

export default async function NewsletterDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const article = await getArticle("newsletter", slug, locale);
  if (!article || article.status !== "published") notFound();
  const dictionary = await getDictionary(locale);
  return <ArticleDetailPage article={article} locale={locale} dictionary={dictionary} />;
}
