import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { isSupportedLocale } from "@/lib/i18n/config";
import { generateArticleMetadata } from "@/lib/translation/bedrock";

export async function POST(request: Request) {
  await requireAdmin();
  try {
    const payload = (await request.json()) as {
      locale?: string;
      title?: string;
      body?: string;
      excerpt?: string;
      category?: string;
      tags?: string;
    };

    if (!payload.locale || !isSupportedLocale(payload.locale)) {
      return NextResponse.json({ error: "Unsupported locale for metadata generation." }, { status: 400 });
    }

    if (!payload.title?.trim() || !payload.body?.trim()) {
      return NextResponse.json({ error: "Title and body are required before generating metadata." }, { status: 400 });
    }

    const metadata = await generateArticleMetadata({
      locale: payload.locale,
      title: payload.title,
      body: payload.body,
      excerpt: payload.excerpt || "",
      category: payload.category || "",
      tags: (payload.tags || "").split(",").map((tag) => tag.trim()).filter(Boolean),
    });

    if (!metadata) {
      return NextResponse.json({ error: "Bedrock returned no metadata suggestion. Check BEDROCK_MODEL_ID, AWS_REGION, and Bedrock permissions." }, { status: 502 });
    }

    return NextResponse.json(metadata);
  } catch (error) {
    console.error("Metadata generation failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? `Metadata generation failed: ${error.message}` : "Metadata generation failed." },
      { status: 500 },
    );
  }
}
