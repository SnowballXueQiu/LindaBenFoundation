import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, getAlternates, isSupportedLocale } from "@/lib/i18n/config";
import { listArticles } from "@/lib/content/repository";
import ArticleListPage from "@/components/ArticleListPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = await getDictionary(locale);
  return {
    title: `${dictionary.news.title} — LindaBen Foundation`,
    description: dictionary.news.description,
    alternates: { canonical: `/${locale}/news`, languages: getAlternates("/news") },
  };
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const [dictionary, articles] = await Promise.all([getDictionary(locale), listArticles("news", locale)]);
  return <ArticleListPage type="news" articles={articles} locale={locale} dictionary={dictionary} />;
}
