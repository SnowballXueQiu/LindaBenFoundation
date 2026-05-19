import { notFound } from "next/navigation";
import { deleteArticleAction, translateArticleAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/auth";
import { defaultLocale, isSupportedLocale, supportedLocales } from "@/lib/i18n/config";
import { getArticle, getArticleExact, listArticleTranslations, listArticleTranslationStatuses } from "@/lib/content/repository";
import { articleTypes, type ArticleType } from "@/lib/content/types";
import ArticleEditor from "../../ArticleEditor";
import TranslationStatusPanel from "../../TranslationStatusPanel";

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
        <TranslationStatusPanel
          key={`${slug}-${article.locale}`}
          type={type as ArticleType}
          slug={slug}
          currentLocale={article.locale}
          locales={supportedLocales}
          initialStatuses={statuses}
          queued={queued}
          translated={translated}
        />

        <form action={translateArticleAction} className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-4">
          <input type="hidden" name="type" value={type} />
          <input type="hidden" name="slug" value={slug} />
          <input type="hidden" name="sourceLocale" value={article.locale} />
          <p className="text-sm font-bold text-slate-700">Translate from</p>
          <p className="mt-2 text-sm text-slate-600">
            <span className="font-bold uppercase text-emerald-800">{article.locale}</span> - {article.title}
          </p>
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
        <ArticleEditor key={`${article.slug}-${article.locale}-${article.updatedAt}`} type={type as ArticleType} article={article} />
      </div>
    </main>
  );
}
