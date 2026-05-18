import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin/auth";
import LoginForm from "./LoginForm";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin");

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-16">
      <div className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">LindaBen CMS</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">Admin login</h1>
        <p className="mt-2 text-sm text-slate-600">Sign in to manage news, blogs, and media.</p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
