"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { deleteContactSubmission } from "@/lib/contact/submissions";
import { defaultLocale, isSupportedLocale, supportedLocales, type Locale } from "@/lib/i18n/config";
import { deleteArticle, getArticleOriginLocale, markExistingArticleTranslationsPending, saveArticle } from "@/lib/content/repository";
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
  let redirectTo = "";

  try {
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

    const originLocale = existingSlug ? await getArticleOriginLocale(type, slug, locale) : locale;
    const shouldTranslateFromOrigin = locale === originLocale;
    const saved = await saveArticle(article, { translateMissing: shouldTranslateFromOrigin });
    const queuedCount = shouldTranslateFromOrigin ? supportedLocales.filter((targetLocale) => targetLocale !== saved.locale).length : 0;

    revalidatePath("/");
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/${type}`);
    revalidatePath(`/${locale}/${type}/${slug}`);
    if (type === "newsletter") {
      revalidatePath(`/${locale}/newsletter`);
      revalidatePath(`/${locale}/newsletter/${slug}`);
    }
    revalidatePath("/admin");
    redirectTo = `/admin/articles/${type}/${slug}?locale=${locale}${queuedCount ? `&queued=${queuedCount}` : ""}`;
  } catch (error) {
    console.error("saveArticleAction failed", error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to save article.",
    };
  }

  redirect(redirectTo);
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

export async function deleteContactSubmissionAction(formData: FormData) {
  await requireAdmin();
  const id = stringValue(formData, "id");
  if (!id) throw new Error("Missing contact submission id.");

  await deleteContactSubmission(id);
  revalidatePath("/admin");
  revalidatePath("/admin/contact");
}
