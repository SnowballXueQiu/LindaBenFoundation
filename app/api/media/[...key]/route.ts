import { NextResponse } from "next/server";
import { getObject } from "@/lib/storage/s3";

const cacheHeader = "public, max-age=3600, stale-while-revalidate=86400";

export async function GET(_request: Request, context: { params: Promise<{ key: string[] }> }) {
  const { key } = await context.params;
  const objectKey = key.map(decodeURIComponent).join("/");

  if (!objectKey.startsWith("media/")) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    const object = await getObject(objectKey);
    const headers = new Headers();
    headers.set("Cache-Control", cacheHeader);
    headers.set("Content-Type", object.ContentType || "application/octet-stream");
    if (object.ContentLength) headers.set("Content-Length", String(object.ContentLength));
    if (object.ETag) headers.set("ETag", object.ETag);

    return new Response(object.Body?.transformToWebStream(), { headers });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}
