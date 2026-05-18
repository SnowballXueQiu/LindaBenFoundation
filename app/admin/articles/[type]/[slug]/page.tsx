import { notFound } from "next/navigation";
import { deleteArticleAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { defaultLocale } from "@/lib/i18n/config";
import { getArticle } from "@/lib/content/repository";
import { articleTypes, type ArticleType } from "@/lib/content/types";
import ArticleEditor from "../../ArticleEditor";

export default async function EditArticlePage({ params }: { params: Promise<{ type: string; slug: string }> }) {
  await requireAdmin();
  const { type, slug } = await params;
  if (!articleTypes.includes(type as ArticleType)) notFound();

  const article = await getArticle(type as ArticleType, slug, defaultLocale);
  if (!article) notFound();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">{type}</p>
          <h1 className="mt-2 text-3xl font-bold">Edit article</h1>
        </div>
        <form action={deleteArticleAction}>
          <input type="hidden" name="type" value={type} />
          <input type="hidden" name="slug" value={slug} />
          <button type="submit" className="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-700">
            Delete
          </button>
        </form>
      </div>
      <div className="mt-8">
        <ArticleEditor type={type as ArticleType} article={article} />
      </div>
    </main>
  );
}
