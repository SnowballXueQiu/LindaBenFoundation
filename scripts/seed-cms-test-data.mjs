import { readFile } from "node:fs/promises";
import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const envText = await readFile(new URL("../.env", import.meta.url), "utf8");
const env = Object.fromEntries(
  envText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const index = line.indexOf("=");
      return [line.slice(0, index), line.slice(index + 1)];
    }),
);

const bucket = env.S3_BUCKET;
if (!bucket || !env.S3_ACCESS_KEY_ID || !env.S3_SECRET_ACCESS_KEY) {
  throw new Error("Missing S3 env values.");
}

const supportedLocales = (env.SUPPORTED_LOCALES || "en,es,fa,fr,ur,ko,ps,zh")
  .split(",")
  .map((locale) => locale.trim())
  .filter(Boolean);

const s3 = new S3Client({
  endpoint: env.S3_ENDPOINT || undefined,
  region: env.S3_REGION || "us-east-1",
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: env.S3_FORCE_PATH_STYLE !== "false",
});

function makeMarkdownFileTitle(title, fallback) {
  return (
    title
      .normalize("NFKC")
      .trim()
      .toLowerCase()
      .replace(/[\\/#?%*:|"<>]+/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 120) || fallback
  );
}

function articleStorageKey(article) {
  return `content/${article.type}/${article.slug}/${makeMarkdownFileTitle(article.title, article.slug)}-${article.locale}.md`;
}

function yamlValue(value) {
  if (Array.isArray(value)) return `[${value.map((item) => JSON.stringify(item)).join(", ")}]`;
  if (value === undefined || value === null) return `""`;
  return JSON.stringify(String(value));
}

function serializeArticle(article) {
  const frontmatter = [
    ["title", article.title],
    ["excerpt", article.excerpt],
    ["status", article.status],
    ["coverImage", article.coverImage],
    ["author", article.author],
    ["publishedAt", article.publishedAt],
    ["updatedAt", article.updatedAt],
    ["tags", article.tags],
    ["category", article.category],
  ]
    .map(([key, value]) => `${key}: ${yamlValue(value)}`)
    .join("\n");

  return `---\n${frontmatter}\n---\n\n${article.body.trim()}\n`;
}

function articleSummary(article) {
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
    storageKey: articleStorageKey(article),
  };
}

async function putObject(key, body, contentType) {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
}

async function listKeys(prefix) {
  const keys = [];
  let ContinuationToken;
  do {
    const response = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken,
      }),
    );
    for (const item of response.Contents || []) {
      if (item.Key) keys.push(item.Key);
    }
    ContinuationToken = response.NextContinuationToken;
  } while (ContinuationToken);
  return keys;
}

async function deletePrefix(prefix) {
  const keys = await listKeys(prefix);
  for (let index = 0; index < keys.length; index += 1000) {
    const batch = keys.slice(index, index + 1000);
    if (!batch.length) continue;
    await s3.send(
      new DeleteObjectsCommand({
        Bucket: bucket,
        Delete: { Objects: batch.map((Key) => ({ Key })) },
      }),
    );
  }
  return keys.length;
}

function svg(title, subtitle, background, accent) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${background}"/>
      <stop offset="1" stop-color="${accent}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="760" fill="url(#bg)"/>
  <circle cx="970" cy="120" r="190" fill="#ffffff" opacity="0.18"/>
  <circle cx="170" cy="610" r="230" fill="#ffffff" opacity="0.12"/>
  <rect x="120" y="150" width="960" height="460" rx="34" fill="#ffffff" opacity="0.88"/>
  <text x="170" y="315" fill="#123326" font-family="Arial, sans-serif" font-size="72" font-weight="700">${title}</text>
  <text x="170" y="405" fill="#2f6f4f" font-family="Arial, sans-serif" font-size="38">${subtitle}</text>
  <text x="170" y="510" fill="#123326" font-family="Arial, sans-serif" font-size="28">LindaBen Foundation CMS test media</text>
</svg>`;
}

const media = [
  {
    key: "media/test/community-market.svg",
    body: svg("Community Market", "Fresh produce and weekly support", "#dff4e8", "#63b58a"),
  },
  {
    key: "media/test/pantry-boxes.svg",
    body: svg("Pantry Boxes", "Shelf-stable staples and family care", "#fff4d6", "#e7ad42"),
  },
  {
    key: "media/test/newsletter-table.svg",
    body: svg("Healthy Foods", "Recipes, nutrition tips, and updates", "#e5f0ff", "#5d8fd8"),
  },
];

const now = new Date().toISOString();
const mediaUrl = (key) => `/api/media/${key.split("/").map(encodeURIComponent).join("/")}`;

const articles = [
  {
    type: "blogs",
    slug: "food-as-medicine-november",
    locale: "en",
    title: "Food as Medicine: November Test Blog",
    excerpt: "A complete CMS test article with Markdown, attachments, a gallery, and an iframe embed.",
    status: "published",
    coverImage: mediaUrl("media/test/community-market.svg"),
    author: "LindaBen Foundation",
    publishedAt: "2026-05-20",
    updatedAt: now,
    tags: ["Food as Medicine", "CMS Test"],
    category: "Food as Medicine",
    body: `
# Food as Medicine: November Test Blog

This is an origin-language **CMS test article**. It exists in the new AWS S3 bucket under the folder-based Markdown structure.

## Attach Image

<attach alt="Community market test image">media/test/community-market.svg</attach>

## Program Highlights

- Fresh produce boxes for families.
- Nutrition tips written in Markdown.
- Local media library images inserted with attach tags.

## Gallery

<gallery>
  <attach alt="Community market">media/test/community-market.svg</attach>
  <attach alt="Pantry boxes">media/test/pantry-boxes.svg</attach>
  <attach alt="Healthy foods newsletter">media/test/newsletter-table.svg</attach>
</gallery>

## Embedded Iframe

<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="CMS test video" width="100%" height="420" allowfullscreen></iframe>
`,
  },
  {
    type: "blogs",
    slug: "community-pantry-spring-update",
    locale: "en",
    title: "Community Pantry: Spring Test Update",
    excerpt: "A second blog test article for list and detail page validation.",
    status: "published",
    coverImage: mediaUrl("media/test/pantry-boxes.svg"),
    author: "LindaBen Foundation",
    publishedAt: "2026-05-19",
    updatedAt: now,
    tags: ["Community Pantry", "CMS Test"],
    category: "Community Pantry",
    body: `
# Community Pantry: Spring Test Update

This second test blog confirms that blog list pages can render multiple S3-backed Markdown articles.

## Checklist

1. Article index is loaded from S3.
2. Markdown body is loaded from the article folder.
3. Public pages use the localized route.

<attach alt="Pantry boxes">media/test/pantry-boxes.svg</attach>
`,
  },
  {
    type: "newsletter",
    slug: "tlf-healthy-foods-may-2026",
    locale: "en",
    title: "TLF Healthy Foods May 2026 Test Newsletter",
    excerpt: "A newsletter test entry with nutrition notes and local media attachments.",
    status: "published",
    coverImage: mediaUrl("media/test/newsletter-table.svg"),
    author: "LindaBen Foundation",
    publishedAt: "2026-05-18",
    updatedAt: now,
    tags: ["Newsletter", "Nutrition Tips"],
    category: "Newsletter",
    body: `
# TLF Healthy Foods May 2026 Test Newsletter

Welcome to the newsletter CMS test article. This entry validates the newsletter route, detail page, and subscribe sidebar.

## May Nutrition Tips

- Add colorful vegetables to everyday meals.
- Keep simple grains and beans available for fast dinners.
- Share recipes with neighbors and volunteers.

<attach alt="Healthy foods test image">media/test/newsletter-table.svg</attach>
`,
  },
  {
    type: "newsletter",
    slug: "volunteer-impact-quarterly",
    locale: "en",
    title: "Volunteer Impact Quarterly Test Newsletter",
    excerpt: "A second newsletter item for testing the list layout and detail page.",
    status: "published",
    coverImage: mediaUrl("media/test/community-market.svg"),
    author: "LindaBen Foundation",
    publishedAt: "2026-05-17",
    updatedAt: now,
    tags: ["Newsletter", "Volunteer"],
    category: "Newsletter",
    body: `
# Volunteer Impact Quarterly Test Newsletter

This newsletter confirms the CMS can publish more than one newsletter item.

> Volunteers help turn donated food and local partnerships into practical support.

<gallery>
  <attach alt="Market">media/test/community-market.svg</attach>
  <attach alt="Pantry">media/test/pantry-boxes.svg</attach>
</gallery>
`,
  },
];

const deleted = {
  blogs: await deletePrefix("content/blogs/"),
  newsletter: await deletePrefix("content/newsletter/"),
  media: await deletePrefix("media/test/"),
};

for (const item of media) {
  await putObject(item.key, item.body, "image/svg+xml; charset=utf-8");
}

const byType = new Map([
  ["blogs", []],
  ["newsletter", []],
]);

for (const article of articles) {
  await putObject(articleStorageKey(article), serializeArticle(article), "text/markdown; charset=utf-8");
  byType.get(article.type).push(articleSummary(article));
  const sourceHash = "seeded-origin";
  await putObject(
    `content/${article.type}/${article.slug}/translation-status.json`,
    JSON.stringify(
      {
        statuses: Object.fromEntries(
          supportedLocales.map((locale) => [
            locale,
            locale === article.locale
              ? { locale, state: "origin", sourceLocale: article.locale, sourceHash, updatedAt: article.updatedAt }
              : { locale, state: "missing", sourceLocale: article.locale, sourceHash, updatedAt: article.updatedAt },
          ]),
        ),
        updatedAt: now,
      },
      null,
      2,
    ),
    "application/json",
  );
}

for (const [type, summaries] of byType) {
  await putObject(
    `content/${type}/index.json`,
    JSON.stringify(
      {
        articles: summaries.sort((a, b) => (Date.parse(b.publishedAt || b.updatedAt) || 0) - (Date.parse(a.publishedAt || a.updatedAt) || 0)),
        updatedAt: now,
      },
      null,
      2,
    ),
    "application/json",
  );
}

console.log(JSON.stringify({ ok: true, deleted, media: media.map((item) => item.key), articles: articles.map((item) => `${item.type}/${item.slug}`) }, null, 2));
