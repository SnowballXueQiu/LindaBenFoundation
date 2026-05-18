import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { markdownToSafeHtml } from "@/lib/content/markdown";

export async function POST(request: Request) {
  await requireAdmin();
  const { markdown } = (await request.json()) as { markdown?: string };
  return NextResponse.json({ html: markdownToSafeHtml(markdown || "") });
}
