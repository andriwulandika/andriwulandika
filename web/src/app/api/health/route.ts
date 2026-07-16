import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { leads } from "@/db/schema";

// Spike Fase 0: buktikan route handler bisa query D1 lewat Drizzle di runtime Cloudflare.
export async function GET() {
  const db = getDb();
  const rows = await db.select().from(leads).all();
  return NextResponse.json({ ok: true, leadsCount: rows.length });
}
