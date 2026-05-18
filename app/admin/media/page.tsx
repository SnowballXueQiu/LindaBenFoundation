import { requireAdmin } from "@/lib/admin/auth";
import { listMedia } from "@/lib/content/repository";
import MediaManager from "./MediaManager";

export default async function AdminMediaPage() {
  await requireAdmin();
  const media = await listMedia();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Media</p>
      <h1 className="mt-2 text-3xl font-bold">Image library</h1>
      <p className="mt-2 text-sm text-slate-600">
        Upload and manage images for Newsletter and Blog articles.
      </p>

      <div className="mt-8">
        <MediaManager initialMedia={media} />
      </div>
    </main>
  );
}
