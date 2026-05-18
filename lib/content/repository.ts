import "server-only";

import { cache } from "react";
import { defaultLocale, supportedLocales, type Locale } from "@/lib/i18n/config";
import { deleteObject, getObjectJson, getObjectText, getS3PublicUrl, hasS3Config, listObjects, putObject } from "@/lib/storage/s3";
import { articleToSummary, parseArticleMarkdown, serializeArticle } from "./markdown";
import { translateArticle } from "@/lib/translation/bedrock";
import type { Article, ArticleIndex, ArticleSummary, ArticleType } from "./types";

const emptyIndex: ArticleIndex = { articles: [], updatedAt: new Date(0).toISOString() };

const fallbackBlogs: Article[] = [
  {
    type: "blogs",
    slug: "food-as-medicine-november",
    locale: "en",
    title: "Food as Medicine: November Newsletter",
    excerpt:
      "November 2024 Thanksgiving: A Time to Celebrate with Family and Flavor. Healthy Thanksgiving: Delicious Recipes for a Memorable Holiday.",
    status: "published",
    coverImage: "https://picsum.photos/id/493/800/500",
    author: "Annabelle Beavan",
    publishedAt: "2024-11-22",
    updatedAt: "2024-11-22T00:00:00.000Z",
    tags: ["Food as Medicine"],
    category: "Food as Medicine",
    body: [
      "## Thanksgiving flavors with healthier choices",
      "This sample blog post shows how CMS articles render on the public site while Garage/S3 content is empty.",
      "Use the admin editor to replace this fallback post with a real article, add a cover image from the media library, and publish localized versions.",
    ].join("\n\n"),
  },
  {
    type: "blogs",
    slug: "food-as-medicine-october",
    locale: "en",
    title: "Food as Medicine: October Newsletter",
    excerpt:
      "October 2024 — Your Guide to Fall's Harvest Delights. Discover seasonal produce and recipes that nourish your body.",
    status: "published",
    coverImage: "https://picsum.photos/id/139/800/500",
    publishedAt: "2024-10-14",
    updatedAt: "2024-10-14T00:00:00.000Z",
    tags: ["Food as Medicine"],
    category: "Food as Medicine",
    body: [
      "## Seasonal produce for fall meals",
      "This sample post is included so the blog page is not empty before content is uploaded.",
      "Once S3 has published blog articles, those articles become the source of truth.",
    ].join("\n\n"),
  },
  {
    type: "blogs",
    slug: "food-as-medicine-september",
    locale: "en",
    title: "Food as Medicine: September Newsletter",
    excerpt:
      "September 2024 — As summer winds down, we look at how fresh seasonal ingredients can support immune health.",
    status: "published",
    coverImage: "https://picsum.photos/id/429/800/500",
    author: "Annabelle Beavan",
    publishedAt: "2024-09-11",
    updatedAt: "2024-09-11T00:00:00.000Z",
    tags: ["Food as Medicine"],
    category: "Food as Medicine",
    body: [
      "## Fresh ingredients as summer ends",
      "This fallback blog post demonstrates the Markdown rendering pipeline used by the public article pages.",
      "Images, links, and allowed embedded HTML can be managed from the admin CMS.",
    ].join("\n\n"),
  },
];

const fallbackNewsletters: Article[] = [
  {
    type: "newsletter",
    slug: "community-pantry-winter-update",
    locale: "en",
    title: "Community Pantry Winter Update",
    excerpt:
      "A sample newsletter update on pantry service times, volunteer needs, and food support for families during the colder months.",
    status: "published",
    coverImage: "https://picsum.photos/id/292/800/500",
    author: "LindaBen Foundation",
    publishedAt: "2025-01-10",
    updatedAt: "2025-01-10T00:00:00.000Z",
    tags: ["Community Pantry", "Newsletter"],
    category: "Newsletter",
    body: [
      "## Winter pantry update",
      "This is sample newsletter content so the `/newsletter` page has visible data before real Garage/S3 articles are created.",
      "Families can continue to receive pantry support through our scheduled community distribution programs. Volunteers can help with intake, sorting, and delivery coordination.",
    ].join("\n\n"),
  },
  {
    type: "newsletter",
    slug: "youth-volunteers-impact-note",
    locale: "en",
    title: "Youth Volunteers Impact Note",
    excerpt:
      "A sample newsletter story highlighting youth volunteers, service hours, and community outreach work.",
    status: "published",
    coverImage: "https://picsum.photos/id/1027/800/500",
    author: "LindaBen Foundation",
    publishedAt: "2024-12-18",
    updatedAt: "2024-12-18T00:00:00.000Z",
    tags: ["Volunteer", "Newsletter"],
    category: "Newsletter",
    body: [
      "## Youth service in action",
      "This sample newsletter item demonstrates how published newsletter entries appear on the public site.",
      "Use `/admin/articles/newsletter/new` to create newsletter content, choose images from the media library, and publish it for each locale.",
    ].join("\n\n"),
  },
];

function indexKey(type: ArticleType) {
  return `content/${type}/index.json`;
}

function articleKey(type: ArticleType, slug: string, locale: Locale) {
  return `content/${type}/${slug}.${locale}.md`;
}

function sortByPublishedAt(a: ArticleSummary, b: ArticleSummary) {
  return (Date.parse(b.publishedAt || b.updatedAt) || 0) - (Date.parse(a.publishedAt || a.updatedAt) || 0);
}

function getFallbackIndex(type: ArticleType): ArticleIndex {
  const articles = type === "blogs" ? fallbackBlogs : fallbackNewsletters;
  return {
    articles: articles.map(articleToSummary),
    updatedAt: new Date(0).toISOString(),
  };
}

function getFallbackArticle(type: ArticleType, slug: string, locale: Locale): Article | null {
  const articles = type === "blogs" ? fallbackBlogs : fallbackNewsletters;
  const article = articles.find((item) => item.slug === slug && (item.locale === locale || item.locale === defaultLocale));
  return article || null;
}

export const getArticleIndex = cache(async (type: ArticleType): Promise<ArticleIndex> => {
  if (!hasS3Config()) return getFallbackIndex(type);
  const index = await getObjectJson<ArticleIndex>(indexKey(type), emptyIndex);
  if (!index.articles.length) {
    return getFallbackIndex(type);
  }
  return index;
});

export async function putArticleIndex(type: ArticleType, articles: ArticleSummary[]) {
  await putObject(
    indexKey(type),
    JSON.stringify({ articles: articles.toSorted(sortByPublishedAt), updatedAt: new Date().toISOString() }, null, 2),
    "application/json",
  );
}

export async function listArticles(type: ArticleType, locale?: Locale, includeDrafts = false) {
  const index = await getArticleIndex(type);
  const articles = includeDrafts ? index.articles : index.articles.filter((article) => article.status === "published");

  if (!locale) return articles.toSorted(sortByPublishedAt);

  const grouped = new Map<string, ArticleSummary>();
  for (const article of articles) {
    const existing = grouped.get(article.slug);
    if (!existing || article.locale === locale || (existing.locale !== locale && article.locale === defaultLocale)) {
      grouped.set(article.slug, article);
    }
  }

  return [...grouped.values()].toSorted(sortByPublishedAt);
}

export async function getArticle(type: ArticleType, slug: string, locale: Locale): Promise<Article | null> {
  if (!hasS3Config()) return getFallbackArticle(type, slug, locale);

  const localesToTry = [locale, defaultLocale, ...supportedLocales].filter((item, index, arr) => arr.indexOf(item) === index);

  for (const candidate of localesToTry) {
    try {
      const markdown = await getObjectText(articleKey(type, slug, candidate));
      return parseArticleMarkdown(markdown, { type, slug, locale: candidate });
    } catch {
      continue;
    }
  }

  return getFallbackArticle(type, slug, locale);
}

export async function saveArticle(article: Article, options: { translateMissing?: boolean } = {}) {
  const normalized: Article = {
    ...article,
    updatedAt: new Date().toISOString(),
  };

  await putObject(articleKey(normalized.type, normalized.slug, normalized.locale), serializeArticle(normalized), "text/markdown; charset=utf-8");

  const index = await getArticleIndex(normalized.type);
  const withoutCurrent = index.articles.filter(
    (item) => !(item.slug === normalized.slug && item.locale === normalized.locale),
  );

  let nextArticles = [...withoutCurrent, articleToSummary(normalized)];

  if (options.translateMissing) {
    const existingLocales = new Set(nextArticles.filter((item) => item.slug === normalized.slug).map((item) => item.locale));
    const missingLocales = supportedLocales.filter((locale) => locale !== normalized.locale && !existingLocales.has(locale));

    for (const targetLocale of missingLocales) {
      const translated = await translateArticle(normalized, targetLocale);
      if (!translated) continue;
      await putObject(articleKey(translated.type, translated.slug, translated.locale), serializeArticle(translated), "text/markdown; charset=utf-8");
      nextArticles = [...nextArticles, articleToSummary(translated)];
    }
  }

  await putArticleIndex(normalized.type, nextArticles);
  return normalized;
}

export async function deleteArticle(type: ArticleType, slug: string) {
  const index = await getArticleIndex(type);
  const matches = index.articles.filter((article) => article.slug === slug);

  for (const article of matches) {
    await deleteObject(articleKey(type, slug, article.locale));
  }

  await putArticleIndex(
    type,
    index.articles.filter((article) => article.slug !== slug),
  );
}

export async function listMedia() {
  if (!hasS3Config()) return [];
  const objects = await listObjects("media/");
  return objects
    .filter((object) => !object.key.endsWith("/"))
    .map((object) => ({
      ...object,
      url: getS3PublicUrl(object.key),
    }))
    .toSorted((a, b) => (b.lastModified?.getTime() || 0) - (a.lastModified?.getTime() || 0));
}

export async function putMedia(key: string, body: Uint8Array, contentType: string) {
  await putObject(key, body, contentType);
  return getS3PublicUrl(key);
}

export async function deleteMedia(key: string) {
  if (!key.startsWith("media/")) {
    throw new Error("Only media objects can be deleted from the media library.");
  }

  await deleteObject(key);
}
