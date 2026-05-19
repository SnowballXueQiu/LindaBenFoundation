import { notFound } from "next/navigation";
import Link from "next/link";
import { deleteArticleAction, translateArticleAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { defaultLocale, isSupportedLocale, supportedLocales } from "@/lib/i18n/config";
import { getArticle, getArticleExact, listArticleTranslations, listArticleTranslationStatuses } from "@/lib/content/repository";
import { articleTypes, type ArticleType } from "@/lib/content/types";
import ArticleEditor from "../../ArticleEditor";

export default async function EditArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string; slug: string }>;
  searchParams: Promise<{ locale?: string; queued?: string; translated?: string }>;
}) {
  await requireAdmin();
  const { type, slug } = await params;
  const { locale: rawLocale, queued, translated } = await searchParams;
  if (!articleTypes.includes(type as ArticleType)) notFound();

  const requestedLocale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;
  const [translations, statuses, exactArticle] = await Promise.all([
    listArticleTranslations(type as ArticleType, slug),
    listArticleTranslationStatuses(type as ArticleType, slug, requestedLocale),
    getArticleExact(type as ArticleType, slug, requestedLocale),
  ]);
  const article = exactArticle || (await getArticle(type as ArticleType, slug, defaultLocale));
  if (!article) notFound();
  const availableLocales = new Set(translations.map((item) => item.locale));
  const statusByLocale = new Map(statuses.map((status) => [status.locale, status]));

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">{type}</p>
          <h1 className="mt-2 text-3xl font-bold">Edit article</h1>
          <p className="mt-2 text-sm text-slate-500">
            Editing <span className="font-semibold uppercase text-emerald-800">{article.locale}</span> markdown for <span className="font-semibold">{article.title}</span>
          </p>
        </div>
        <form action={deleteArticleAction}>
          <input type="hidden" name="type" value={type} />
          <input type="hidden" name="slug" value={slug} />
          <button type="submit" className="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-700">
            Delete
          </button>
        </form>
      </div>

      <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">Languages</h2>
            <p className="mt-1 text-sm text-slate-500">Switch language to edit or preview its generated Markdown.</p>
          </div>
          {queued && (
            <p className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-800">
              {queued} translation{queued === "1" ? "" : "s"} queued
            </p>
          )}
          {translated && (
            <p className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800">
              {translated} translation{translated === "1" ? "" : "s"} generated
            </p>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {supportedLocales.map((locale) => {
            const exists = availableLocales.has(locale);
            const isActive = article.locale === locale;
            const status = statusByLocale.get(locale);
            const state = status?.state || (exists ? "done" : "missing");
            return (
              <div key={locale} className={`rounded-md border px-3 py-2 text-sm ${isActive ? "border-emerald-700 bg-emerald-50" : "border-slate-200 bg-slate-50"}`}>
                <Link href={`/admin/articles/${type}/${slug}?locale=${locale}`} className={exists ? "font-bold text-slate-950" : "font-semibold text-slate-400"}>
                  {locale.toUpperCase()}
                </Link>
                <span className={`ml-2 rounded-full px-2 py-0.5 text-[11px] font-bold uppercase ${
                  state === "done" || state === "origin"
                    ? "bg-emerald-100 text-emerald-800"
                    : state === "pending" || state === "translating"
                      ? "bg-amber-100 text-amber-800"
                      : state === "failed"
                        ? "bg-red-100 text-red-700"
                        : state === "stale"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-slate-200 text-slate-600"
                }`}>
                  {state}
                </span>
                {exists ? (
                  <Link href={`/${locale}/${type}/${slug}`} target="_blank" className="ml-3 text-xs font-semibold text-emerald-800">
                    Preview
                  </Link>
                ) : (
                  <span className="ml-3 text-xs text-slate-400">Origin fallback</span>
                )}
                {status?.error && <p className="mt-1 max-w-64 text-xs text-red-700">{status.error}</p>}
              </div>
            );
          })}
        </div>

        <form action={translateArticleAction} className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-4">
          <input type="hidden" name="type" value={type} />
          <input type="hidden" name="slug" value={slug} />
          <label className="block text-sm font-bold text-slate-700" htmlFor="sourceLocale">Translate from</label>
          <select id="sourceLocale" name="sourceLocale" defaultValue={article.locale} className="mt-2 rounded-md border border-slate-300 px-3 py-2 text-sm">
            {translations.map((item) => (
              <option key={item.locale} value={item.locale}>
                {item.locale.toUpperCase()} - {item.title}
              </option>
            ))}
          </select>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <label className="flex items-center gap-2 rounded border border-slate-200 bg-white px-3 py-2 text-sm font-semibold">
              <input type="checkbox" name="targetLocales" value="all" />
              All other languages
            </label>
            {supportedLocales.map((locale) => (
              <label key={locale} className="flex items-center gap-2 rounded border border-slate-200 bg-white px-3 py-2 text-sm">
                <input type="checkbox" name="targetLocales" value={locale} disabled={locale === article.locale} />
                {locale.toUpperCase()}
                {availableLocales.has(locale) && locale !== article.locale && <span className="text-xs text-amber-700">overwrite</span>}
              </label>
            ))}
          </div>
          <button type="submit" className="mt-4 rounded-md bg-emerald-800 px-4 py-2 text-sm font-bold text-white">
            Regenerate selected translations
          </button>
        </form>
      </section>

      <div className="mt-8">
        <ArticleEditor type={type as ArticleType} article={article} />
      </div>
    </main>
  );
}
