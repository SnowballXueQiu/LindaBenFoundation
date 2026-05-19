import "server-only";

import { createHash } from "crypto";
import { defaultLocale, supportedLocales, type Locale } from "@/lib/i18n/config";
import { deleteObject, getObjectJson, getObjectText, getS3PublicUrl, hasS3Config, listObjects, putObject } from "@/lib/storage/s3";
import { articleStorageKey, articleToSummary, parseArticleMarkdown, serializeArticle } from "./markdown";
import { translateArticle } from "@/lib/translation/bedrock";
import type { Article, ArticleIndex, ArticleSummary, ArticleTranslationStatus, ArticleTranslationStatusStore, ArticleType } from "./types";

const emptyIndex: ArticleIndex = { articles: [], updatedAt: new Date(0).toISOString() };
const emptyTranslationStatusStore: ArticleTranslationStatusStore = { statuses: {}, updatedAt: new Date(0).toISOString() };

function indexKey(type: ArticleType) {
  return `content/${type}/index.json`;
}

function translationStatusKey(type: ArticleType, slug: string) {
  return `content/${type}/${slug}/translation-status.json`;
}

function articleSummary(article: Article): ArticleSummary {
  return {
    ...articleToSummary(article),
    storageKey: articleStorageKey(article),
  };
}

function storageKeyForSummary(summary: ArticleSummary) {
  return summary.storageKey || articleStorageKey(summary);
}

async function findArticleKeyInStorage(type: ArticleType, slug: string, locale: Locale) {
  const objects = await listObjects(`content/${type}/${slug}/`);
  return objects
    .map((object) => object.key)
    .find((key) => key.endsWith(`-${locale}.md`)) || null;
}

function sortByPublishedAt(a: ArticleSummary, b: ArticleSummary) {
  return (Date.parse(b.publishedAt || b.updatedAt) || 0) - (Date.parse(a.publishedAt || a.updatedAt) || 0);
}

function articleSourceHash(article: Article) {
  return createHash("sha256")
    .update(
      JSON.stringify({
        title: article.title,
        excerpt: article.excerpt,
        category: article.category || "",
        tags: article.tags,
        coverImage: article.coverImage || "",
        author: article.author || "",
        publishedAt: article.publishedAt || "",
        status: article.status,
        body: article.body,
      }),
    )
    .digest("hex");
}

function isActiveTranslationState(state?: string) {
  return state === "pending" || state === "processing" || state === "translating";
}

export async function getArticleIndex(type: ArticleType): Promise<ArticleIndex> {
  if (!hasS3Config()) return emptyIndex;
  return getObjectJson<ArticleIndex>(indexKey(type), emptyIndex);
}

export async function putArticleIndex(type: ArticleType, articles: ArticleSummary[]) {
  await putObject(
    indexKey(type),
    JSON.stringify({ articles: articles.toSorted(sortByPublishedAt), updatedAt: new Date().toISOString() }, null, 2),
    "application/json",
  );
}

async function getTranslationStatusStore(type: ArticleType, slug: string) {
  if (!hasS3Config()) return emptyTranslationStatusStore;
  return getObjectJson<ArticleTranslationStatusStore>(translationStatusKey(type, slug), emptyTranslationStatusStore);
}

async function putTranslationStatusStore(type: ArticleType, slug: string, store: ArticleTranslationStatusStore) {
  await putObject(
    translationStatusKey(type, slug),
    JSON.stringify({ ...store, updatedAt: new Date().toISOString() }, null, 2),
    "application/json",
  );
}

export async function listArticleTranslationStatuses(type: ArticleType, slug: string, requestedSourceLocale: Locale = defaultLocale) {
  const [translations, store, storageObjects] = await Promise.all([
    listArticleTranslations(type, slug),
    getTranslationStatusStore(type, slug),
    hasS3Config() ? listObjects(`content/${type}/${slug}/`) : Promise.resolve([]),
  ]);
  const existingLocales = new Set(translations.map((article) => article.locale));
  const existingUpdatedAt = new Map<Locale, string>();
  for (const article of translations) {
    existingUpdatedAt.set(article.locale, article.updatedAt);
  }
  for (const object of storageObjects) {
    const match = object.key.match(/-([a-z]{2})\.md$/i);
    if (match && supportedLocales.includes(match[1])) {
      const locale = match[1];
      existingLocales.add(locale);
      if (object.lastModified) {
        existingUpdatedAt.set(locale, object.lastModified.toISOString());
      }
    }
  }

  const storedOrigin = Object.values(store.statuses).find((status) => status.state === "origin" && existingLocales.has(status.locale))?.locale;
  const sourceLocale =
    storedOrigin ||
    (existingLocales.has(requestedSourceLocale) ? requestedSourceLocale : undefined) ||
    (existingLocales.has(defaultLocale) ? defaultLocale : undefined) ||
    translations[0]?.locale ||
    defaultLocale;
  const source = await getArticleExact(type, slug, sourceLocale) || await getArticle(type, slug, sourceLocale);
  const sourceHash = source ? articleSourceHash(source) : "";

  return supportedLocales.map((locale): ArticleTranslationStatus => {
    const stored = store.statuses[locale];
    const exists = existingLocales.has(locale);
    const storedUpdatedAt = Date.parse(stored?.updatedAt || "");
    const existingTime = Date.parse(existingUpdatedAt.get(locale) || "");
    const activeState = isActiveTranslationState(stored?.state);
    const hasFreshExistingFile = exists && (!activeState || !Number.isFinite(storedUpdatedAt) || (Number.isFinite(existingTime) && existingTime >= storedUpdatedAt - 1000));

    if (locale === sourceLocale && exists) {
      return { locale, state: "origin", sourceLocale, sourceHash, updatedAt: source?.updatedAt };
    }

    if (hasFreshExistingFile && stored?.sourceHash && sourceHash && stored.sourceHash !== sourceHash) {
      return { ...stored, state: "stale" };
    }

    if (hasFreshExistingFile) {
      return {
        locale,
        state: "done",
        sourceLocale: stored?.sourceLocale || sourceLocale,
        sourceHash: stored?.sourceHash || sourceHash,
        updatedAt: stored?.updatedAt,
      };
    }

    if (activeState || stored?.state === "failed") {
      return stored;
    }

    return { locale, state: "missing", sourceLocale, sourceHash };
  });
}

export async function getArticleOriginLocale(type: ArticleType, slug: string, requestedSourceLocale: Locale = defaultLocale) {
  const [translations, store] = await Promise.all([
    listArticleTranslations(type, slug),
    getTranslationStatusStore(type, slug),
  ]);
  const existingLocales = new Set(translations.map((article) => article.locale));
  const storedOrigin = Object.values(store.statuses).find((status) => status.state === "origin" && existingLocales.has(status.locale))?.locale;
  return (
    storedOrigin ||
    (existingLocales.has(requestedSourceLocale) ? requestedSourceLocale : undefined) ||
    (existingLocales.has(defaultLocale) ? defaultLocale : undefined) ||
    translations[0]?.locale ||
    defaultLocale
  );
}

export async function markArticleTranslationsPending(article: Article, targetLocales: Locale[]) {
  if (!hasS3Config()) return [];
  const now = new Date().toISOString();
  const sourceHash = articleSourceHash(article);
  const store = await getTranslationStatusStore(article.type, article.slug);
  const uniqueTargets = targetLocales.filter(
    (locale, index, arr) => locale !== article.locale && supportedLocales.includes(locale) && arr.indexOf(locale) === index,
  );

  for (const locale of uniqueTargets) {
    store.statuses[locale] = {
      locale,
      state: "pending",
      sourceLocale: article.locale,
      sourceHash,
      updatedAt: now,
    };
  }

  store.statuses[article.locale] = {
    locale: article.locale,
    state: "origin",
    sourceLocale: article.locale,
    sourceHash,
    updatedAt: now,
  };

  await putTranslationStatusStore(article.type, article.slug, store);
  return uniqueTargets;
}

async function markArticleLocaleSaved(article: Article) {
  if (!hasS3Config()) return;

  const store = await getTranslationStatusStore(article.type, article.slug);
  const translations = await listArticleTranslations(article.type, article.slug);
  const existingLocales = new Set(translations.map((item) => item.locale));
  const storedOrigin = Object.values(store.statuses).find((status) => status.state === "origin" && existingLocales.has(status.locale))?.locale;
  const sourceLocale =
    storedOrigin ||
    (existingLocales.has(defaultLocale) ? defaultLocale : undefined) ||
    article.locale;
  const source = sourceLocale === article.locale ? article : await getArticleExact(article.type, article.slug, sourceLocale);
  const sourceHash = source ? articleSourceHash(source) : store.statuses[article.locale]?.sourceHash || articleSourceHash(article);

  store.statuses[article.locale] = {
    locale: article.locale,
    state: sourceLocale === article.locale ? "origin" : "done",
    sourceLocale,
    sourceHash,
    updatedAt: article.updatedAt,
  };

  await putTranslationStatusStore(article.type, article.slug, store);
}

export async function markExistingArticleTranslationsPending(type: ArticleType, slug: string, sourceLocale: Locale, targetLocales: Locale[]) {
  const source = await getArticleExact(type, slug, sourceLocale) || await getArticle(type, slug, sourceLocale);
  if (!source) {
    throw new Error("Source article not found.");
  }
  return markArticleTranslationsPending(source, targetLocales);
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

export async function listArticleTranslations(type: ArticleType, slug: string) {
  const index = await getArticleIndex(type);
  return index.articles
    .filter((article) => article.slug === slug)
    .toSorted((a, b) => supportedLocales.indexOf(a.locale) - supportedLocales.indexOf(b.locale));
}

export async function getArticleExact(type: ArticleType, slug: string, locale: Locale): Promise<Article | null> {
  if (!hasS3Config()) return null;

  const index = await getArticleIndex(type);
  const summary = index.articles.find((item) => item.slug === slug && item.locale === locale);

  if (summary) {
    try {
      const markdown = await getObjectText(storageKeyForSummary(summary));
      return parseArticleMarkdown(markdown, { type, slug, locale });
    } catch {
      return null;
    }
  }

  const storageKey = await findArticleKeyInStorage(type, slug, locale);
  if (!storageKey) return null;

  try {
    const markdown = await getObjectText(storageKey);
    return parseArticleMarkdown(markdown, { type, slug, locale });
  } catch {
    return null;
  }
}

export async function getArticle(type: ArticleType, slug: string, locale: Locale): Promise<Article | null> {
  if (!hasS3Config()) return null;

  const localesToTry = [locale, defaultLocale, ...supportedLocales].filter((item, index, arr) => arr.indexOf(item) === index);
  const index = await getArticleIndex(type);
  const statusStore = await getTranslationStatusStore(type, slug);

  for (const candidate of localesToTry) {
    const state = statusStore.statuses[candidate]?.state;
    if (candidate === locale && ["pending", "processing", "translating", "failed", "stale"].includes(state || "")) {
      continue;
    }

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

  return null;
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

  const nextArticles = [...withoutCurrent, articleSummary(normalized)];

  await putArticleIndex(normalized.type, nextArticles);

  if (options.translateMissing) {
    await markArticleTranslationsPending(
      normalized,
      supportedLocales.filter((locale) => locale !== normalized.locale),
    );
  } else {
    await markArticleLocaleSaved(normalized);
  }

  return normalized;
}

export async function translateArticleToLocales(type: ArticleType, slug: string, sourceLocale: Locale, targetLocales: Locale[]) {
  const source = await getArticleExact(type, slug, sourceLocale) || await getArticle(type, slug, sourceLocale);
  if (!source) {
    throw new Error("Source article not found.");
  }

  const uniqueTargets = targetLocales.filter(
    (locale, index, arr) => locale !== source.locale && supportedLocales.includes(locale) && arr.indexOf(locale) === index,
  );
  if (!uniqueTargets.length) return [];

  const sourceHash = articleSourceHash(source);
  const store = await getTranslationStatusStore(type, slug);
  const translatedArticles: Article[] = [];

  for (const targetLocale of uniqueTargets) {
    store.statuses[targetLocale] = {
      locale: targetLocale,
      state: "processing",
      sourceLocale: source.locale,
      sourceHash,
      updatedAt: new Date().toISOString(),
    };
    await putTranslationStatusStore(type, slug, store);

    try {
      const translated = await translateArticle(source, targetLocale);
      if (!translated) {
        store.statuses[targetLocale] = {
          locale: targetLocale,
          state: "failed",
          sourceLocale: source.locale,
          sourceHash,
          updatedAt: new Date().toISOString(),
          error: "Bedrock returned no translation.",
        };
        await putTranslationStatusStore(type, slug, store);
        continue;
      }

      await putObject(articleStorageKey(translated), serializeArticle(translated), "text/markdown; charset=utf-8");
      translatedArticles.push(translated);
      const latestIndex = await getArticleIndex(type);
      await putArticleIndex(
        type,
        [
          ...latestIndex.articles.filter((item) => !(item.slug === slug && item.locale === targetLocale)),
          articleSummary(translated),
        ],
      );
      store.statuses[targetLocale] = {
        locale: targetLocale,
        state: "done",
        sourceLocale: source.locale,
        sourceHash,
        updatedAt: new Date().toISOString(),
      };
      await putTranslationStatusStore(type, slug, store);
    } catch (error) {
      store.statuses[targetLocale] = {
        locale: targetLocale,
        state: "failed",
        sourceLocale: source.locale,
        sourceHash,
        updatedAt: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error),
      };
      await putTranslationStatusStore(type, slug, store);
    }
  }

  return translatedArticles;
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
