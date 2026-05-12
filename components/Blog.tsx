import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    slug: "food-as-medicine-november",
    title: "Food as Medicine: November Newsletter",
    author: "Annabelle Beavan",
    date: "November 22, 2024",
    img: "https://picsum.photos/id/493/800/500",
    excerpt:
      "November 2024 Thanksgiving: A Time to Celebrate with Family and Flavor. Healthy Thanksgiving: Delicious Recipes for a Memorable Holiday. Thanksgiving is a time to come together, share gratitude, and enjoy delicious meals. This year, why not try dishes that celebrate culture and health?",
  },
  {
    slug: "food-as-medicine-october",
    title: "Food as Medicine: October Newsletter",
    author: null,
    date: "October 14, 2024",
    img: "https://picsum.photos/id/139/800/500",
    excerpt:
      "October 2024 — Your Guide to Fall's Harvest Delights. Discover seasonal produce and recipes that nourish your body and warm your soul during the autumn months.",
  },
  {
    slug: "food-as-medicine-september",
    title: "Food as Medicine: September Newsletter",
    author: "Annabelle Beavan",
    date: "September 11, 2024",
    img: "https://picsum.photos/id/429/800/500",
    excerpt:
      "September 2024 — As summer winds down, we look at how fresh seasonal ingredients can support immune health and family wellness heading into fall.",
  },
];

export default function Blog() {
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
              Latest Stories
            </p>
            <h2
              className="text-3xl lg:text-4xl font-bold"
              style={{
                color: "var(--green-deep)",
                fontFamily: "var(--font-merriweather), serif",
              }}
            >
              Our Blog
            </h2>
            <p className="text-sm mt-2" style={{ color: "var(--text-mid)" }}>
              Stay updated with our latest stories, news, and tips on helping the
              community.
            </p>
          </div>
          <a
            href="#"
            className="shrink-0 inline-flex items-center gap-2 font-semibold text-sm transition-colors duration-150"
            style={{ color: "var(--green-mid)" }}
          >
            More On Our Blog
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </div>

        {/* Posts */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <article
              key={post.slug}
              className={`group rounded-2xl overflow-hidden bg-white shadow-sm border hover:shadow-md transition-shadow duration-300 ${i === 0 ? "md:col-span-1" : ""}`}
              style={{ borderColor: "var(--green-pale)" }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={post.img}
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
                    Food as Medicine
                  </span>
                </div>
                <h3
                  className="font-bold text-lg leading-snug mb-2 line-clamp-2"
                  style={{ color: "var(--green-deep)" }}
                >
                  {post.title}
                </h3>
                <p className="text-xs mb-3" style={{ color: "var(--text-mid)" }}>
                  {post.author && (
                    <span>By {post.author} &bull; </span>
                  )}
                  {post.date}
                </p>
                <p
                  className="text-sm leading-relaxed line-clamp-3 mb-4"
                  style={{ color: "var(--text-mid)" }}
                >
                  {post.excerpt}
                </p>
                <Link
                  href={`#${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-150"
                  style={{ color: "var(--green-mid)" }}
                >
                  Read more
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
