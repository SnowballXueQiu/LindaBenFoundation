import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { defaultLocale, isSupportedLocale } from "@/lib/i18n/config";
import { getArticleOriginLocale, saveArticle } from "@/lib/content/repository";
import { makeSlug } from "@/lib/content/markdown";
import { normalizeArticleMarkdown } from "@/lib/content/normalize-markdown";
import { articleTypes, type Article, type ArticleStatus, type ArticleType } from "@/lib/content/types";

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

function validateArticleInput(input: {
  title: string;
  slug: string;
  body: string;
  locale: string;
  status: ArticleStatus;
  excerpt: string;
  category: string;
  tags: string[];
}) {
  const errors: string[] = [];
  if (!input.title) errors.push("title is required");
  if (!input.slug) errors.push("slug is required");
  if (!input.body) errors.push("body is required");
  if (!isSupportedLocale(input.locale)) errors.push(`locale "${input.locale || "empty"}" is not supported`);
  if (!["draft", "published"].includes(input.status)) errors.push(`status "${input.status}" is not supported`);
  if (input.status === "published") {
    const missing = [
      !input.excerpt && "excerpt",
      !input.category && "category",
      input.tags.length === 0 && "tags",
    ].filter(Boolean);
    if (missing.length) errors.push(`published articles require metadata fields: ${missing.join(", ")}`);
  }
  return errors;
}

export async function POST(request: Request) {
  await requireAdmin();
  const formData = await request.formData();
  const type = parseType(stringValue(formData, "type"));
  const title = stringValue(formData, "title");
  const existingSlug = stringValue(formData, "existingSlug");
  const slug = stringValue(formData, "slug") || existingSlug || makeSlug(title);
  const locale = stringValue(formData, "locale") || defaultLocale;
  const body = normalizeArticleMarkdown(stringValue(formData, "body"));
  const status = parseStatus(stringValue(formData, "status"));
  const excerpt = stringValue(formData, "excerpt");
  const category = stringValue(formData, "category");
  const tags = stringValue(formData, "tags")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const validationErrors = validateArticleInput({ title, slug, body, locale, status, excerpt, category, tags });
  if (validationErrors.length) {
    return NextResponse.json({ error: `Cannot autosave article: ${validationErrors.join("; ")}.` }, { status: 400 });
  }

  const article: Article = {
    type,
    slug,
    locale,
    title,
    excerpt,
    status,
    coverImage: stringValue(formData, "coverImage") || undefined,
    author: stringValue(formData, "author") || "LindaBen Foundation",
    publishedAt: stringValue(formData, "publishedAt") || undefined,
    updatedAt: new Date().toISOString(),
    tags,
    category: category || undefined,
    body,
  };

  const originLocale = existingSlug ? await getArticleOriginLocale(type, slug, locale) : locale;
  const shouldTranslateFromOrigin = locale === originLocale;
  const saved = await saveArticle(article, { translateMissing: shouldTranslateFromOrigin });

  revalidatePath("/admin");
  revalidatePath(`/${locale}/${type}`);
  revalidatePath(`/${locale}/${type}/${slug}`);

  return NextResponse.json({ ok: true, slug: saved.slug, locale: saved.locale });
}
