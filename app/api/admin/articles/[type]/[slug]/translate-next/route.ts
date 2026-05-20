import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { isSupportedLocale } from "@/lib/i18n/config";
import { claimNextArticleTranslation, translateArticleToLocales } from "@/lib/content/repository";
import { articleTypes, type ArticleType } from "@/lib/content/types";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request, { params }: { params: Promise<{ type: string; slug: string }> }) {
  await requireAdmin();
  const { type, slug } = await params;
  if (!articleTypes.includes(type as ArticleType)) {
    return NextResponse.json({ error: "Invalid article type." }, { status: 400 });
  }

  const body = await request.json().catch(() => ({} as { sourceLocale?: string }));
  const requestedSourceLocale = isSupportedLocale(body.sourceLocale) ? body.sourceLocale : undefined;
  const claim = await claimNextArticleTranslation(type as ArticleType, slug, requestedSourceLocale);
  if (claim.busy) {
    return NextResponse.json({ ok: true, idle: false, busy: true });
  }

  if (claim.idle || !claim.sourceLocale || !claim.targetLocale) {
    return NextResponse.json({ ok: true, idle: true });
  }

  after(async () => {
    const translated = await translateArticleToLocales(type as ArticleType, slug, claim.sourceLocale!, [claim.targetLocale!]);
    revalidatePath("/admin");
    revalidatePath(`/${claim.targetLocale}/${type}`);
    revalidatePath(`/${claim.targetLocale}/${type}/${slug}`);
    if (type === "newsletter") {
      revalidatePath(`/${claim.targetLocale}/newsletter`);
      revalidatePath(`/${claim.targetLocale}/newsletter/${slug}`);
    }
    return translated;
  });

  return NextResponse.json({
    ok: true,
    idle: false,
    locale: claim.targetLocale,
    processing: true,
  });
}
