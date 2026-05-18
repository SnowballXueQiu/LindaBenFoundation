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
  const copy = type === "blogs" ? dictionary.blog : dictionary.newsletter;
  const articleBasePath = basePath || `/${type}`;
  const showNewsletterSignup = type === "newsletter";

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-16 lg:pt-40" style={{ background: "var(--cream)" }}>
          <div className="mx-auto max-w-5xl px-6 lg:px-12">
            <h1 className="text-4xl font-bold lg:text-5xl" style={{ color: "var(--green-deep)", fontFamily: "var(--font-merriweather), serif" }}>
              {copy.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg" style={{ color: "var(--text-mid)" }}>
              {copy.description}
            </p>
          </div>
        </section>
        <section className="py-16" style={{ background: "var(--warm-white)" }}>
          <div className={`mx-auto grid max-w-6xl gap-8 px-6 lg:px-12 ${showNewsletterSignup ? "lg:grid-cols-[minmax(0,1fr)_320px]" : ""}`}>
            <div className="grid min-w-0 gap-8 md:grid-cols-2">
              {articles.length === 0 && <p style={{ color: "var(--text-mid)" }}>{copy.empty}</p>}
              {articles.map((article) => (
                <article key={`${article.slug}-${article.locale}`} className="overflow-hidden rounded-lg border bg-white shadow-sm" style={{ borderColor: "var(--green-pale)" }}>
                  {article.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={article.coverImage} alt="" className="aspect-video w-full object-cover" />
                  )}
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--green-mid)" }}>
                      {article.category || article.tags[0] || copy.title}
                    </p>
                    <h2 className="mt-3 text-2xl font-bold" style={{ color: "var(--green-deep)" }}>
                      <Link href={withLocale(`${articleBasePath}/${article.slug}`, locale)}>{article.title}</Link>
                    </h2>
                    <p className="mt-2 text-xs" style={{ color: "var(--text-mid)" }}>
                      {article.author && <span>{dictionary.common.by} {article.author} &bull; </span>}
                      {formatDate(article.publishedAt || article.updatedAt, locale)}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                      {article.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            {showNewsletterSignup && <NewsletterSignup dictionary={dictionary} />}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
