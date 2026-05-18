import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { markdownToSafeHtml } from "@/lib/content/markdown";
import type { Article } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/config";

function formatDate(value: string | undefined, locale: Locale) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(date);
}

export default function ArticleDetailPage({ article, locale }: { article: Article; locale: Locale }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <article>
          <section className="pt-32 pb-12 lg:pt-40" style={{ background: "var(--cream)" }}>
            <div className="mx-auto max-w-4xl px-6 lg:px-12">
              <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--green-mid)" }}>
                {article.category || article.tags[0] || article.type}
              </p>
              <h1 className="mt-4 text-4xl font-bold lg:text-5xl" style={{ color: "var(--green-deep)", fontFamily: "var(--font-merriweather), serif" }}>
                {article.title}
              </h1>
              <p className="mt-4 text-sm" style={{ color: "var(--text-mid)" }}>
                {article.author && <span>By {article.author} &bull; </span>}
                {formatDate(article.publishedAt || article.updatedAt, locale)}
              </p>
            </div>
          </section>
          {article.coverImage && (
            <div className="mx-auto max-w-5xl px-6 pt-10 lg:px-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.coverImage} alt="" className="aspect-[16/8] w-full rounded-lg object-cover" />
            </div>
          )}
          <section className="py-12">
            <div
              className="prose prose-lg mx-auto max-w-3xl px-6 lg:px-0"
              dangerouslySetInnerHTML={{ __html: markdownToSafeHtml(article.body) }}
            />
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
