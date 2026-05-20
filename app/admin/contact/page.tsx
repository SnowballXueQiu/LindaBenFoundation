import { requireAdmin } from "@/lib/admin/auth";
import { listContactSubmissions } from "@/lib/contact/submissions";
import { deleteContactSubmissionAction } from "@/app/admin/actions";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function AdminContactPage() {
  await requireAdmin();
  const submissions = await listContactSubmissions();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Contact Us</p>
          <h1 className="mt-2 text-3xl font-bold">Contact submissions</h1>
          <p className="mt-2 text-sm text-slate-600">
            View and delete messages submitted from the website Contact Us form.
          </p>
        </div>
        <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
          {submissions.length} message{submissions.length === 1 ? "" : "s"}
        </div>
      </div>

      <section className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        {submissions.length === 0 ? (
          <p className="p-8 text-sm text-slate-500">No contact submissions yet.</p>
        ) : (
          <div className="divide-y divide-slate-200">
            {submissions.map((submission) => (
              <article key={submission.id} className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-950">{submission.fullName}</h2>
                    <p className="mt-1 text-sm text-slate-500">{formatDate(submission.createdAt)}</p>
                  </div>
                  <form action={deleteContactSubmissionAction}>
                    <input type="hidden" name="id" value={submission.id} />
                    <button
                      type="submit"
                      className="rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </form>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Email</p>
                    <a className="mt-1 block break-all text-sm font-medium text-emerald-800" href={`mailto:${submission.email}`}>
                      {submission.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Phone</p>
                    <p className="mt-1 text-sm text-slate-700">{submission.phoneNumber || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">SMS consent</p>
                    <p className="mt-1 text-sm text-slate-700">{submission.smsConsent ? "Yes" : "No"}</p>
                  </div>
                </div>

                {submission.subject && (
                  <div className="mt-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Subject</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">{submission.subject}</p>
                  </div>
                )}

                <div className="mt-5 rounded-lg bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Message</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-800">{submission.message}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
