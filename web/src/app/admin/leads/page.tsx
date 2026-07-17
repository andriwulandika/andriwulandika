import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { leads } from "@/db/schema";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import LogoutButton from "./logout-button";

// Wajib dipaksa dynamic: isAdminAuthenticated() return early sebelum
// memanggil cookies() saat ADMIN_PASSWORD belum ada (mis. saat build),
// jadi Next tidak otomatis mendeteksi dynamic API dan akan meng-cache
// hasil render (termasuk redirect ke /admin/login) sebagai halaman statis
// kalau tidak dipaksa di sini.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Leads",
  robots: { index: false, follow: false },
};

export default async function AdminLeadsPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const db = getDb();
  const allLeads = await db
    .select()
    .from(leads)
    .orderBy(desc(leads.createdAt));

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Leads ({allLeads.length})
        </h1>
        <LogoutButton />
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-border/60">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-4 py-3 font-medium">Tanggal</th>
              <th className="px-4 py-3 font-medium">Nama</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Organisasi</th>
              <th className="px-4 py-3 font-medium">Pesan</th>
              <th className="px-4 py-3 font-medium">Sumber</th>
            </tr>
          </thead>
          <tbody>
            {allLeads.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Belum ada leads.
                </td>
              </tr>
            )}
            {allLeads.map((lead) => (
              <tr key={lead.id} className="border-t border-border/60 align-top">
                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                  {lead.createdAt.toLocaleString("id-ID", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td className="px-4 py-3">{lead.name}</td>
                <td className="px-4 py-3">{lead.email}</td>
                <td className="px-4 py-3">{lead.company ?? "—"}</td>
                <td className="max-w-xs px-4 py-3">{lead.message}</td>
                <td className="px-4 py-3">{lead.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
