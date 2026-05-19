import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { getArticleOriginLocale, listArticles } from "@/lib/content/repository";
import type { ArticleSummary, ArticleType } from "@/lib/content/types";

const sections: Array<{ type: ArticleType; title: string }> = [
  { type: "blogs", title: "Blogs" },
  { type: "newsletter", title: "Newsletter" },
];

async function groupByOriginLanguage(type: ArticleType, articles: ArticleSummary[]) {
  const groups = new Map<string, ArticleSummary[]>();
  for (const article of articles) {
    groups.set(article.slug, [...(groups.get(article.slug) || []), article]);
  }

  return Promise.all([...groups.values()].map(async (items) => {
    const originLocale = await getArticleOriginLocale(type, items[0].slug);
    const origin = items.find((item) => item.locale === originLocale) || items[0];
    return {
      article: origin,
      translationCount: items.length,
    };
  }));
}

export default async function AdminDashboardPage() {
  await requireAdmin();
  const [blogs, newsletter] = await Promise.all([listArticles("blogs", undefined, true), listArticles("newsletter", undefined, true)]);
  const articles = {
    blogs: await groupByOriginLanguage("blogs", blogs),
    newsletter: await groupByOriginLanguage("newsletter", newsletter),
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold">Content management</h1>
        </div>
        <Link href="/admin/media" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
          Manage media
        </Link>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {sections.map((section) => (
          <section key={section.type} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold">{section.title}</h2>
              <Link
                href={`/admin/articles/${section.type}/new`}
                className="rounded-md bg-emerald-800 px-3 py-2 text-sm font-semibold text-white"
              >
                New
              </Link>
            </div>
            <div className="mt-5 divide-y divide-slate-200">
              {articles[section.type].length === 0 && <p className="py-6 text-sm text-slate-500">No articles yet.</p>}
              {articles[section.type].map(({ article, translationCount }) => (
                <article key={article.slug} className="py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link href={`/admin/articles/${section.type}/${article.slug}?locale=${article.locale}`} className="font-semibold hover:text-emerald-800">
                        {article.title}
                      </Link>
                      <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                        {article.locale} · {article.status} · {article.publishedAt || "No publish date"}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {translationCount} language{translationCount === 1 ? "" : "s"} available. Open article to switch language.
                      </p>
                    </div>
                    <Link href={`/${article.locale}/${section.type}/${article.slug}`} className="text-sm font-medium text-emerald-800">
                      View
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
