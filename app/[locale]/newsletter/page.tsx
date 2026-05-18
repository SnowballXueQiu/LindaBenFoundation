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
    title: `${dictionary.newsletter.title} — LindaBen Foundation`,
    description: dictionary.newsletter.description,
    alternates: { canonical: `/${locale}/newsletter`, languages: getAlternates("/newsletter") },
  };
}

export default async function NewsletterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const [dictionary, articles] = await Promise.all([getDictionary(locale), listArticles("newsletter", locale)]);
  return <ArticleListPage type="newsletter" articles={articles} locale={locale} dictionary={dictionary} />;
}
