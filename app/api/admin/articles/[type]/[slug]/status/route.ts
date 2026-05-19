import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { isSupportedLocale } from "@/lib/i18n/config";
import { articleTypes, type ArticleType } from "@/lib/content/types";
import { listArticleTranslationStatuses } from "@/lib/content/repository";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ type: string; slug: string }> }) {
  await requireAdmin();
  const { type, slug } = await params;
  if (!articleTypes.includes(type as ArticleType)) {
    return NextResponse.json({ error: "Invalid article type." }, { status: 400 });
  }

  const sourceLocale = new URL(request.url).searchParams.get("sourceLocale") || undefined;
  const statuses = await listArticleTranslationStatuses(
    type as ArticleType,
    slug,
    isSupportedLocale(sourceLocale) ? sourceLocale : undefined,
  );

  return NextResponse.json(
    { statuses, updatedAt: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
