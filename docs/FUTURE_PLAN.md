# FUTURE PLAN — 2–3 Tahun

Rencana pertumbuhan **setelah** website utama production-ready (`ROADMAP.md` M1–M5). Semua item
di sini = **keputusan bisnis** (butuh persetujuan pemilik + ADR sebelum eksekusi). Prinsip tetap:
hemat, statis/serverless sedapat mungkin, AI sebagai pendukung, kepercayaan di atas hype.

## Horizon 1 (0–6 bln setelah production-ready) — Perkuat inti
- **Self-serve payment (F1):** kurangi friksi pembayaran manual. Evaluasi payment gateway lokal
  (mis. Midtrans/Xendit/QRIS) vs biaya. Butuh: akun/email pengguna, kode akses tersimpan server-side
  (bukan hanya localStorage), webhook top-up otomatis. **Dampak besar** pada konversi produk.
- **Akun pengguna ringan:** email/OTP → pulihkan kode, riwayat dokumen, saldo lintas perangkat.
- **Paket retainer/maintenance (F2):** pendapatan berulang dari klien jasa (update, hosting-managed,
  SEO bulanan). Melunakkan bus-factor pendapatan.
- **SOP portofolio/testimoni** otomatis tiap proyek selesai (mengunci M2 jangka panjang).

## Horizon 2 (6–18 bln) — Perdalam produk & AI
- **RAG grounding regulasi (F3):** indeks regulasi & template → output AI makin patuh & terkini;
  pembeda kuat vs tools generik. Butuh store vektor (evaluasi opsi hemat: Cloudflare Vectorize).
- **AI tools baru** sesuai permintaan ASN: review/QA dokumen otomatis, generator matriks cascading
  IKU/IKD/IKK, ringkas regulasi, asisten tanya-jawab perencanaan.
- **Fitur AI opsional untuk website klien:** chatbot bantuan, generator konten/berita instansi —
  add-on berbayar (selaras `SERVICES.md`).
- **Knowledge Center (F5):** pustaka panduan + template premium; freemium (gratis untuk SEO,
  premium untuk kedalaman) → sumber konten & lead.

## Horizon 3 (18–36 bln) — Skala & platform
- **Portal Klien (F4):** dashboard proyek untuk klien jasa (status, aset, invoice, dokumen) +
  dashboard analitik penggunaan AI tools untuk keputusan produk.
- **Government Solutions:** paket transformasi digital instansi (website + tools + pendampingan),
  potensi kerja sama antar-OPD/daerah; pertimbangkan kepatuhan pengadaan pemerintah.
- **Business Solutions:** paket digital UMKM (web + landing + otomasi WhatsApp/konten).
- **Potensi SaaS multi-tenant:** "Perencanaan-as-a-Service" untuk banyak instansi — langganan per
  OPD/daerah, template & nomenklatur per-daerah, kolaborasi tim. **Keputusan besar**: menuntut
  evolusi dari statis+KV ke arsitektur data multi-tenant (mis. D1/Durable Objects) — timbang
  hati-hati vs prinsip hemat/simpel.

## Skalabilitas (prinsip saat tumbuh)
- Tetap edge-first (Cloudflare). Naik dari KV ke **D1/Durable Objects** hanya saat data relasional/
  atomik dibutuhkan (mis. akun, transaksi, multi-tenant). Abstraksi tetap di `_lib.js`.
- Otomasi kualitas (CI/CSP/monitoring) mendahului penambahan fitur.
- Jaga bus factor: dokumentasi (KB ini), backup, dan—bila memungkinkan—kolaborator.

## Integrasi AI (arah)
Multi-provider (anti lock-in) · RAG regulasi · caching prompt untuk hemat biaya · guardrail &
disclaimer · pantau biaya/token sebagai metrik utama (`BUSINESS_MODEL.md`, `AI_STRATEGY.md`).

## Gerbang keputusan (jangan lewati)
Tiap item Horizon: validasi permintaan nyata → hitung unit economics → ADR (`DECISION_LOG.md`) →
pilot kecil → ukur → skala. Jangan bangun SaaS/portal sebelum M1–M5 tuntas & ada bukti permintaan.

Terkait: `ROADMAP.md`, `BUSINESS_MODEL.md`, `AI_STRATEGY.md`, `RISK_REGISTER.md`, `PRODUCTS.md`.
</content>
