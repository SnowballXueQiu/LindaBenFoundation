"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession } from "@/lib/admin/auth";

export type LoginState = {
  error?: string;
};

export async function loginAction(_state: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");
  const ok = await createSession(username, password);

  if (!ok) {
    return { error: "Invalid username or password." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
