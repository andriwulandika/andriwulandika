import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";

// Spike Fase 0: helper untuk ambil koneksi Drizzle dari binding D1 di runtime Cloudflare.
export function getDb() {
  const { env } = getCloudflareContext();
  return drizzle(env.DB, { schema });
}
