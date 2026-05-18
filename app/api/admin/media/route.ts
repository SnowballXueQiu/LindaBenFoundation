import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { deleteMedia, listMedia, putMedia } from "@/lib/content/repository";
import { makeSlug } from "@/lib/content/markdown";

export async function GET() {
  await requireAdmin();
  return NextResponse.json(await listMedia());
}

export async function POST(request: Request) {
  await requireAdmin();
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image uploads are allowed." }, { status: 400 });
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "bin";
  const baseName = makeSlug(file.name.replace(/\.[^.]+$/, "")) || "upload";
  const key = `media/${new Date().toISOString().slice(0, 10)}/${baseName}-${Date.now()}.${extension}`;
  const body = new Uint8Array(await file.arrayBuffer());
  const url = await putMedia(key, body, file.type);

  return NextResponse.json({ key, url });
}

export async function DELETE(request: Request) {
  await requireAdmin();
  const { key } = (await request.json()) as { key?: string };

  if (!key) {
    return NextResponse.json({ error: "Missing key." }, { status: 400 });
  }

  await deleteMedia(key);
  return NextResponse.json({ ok: true });
}
