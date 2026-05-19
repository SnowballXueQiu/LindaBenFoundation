"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { defaultLocale, isSupportedLocale, supportedLocales, type Locale } from "@/lib/i18n/config";
import { deleteArticle, markExistingArticleTranslationsPending, saveArticle, translateArticleToLocales } from "@/lib/content/repository";
import { makeSlug } from "@/lib/content/markdown";
import { normalizeArticleMarkdown } from "@/lib/content/normalize-markdown";
import { articleTypes, type Article, type ArticleStatus, type ArticleType } from "@/lib/content/types";

export type AdminActionState = {
  ok?: boolean;
  message?: string;
};

function stringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function parseType(value: string): ArticleType {
  if (articleTypes.includes(value as ArticleType)) return value as ArticleType;
  throw new Error("Invalid article type.");
}

function parseStatus(value: string): ArticleStatus {
  return value === "published" ? "published" : "draft";
}

export async function saveArticleAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  await requireAdmin();

  const type = parseType(stringValue(formData, "type"));
  const title = stringValue(formData, "title");
  const existingSlug = stringValue(formData, "existingSlug");
  const slug = stringValue(formData, "slug") || existingSlug || makeSlug(title);
  const locale = stringValue(formData, "locale") || defaultLocale;
  const body = normalizeArticleMarkdown(stringValue(formData, "body"));

  if (!title || !slug || !body) {
    return { ok: false, message: "Title, slug, and content are required." };
  }

  if (!isSupportedLocale(locale)) {
    return { ok: false, message: "Unsupported locale." };
  }

  const now = new Date().toISOString();
  const article: Article = {
    type,
    slug,
    locale,
    title,
    excerpt: stringValue(formData, "excerpt"),
    status: parseStatus(stringValue(formData, "status")),
    coverImage: stringValue(formData, "coverImage") || undefined,
    author: stringValue(formData, "author") || undefined,
    publishedAt: stringValue(formData, "publishedAt") || undefined,
    updatedAt: now,
    tags: stringValue(formData, "tags")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    category: stringValue(formData, "category") || undefined,
    body,
  };

  const saved = await saveArticle(article, { translateMissing: true });
  const autoTargets = supportedLocales.filter((targetLocale) => targetLocale !== locale);
  after(async () => {
    const translated = await translateArticleToLocales(type, slug, saved.locale, autoTargets);
    revalidatePath("/admin");
    for (const translatedArticle of translated) {
      revalidatePath(`/${translatedArticle.locale}/${type}`);
      revalidatePath(`/${translatedArticle.locale}/${type}/${slug}`);
    }
  });

  revalidatePath("/");
  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/${type}`);
  revalidatePath(`/${locale}/${type}/${slug}`);
  if (type === "newsletter") {
    revalidatePath(`/${locale}/newsletter`);
    revalidatePath(`/${locale}/newsletter/${slug}`);
  }
  revalidatePath("/admin");
  redirect(`/admin/articles/${type}/${slug}?locale=${locale}`);
}

export async function translateArticleAction(formData: FormData) {
  await requireAdmin();
  const type = parseType(stringValue(formData, "type"));
  const slug = stringValue(formData, "slug");
  const sourceLocale = stringValue(formData, "sourceLocale") || defaultLocale;

  if (!slug) throw new Error("Missing slug.");
  if (!isSupportedLocale(sourceLocale)) throw new Error("Unsupported source locale.");

  const selected = formData.getAll("targetLocales").map(String);
  const targetLocales = selected.includes("all")
    ? supportedLocales.filter((locale) => locale !== sourceLocale)
    : selected.filter(isSupportedLocale);

  await markExistingArticleTranslationsPending(type, slug, sourceLocale as Locale, targetLocales);
  after(async () => {
    const translated = await translateArticleToLocales(type, slug, sourceLocale as Locale, targetLocales);
    revalidatePath("/admin");
    for (const translatedArticle of translated) {
      revalidatePath(`/${translatedArticle.locale}/${type}`);
      revalidatePath(`/${translatedArticle.locale}/${type}/${slug}`);
    }
  });

  revalidatePath("/");
  revalidatePath("/admin");
  for (const locale of targetLocales) {
    revalidatePath(`/${locale}/${type}`);
    revalidatePath(`/${locale}/${type}/${slug}`);
  }

  redirect(`/admin/articles/${type}/${slug}?locale=${sourceLocale}&queued=${targetLocales.length}`);
}

export async function deleteArticleAction(formData: FormData) {
  await requireAdmin();
  const type = parseType(stringValue(formData, "type"));
  const slug = stringValue(formData, "slug");
  if (!slug) throw new Error("Missing slug.");
  await deleteArticle(type, slug);
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}
