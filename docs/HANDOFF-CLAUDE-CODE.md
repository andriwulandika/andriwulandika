# Handoff untuk Claude Code — Status & Langkah Berikutnya

**Diperbarui:** 21 Juli 2026. Baca ini di awal sesi supaya tahu posisi terakhir.

## Fokus saat ini (ditetapkan Andri)
**Menyempurnakan website utama `andriwulandika.uk` lebih dulu.** AI Tools
(paket kredit + payment) dan konfirmasi `ADMIN_PASSWORD` di Cloudflare
**DITUNDA** sampai website utama beres.

## Yang SUDAH selesai & live di `main`
- Harga website transisi Fase 0 (Landing Rp 1,2jt · Profil Rp 3jt · Instansi/OPD/Desa mulai Rp 2,5jt).
- Lini Pengelolaan Media Sosial (UMKM Rp 600rb/bln · Bertumbuh Rp 1,5jt/bln) di layanan-bisnis, homepage, promo.
- Governance: skill `brand-governance-check`, `CLAUDE.md`, `docs/KNOWLEDGE-BASE.md` (§6a harga website, §6b medsos, §6c DRAFT kredit AI).
- Tagline resmi: **"Transformasi digital untuk pemerintah & bisnis"**.

## Yang dikerjakan di PR ini (sedang direview Andri)
- **Tombol media sosial** (IG, FB, YouTube — URL asli dari JSON-LD) di footer semua halaman utama + promo.
- **Section "Template Desain"** di homepage (id `#template`) dengan 4 kartu → demo.
- **4 halaman demo contoh** (`src/site/demo-{umkm,desa,pemerintah,landing}.html`), semua `noindex`, ada banner "CONTOH · data fiktif · bukan situs resmi".
- Dokumen `docs/DAFTAR-LAYANAN.md` (untuk review Andri).

## Butuh input Andri (blocker kecil)
1. **URL TikTok** — tombol TikTok masih placeholder `href="#"` di semua footer (cari `TODO(Andri)` / `aria-label="TikTok`). Ganti begitu URL diberikan.
2. **Review DAFTAR-LAYANAN.md** — Andri tandai layanan yang mau ditambah/disempurnakan.

## Langkah berikutnya (urut prioritas, setelah PR ini merge)
1. Isi URL TikTok yang asli ke seluruh footer.
2. Tindak lanjuti hasil review `DAFTAR-LAYANAN.md` (mis. paket Toko Online tampil, testimoni, bundling) → masukkan ke `docs/ROADMAP.md`.
3. (Opsional) Ganti mockup CSS di section Template dengan screenshot asli halaman demo untuk tampilan lebih nyata.
4. Setelah website "sempurna" per Andri: lanjut **konfirmasi ADMIN_PASSWORD** (Cloudflare) lalu **finalisasi paket kredit AI Tools + payment link** (butuh keputusan harga Andri + ukur token output nyata).

## Aturan kerja yang tetap berlaku
- Edit HANYA di `src/`, jalankan `scripts/build-pages.sh`, commit output `site/` juga.
- Konten publik → jalankan skill `brand-governance-check` dulu.
- Push ke branch (preview) boleh; **merge ke `main` menunggu approve Andri**.
- Harga/positioning baru = butuh persetujuan eksplisit Andri.
- Jangan sentuh `src/tools/` untuk pekerjaan website ini.
