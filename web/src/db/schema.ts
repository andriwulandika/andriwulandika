import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Spike Fase 0: skema minimal untuk form kontak / "Book Consultation".
// Akan diperluas di Fase 1+ (case studies, leads, calculator submissions, dll).
export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  source: text("source").notNull().default("contact_form"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
