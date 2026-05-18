"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { saveArticleAction, type AdminActionState } from "@/app/admin/actions";
import { defaultLocale, supportedLocales } from "@/lib/i18n/config";
import type { Article } from "@/lib/content/types";

type MediaItem = {
  key: string;
  url: string;
};

const initialState: AdminActionState = {};

export default function ArticleEditor({
  type,
  article,
}: {
  type: "blogs" | "newsletter";
  article?: Article | null;
}) {
  const [state, action, pending] = useActionState(saveArticleAction, initialState);
  const editorRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/media")
      .then((response) => (response.ok ? response.json() : []))
      .then((items) => setMedia(items))
      .catch(() => setMedia([]));
  }, []);

  function syncBody() {
    if (bodyRef.current && editorRef.current) {
      bodyRef.current.value = editorRef.current.innerHTML.trim();
    }
  }

  function format(command: string, value?: string) {
    document.execCommand(command, false, value);
    syncBody();
  }

  function insertImage(url: string) {
    format("insertHTML", `<p><img src="${url}" alt="" /></p>`);
  }

  function insertIframe() {
    const src = window.prompt("Embed iframe URL");
    if (!src) return;
    format(
      "insertHTML",
      `<p><iframe src="${src}" title="Embedded content" width="100%" height="420" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></p>`,
    );
  }

  async function uploadSelectedFile() {
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.set("file", file);

    try {
      const response = await fetch("/api/admin/media", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Upload failed.");
      const item = (await response.json()) as MediaItem;
      setMedia((items) => [item, ...items]);
      insertImage(item.url);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <form
      action={action}
      onSubmit={syncBody}
      className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
    >
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="existingSlug" value={article?.slug || ""} />
      <textarea ref={bodyRef} name="body" defaultValue={article?.body || ""} className="hidden" />

      <div className="space-y-6">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <label className="block text-sm font-medium text-slate-700" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            defaultValue={article?.title || ""}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-lg font-semibold outline-none focus:border-emerald-700"
            required
          />
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700" htmlFor="slug">
                Slug
              </label>
              <input
                id="slug"
                name="slug"
                defaultValue={article?.slug || ""}
                placeholder="auto-generated from title"
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700" htmlFor="locale">
                Locale
              </label>
              <select
                id="locale"
                name="locale"
                defaultValue={article?.locale || defaultLocale}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-emerald-700"
              >
                {supportedLocales.map((locale) => (
                  <option key={locale} value={locale}>{locale}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 p-3">
            <button type="button" onClick={() => format("bold")} className="rounded border border-slate-300 px-2 py-1 text-sm font-bold">B</button>
            <button type="button" onClick={() => format("italic")} className="rounded border border-slate-300 px-2 py-1 text-sm italic">I</button>
            <button type="button" onClick={() => format("formatBlock", "h2")} className="rounded border border-slate-300 px-2 py-1 text-sm">H2</button>
            <button type="button" onClick={() => format("insertUnorderedList")} className="rounded border border-slate-300 px-2 py-1 text-sm">List</button>
            <button type="button" onClick={insertIframe} className="rounded border border-slate-300 px-2 py-1 text-sm">Iframe</button>
          </div>
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={syncBody}
            className="prose max-w-none min-h-[520px] p-6 outline-none"
            dangerouslySetInnerHTML={{ __html: article?.body || "<p>Start writing...</p>" }}
          />
        </section>

        {state.message && <p className="text-sm text-red-700">{state.message}</p>}
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-emerald-800 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save article"}
        </button>
      </div>

      <aside className="space-y-6">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">Publishing</h2>
          <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={article?.status || "draft"} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="publishedAt">Publish date</label>
          <input id="publishedAt" name="publishedAt" type="date" defaultValue={article?.publishedAt || ""} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
          <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="author">Author</label>
          <input id="author" name="author" defaultValue={article?.author || ""} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">Metadata</h2>
          <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="excerpt">Excerpt</label>
          <textarea id="excerpt" name="excerpt" defaultValue={article?.excerpt || ""} rows={4} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
          <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="category">Category</label>
          <input id="category" name="category" defaultValue={article?.category || ""} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
          <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="tags">Tags</label>
          <input id="tags" name="tags" defaultValue={article?.tags.join(", ") || ""} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
          <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="coverImage">Cover image URL</label>
          <input id="coverImage" name="coverImage" defaultValue={article?.coverImage || ""} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">Media library</h2>
          <input ref={fileRef} type="file" accept="image/*" className="mt-4 block w-full text-sm" />
          <button type="button" onClick={uploadSelectedFile} disabled={uploading} className="mt-3 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold">
            {uploading ? "Uploading..." : "Upload and insert"}
          </button>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {media.slice(0, 12).map((item) => (
              <button key={item.key} type="button" onClick={() => insertImage(item.url)} className="overflow-hidden rounded border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt="" className="aspect-video w-full object-cover" />
              </button>
            ))}
          </div>
        </section>
      </aside>
    </form>
  );
}
