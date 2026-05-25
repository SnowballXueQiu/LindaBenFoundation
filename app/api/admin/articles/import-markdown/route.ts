import { NextResponse } from "next/server";
import matter from "gray-matter";
import { requireAdmin } from "@/lib/admin/auth";

function stringifyMetadataValue(value: unknown) {
  if (value === undefined || value === null) return "";
  if (Array.isArray(value)) return value.map(String).filter(Boolean).join(", ");
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

export async function POST(request: Request) {
  await requireAdmin();
  try {
    const { markdown } = (await request.json()) as { markdown?: string };
    const parsed = matter((markdown || "").replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n"));
    const data = parsed.data || {};

    return NextResponse.json({
      metadata: {
        title: stringifyMetadataValue(data.title),
        excerpt: stringifyMetadataValue(data.excerpt),
        status: stringifyMetadataValue(data.status),
        coverImage: stringifyMetadataValue(data.coverImage),
        author: stringifyMetadataValue(data.author),
        publishedAt: stringifyMetadataValue(data.publishedAt),
        tags: stringifyMetadataValue(data.tags),
        category: stringifyMetadataValue(data.category),
      },
      body: parsed.content.trimStart(),
    });
  } catch (error) {
    console.error("Markdown import parse failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? `Markdown frontmatter parse failed: ${error.message}` : "Markdown frontmatter parse failed." },
      { status: 400 },
    );
  }
}
