import "server-only";

import { BedrockRuntimeClient, ConverseCommand } from "@aws-sdk/client-bedrock-runtime";
import type { Article } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/config";

const DEFAULT_MODEL_ID = "anthropic.claude-3-5-sonnet-20241022-v2:0";

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

async function translateJson<T>(payload: T, targetLocale: Locale): Promise<T | null> {
  if (!hasBedrockConfig()) return null;

  const command = new ConverseCommand({
    modelId: process.env.BEDROCK_MODEL_ID || DEFAULT_MODEL_ID,
    system: [
      {
        text: [
          "You are a professional nonprofit website translator.",
          "Translate user-facing text into the target locale.",
          "Return valid JSON only, with the exact same keys and shape.",
          "Do not translate URLs, slugs, dates, HTML tag names, Markdown syntax, or frontmatter keys.",
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
      maxTokens: 6000,
      temperature: 0.2,
    },
  });

  const response = await bedrock.send(command);
  const text = extractText(response);
  if (!text) return null;

  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
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
