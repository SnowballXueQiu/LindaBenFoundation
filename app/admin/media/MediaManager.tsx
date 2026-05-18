"use client";

import { useMemo, useRef, useState } from "react";

export type MediaItem = {
  key: string;
  url: string;
  size: number;
  lastModified: Date | string | null;
};

function formatBytes(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaManager({ initialMedia }: { initialMedia: MediaItem[] }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [media, setMedia] = useState(initialMedia);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const sortedMedia = useMemo(
    () =>
      media.toSorted(
        (a, b) =>
          new Date(b.lastModified || 0).getTime() - new Date(a.lastModified || 0).getTime(),
      ),
    [media],
  );

  async function uploadSelectedFiles() {
    const files = Array.from(fileRef.current?.files || []);
    if (!files.length) return;

    setUploading(true);
    setMessage("");

    try {
      const uploaded: MediaItem[] = [];
      for (const file of files) {
        const formData = new FormData();
        formData.set("file", file);
        const response = await fetch("/api/admin/media", { method: "POST", body: formData });
        if (!response.ok) throw new Error(`Upload failed for ${file.name}`);
        uploaded.push(await response.json());
      }
      setMedia((items) => [...uploaded, ...items]);
      setMessage(`${uploaded.length} image${uploaded.length === 1 ? "" : "s"} uploaded.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function deleteItem(key: string) {
    if (!window.confirm("Delete this image from the library?")) return;

    const response = await fetch("/api/admin/media", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });

    if (!response.ok) {
      setMessage("Delete failed.");
      return;
    }

    setMedia((items) => items.filter((item) => item.key !== key));
    setMessage("Image deleted.");
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    setMessage("Image URL copied.");
  }

  return (
    <div>
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-950">Upload images</h2>
        <p className="mt-1 text-sm text-slate-600">
          Images uploaded here are available in the Newsletter and Blog editors.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <input ref={fileRef} type="file" accept="image/*" multiple className="block text-sm" />
          <button
            type="button"
            onClick={uploadSelectedFiles}
            disabled={uploading}
            className="rounded-md bg-emerald-800 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        {message && <p className="mt-3 text-sm text-slate-700">{message}</p>}
      </section>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {sortedMedia.map((item) => (
          <article key={item.key} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.url} alt="" className="aspect-video w-full object-cover" />
            <div className="space-y-3 p-4">
              <div>
                <p className="break-all text-xs text-slate-600">{item.key}</p>
                <p className="mt-1 text-xs text-slate-500">{formatBytes(item.size)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => copyUrl(item.url)}
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold"
                >
                  Copy URL
                </button>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold"
                >
                  Open
                </a>
                <button
                  type="button"
                  onClick={() => deleteItem(item.key)}
                  className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
