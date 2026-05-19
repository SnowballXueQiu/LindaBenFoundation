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
