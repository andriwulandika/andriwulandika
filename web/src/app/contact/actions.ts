"use server";

import { getDb } from "@/db";
import { leads } from "@/db/schema";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Nama, email, dan pesan wajib diisi." };
  }
  if (!email.includes("@")) {
    return { status: "error", message: "Format email tidak valid." };
  }

  try {
    const db = getDb();
    await db.insert(leads).values({
      name,
      email,
      company: company || null,
      message,
      source: "contact_form",
    });
    return { status: "success" };
  } catch (err) {
    console.error("submitContactForm failed", err);
    return {
      status: "error",
      message: "Gagal mengirim pesan. Coba lagi sebentar lagi.",
    };
  }
}
