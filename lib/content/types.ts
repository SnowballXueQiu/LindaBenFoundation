import type { Locale } from "@/lib/i18n/config";

export const articleTypes = ["blogs", "news"] as const;

export type ArticleType = (typeof articleTypes)[number];
export type ArticleStatus = "draft" | "published";

export type ArticleFrontmatter = {
  title: string;
  excerpt: string;
  status: ArticleStatus;
  coverImage?: string;
  author?: string;
  publishedAt?: string;
  updatedAt: string;
  tags: string[];
  category?: string;
};

export type Article = ArticleFrontmatter & {
  type: ArticleType;
  slug: string;
  locale: Locale;
  body: string;
};

export type ArticleSummary = ArticleFrontmatter & {
  type: ArticleType;
  slug: string;
  locale: Locale;
};

export type ArticleIndex = {
  articles: ArticleSummary[];
  updatedAt: string;
};
