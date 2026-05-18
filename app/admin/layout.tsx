import Link from "next/link";
import { getAdminSession } from "@/lib/admin/auth";
import { logoutAction } from "./login/actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      {session && (
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <nav className="flex items-center gap-5 text-sm font-medium">
              <Link href="/admin" className="font-bold text-emerald-800">LindaBen CMS</Link>
              <Link href="/admin/articles/blogs/new">New Blog</Link>
              <Link href="/admin/articles/newsletter/new">New Newsletter</Link>
              <Link href="/admin/media">Media</Link>
            </nav>
            <form action={logoutAction}>
              <button className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium" type="submit">
                Sign out
              </button>
            </form>
          </div>
        </header>
      )}
      {children}
    </div>
  );
}
