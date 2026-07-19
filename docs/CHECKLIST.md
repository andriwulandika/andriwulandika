# CHECKLIST — Production-Ready

Checklist master menuju kualitas agensi. ☐ = belum, ☑ = selesai, ◐ = sebagian.
Sinkron dengan `TODO.md` & `ROADMAP.md`.

## Korektnes & kepercayaan (P0)
- ☐ Pesan harga tools konsisten dengan model kredit (hapus "tanpa batas" atau sediakan paket nyata)
- ☑ Positioning brand konsisten di `site/` (AI sebagai pendukung)
- ☐ Portofolio nyata + ≥2–3 testimoni (dengan izin)
- ☐ Placeholder "Produk Berikutnya" diisi atau disembunyikan

## SEO
- ☑ Title/description/canonical unik · OG/Twitter · JSON-LD WebSite/Person/Service · sitemap/robots · 301
- ☐ Hapus halaman noindex dari `tools/sitemap.xml`
- ☐ Rapikan 4× google-site-verification
- ☐ Schema Article/FAQPage/BreadcrumbList di artikel
- ☐ `lastmod` sitemap akurat/otomatis

## Keamanan
- ☑ Secret di server · admin constant-time · rate-limit fail-closed · kredit fail-safe · security headers
- ☐ Content-Security-Policy (report-only → enforce)
- ☐ Secret scanning di CI · ☐ rotasi admin password/2FA (pertimbangan)

## Performa
- ☐ Verifikasi Lighthouse/PSI (simpan baseline di `PERFORMANCE.md`)
- ☐ Optimasi gambar (webp/avif, lazy, width/height, preload hero)
- ◐ Cache headers (sudah baik) · ☐ ekstraksi CSS bersama (kurangi berat HTML)

## Aksesibilitas
- ◐ aria-label/reduced-motion (ada) · ☐ skip-to-content · ☐ landmark `<main>` konsisten
- ☐ audit kontras WCAG AA (`--text3`) · ☐ audit axe/Lighthouse a11y

## Proses & kualitas
- ☐ CI GitHub Actions (node --check, HTML/link check, diff dist↔output, secret scan)
- ◐ verifikasi manual minimal (AGENTS.md §8) · ☐ uji unit logika kredit/rate-limit (opsional)
- ☑ Conventional Commits · ☑ PR draft flow · ☑ knowledge base/SSOT

## UX & konversi
- ☐ Bukti sosial (lihat P0) · ☐ form kontak terstruktur + WA · ◐ CTA WA konsisten (ada)
- ☐ Evaluasi self-serve payment & akun (Future)

## Konten
- ☑ 15 artikel perencanaan · ☐ interlink artikel↔tool↔jasa diperkuat · ☐ hub page artikel
- ☐ blog bisnis di `site/` (opsional)

## Rilis (tiap deploy besar)
- ☐ build reproducible & `node --check` · ☐ diff dist↔output bersih · ☐ functions sinkron
- ☐ cek broken link/asset · ☐ Lighthouse spot-check · ☐ CHANGELOG diperbarui · ☐ (manusia) merge main
</content>
