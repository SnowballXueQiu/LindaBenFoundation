import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { withLocale, type Locale } from "@/lib/i18n/config";
import type { ArticleSummary } from "@/lib/content/types";

function formatDate(value: string | undefined, locale: Locale) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(date);
}

export default function Blog({
  posts,
  locale,
  dictionary,
}: {
  posts: ArticleSummary[];
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <section id="blog" className="py-20 lg:py-28" style={{ background: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <p
              className="text-sm font-semibold tracking-[0.18em] uppercase mb-3"
              style={{ color: "var(--green-mid)" }}
            >
              {dictionary.blog.eyebrow}
            </p>
            <h2
              className="text-3xl lg:text-4xl font-bold"
              style={{
                color: "var(--green-deep)",
                fontFamily: "var(--font-merriweather), serif",
              }}
            >
              {dictionary.blog.title}
            </h2>
            <p className="text-sm mt-2" style={{ color: "var(--text-mid)" }}>
              {dictionary.blog.description}
            </p>
          </div>
          <a
            href={withLocale("/blogs", locale)}
            className="shrink-0 inline-flex items-center gap-2 font-semibold text-sm transition-colors duration-150"
            style={{ color: "var(--green-mid)" }}
          >
            {dictionary.blog.more}
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </div>

        {/* Posts */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.length === 0 && (
            <p className="md:col-span-3 text-sm" style={{ color: "var(--text-mid)" }}>
              {dictionary.blog.empty}
            </p>
          )}
          {posts.map((post, i) => (
            <article
              key={post.slug}
              className={`group rounded-2xl overflow-hidden bg-white shadow-sm border hover:shadow-md transition-shadow duration-300 ${i === 0 ? "md:col-span-1" : ""}`}
              style={{ borderColor: "var(--green-pale)" }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <Image
                  src={post.coverImage || "/resources/image.png"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: "var(--green-pale)", color: "var(--green-deep)" }}
                  >
                    {post.category || post.tags[0] || dictionary.nav.blog}
                  </span>
                </div>
                <h3
                  className="font-bold text-lg leading-snug mb-2 line-clamp-2"
                  style={{ color: "var(--green-deep)" }}
                >
                  {post.title}
                </h3>
                <p className="text-xs mb-3" style={{ color: "var(--text-mid)" }}>
                  {post.author && <span>By {post.author} &bull; </span>}
                  {formatDate(post.publishedAt || post.updatedAt, locale)}
                </p>
                <p
                  className="text-sm leading-relaxed line-clamp-3 mb-4"
                  style={{ color: "var(--text-mid)" }}
                >
                  {post.excerpt}
                </p>
                <Link
                  href={withLocale(`/blogs/${post.slug}`, locale)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-150"
                  style={{ color: "var(--green-mid)" }}
                >
                  {dictionary.common.readMore}
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
