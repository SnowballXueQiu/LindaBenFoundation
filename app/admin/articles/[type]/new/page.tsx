import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { articleTypes, type ArticleType } from "@/lib/content/types";
import ArticleEditor from "../../ArticleEditor";

export default async function NewArticlePage({ params }: { params: Promise<{ type: string }> }) {
  await requireAdmin();
  const { type } = await params;
  if (!articleTypes.includes(type as ArticleType)) notFound();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">{type}</p>
      <h1 className="mt-2 text-3xl font-bold">New article</h1>
      <div className="mt-8">
        <ArticleEditor type={type as ArticleType} />
      </div>
    </main>
  );
}
