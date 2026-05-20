import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { isSupportedLocale, supportedLocales, type Locale } from "@/lib/i18n/config";
import { listArticleTranslationStatuses, markExistingArticleTranslationsPending } from "@/lib/content/repository";
import { articleTypes, type ArticleType } from "@/lib/content/types";

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: Promise<{ type: string; slug: string }> }) {
  await requireAdmin();
  const { type, slug } = await params;
  if (!articleTypes.includes(type as ArticleType)) {
    return NextResponse.json({ error: "Invalid article type." }, { status: 400 });
  }

  const body = (await request.json().catch(() => ({}))) as { sourceLocale?: unknown; targetLocales?: unknown };
  const sourceLocale = typeof body.sourceLocale === "string" ? body.sourceLocale : "";
  if (!isSupportedLocale(sourceLocale)) {
    return NextResponse.json({ error: "Unsupported source locale." }, { status: 400 });
  }

  const selectedTargets = Array.isArray(body.targetLocales)
    ? body.targetLocales.filter((locale): locale is string => typeof locale === "string")
    : [];
  const targetLocales = selectedTargets.includes("all")
    ? supportedLocales.filter((locale) => locale !== sourceLocale)
    : selectedTargets
        .filter(isSupportedLocale)
        .filter((locale, index, arr) => locale !== sourceLocale && arr.indexOf(locale) === index);

  if (targetLocales.length) {
    await markExistingArticleTranslationsPending(type as ArticleType, slug, sourceLocale as Locale, targetLocales);
    revalidatePath("/admin");
  }

  const statuses = await listArticleTranslationStatuses(type as ArticleType, slug, sourceLocale as Locale);
  return NextResponse.json({ ok: true, queued: targetLocales.length, statuses, updatedAt: new Date().toISOString() });
}
