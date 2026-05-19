import { revalidatePath } from "next/cache";
import { after, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { defaultLocale, isSupportedLocale, supportedLocales, type Locale } from "@/lib/i18n/config";
import { getArticleOriginLocale, saveArticle, translateArticleToLocales } from "@/lib/content/repository";
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

export async function POST(request: Request) {
  await requireAdmin();
  const formData = await request.formData();
  const type = parseType(stringValue(formData, "type"));
  const title = stringValue(formData, "title");
  const existingSlug = stringValue(formData, "existingSlug");
  const slug = stringValue(formData, "slug") || existingSlug || makeSlug(title);
  const locale = stringValue(formData, "locale") || defaultLocale;
  const body = normalizeArticleMarkdown(stringValue(formData, "body"));

  if (!title || !slug || !body) {
    return NextResponse.json({ error: "Title, slug, and content are required." }, { status: 400 });
  }

  if (!isSupportedLocale(locale)) {
    return NextResponse.json({ error: "Unsupported locale." }, { status: 400 });
  }

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
    updatedAt: new Date().toISOString(),
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
  const autoTargets = supportedLocales.filter((targetLocale) => targetLocale !== saved.locale);

  if (shouldTranslateFromOrigin) {
    after(async () => {
      const translated = await translateArticleToLocales(type, slug, saved.locale as Locale, autoTargets);
      revalidatePath("/admin");
      for (const translatedArticle of translated) {
        revalidatePath(`/${translatedArticle.locale}/${type}`);
        revalidatePath(`/${translatedArticle.locale}/${type}/${slug}`);
      }
    });
  }

  revalidatePath("/admin");
  revalidatePath(`/${locale}/${type}`);
  revalidatePath(`/${locale}/${type}/${slug}`);

  return NextResponse.json({ ok: true, slug: saved.slug, locale: saved.locale });
}
