import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ArticleBody from "@/components/ArticleBody";
import { markdownToSafeHtml } from "@/lib/content/markdown";
import type { Article } from "@/lib/content/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { withLocale, type Locale } from "@/lib/i18n/config";

function formatDate(value: string | undefined, locale: Locale) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(date);
}

export default function ArticleDetailPage({ article, locale, dictionary }: { article: Article; locale: Locale; dictionary: Dictionary }) {
  const html = markdownToSafeHtml(article.body);
  const date = formatDate(article.publishedAt || article.updatedAt, locale);
  const meta = (
    <p className="mt-3 text-sm text-white/80">
      {article.author && <span>{dictionary.common.by} {article.author} &bull; </span>}
      {date}
    </p>
  );

  if (article.type === "newsletter") {
    return (
      <div className="min-h-screen">
        <Header />
        <main>
          <article>
            <section className="pt-32 pb-10 text-center lg:pt-40" style={{ background: "var(--green-deep)" }}>
              <div className="mx-auto max-w-4xl px-6 lg:px-12">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
                  {article.category || dictionary.nav.newsletter}
                </p>
                <h1 className="mt-3 text-3xl font-bold leading-tight text-white lg:text-5xl" style={{ fontFamily: "var(--font-merriweather), serif" }}>
                  {article.title}
                </h1>
                {meta}
              </div>
            </section>

            <section className="py-12 lg:py-16" style={{ background: "var(--warm-white)" }}>
              <div className="mx-auto max-w-4xl px-6 lg:px-12">
                {article.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={article.coverImage} alt="" className="mb-10 aspect-16/7 w-full object-cover shadow-md" />
                )}
                <ArticleBody html={html} className="article-prose prose prose-lg max-w-none" />
              </div>
            </section>
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <article>
          <section className="relative flex min-h-105 items-center justify-center overflow-hidden pt-24 text-center lg:min-h-130">
            {article.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={article.coverImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
            )}
            <div className="absolute inset-0 bg-[rgba(20,35,30,0.58)]" />
            <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-12">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                {article.category || article.tags[0] || article.type}
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-white lg:text-6xl" style={{ fontFamily: "var(--font-merriweather), serif" }}>
                {article.title}
              </h1>
              {meta}
            </div>
          </section>
          <section className="py-16 lg:py-24" style={{ background: "var(--warm-white)" }}>
            <ArticleBody html={html} className="article-prose prose prose-lg mx-auto max-w-5xl px-6 lg:px-12" />
            <div className="mx-auto mt-12 max-w-5xl px-6 lg:px-12">
              <Link href={withLocale("/blogs", locale)} className="inline-flex rounded-full px-8 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90" style={{ background: "var(--green-deep)" }}>
                ← {dictionary.blog.olderPost}
              </Link>
            </div>
          </section>
        </article>
      </main>
      <ContactForm />
      <Footer />
    </div>
  );
}
