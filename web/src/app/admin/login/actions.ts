"use server";

import { redirect } from "next/navigation";
import { createAdminSession, verifyAdminPassword } from "@/lib/admin-auth";

export type AdminLoginState = {
  status: "idle" | "error";
  message?: string;
};

export async function loginAdmin(
  _prevState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const password = String(formData.get("password") ?? "");

  if (!(await verifyAdminPassword(password))) {
    return { status: "error", message: "Password salah." };
  }

  await createAdminSession();
  redirect("/admin/leads");
}
