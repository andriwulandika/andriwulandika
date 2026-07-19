# ROADMAP — menuju production-ready kelas agensi

5 milestone berurutan. Tiap milestone: **Target · Deliverables · Risiko · Checklist · Kriteria
selesai (Definition of Done)**. Detail tugas di `TODO.md`; kriteria kualitas di `CHECKLIST.md`.
Urutan mengikuti prioritas AGENTS.md §16 (kepercayaan/korektnes → keamanan → proses → perf → growth).

---

## Milestone 1 — Kepercayaan & Kejujuran (Foundation of Trust)
**Target:** hilangkan semua kesenjangan "janji ≠ kenyataan" dan halaman kosong. Situs harus
100% jujur & konsisten sebelum mendorong traffic.
- **Deliverables:** C1 (pesan harga↔kredit), C2 (sitemap↔noindex), C3 (placeholder produk),
  H4 (rapikan verifikasi Google), H3 (verifikasi/lunakkan klaim performa).
- **Risiko:** keputusan model harga tertunda (OPEN-1) → blokir C1. Mitigasi: siapkan 2 opsi copy.
- **Checklist:** bagian "Korektnes & kepercayaan" + sebagian SEO di `CHECKLIST.md`.
- **Selesai bila:** tak ada klaim tak terbukti; harga sesuai implementasi; sitemap bersih; tak ada
  section placeholder kosong; build reproducible & PR merged (oleh pemilik).

## Milestone 2 — Konversi & Bukti Sosial (Proof)
**Target:** ubah pengunjung jadi lead — atasi penghambat konversi #1.
- **Deliverables:** H1 (portofolio nyata + testimoni), form kontak terstruktur + WA, perkuat CTA
  & narasi hasil di layanan, mulai kumpulkan studi kasus tiap proyek.
- **Risiko:** ketergantungan input dunia nyata (klien/izin) → jadwal tak pasti. Mitigasi: jadikan
  pengumpulan testimoni bagian SOP tiap proyek selesai.
- **Checklist:** bagian "UX & konversi" + "Korektnes/kepercayaan (portofolio)".
- **Selesai bila:** ≥3 bukti nyata tampil (dengan izin); jalur kontak jelas; metrik lead terpantau.

## Milestone 3 — Keamanan & Proses (Hardening & Guardrails)
**Target:** naikkan kualitas otomatis agar skala tanpa menurunkan mutu.
- **Deliverables:** H2 (CSP report-only→enforce), CI-01 (GitHub Actions: node --check, link/asset,
  diff dist↔output, secret scan), M6 (cek drift functions), M4 (lastmod otomatis).
- **Risiko:** CSP memblokir inline style/script/GA4 → uji report-only dulu; approval tooling (OPEN-3).
- **Checklist:** bagian "Keamanan" + "Proses & kualitas".
- **Selesai bila:** CI hijau jadi gerbang PR; CSP enforce tanpa regresi; tak ada drift sumber↔output.

## Milestone 4 — Performa & SEO Lanjutan (Speed & Discoverability)
**Target:** bukti performa terukur + rich results.
- **Deliverables:** M2 (optimasi gambar), M3 (ekstraksi CSS bersama — kurangi berat HTML),
  M1 (schema Article/FAQ/Breadcrumb), M5 (interlink + hub artikel), baseline PSI di `PERFORMANCE.md`.
- **Risiko:** refactor CSS (M3) berpotensi regresi visual → bertahap, byte-diff, no visual change (OPEN-4).
- **Checklist:** bagian "Performa" + "SEO" + "Konten".
- **Selesai bila:** LCP<2.5s/CLS<0.1/INP<200ms (mobile) terdokumentasi; rich result valid; CSS terpusat.

## Milestone 5 — Aksesibilitas & Polish (Agency-Grade Finish)
**Target:** finishing setara agensi + fondasi pertumbuhan.
- **Deliverables:** L1–L4 (skip link, landmark, kontras, aria, path), audit axe/Lighthouse a11y,
  L5 (pecah halaman raksasa), evaluasi awal F1/F2 (self-serve payment, retainer) untuk `FUTURE_PLAN.md`.
- **Risiko:** scope creep ke fitur besar → batasi ke polish; fitur besar masuk Future.
- **Checklist:** bagian "Aksesibilitas" + sisa "Rilis".
- **Selesai bila:** lulus audit a11y dasar; UI konsisten & rapi; keputusan arah growth tercatat (ADR).

---

## Sekuens paling efektif (ringkas)
Jujur dulu (M1) → buktikan (M2) → amankan & otomasi (M3) → cepat & mudah ditemukan (M4) →
poles & siapkan tumbuh (M5). Setiap milestone diakhiri review (`QUALITY_REVIEW.md`) + update KB.
Fase pertumbuhan jangka panjang (produk baru, SaaS, portal) ada di `FUTURE_PLAN.md`.
</content>
