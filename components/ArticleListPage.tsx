import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { withLocale, type Locale } from "@/lib/i18n/config";
import type { ArticleSummary, ArticleType } from "@/lib/content/types";

function formatDate(value: string | undefined, locale: Locale) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(date);
}

function NewsletterSignup({ dictionary }: { dictionary: Dictionary }) {
  const copy = dictionary.newsletter;

  return (
    <aside className="lg:sticky lg:top-28">
      <form className="rounded-lg border bg-white p-6 shadow-sm" style={{ borderColor: "var(--green-pale)" }}>
        <h2 className="text-2xl font-bold leading-tight" style={{ color: "var(--green-deep)", fontFamily: "var(--font-merriweather), serif" }}>
          {copy.subscribeTitle}
        </h2>
        <label className="mt-5 block text-sm font-semibold" style={{ color: "var(--green-deep)" }} htmlFor="newsletter-email">
          {copy.emailLabel}
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder={copy.emailLabel}
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none transition-colors focus:border-emerald-700"
        />
        <button
          type="submit"
          className="mt-4 w-full rounded-full px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--green-deep)" }}
        >
          {copy.subscribeButton}
        </button>
      </form>
    </aside>
  );
}

function ArticleMeta({
  article,
  locale,
  dictionary,
}: {
  article: ArticleSummary;
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <p className="mt-2 text-[11px]" style={{ color: "var(--text-mid)" }}>
      {article.author && <span>{dictionary.common.by} {article.author} &bull; </span>}
      {formatDate(article.publishedAt || article.updatedAt, locale)}
    </p>
  );
}

function BlogListPage({
  articles,
  locale,
  dictionary,
  articleBasePath,
}: {
  articles: ArticleSummary[];
  locale: Locale;
  dictionary: Dictionary;
  articleBasePath: string;
}) {
  const copy = dictionary.blog;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-14 text-center lg:pt-40 lg:pb-20" style={{ background: "var(--green-deep)" }}>
          <div className="mx-auto max-w-4xl px-6">
            <h1 className="text-4xl font-bold text-white lg:text-6xl" style={{ fontFamily: "var(--font-merriweather), serif" }}>
              {copy.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80">
              {copy.description}
            </p>
          </div>
        </section>
        <section className="py-10 lg:py-14" style={{ background: "var(--warm-white)" }}>
          <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-12">
            {articles.length === 0 && <p style={{ color: "var(--text-mid)" }}>{copy.empty}</p>}
            {articles.map((article) => (
              <article key={`${article.slug}-${article.locale}`} className="overflow-hidden border bg-white shadow-md transition-transform duration-200 hover:-translate-y-1" style={{ borderColor: "var(--green-pale)" }}>
                {article.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={article.coverImage} alt="" className="aspect-[4/2.6] w-full object-cover" />
                )}
                <div className="p-5">
                  <h2 className="text-base font-bold leading-snug" style={{ color: "var(--green-deep)" }}>
                    <Link href={withLocale(`${articleBasePath}/${article.slug}`, locale)}>{article.title}</Link>
                  </h2>
                  <p className="mt-2 line-clamp-4 text-sm leading-relaxed" style={{ color: "var(--text-dark)" }}>
                    {article.excerpt}
                  </p>
                  <Link
                    href={withLocale(`${articleBasePath}/${article.slug}`, locale)}
                    className="mt-4 inline-flex rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                    style={{ background: "var(--green-deep)" }}
                  >
                    {dictionary.common.readMore}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function NewsletterListPage({
  articles,
  locale,
  dictionary,
  articleBasePath,
}: {
  articles: ArticleSummary[];
  locale: Locale;
  dictionary: Dictionary;
  articleBasePath: string;
}) {
  const copy = dictionary.newsletter;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-14 text-center lg:pt-40" style={{ background: "var(--green-deep)" }}>
          <div className="mx-auto max-w-3xl px-6">
            <h1 className="text-4xl font-bold italic text-white lg:text-6xl" style={{ fontFamily: "var(--font-merriweather), serif" }}>
              {copy.title}
            </h1>
            <form className="mx-auto mt-5 flex max-w-sm items-center rounded-full bg-white/90 px-4 py-1.5 shadow-sm">
              <input
                type="search"
                aria-label={copy.searchPlaceholder}
                placeholder={copy.searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent px-2 py-1 text-sm outline-none"
                style={{ color: "var(--text-dark)" }}
              />
              <button type="submit" className="rounded-full p-1.5" aria-label={copy.searchPlaceholder} style={{ color: "var(--green-deep)" }}>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </form>
          </div>
        </section>

        <section className="py-16 lg:py-24" style={{ background: "var(--warm-white)" }}>
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-12">
            <div className="min-w-0 space-y-9">
              {articles.length === 0 && <p style={{ color: "var(--text-mid)" }}>{copy.empty}</p>}
              {articles.map((article) => (
                <article key={`${article.slug}-${article.locale}`} className="max-w-3xl">
                  <h2 className="text-2xl font-bold leading-snug" style={{ color: "var(--green-deep)", fontFamily: "var(--font-merriweather), serif" }}>
                    <Link href={withLocale(`${articleBasePath}/${article.slug}`, locale)}>{article.title}</Link>
                  </h2>
                  <ArticleMeta article={article} locale={locale} dictionary={dictionary} />
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    {article.excerpt}
                  </p>
                  <Link href={withLocale(`${articleBasePath}/${article.slug}`, locale)} className="mt-3 inline-flex text-sm font-medium hover:underline" style={{ color: "var(--green-deep)" }}>
                    {dictionary.common.readMore} →
                  </Link>
                </article>
              ))}

              <div className="pt-2 text-center">
                <button className="rounded-full px-12 py-2.5 text-sm font-semibold text-white shadow-sm" style={{ background: "var(--green-deep)" }}>
                  {copy.showMore}
                </button>
              </div>
            </div>

            <NewsletterSignup dictionary={dictionary} />
          </div>

          <div className="mx-auto mt-14 max-w-5xl px-6 lg:px-12">
            <div className="grid gap-6 md:grid-cols-2">
              {articles.map((article) => (
                <article key={`card-${article.slug}-${article.locale}`} className="overflow-hidden rounded-sm border bg-white shadow-md" style={{ borderColor: "var(--green-pale)" }}>
                  {article.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={article.coverImage} alt="" className="aspect-16/8 w-full object-cover" />
                  )}
                  <div className="p-5">
                    <h3 className="line-clamp-2 text-base font-bold" style={{ color: "var(--green-deep)" }}>
                      <Link href={withLocale(`${articleBasePath}/${article.slug}`, locale)}>{article.title}</Link>
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                      {article.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button className="rounded-full px-12 py-2.5 text-sm font-semibold text-white shadow-sm" style={{ background: "var(--green-deep)" }}>
                {copy.showMore}
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function ArticleListPage({
  type,
  articles,
  locale,
  dictionary,
  basePath,
}: {
  type: ArticleType;
  articles: ArticleSummary[];
  locale: Locale;
  dictionary: Dictionary;
  basePath?: string;
}) {
  const articleBasePath = basePath || `/${type}`;

  if (type === "blogs") {
    return <BlogListPage articles={articles} locale={locale} dictionary={dictionary} articleBasePath={articleBasePath} />;
  }

  return <NewsletterListPage articles={articles} locale={locale} dictionary={dictionary} articleBasePath={articleBasePath} />;
}
