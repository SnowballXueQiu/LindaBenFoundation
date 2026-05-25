import "server-only";

import { BedrockRuntimeClient, ConverseCommand } from "@aws-sdk/client-bedrock-runtime";
import type { Article } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/config";

const DEFAULT_MODEL_ID = "anthropic.claude-3-5-sonnet-20241022-v2:0";

type ArticleMetadataPayload = {
  locale: Locale;
  title: string;
  body: string;
  excerpt: string;
  category: string;
  tags: string[];
};

export type ArticleMetadataSuggestion = {
  excerpt: string;
  category: string;
  tags: string[];
};

const bedrock = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "us-east-1",
});

function hasBedrockConfig() {
  return Boolean(process.env.AWS_BEARER_TOKEN_BEDROCK || process.env.AWS_ACCESS_KEY_ID);
}

function extractText(response: unknown) {
  const output = response as {
    output?: {
      message?: {
        content?: Array<{ text?: string }>;
      };
    };
  };

  return output.output?.message?.content?.map((part) => part.text || "").join("").trim() || "";
}

function getModelCandidates() {
  const configured = process.env.BEDROCK_MODEL_ID || DEFAULT_MODEL_ID;
  const candidates = [configured];
  if (!configured.startsWith("arn:") && !configured.includes(".anthropic.") && configured.startsWith("anthropic.")) {
    candidates.push(`us.${configured}`);
  }
  return [...new Set(candidates)];
}

function parseJsonResponse<T>(text: string): T | null {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned) as T | { payload?: T };
    if (parsed && typeof parsed === "object" && "payload" in parsed && (parsed as { payload?: T }).payload) {
      return (parsed as { payload: T }).payload;
    }
    return parsed as T;
  } catch {
    return null;
  }
}

async function translateJson<T>(payload: T, targetLocale: Locale): Promise<T | null> {
  if (!hasBedrockConfig()) return null;

  for (const modelId of getModelCandidates()) {
    const command = new ConverseCommand({
      modelId,
      system: [
        {
          text: [
            "You are a professional nonprofit website translator.",
            "Translate user-facing text into the target locale.",
            "Return valid JSON only. Return the translated payload object itself, not a wrapper.",
            "Keep the exact same keys and shape as the payload object.",
            "Do not translate URLs, slugs, dates, HTML tag names, Markdown syntax, frontmatter keys, or media keys inside attach tags.",
            "For article metadata, keep excerpt concise for SEO and listing cards, category as one short phrase, and tags as 3 to 6 short phrases.",
          ].join(" "),
        },
      ],
      messages: [
        {
          role: "user",
          content: [
            {
              text: JSON.stringify({
                targetLocale,
                payload,
              }),
            },
          ],
        },
      ],
      inferenceConfig: {
        maxTokens: 12000,
        temperature: 0.2,
      },
    });

    let text = "";
    try {
      const response = await bedrock.send(command);
      text = extractText(response);
    } catch (error) {
      const name = error instanceof Error ? error.name : "BedrockError";
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`Skipping ${targetLocale} translation attempt with ${modelId} after ${name}: ${message}`);
      continue;
    }

    if (!text) continue;
    const parsed = parseJsonResponse<T>(text);
    if (parsed) return parsed;
  }

  return null;
}

export async function translateArticle(article: Article, targetLocale: Locale): Promise<Article | null> {
  const translated = await translateJson(
    {
      title: article.title,
      excerpt: article.excerpt,
      category: article.category || "",
      tags: article.tags,
      body: article.body,
    },
    targetLocale,
  );

  if (!translated) return null;

  const missingMetadata = [
    !translated.excerpt && "excerpt",
    !translated.category && "category",
    (!Array.isArray(translated.tags) || translated.tags.length === 0) && "tags",
  ].filter(Boolean);
  if (missingMetadata.length) {
    console.warn(`Translation for ${article.type}/${article.slug}/${targetLocale} is missing metadata fields: ${missingMetadata.join(", ")}`);
  }

  return {
    ...article,
    locale: targetLocale,
    title: translated.title || article.title,
    excerpt: translated.excerpt || article.excerpt,
    category: translated.category || article.category,
    tags: Array.isArray(translated.tags) ? translated.tags : article.tags,
    body: translated.body || article.body,
    updatedAt: new Date().toISOString(),
  };
}

export async function translateDictionary<T extends Record<string, unknown>>(dictionary: T, targetLocale: Locale) {
  return translateJson(dictionary, targetLocale);
}

export async function generateArticleMetadata(payload: ArticleMetadataPayload): Promise<ArticleMetadataSuggestion | null> {
  if (!hasBedrockConfig()) return null;

  for (const modelId of getModelCandidates()) {
    const command = new ConverseCommand({
      modelId,
      system: [
        {
          text: [
            "You generate metadata for a nonprofit website article.",
            "Return valid JSON only with exactly these keys: excerpt, category, tags.",
            "Use the target locale for all user-facing text.",
            "The excerpt must be 1-2 concise SEO-friendly sentences for list cards.",
            "The category must be one short phrase.",
            "Tags must be an array of 3 to 6 short phrases.",
            "Do not rewrite the article body. Do not return Markdown frontmatter.",
            "Do not translate URLs, HTML tag names, Markdown syntax, or media keys inside attach tags.",
          ].join(" "),
        },
      ],
      messages: [
        {
          role: "user",
          content: [
            {
              text: JSON.stringify({
                targetLocale: payload.locale,
                title: payload.title,
                articleBody: payload.body.slice(0, 12000),
                currentMetadata: {
                  excerpt: payload.excerpt,
                  category: payload.category,
                  tags: payload.tags,
                },
              }),
            },
          ],
        },
      ],
      inferenceConfig: {
        maxTokens: 1500,
        temperature: 0.2,
      },
    });

    try {
      const response = await bedrock.send(command);
      const parsed = parseJsonResponse<ArticleMetadataSuggestion>(extractText(response));
      if (!parsed) continue;
      return {
        excerpt: parsed.excerpt || payload.excerpt,
        category: parsed.category || payload.category,
        tags: Array.isArray(parsed.tags) && parsed.tags.length ? parsed.tags.slice(0, 6).map(String).filter(Boolean) : payload.tags,
      };
    } catch (error) {
      const name = error instanceof Error ? error.name : "BedrockError";
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`Skipping metadata generation with ${modelId} after ${name}: ${message}`);
    }
  }

  return null;
}
