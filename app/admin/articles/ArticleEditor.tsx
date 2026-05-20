"use client";

import { type ChangeEvent, type DragEvent, type KeyboardEvent, type UIEvent, useActionState, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { saveArticleAction, type AdminActionState } from "@/app/admin/actions";
import ArticleBody from "@/components/ArticleBody";
import { normalizeArticleMarkdown } from "@/lib/content/normalize-markdown";
import { defaultLocale, supportedLocales } from "@/lib/i18n/config";
import type { Article } from "@/lib/content/types";

type MediaItem = {
  key: string;
  url: string;
};

const initialState: AdminActionState = {};
const completionItems = [
  {
    label: "attach",
    description: "Image from media library",
    snippet: "<attach alt=\"Image description\">media/path/image.jpg</attach>",
  },
  {
    label: "gallery",
    description: "Carousel gallery",
    snippet: ["<gallery>", "  <attach alt=\"First image\">media/path/first.jpg</attach>", "  <attach alt=\"Second image\">media/path/second.jpg</attach>", "</gallery>"].join("\n"),
  },
  {
    label: "iframe",
    description: "Allowed embedded frame",
    snippet:
      "<iframe src=\"https://www.youtube.com/embed/video-id\" title=\"Embedded content\" width=\"100%\" height=\"420\" allowfullscreen></iframe>",
  },
];
const starterMarkdown = [
  "# Food as Medicine: Full Markdown Preview",
  "",
  "Use this starter article to preview every Markdown style the public article renderer supports. Replace it with the final article before publishing.",
  "",
  "This paragraph includes **bold text**, __also bold text__, *italic text*, _also italic text_, and ~~strikethrough text~~. You can also add [inline links](https://lindabenfoundation.org) and `inline code`.",
  "",
  "## Heading Two: Program Update",
  "",
  "Our Food as Medicine program connects families with fresh produce, nutrition education, and community support.",
  "",
  "### Heading Three: What Families Receive",
  "",
  "- Fresh produce boxes selected for everyday cooking.",
  "- Nutrition education resources that support healthier choices.",
  "- Community connections for ongoing food support.",
  "",
  "* This list uses asterisks instead of dashes.",
  "* Both list formats render the same way.",
  "",
  "#### Heading Four: Ordered Steps",
  "",
  "1. Register for the program.",
  "2. Pick up produce boxes at the scheduled distribution.",
  "3. Use the recipe notes and nutrition tips at home.",
  "",
  "##### Heading Five: Nested List",
  "",
  "- Volunteer workflow",
  "  - Sort produce",
  "  - Pack boxes",
  "  - Support pickup",
  "",
  "###### Heading Six: Small Supporting Note",
  "",
  "> Reliable access to nutritious food supports dignity, stability, and whole-person wellness.",
  "",
  "---",
  "",
  "## Attach Image",
  "",
  "Use `<attach>` for images from the local media library. This stores only the media key in Markdown and resolves it through `/api/media` when rendered.",
  "",
  "<attach alt=\"Food as Medicine distribution table\">media/samples/food-as-medicine-hero.png</attach>",
  "",
  "## Native Markdown Image",
  "",
  "Native Markdown images are also supported when you need a regular URL or local public asset.",
  "",
  "![Community Resource Center](/new-community-resource-support-center/hero.png)",
  "",
  "## Gallery Carousel",
  "",
  "A gallery is written with `<gallery>` plus nested `<attach>` tags. Public pages and previews render it as an autoplay carousel with dots and arrows.",
  "",
  "<gallery>",
  "  <attach alt=\"Food support program\">media/samples/food-as-medicine-hero.png</attach>",
  "  <attach alt=\"Community resource support center\">media/samples/resource-center-hero.png</attach>",
  "</gallery>",
  "",
  "## Table",
  "",
  "| Program | Audience | Support |",
  "| --- | --- | --- |",
  "| Food as Medicine | Families | Produce boxes and nutrition tips |",
  "| Community Pantry | Community members | Pantry access and intake support |",
  "| Youth Volunteerism | Students | Service learning and community hours |",
  "",
  "## Code Block",
  "",
  "```md",
  "<attach>media/samples/food-as-medicine-hero.png</attach>",
  "```",
  "",
  "## Embedded Iframe",
  "",
  "Only allowed iframe hosts render. Use this for YouTube/Vimeo embeds or another host added to `ALLOWED_IFRAME_HOSTS`.",
  "",
  "<iframe src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\" title=\"Embedded video\" width=\"100%\" height=\"420\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>",
].join("\n");

function stripQuotes(value: string) {
  return value.trim().replace(/^["']|["']$/g, "");
}

function parseMarkdownUpload(markdown: string) {
  if (!markdown.startsWith("---")) return { metadata: new Map<string, string>(), body: markdown };

  const end = markdown.indexOf("\n---", 3);
  if (end === -1) return { metadata: new Map<string, string>(), body: markdown };

  const metadata = new Map<string, string>();
  const frontmatter = markdown.slice(3, end).trim();
  const body = markdown.slice(end + 4).trimStart();

  for (const line of frontmatter.split("\n")) {
    const match = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    const value = rawValue.trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      metadata.set(
        key,
        value
          .slice(1, -1)
          .split(",")
          .map((item) => stripQuotes(item))
          .filter(Boolean)
          .join(", "),
      );
    } else {
      metadata.set(key, stripQuotes(value));
    }
  }

  return { metadata, body };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightInline(value: string) {
  let next = escapeHtml(value);
  next = next.replace(/(!?\[[^\]]+\]\([^)]+\))/g, '<span class="md-link">$1</span>');
  next = next.replace(/(`[^`]+`)/g, '<span class="md-code">$1</span>');
  next = next.replace(/(\*\*[^*]+\*\*|__[^_]+__)/g, '<span class="md-strong">$1</span>');
  next = next.replace(/(~~[^~]+~~)/g, '<span class="md-strike">$1</span>');
  next = next.replace(/(^|[\s(])(\*[^*\n]+\*|_[^_\n]+_)/g, '$1<span class="md-em">$2</span>');
  next = next.replace(/(&lt;\/?(attach|gallery|iframe)\b[^&]*?&gt;)/gi, '<span class="md-tag">$1</span>');
  return next;
}

function startsWithMarkdownWrapper(value: string, start: number, end: number, before: string, after: string) {
  return value.slice(start - before.length, start) === before && value.slice(end, end + after.length) === after;
}

function highlightMarkdown(value: string) {
  let inFence = false;
  const lines = value.split("\n").map((line) => {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      return `<span class="md-codeblock">${escapeHtml(line)}</span>`;
    }
    if (inFence) return `<span class="md-codeblock">${escapeHtml(line)}</span>`;

    if (/^\s*\|.*\|\s*$/.test(line)) return `<span class="md-table">${highlightInline(line)}</span>`;

    const heading = line.match(/^(#{1,6})(\s+.*)$/);
    if (heading) {
      return `<span class="md-heading"><span class="md-token">${heading[1]}</span>${highlightInline(heading[2])}</span>`;
    }

    const quote = line.match(/^(\s*&gt;|\s*>)(\s?.*)$/);
    if (quote) return `<span class="md-quote"><span class="md-token">${escapeHtml(quote[1])}</span>${highlightInline(quote[2])}</span>`;

    const list = line.match(/^(\s*)([-*+]|\d+\.)(\s+.*)$/);
    if (list) return `${escapeHtml(list[1])}<span class="md-list"><span class="md-token">${escapeHtml(list[2])}</span>${highlightInline(list[3])}</span>`;

    if (/^\s*---+\s*$/.test(line)) return `<span class="md-hr">${escapeHtml(line)}</span>`;
    return highlightInline(line);
  });

  return `${lines.join("\n")}\n`;
}

export default function ArticleEditor({
  type,
  article,
}: {
  type: "blogs" | "newsletter";
  article?: Article | null;
}) {
  const router = useRouter();
  const [state, action, pending] = useActionState(saveArticleAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);
  const selectionRef = useRef<{ start: number; end: number } | null>(null);
  const dirtyRef = useRef(false);
  const currentLocaleRef = useRef(article?.locale || defaultLocale);
  const fileRef = useRef<HTMLInputElement>(null);
  const markdownFileRef = useRef<HTMLInputElement>(null);
  const [body, setBody] = useState(normalizeArticleMarkdown(article?.body || starterMarkdown));
  const [dirty, setDirty] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState("");
  const [selectedMarkdownName, setSelectedMarkdownName] = useState("");
  const [draggingImage, setDraggingImage] = useState(false);
  const [draggingMarkdown, setDraggingMarkdown] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [completion, setCompletion] = useState<{ start: number; query: string } | null>(null);
  const highlightedBody = useMemo(() => highlightMarkdown(body), [body]);
  const filteredCompletions = useMemo(
    () => completionItems.filter((item) => item.label.startsWith(completion?.query.toLowerCase() || "")),
    [completion],
  );

  useEffect(() => {
    fetch("/api/admin/media")
      .then((response) => (response.ok ? response.json() : []))
      .then((items) => setMedia(items))
      .catch(() => setMedia([]));
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!dirtyRef.current) return;
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  function markDirty() {
    dirtyRef.current = true;
    setDirty(true);
  }

  const buildArticleFormData = useCallback((localeOverride?: string) => {
    if (!formRef.current) return null;
    const formData = new FormData(formRef.current);
    formData.set("body", bodyRef.current?.value || body);
    if (localeOverride) formData.set("locale", localeOverride);
    return formData;
  }, [body]);

  const saveDraftViaApi = useCallback(async (localeOverride?: string) => {
    const formData = buildArticleFormData(localeOverride);
    if (!formData) throw new Error("Article form is not available.");

    setAutoSaving(true);
    try {
      const response = await fetch("/api/admin/articles/autosave", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { ok?: boolean; slug?: string; locale?: string; error?: string };
      if (!response.ok || !result.ok || !result.slug || !result.locale) {
        throw new Error(result.error || "Autosave failed.");
      }

      dirtyRef.current = false;
      setDirty(false);
      currentLocaleRef.current = result.locale;
      return { slug: result.slug, locale: result.locale };
    } finally {
      setAutoSaving(false);
    }
  }, [buildArticleFormData]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!article?.slug || !dirtyRef.current) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;

      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;
      if (!url.pathname.startsWith(`/admin/articles/${type}/${article.slug}`)) return;
      if (url.searchParams.get("locale") === currentLocaleRef.current) return;

      event.preventDefault();
      if (!window.confirm("You have unsaved changes. Save this language before switching?")) return;

      void saveDraftViaApi(currentLocaleRef.current)
        .then((saved) => router.push(`/admin/articles/${type}/${saved.slug}${url.search}`))
        .catch((error) => window.alert(error instanceof Error ? error.message : "Autosave failed."));
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [article?.slug, router, saveDraftViaApi, type]);

  function updateCompletion(value: string, cursor: number) {
    const beforeCursor = value.slice(0, cursor);
    const match = beforeCursor.match(/<([a-z]*)$/i);
    setCompletion(match ? { start: cursor - match[0].length, query: match[1] } : null);
  }

  function setEditorBody(value: string, cursor?: number) {
    setBody(value);
    if (typeof cursor === "number") updateCompletion(value, cursor);
  }

  function rememberSelection(textarea = bodyRef.current) {
    if (!textarea) return;
    selectionRef.current = { start: textarea.selectionStart, end: textarea.selectionEnd };
  }

  function getSavedSelection(textarea: HTMLTextAreaElement) {
    return selectionRef.current || { start: textarea.value.length, end: textarea.value.length };
  }

  function restoreEditorViewport(textarea: HTMLTextAreaElement, scrollTop: number, scrollLeft: number) {
    textarea.scrollTop = scrollTop;
    textarea.scrollLeft = scrollLeft;
    if (highlightRef.current) {
      highlightRef.current.scrollTop = scrollTop;
      highlightRef.current.scrollLeft = scrollLeft;
    }
    window.requestAnimationFrame(() => {
      textarea.scrollTop = scrollTop;
      textarea.scrollLeft = scrollLeft;
      if (highlightRef.current) {
        highlightRef.current.scrollTop = scrollTop;
        highlightRef.current.scrollLeft = scrollLeft;
      }
    });
  }

  function commitEditorChange(next: string, selectionStart: number, selectionEnd = selectionStart) {
    const textarea = bodyRef.current;
    if (!textarea) {
      setEditorBody(next, selectionStart);
      return;
    }

    const scrollTop = textarea.scrollTop;
    const scrollLeft = textarea.scrollLeft;
    textarea.value = next;
    setEditorBody(next, selectionStart);
    markDirty();
    textarea.focus({ preventScroll: true });
    textarea.setSelectionRange(selectionStart, selectionEnd);
    selectionRef.current = { start: selectionStart, end: selectionEnd };
    restoreEditorViewport(textarea, scrollTop, scrollLeft);
  }

  function insertMarkdown(value: string) {
    const textarea = bodyRef.current;
    if (!textarea) return;
    const { start, end } = getSavedSelection(textarea);
    const next = `${textarea.value.slice(0, start)}${value}${textarea.value.slice(end)}`;
    commitEditorChange(next, start + value.length);
  }

  function setFormField(name: string, value: string) {
    const element = formRef.current?.elements.namedItem(name);
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
      element.value = value;
    }
  }

  async function loadMarkdownFile(file: File) {
    const text = await file.text();
    const { metadata, body } = parseMarkdownUpload(text);
    const fieldMap: Record<string, string> = {
      title: "title",
      excerpt: "excerpt",
      status: "status",
      coverImage: "coverImage",
      author: "author",
      publishedAt: "publishedAt",
      tags: "tags",
      category: "category",
    };

    for (const [metadataKey, fieldName] of Object.entries(fieldMap)) {
      const value = metadata.get(metadataKey);
      if (value) setFormField(fieldName, value);
    }

    setEditorBody(normalizeArticleMarkdown(body));
    markDirty();
    setSelectedMarkdownName(file.name);
  }

  async function uploadMarkdownFile() {
    const file = markdownFileRef.current?.files?.[0];
    if (!file) return;

    await loadMarkdownFile(file);
    if (markdownFileRef.current) markdownFileRef.current.value = "";
  }

  function replaceSelection(value: string, cursorOffset = value.length) {
    const textarea = bodyRef.current;
    if (!textarea) return;
    const { start, end } = getSavedSelection(textarea);
    const next = `${textarea.value.slice(0, start)}${value}${textarea.value.slice(end)}`;
    commitEditorChange(next, start + cursorOffset);
  }

  function wrapSelection(before: string, after = before, fallback = "text") {
    const textarea = bodyRef.current;
    if (!textarea) return;
    const { start, end } = getSavedSelection(textarea);
    const selected = textarea.value.slice(start, end) || fallback;
    const next = `${textarea.value.slice(0, start)}${before}${selected}${after}${textarea.value.slice(end)}`;
    commitEditorChange(next, start + before.length, start + before.length + selected.length);
  }

  function prefixSelection(prefix: string, fallback = "Text") {
    const textarea = bodyRef.current;
    if (!textarea) return;
    const { start, end } = getSavedSelection(textarea);
    const selected = textarea.value.slice(start, end) || fallback;
    const lines = selected.split("\n");
    const nextBlock = lines.map((line) => `${prefix}${line}`).join("\n");
    const next = `${textarea.value.slice(0, start)}${nextBlock}${textarea.value.slice(end)}`;
    commitEditorChange(next, start, start + nextBlock.length);
  }

  function insertAttach(key: string) {
    insertMarkdown(`\n<attach>${key}</attach>\n`);
  }

  function insertIframe() {
    const src = window.prompt("Embed iframe URL");
    if (!src) return;
    insertMarkdown(
      `\n<iframe src="${src}" title="Embedded content" width="100%" height="420" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>\n`,
    );
  }

  function insertGallery() {
    if (!selectedMedia.length) return;
    const body = selectedMedia.map((key) => `  <attach>${key}</attach>`).join("\n");
    insertMarkdown(`\n<gallery>\n${body}\n</gallery>\n`);
  }

  function insertLink() {
    const url = window.prompt("Link URL", "https://");
    if (!url) return;
    wrapSelection("[", `](${url})`, "link text");
  }

  function insertMarkdownImage() {
    const src = window.prompt("Image URL or /public path", "/image.png");
    if (!src) return;
    replaceSelection(`![Image description](${src})`, 2);
  }

  function insertTable() {
    replaceSelection(["| Column | Column |", "| --- | --- |", "| Value | Value |"].join("\n"));
  }

  function insertCodeBlock() {
    replaceSelection(["```md", "code", "```"].join("\n"), 6);
  }

  function applyCompletion(snippet: string) {
    const textarea = bodyRef.current;
    if (!textarea || !completion) return;
    const end = textarea.selectionStart;
    const next = `${body.slice(0, completion.start)}${snippet}${body.slice(end)}`;
    const cursor = completion.start + snippet.length;
    setCompletion(null);
    commitEditorChange(next, cursor);
  }

  function handleBodyChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setEditorBody(event.target.value, event.target.selectionStart);
    markDirty();
    rememberSelection(event.target);
  }

  async function handleLocaleChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.currentTarget.value;
    const currentLocale = currentLocaleRef.current;
    if (nextLocale === currentLocale) return;

    if (!article?.slug) {
      currentLocaleRef.current = nextLocale;
      markDirty();
      return;
    }

    event.currentTarget.value = currentLocale;

    if (dirtyRef.current) {
      if (!window.confirm("You have unsaved changes. Save this language before switching?")) return;
      try {
        const saved = await saveDraftViaApi(currentLocale);
        router.push(`/admin/articles/${type}/${saved.slug}?locale=${nextLocale}`);
      } catch (error) {
        window.alert(error instanceof Error ? error.message : "Autosave failed.");
      }
      return;
    }

    router.push(`/admin/articles/${type}/${article.slug}?locale=${nextLocale}`);
  }

  function handleEditorKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (completion && filteredCompletions.length && (event.key === "Tab" || event.key === "Enter")) {
      event.preventDefault();
      applyCompletion(filteredCompletions[0].snippet);
      return;
    }

    if (event.key === "Escape") {
      setCompletion(null);
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      insertMarkdown("  ");
    }
  }

  function syncHighlightScroll(event: UIEvent<HTMLTextAreaElement>) {
    if (!highlightRef.current) return;
    highlightRef.current.scrollTop = event.currentTarget.scrollTop;
    highlightRef.current.scrollLeft = event.currentTarget.scrollLeft;
  }

  async function uploadImageFile(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.set("file", file);

    try {
      const response = await fetch("/api/admin/media", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Upload failed.");
      const item = (await response.json()) as MediaItem;
      setMedia((items) => [item, ...items]);
      insertAttach(item.key);
    } finally {
      setUploading(false);
      setSelectedImageName("");
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function uploadSelectedFile() {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    await uploadImageFile(file);
  }

  async function previewArticle() {
    setPreviewing(true);
    try {
      const response = await fetch("/api/admin/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markdown: body }),
      });
      const result = (await response.json()) as { html?: string };
      setPreviewHtml(result.html || "");
      setShowPreview(true);
    } finally {
      setPreviewing(false);
    }
  }

  function toggleSelectedMedia(key: string) {
    setSelectedMedia((items) => (items.includes(key) ? items.filter((item) => item !== key) : [...items, key]));
  }

  function chooseImageFile(files: FileList | null) {
    setSelectedImageName(files?.[0]?.name || "");
  }

  function chooseMarkdownFile(files: FileList | null) {
    setSelectedMarkdownName(files?.[0]?.name || "");
  }

  async function handleMarkdownDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    event.stopPropagation();
    setDraggingMarkdown(false);
    const file = Array.from(event.dataTransfer.files).find((item) => item.name.endsWith(".md") || item.type.startsWith("text/"));
    if (!file) return;
    await loadMarkdownFile(file);
    if (markdownFileRef.current) markdownFileRef.current.value = "";
  }

  async function handleImageDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    event.stopPropagation();
    setDraggingImage(false);
    const file = Array.from(event.dataTransfer.files).find((item) => item.type.startsWith("image/"));
    if (!file) return;
    setSelectedImageName(file.name);
    await uploadImageFile(file);
  }

  return (
    <form
      ref={formRef}
      action={action}
      onInputCapture={(event) => {
        const target = event.target;
        if (target instanceof HTMLInputElement && target.type === "file") return;
        if (target instanceof HTMLSelectElement && target.name === "locale") return;
        markDirty();
      }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => event.preventDefault()}
      className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]"
    >
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="existingSlug" value={article?.slug || ""} />

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
                onChange={handleLocaleChange}
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
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50/70 p-3">
            <button type="button" onClick={() => prefixSelection("# ", "Heading")} className="editor-toolbar-button">H1</button>
            <button type="button" onClick={() => prefixSelection("## ", "Heading")} className="editor-toolbar-button">H2</button>
            <button type="button" onClick={() => prefixSelection("### ", "Heading")} className="editor-toolbar-button">H3</button>
            <button type="button" onClick={() => prefixSelection("#### ", "Heading")} className="editor-toolbar-button">H4</button>
            <span className="h-8 w-px bg-slate-200" />
            <button type="button" onClick={() => wrapSelection("**", "**", "bold text")} className="editor-toolbar-button font-bold">B</button>
            <button type="button" onClick={() => wrapSelection("_", "_", "italic text")} className="editor-toolbar-button italic">I</button>
            <button type="button" onClick={() => wrapSelection("~~", "~~", "deleted text")} className="editor-toolbar-button line-through">S</button>
            <button type="button" onClick={() => wrapSelection("`", "`", "code")} className="editor-toolbar-button font-mono">Code</button>
            <span className="h-8 w-px bg-slate-200" />
            <button type="button" onClick={() => prefixSelection("- ", "List item")} className="editor-toolbar-button">UL</button>
            <button type="button" onClick={() => prefixSelection("1. ", "List item")} className="editor-toolbar-button">OL</button>
            <button type="button" onClick={() => prefixSelection("> ", "Quote")} className="editor-toolbar-button">Quote</button>
            <button type="button" onClick={() => insertMarkdown("\n---\n")} className="editor-toolbar-button">HR</button>
            <span className="h-8 w-px bg-slate-200" />
            <button type="button" onClick={insertLink} className="editor-toolbar-button">Link</button>
            <button type="button" onClick={insertMarkdownImage} className="editor-toolbar-button">Image</button>
            <button type="button" onClick={() => insertMarkdown("\n<attach alt=\"Image description\">media/path/image.jpg</attach>\n")} className="editor-toolbar-button">Attach</button>
            <button type="button" onClick={insertGallery} disabled={!selectedMedia.length} className="editor-toolbar-button disabled:opacity-40">Gallery</button>
            <button type="button" onClick={insertIframe} className="editor-toolbar-button">Iframe</button>
            <button type="button" onClick={insertTable} className="editor-toolbar-button">Table</button>
            <button type="button" onClick={insertCodeBlock} className="editor-toolbar-button">Block</button>
            {article && (
              <a
                href={`/api/admin/articles/${type}/${article.slug}/markdown?locale=${article.locale}`}
                className="editor-toolbar-button"
              >
                Download
              </a>
            )}
            <button type="button" onClick={previewArticle} disabled={previewing} className="ml-auto rounded-md bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-sm disabled:opacity-60">
              {previewing ? "Previewing..." : "Preview"}
            </button>
          </div>
          <div className="relative min-h-[620px] bg-white">
            <pre
              ref={highlightRef}
              aria-hidden="true"
              className="editor-highlight-layer"
              dangerouslySetInnerHTML={{ __html: highlightedBody }}
            />
            <textarea
              ref={bodyRef}
              id="body"
              name="body"
              value={body}
              onChange={handleBodyChange}
              onKeyDown={handleEditorKeyDown}
              onScroll={syncHighlightScroll}
              onClick={(event) => {
                rememberSelection(event.currentTarget);
                updateCompletion(event.currentTarget.value, event.currentTarget.selectionStart);
              }}
              onSelect={(event) => rememberSelection(event.currentTarget)}
              onKeyUp={(event) => {
                rememberSelection(event.currentTarget);
                updateCompletion(event.currentTarget.value, event.currentTarget.selectionStart);
              }}
              onFocus={(event) => rememberSelection(event.currentTarget)}
              className="editor-textarea"
              spellCheck={false}
              required
            />
            {completion && filteredCompletions.length > 0 && (
              <div className="absolute left-5 top-5 z-20 w-72 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
                <div className="border-b border-slate-100 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Insert tag
                </div>
                {filteredCompletions.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => applyCompletion(item.snippet)}
                    className="block w-full px-3 py-2 text-left hover:bg-emerald-50"
                  >
                    <span className="block font-mono text-sm font-bold text-emerald-800">&lt;{item.label}&gt;</span>
                    <span className="block text-xs text-slate-500">{item.description}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {showPreview && (
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-slate-950">Preview</h2>
              <button type="button" onClick={() => setShowPreview(false)} className="rounded border border-slate-300 px-3 py-1.5 text-sm font-semibold">
                Close
              </button>
            </div>
            <ArticleBody html={previewHtml} className="article-prose max-w-none" />
          </section>
        )}

        {state.message && <p className="text-sm text-red-700">{state.message}</p>}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={pending || autoSaving}
            className="rounded-md bg-emerald-800 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
          >
            {pending ? "Saving..." : autoSaving ? "Autosaving..." : "Save article"}
          </button>
          {dirty && <span className="text-sm font-semibold text-amber-700">Unsaved changes</span>}
          {!dirty && article && <span className="text-sm text-slate-400">Saved</span>}
        </div>
      </div>

      <aside className="space-y-6">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">Publishing</h2>
          <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="markdownUpload">Upload Markdown</label>
          <label
            htmlFor="markdownUpload"
            onDragOver={(event) => {
              event.preventDefault();
              setDraggingMarkdown(true);
            }}
            onDragLeave={() => setDraggingMarkdown(false)}
            onDrop={handleMarkdownDrop}
            className={`mt-2 flex cursor-pointer flex-col rounded-lg border-2 border-dashed p-4 text-sm transition-colors ${
              draggingMarkdown ? "border-emerald-700 bg-emerald-50" : "border-slate-300 bg-slate-50 hover:border-emerald-700 hover:bg-emerald-50/60"
            }`}
          >
            <span className="font-bold text-emerald-800">Choose Markdown file</span>
            <span className="mt-1 truncate text-xs text-slate-500">{selectedMarkdownName || "Drop .md here or click to browse"}</span>
          </label>
          <input
            ref={markdownFileRef}
            id="markdownUpload"
            type="file"
            accept=".md,text/markdown,text/plain"
            className="sr-only"
            onChange={(event) => chooseMarkdownFile(event.target.files)}
          />
          <button type="button" onClick={uploadMarkdownFile} disabled={!selectedMarkdownName} className="mt-3 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold disabled:opacity-50">
            Load Markdown into editor
          </button>
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
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">Local media library</h2>
          <p className="mt-1 text-xs text-slate-500">Click Insert to add an attach tag. Select multiple images, then use Gallery.</p>
          <label
            htmlFor="articleImageUpload"
            onDragOver={(event) => {
              event.preventDefault();
              setDraggingImage(true);
            }}
            onDragLeave={() => setDraggingImage(false)}
            onDrop={handleImageDrop}
            className={`mt-4 flex cursor-pointer flex-col rounded-lg border-2 border-dashed p-4 text-sm transition-colors ${
              draggingImage ? "border-emerald-900 bg-emerald-100" : "border-emerald-700 bg-emerald-50 hover:bg-emerald-100"
            }`}
          >
            <span className="font-bold text-emerald-900">Choose image to upload</span>
            <span className="mt-1 truncate text-xs text-emerald-900/70">{selectedImageName || "Drop image here to upload and insert <attach>"}</span>
          </label>
          <input
            ref={fileRef}
            id="articleImageUpload"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => chooseImageFile(event.target.files)}
          />
          <button type="button" onClick={uploadSelectedFile} disabled={uploading || !selectedImageName} className="mt-3 w-full rounded-md bg-emerald-800 px-3 py-2.5 text-sm font-bold text-white shadow-sm disabled:opacity-50">
            {uploading ? "Uploading..." : "Upload and insert attach"}
          </button>
          <button type="button" onClick={insertGallery} disabled={!selectedMedia.length} className="mt-3 w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white disabled:opacity-40">
            Insert gallery ({selectedMedia.length})
          </button>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {media.slice(0, 20).map((item) => (
              <div key={item.key} className="overflow-hidden rounded border border-slate-200 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt="" className="aspect-video w-full object-cover" />
                <div className="space-y-2 p-2">
                  <label className="flex items-center gap-2 text-xs text-slate-600">
                    <input type="checkbox" checked={selectedMedia.includes(item.key)} onChange={() => toggleSelectedMedia(item.key)} />
                    Select
                  </label>
                  <button type="button" onClick={() => insertAttach(item.key)} className="w-full rounded bg-emerald-800 px-2 py-1.5 text-xs font-semibold text-white">
                    Insert attach
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </form>
  );
}
