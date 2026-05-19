import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { getArticle } from "@/lib/content/repository";
import { serializeArticle, makeMarkdownFileTitle } from "@/lib/content/markdown";
import { articleTypes, type ArticleType } from "@/lib/content/types";
import { defaultLocale, isSupportedLocale } from "@/lib/i18n/config";

export async function GET(request: Request, { params }: { params: Promise<{ type: string; slug: string }> }) {
  await requireAdmin();
  const { type, slug } = await params;
  if (!articleTypes.includes(type as ArticleType)) {
    return NextResponse.json({ error: "Invalid article type." }, { status: 400 });
  }

  const url = new URL(request.url);
  const requestedLocale = url.searchParams.get("locale") || defaultLocale;
  const locale = isSupportedLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const article = await getArticle(type as ArticleType, slug, locale);

  if (!article) {
    return NextResponse.json({ error: "Article not found." }, { status: 404 });
  }

  const fileName = `${makeMarkdownFileTitle(article.title, article.slug)}-${article.locale}.md`;
  const asciiFallbackName = `${article.slug}-${article.locale}.md`;
  return new NextResponse(serializeArticle(article), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${asciiFallbackName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
    },
  });
}
