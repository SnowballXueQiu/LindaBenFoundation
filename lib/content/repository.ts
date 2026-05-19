import "server-only";

import { cache } from "react";
import { defaultLocale, supportedLocales, type Locale } from "@/lib/i18n/config";
import { deleteObject, getObjectJson, getObjectText, getS3PublicUrl, hasS3Config, listObjects, putObject } from "@/lib/storage/s3";
import { articleStorageKey, articleToSummary, parseArticleMarkdown, serializeArticle } from "./markdown";
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

const extraFallbackBlogs: Article[] = [
  ["mental-health-food-insecurity", "Mental Health & Food Insecurity: The Hidden Connection", "When we talk about mental health, we often focus on therapy, self-care, and support systems. But there is a powerful factor that is frequently overlooked.", "https://picsum.photos/id/1027/900/620", "2026-05-12"],
  ["earth-month-local-farmers", "Earth Month: How Supporting Local Farmers Strengthens Health + Sustainability", "Earth Month invites us to reflect on how daily choices impact the planet and each other.", "https://picsum.photos/id/292/900/620", "2026-04-22"],
  ["rising-food-costs", "How Rising Food Costs Are Impacting Families in Maryland Right Now", "Grocery costs continue to climb, creating pressure for families already working hard to make ends meet.", "https://picsum.photos/id/1080/900/620", "2026-03-19"],
  ["national-volunteer-month", "National Volunteer Month: Why Youth Volunteerism Is Changing Communities", "Volunteers bring energy, compassion, and practical help to local families experiencing food insecurity.", "https://picsum.photos/id/1060/900/620", "2026-03-02"],
  ["food-insecurity-hunger-health", "Why Food Insecurity Isn't Just Hunger: The Health Connection", "Food insecurity can affect stress, focus, chronic disease risk, and whole-family stability.", "https://picsum.photos/id/1062/900/620", "2026-02-14"],
  ["heart-healthy-eating-budget", "Food as Medicine: Heart-Healthy Eating on a Budget", "Healthy eating can be affordable when families have access to practical recipes and reliable ingredients.", "https://picsum.photos/id/431/900/620", "2026-02-01"],
  ["pantry-staples-heart-healthy", "5 Pantry Staples for Heart-Healthy Meals", "A few pantry staples can make it easier to prepare nourishing meals at home.", "https://picsum.photos/id/488/900/620", "2026-01-18"],
  ["myth-vs-fact-food-insecurity", "Myth vs. Fact: Food Insecurity in Maryland", "Food insecurity is often misunderstood. Clear facts help communities respond with dignity and care.", "https://picsum.photos/id/225/900/620", "2026-01-08"],
  ["volunteer-resolutions", "Volunteer Resolutions: 5 Realistic Ways to Show Up Consistently", "Small, consistent commitments can create meaningful impact throughout the year.", "https://picsum.photos/id/674/900/620", "2026-01-02"],
  ["healthy-holidays", "Healthy Holidays: Nourishing Meals, Bright Traditions, and Recipes You'll Actually Want to Make", "The holidays can be joyful and nourishing, even when budgets are tight.", "https://picsum.photos/id/493/900/620", "2025-12-19"],
  ["hunger-free-holidays", "No One Should Go Hungry for the Holidays: Understanding Food Insecurity", "The season can bring extra pressure for families, making community food support especially important.", "https://picsum.photos/id/429/900/620", "2025-12-03"],
  ["september-hunger-action-month", "September Is Hunger Action Month: How LindaBen Foundation Helps Fight Hunger", "Hunger Action Month is a reminder that reliable food access changes lives.", "https://picsum.photos/id/102/900/620", "2025-09-10"],
].map(([slug, title, excerpt, coverImage, publishedAt]) => ({
  type: "blogs",
  slug,
  locale: "en",
  title,
  excerpt,
  status: "published",
  coverImage,
  author: "LindaBen Foundation",
  publishedAt,
  updatedAt: `${publishedAt}T00:00:00.000Z`,
  tags: ["Food Insecurity"],
  category: "Community",
  body: [
    `## ${title}`,
    excerpt,
    "LindaBen Foundation sees food as more than a meal. Reliable access to nutritious food supports dignity, stability, learning, and whole-person wellness.",
    "Through community partnerships, volunteer support, and direct pantry programs, families receive practical help when they need it most.",
  ].join("\n\n"),
})) satisfies Article[];

const extraFallbackNewsletters: Article[] = [
  ["tlf-healthy-foods-may-2026", "TLF Healthy Foods May 2026 Newsletter", "May Nutrition Tips, spring produce ideas, and healthy recipes for families.", "https://picsum.photos/id/488/900/560", "2026-04-26"],
  ["tlf-healthy-foods-april-2026", "TLF Healthy Foods April 2026 Newsletter", "April Nutrition Tips and seasonal foods to support balanced meals.", "https://picsum.photos/id/493/900/560", "2026-03-31"],
  ["tlf-healthy-foods-march-2026", "TLF Healthy Foods March 2026 Newsletter", "March Nutrition Tips with family-friendly meal ideas.", "https://picsum.photos/id/292/900/560", "2026-03-09"],
  ["tlf-healthy-foods-february-2026", "TLF Healthy Foods February 2026 Newsletter", "February Nutrition Tips for heart health and comfort meals.", "https://picsum.photos/id/1060/900/560", "2026-02-09"],
  ["tlf-healthy-foods-january-2025", "TLF Healthy Foods January 2025 Newsletter", "Start the year strong with simple nourishing choices.", "https://picsum.photos/id/431/900/560", "2025-12-25"],
  ["tlf-healthy-foods-december-2025", "TLF Healthy Foods December 2025 Newsletter", "Seasonal produce choices, family meals, and wellness reminders.", "https://picsum.photos/id/102/900/560", "2025-12-15"],
  ["tlf-healthy-foods-november-2025", "TLF Healthy Foods November 2025 Newsletter", "Simple meals, immune support, and pantry-friendly ingredients.", "https://picsum.photos/id/674/900/560", "2025-11-03"],
  ["lindaben-scribes-quarter-2-2025", "LindaBen Scribes, Quarter 2 2025 Edition", "Stories, updates, and highlights from the heart of our work.", "/icons/logo.svg", "2025-06-15"],
].map(([slug, title, excerpt, coverImage, publishedAt]) => ({
  type: "newsletter",
  slug,
  locale: "en",
  title,
  excerpt,
  status: "published",
  coverImage,
  author: "Annabelle Beavan",
  publishedAt,
  updatedAt: `${publishedAt}T00:00:00.000Z`,
  tags: ["Nutrition Tips"],
  category: "Newsletter",
  body: [
    `## ${title}`,
    "🌱 Nutrition Tips",
    excerpt,
    "This sample newsletter demonstrates how monthly updates, recipes, and education notes render on the public site before Garage/S3 content is populated.",
    "## Food Traditions of Renewal",
    "Healthy meals can honor tradition while helping families build energy, focus, and resilience.",
    "## Take Our Survey",
    "Community feedback helps LindaBen Foundation improve programs and meet families where they are.",
  ].join("\n\n"),
})) satisfies Article[];

const allFallbackBlogs = [...fallbackBlogs, ...extraFallbackBlogs];
const allFallbackNewsletters = [...fallbackNewsletters, ...extraFallbackNewsletters];

function indexKey(type: ArticleType) {
  return `content/${type}/index.json`;
}

function articleSummary(article: Article): ArticleSummary {
  return {
    ...articleToSummary(article),
    storageKey: articleStorageKey(article),
  };
}

function legacyArticleKey(type: ArticleType, slug: string, locale: Locale) {
  return `content/${type}/${slug}.${locale}.md`;
}

function storageKeyForSummary(summary: ArticleSummary) {
  return summary.storageKey || legacyArticleKey(summary.type, summary.slug, summary.locale);
}

async function findArticleKeyInStorage(type: ArticleType, slug: string, locale: Locale) {
  const objects = await listObjects(`content/${type}/${slug}/`);
  const folderKey = objects
    .map((object) => object.key)
    .find((key) => key.endsWith(`-${locale}.md`));

  if (folderKey) return folderKey;

  const legacyKey = legacyArticleKey(type, slug, locale);
  try {
    await getObjectText(legacyKey);
    return legacyKey;
  } catch {
    return null;
  }
}

function sortByPublishedAt(a: ArticleSummary, b: ArticleSummary) {
  return (Date.parse(b.publishedAt || b.updatedAt) || 0) - (Date.parse(a.publishedAt || a.updatedAt) || 0);
}

function getFallbackIndex(type: ArticleType): ArticleIndex {
  const articles = type === "blogs" ? allFallbackBlogs : allFallbackNewsletters;
  return {
    articles: articles.map(articleSummary),
    updatedAt: new Date(0).toISOString(),
  };
}

function getFallbackArticle(type: ArticleType, slug: string, locale: Locale): Article | null {
  const articles = type === "blogs" ? allFallbackBlogs : allFallbackNewsletters;
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
  const index = await getArticleIndex(type);

  for (const candidate of localesToTry) {
    const summary = index.articles.find((item) => item.slug === slug && item.locale === candidate);
    if (!summary) {
      const storageKey = await findArticleKeyInStorage(type, slug, candidate);
      if (!storageKey) continue;
      try {
        const markdown = await getObjectText(storageKey);
        return parseArticleMarkdown(markdown, { type, slug, locale: candidate });
      } catch {
        continue;
      }
    }

    try {
      const markdown = await getObjectText(storageKeyForSummary(summary));
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

  const index = await getArticleIndex(normalized.type);
  const current = index.articles.find((item) => item.slug === normalized.slug && item.locale === normalized.locale);
  const normalizedKey = articleStorageKey(normalized);

  await putObject(normalizedKey, serializeArticle(normalized), "text/markdown; charset=utf-8");
  if (current && storageKeyForSummary(current) !== normalizedKey) {
    await deleteObject(storageKeyForSummary(current));
  }

  const withoutCurrent = index.articles.filter(
    (item) => !(item.slug === normalized.slug && item.locale === normalized.locale),
  );

  let nextArticles = [...withoutCurrent, articleSummary(normalized)];

  if (options.translateMissing) {
    const existingLocales = new Set(nextArticles.filter((item) => item.slug === normalized.slug).map((item) => item.locale));
    const missingLocales = supportedLocales.filter((locale) => locale !== normalized.locale && !existingLocales.has(locale));

    for (const targetLocale of missingLocales) {
      const translated = await translateArticle(normalized, targetLocale);
      if (!translated) continue;
      await putObject(articleStorageKey(translated), serializeArticle(translated), "text/markdown; charset=utf-8");
      nextArticles = [...nextArticles, articleSummary(translated)];
    }
  }

  await putArticleIndex(normalized.type, nextArticles);
  return normalized;
}

export async function deleteArticle(type: ArticleType, slug: string) {
  const index = await getArticleIndex(type);
  const matches = index.articles.filter((article) => article.slug === slug);

  for (const article of matches) {
    await deleteObject(storageKeyForSummary(article));
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
