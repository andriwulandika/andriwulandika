# ADR 0002 — Migrasi stack presentasi ke Next.js + Tailwind CSS

**Status:** DITERIMA (dipilih eksplisit dalam sesi, 22 Jul 2026) — mulai dengan
**scaffold paralel, terisolasi** (`web-next/`), TIDAK mengganti `site/`/`tools/`
yang sedang live di Cloudflare Pages sampai ada persetujuan cutover terpisah.
**Tanggal draf:** 22 Juli 2026. **Tanggal keputusan:** 22 Juli 2026.
**Kategori kewenangan:** stack = wajib persetujuan eksplisit Andri
(`CLAUDE.md` §Kewenangan) — dipilih eksplisit setelah ditawari 3 opsi
(terjemahkan ke stack lama / migrasi sungguhan / instruksi salah proyek).

---

## Konteks

Situs ini (`andriwulandika.uk`) saat ini dibangun dengan **11ty murni sebagai
alat authoring lokal/CI** (lihat `eleventy.factory.js`): output 11ty
diverifikasi byte-identik lalu disalin ke `site/` dan `tools/` — folder itu
yang benar-benar di-deploy Cloudflare Pages, **tanpa Root Directory/Build
Command/Output Directory Cloudflare yang diubah**. Filosofi ini sengaja
menghindari mengulang insiden produksi sebelumnya (build command gagal jalan
saat deploy).

Sebuah instruksi refactor UI/UX datang dengan asumsi stack **Next.js + Tailwind
CSS** (path `app/layout.tsx`, `tailwind.config.js`, komponen React Navbar/Hero/
Card). Repo ini tidak punya satupun dari itu — audit `package.json`,
`package-lock.json`, dan struktur folder mengonfirmasi hanya `@11ty/eleventy`
+ `sharp`, tanpa Next.js/React/Tailwind di manapun.

## Opsi yang ditawarkan

1. **Terjemahkan bahasa desain ke stack yang ada** (CSS vanilla di 11ty) —
   tanpa dependency baru, tanpa risiko pipeline, siap preview hari itu juga.
2. **Migrasi sungguhan ke Next.js + Tailwind** — perubahan stack besar &
   sulit dibalik: dependency baru (`next`, `react`, `tailwindcss`, dst),
   model build berbeda total (`next build` / static export vs 11ty →
   byte-copy), dan berpotensi menyentuh ulang konfigurasi Cloudflare Pages
   yang sudah stabil.
3. Instruksi salah proyek / dibatalkan.

**Dipilih: opsi 2** — migrasi sungguhan.

## Keputusan & scope tahap ini

Karena migrasi penuh (≥14 halaman: `index`, `tentang`, `layanan-*`, `produk`,
`promo`, `demo-*`, halaman legal) dalam satu sesi berisiko menghasilkan situs
setengah-migrasi yang tampil pincang, tahap ini dibatasi ke:

- Scaffold Next.js 14 (App Router) + TypeScript + Tailwind CSS di folder baru
  **`web-next/`** di root repo — terpisah total dari `src/`, `site/`, `tools/`
  yang sudah ada. Tidak ada file lama yang dihapus/ditimpa.
- Implementasi ulang **homepage saja** (konten sama dengan `src/site/index.html`
  saat ini: hero, layanan, portofolio, proses, harga, FAQ, CTA, footer),
  dengan sistem desain "design-first agency" yang diminta: Plus Jakarta Sans +
  JetBrains Mono, navbar floating glassmorphism, hairline border `white/10`,
  index nomor monospace, whitespace masif `py-28`–`py-40`.
- Verifikasi `next build` sukses, tanpa menyentuh konfigurasi deploy Cloudflare
  Pages yang sudah ada untuk `site/`/`tools/`.

## Konsekuensi

- **Dua stack presentasi berjalan paralel** untuk sementara: `site/` (live,
  11ty) dan `web-next/` (baru, belum di-deploy). Ini disengaja — mengurangi
  risiko sampai ada keputusan cutover eksplisit.
- **Belum ada keputusan** tentang: (a) apakah `web-next/` akan menggantikan
  `site/` di produksi, (b) bagaimana deploy-nya di Cloudflare Pages (Next.js
  di Cloudflare Pages perlu adapter `@cloudflare/next-on-pages` atau static
  export — punya batasan fitur dibanding Next.js standar), (c) rollout ke
  13 halaman lain. **Ketiganya butuh keputusan eksplisit terpisah dari Andri**
  sebelum eksekusi — jangan lanjut otomatis.
- Beban maintenance ganda selama masa transisi (dua codebase, dua sistem
  desain) — wajar untuk migrasi bertahap, tapi jangan dibiarkan berlarut.

## Rollback

Karena `web-next/` terisolasi dan `site/`/`tools/` tidak disentuh, rollback
= hapus folder `web-next/` tanpa dampak ke situs live. Tidak ada risiko
produksi dari tahap ini.
