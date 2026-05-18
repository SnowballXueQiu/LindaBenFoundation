import "server-only";

import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import type { Article, ArticleFrontmatter, ArticleType } from "./types";
import type { Locale } from "@/lib/i18n/config";

const allowedIframeHosts = (process.env.ALLOWED_IFRAME_HOSTS || "www.youtube.com,youtube.com,player.vimeo.com")
  .split(",")
  .map((host) => host.trim())
  .filter(Boolean);

marked.use({
  async: false,
  gfm: true,
  breaks: true,
});

function normalizeTags(value: unknown) {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === "string") {
    return value.split(",").map((tag) => tag.trim()).filter(Boolean);
  }
  return [];
}

export function serializeArticle(article: Article) {
  const frontmatter: ArticleFrontmatter = {
    title: article.title,
    excerpt: article.excerpt,
    status: article.status,
    coverImage: article.coverImage,
    author: article.author,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    tags: article.tags,
    category: article.category,
  };
  return matter.stringify(article.body, frontmatter);
}

export function parseArticleMarkdown(markdown: string, context: { type: ArticleType; slug: string; locale: Locale }): Article {
  const parsed = matter(markdown);
  const data = parsed.data as Partial<ArticleFrontmatter>;

  return {
    type: context.type,
    slug: context.slug,
    locale: context.locale,
    title: String(data.title || context.slug),
    excerpt: String(data.excerpt || ""),
    status: data.status === "published" ? "published" : "draft",
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    author: data.author ? String(data.author) : undefined,
    publishedAt: data.publishedAt ? String(data.publishedAt) : undefined,
    updatedAt: data.updatedAt ? String(data.updatedAt) : new Date().toISOString(),
    tags: normalizeTags(data.tags),
    category: data.category ? String(data.category) : undefined,
    body: parsed.content.trim(),
  };
}

export function articleToSummary(article: Article) {
  return {
    type: article.type,
    slug: article.slug,
    locale: article.locale,
    title: article.title,
    excerpt: article.excerpt,
    status: article.status,
    coverImage: article.coverImage,
    author: article.author,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    tags: article.tags,
    category: article.category,
  };
}

export function markdownToSafeHtml(markdown: string) {
  const rawHtml = marked.parse(markdown) as string;

  return sanitizeHtml(rawHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "iframe", "h1", "h2", "h3"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      iframe: ["src", "title", "width", "height", "allow", "allowfullscreen", "loading", "referrerpolicy"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedIframeHostnames: allowedIframeHosts,
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
      iframe: sanitizeHtml.simpleTransform("iframe", { loading: "lazy", referrerpolicy: "strict-origin-when-cross-origin" }),
      img: sanitizeHtml.simpleTransform("img", { loading: "lazy" }),
    },
  });
}

export function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
