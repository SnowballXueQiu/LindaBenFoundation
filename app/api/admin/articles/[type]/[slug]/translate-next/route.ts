import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { isSupportedLocale, type Locale } from "@/lib/i18n/config";
import { listArticleTranslationStatuses, translateArticleToLocales } from "@/lib/content/repository";
import { articleTypes, type ArticleTranslationStatus, type ArticleType } from "@/lib/content/types";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const staleProcessingMs = 60_000;

function needsWork(status: ArticleTranslationStatus) {
  if (status.state === "pending") return true;
  if (status.state !== "processing" && status.state !== "translating") return false;
  const updatedAt = Date.parse(status.updatedAt || "");
  return !Number.isFinite(updatedAt) || Date.now() - updatedAt > staleProcessingMs;
}

function isFreshProcessing(status: ArticleTranslationStatus) {
  if (status.state !== "processing" && status.state !== "translating") return false;
  const updatedAt = Date.parse(status.updatedAt || "");
  return Number.isFinite(updatedAt) && Date.now() - updatedAt <= staleProcessingMs;
}

export async function POST(request: Request, { params }: { params: Promise<{ type: string; slug: string }> }) {
  await requireAdmin();
  const { type, slug } = await params;
  if (!articleTypes.includes(type as ArticleType)) {
    return NextResponse.json({ error: "Invalid article type." }, { status: 400 });
  }

  const body = await request.json().catch(() => ({} as { sourceLocale?: string }));
  const requestedSourceLocale = isSupportedLocale(body.sourceLocale) ? body.sourceLocale : undefined;
  const statuses = await listArticleTranslationStatuses(type as ArticleType, slug, requestedSourceLocale);
  if (statuses.some(isFreshProcessing)) {
    return NextResponse.json({ ok: true, idle: false, busy: true });
  }

  const next = statuses.find(needsWork);

  if (!next) {
    return NextResponse.json({ ok: true, idle: true });
  }

  const sourceLocale = isSupportedLocale(next.sourceLocale) ? next.sourceLocale : requestedSourceLocale;
  if (!sourceLocale || !isSupportedLocale(next.locale)) {
    return NextResponse.json({ error: "Missing source or target locale." }, { status: 400 });
  }

  const translated = await translateArticleToLocales(type as ArticleType, slug, sourceLocale as Locale, [next.locale as Locale]);
  revalidatePath("/admin");
  revalidatePath(`/${next.locale}/${type}`);
  revalidatePath(`/${next.locale}/${type}/${slug}`);
  if (type === "newsletter") {
    revalidatePath(`/${next.locale}/newsletter`);
    revalidatePath(`/${next.locale}/newsletter/${slug}`);
  }

  return NextResponse.json({
    ok: true,
    idle: false,
    locale: next.locale,
    translated: translated.length,
  });
}
