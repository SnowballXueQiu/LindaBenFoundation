import { requireAdmin } from "@/lib/admin/auth";
import { listMedia } from "@/lib/content/repository";

export default async function AdminMediaPage() {
  await requireAdmin();
  const media = await listMedia();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Media</p>
      <h1 className="mt-2 text-3xl font-bold">Image library</h1>
      <p className="mt-2 text-sm text-slate-600">Upload from the article editor, then reuse images here or in article cover fields.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {media.map((item) => (
          <article key={item.key} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.url} alt="" className="aspect-video w-full object-cover" />
            <div className="p-4">
              <p className="break-all text-xs text-slate-600">{item.key}</p>
              <a href={item.url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-emerald-800">
                Open
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
