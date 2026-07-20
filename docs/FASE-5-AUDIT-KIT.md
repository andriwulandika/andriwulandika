# FASE 5 — Audit Kit untuk Claude Code
**Isi:** (A) Langkah menjalankan Claude Code · (B) Prompt siap tempel · (C) Rekomendasi model
**Sifat sesi:** AUDIT SAJA — tidak ada perubahan kode, tidak ada deploy.

---

## A. Langkah Menjalankan (ikuti persis)

1. **Pastikan repo ada di komputer Anda.** Kalau belum, buka github.com → repo Anda → tombol hijau **Code** → **Download ZIP** → ekstrak. (Atau kalau sudah pernah `git clone`, pakai folder itu.)
2. **Install Claude Code** (sekali saja):
   - **Windows:** buka **PowerShell**, tempel: `irm https://claude.ai/install.ps1 | iex`
   - **macOS/Linux:** buka **Terminal**, tempel: `curl -fsSL https://claude.ai/install.sh | bash`
   - Butuh akun Claude berbayar (Pro/Max). Panduan resmi: https://code.claude.com/docs/en/quickstart
3. **Masuk ke folder repo** di terminal: ketik `cd ` lalu seret (drag) folder repo ke jendela terminal → Enter.
4. Ketik `claude` → Enter. Pertama kali akan membuka browser untuk login — ikuti saja.
5. Setelah muncul layar Claude Code, ketik `/model` → pilih model sesuai bagian C.
6. **Tempel seluruh prompt di bagian B** → Enter. Biarkan bekerja; jawab pertanyaan konfirmasinya bila ada.
7. Selesai bila Claude Code melaporkan file `docs/audit/REPO-AUDIT.md` sudah dibuat. Kirim isi file itu ke saya di chat ini untuk kita bahas dan susun Roadmap (Fase 6).

**Opsional (akses Cloudflare):** jika ingin audit menyentuh konfigurasi Cloudflare, sebelum langkah 6 ketik dulu di terminal (di luar Claude Code): `npx wrangler login` → login di browser. Kalau ini terasa rumit, lewati — audit tetap jalan tanpa ini.

**Catatan penting:** jika situs utama dan situs AI ada di **repo berbeda**, jalankan prompt yang sama dua kali — sekali di tiap folder repo.

---

## B. PROMPT — salin semuanya mulai dari garis di bawah ini

---

Kamu adalah auditor teknis untuk proyek andriwulandika.uk. Sesi ini AUDIT SAJA: dilarang mengubah kode, dilarang commit ke branch utama, dilarang deploy. Satu-satunya file yang boleh kamu buat adalah dokumen audit di `docs/audit/REPO-AUDIT.md`.

KONTEKS PROYEK (ringkasan dari dokumen fondasi):
- Pemilik: Andri Wulandika, bukan developer — semua temuan harus dijelaskan dengan bahasa awam + dampak bisnisnya.
- Dua properti: andriwulandika.uk (situs jasa, target: UMKM/desa/personal branding/perusahaan) dan ai.andriwulandika.uk (8 AI tools ASN bertenaga API gratis Gemini + halaman harga/Pro yang belum ada pembeli).
- Hosting: Cloudflare. Repo: GitHub.
- Tagline kampanye baru: "Punya Usaha, Harus Punya Website".
- Keputusan brand yang HARUS tercermin di situs (cek pelanggarannya): (1) hapus semua penyebutan sub-brand Birokrat/DesaDigital/VillageStock; (2) hapus "Anggota aktif TAPD" dari profil; (3) jabatan resmi "Perencana Ahli Pertama · Bappeda Aceh Tenggara" tidak boleh bersanding langsung dengan penawaran berbayar; (4) layanan "Pengelolaan Media Sosial" harus ditambahkan.

KERJAKAN BERURUTAN:

1. INVENTARIS REPO — Petakan struktur folder, stack & versi framework, dependensi utama, cara build & deploy (cek file konfigurasi Cloudflare seperti wrangler.toml / setelan Pages). Nilai: apakah struktur ini sehat untuk dipelihara jangka panjang oleh pemilik non-developer yang bekerja lewat AI.

2. AUDIT KEAMANAN (PRIORITAS TERTINGGI) — Cari secrets/API key yang tertulis di kode atau riwayat git (terutama API key Gemini di situs AI tools — jika situs statis, besar kemungkinan key terekspos di JavaScript sisi klien; ini temuan kritis). Cek .gitignore, penanganan env var, dependensi dengan kerentanan (`npm audit` bila relevan), form yang mengumpulkan data pengguna tanpa halaman kebijakan privasi (kewajiban UU PDP 27/2022).

3. AUDIT KUALITAS & PERFORMA — Jalankan build dan catat error/warning. Jalankan Lighthouse terhadap https://andriwulandika.uk dan https://ai.andriwulandika.uk (mis. `npx lighthouse <url> --output=json --chrome-flags="--headless"`; jika gagal, gunakan PageSpeed Insights via web). Fokus: performa mobile, SEO teknis, aksesibilitas.

4. AUDIT KONTEN vs KEPUTUSAN BRAND — Telusuri semua halaman kedua situs, daftar setiap lokasi yang melanggar 4 keputusan brand di atas + tempat tagline lama perlu diganti dengan "Punya Usaha, Harus Punya Website". Nilai juga alur konversi: seberapa mudah pengunjung sampai ke Book Consultation / pembelian, dan hambatan apa yang ada.

5. AUDIT AI TOOLS — Bagaimana 8 tools memanggil Gemini (endpoint, model, di klien atau server), risiko batas kuota gratis, dan opsi perbaikan (minimal: pindahkan pemanggilan API ke sisi server, mis. Cloudflare Workers, agar key aman dan kuota terkendali). Estimasi biaya bulanan tiap opsi.

6. RISET HARGA PASAR (pakai web search) — Kisaran harga di Indonesia untuk: jasa pembuatan website UMKM/company profile/desa, paket pengelolaan media sosial bulanan, dan produk digital/template untuk ASN. Sertakan 3–5 sumber per kategori dan rekomendasi kisaran harga awal yang tidak memberatkan pembeli tapi tetap layak secara bisnis.

7. TULIS LAPORAN ke `docs/audit/REPO-AUDIT.md` dalam Bahasa Indonesia dengan struktur: Ringkasan Eksekutif (maks 10 kalimat, bahasa awam) → Temuan berperingkat P0 (kritis/keamanan), P1 (menghambat jualan), P2 (perbaikan kualitas) — setiap temuan berisi: apa, di file/halaman mana, dampak bisnis, rekomendasi perbaikan, perkiraan usaha (kecil/sedang/besar) → Hasil riset harga → Usulan urutan pengerjaan untuk roadmap. JANGAN perbaiki apa pun di sesi ini; hanya laporkan.

---

## C. Rekomendasi Model

| Tahap | Model | Alasan |
|---|---|---|
| **Audit ini (Fase 5)** | **Claude Fable 5** (jika tersedia di paket Anda; jika tidak, **Claude Opus 4.8**) | Audit butuh penalaran terdalam: menghubungkan temuan keamanan, bisnis, dan konten sekaligus. Dikerjakan sekali, hasilnya jadi dasar seluruh roadmap — jangan hemat di sini. |
| Implementasi rutin nanti (Fase 7) | **Claude Sonnet 4.6** | Cepat dan hemat kuota untuk pekerjaan yang sudah jelas spesifikasinya (edit konten, styling, halaman baru). |
| Keputusan arsitektur / fitur kompleks | Fable 5 / Opus 4.8 | Naik kelas hanya saat keputusan mahal dibalik. |

Ganti model kapan saja di Claude Code dengan perintah `/model`.
