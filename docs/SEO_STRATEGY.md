# SEO STRATEGY

## Kondisi (kuat secara teknis)
✔ Title/description unik · canonical benar (termasuk `promo.html`→beranda) · Open Graph +
Twitter Card + `og:image` 1200×630 · **JSON-LD** WebSite + Person + Service(`offers`) ·
sitemap + robots per situs · 301 map lengkap (`site/_redirects`) · `lang="id"` · heading terstruktur.

## Temuan & perbaikan (prioritas)
### P0 — kebersihan indeks
- **Hapus dari `tools/sitemap.xml`**: `bayar.html`, `aktifkan-pro.html`, `admin-kode.html`
  (semuanya `noindex`) — kontradiksi sitemap↔noindex (`AUDIT_REPORT.md` #21).
- **Rapikan 4× `<meta google-site-verification>`** di homepage → sisakan yang aktif dipakai.

### P1 — rich results (peluang klik)
- Tambah schema **`Article`** (author, datePublished, dateModified) di 15 artikel panduan.
- **`FAQPage`** di halaman ber-FAQ (homepage, harga). **`BreadcrumbList`** untuk navigasi.
- Pertimbangkan **`SoftwareApplication`/`WebApplication`** untuk halaman SiTool.

### P2 — konten & internal linking
- Perkuat interlink artikel↔tool↔jasa; hub page artikel yang dapat dijelajah.
- Isi celah kata kunci bernilai (perencanaan + transformasi digital pemerintah + website bisnis).
- Blog ringan di `site/` untuk kata kunci bisnis (`BLOG_STRATEGY.md`).

### P2 — higiene teknis
- `lastmod` sitemap akurat (otomatiskan via build bila memungkinkan).
- Verifikasi tak ada broken link/asset (jadikan bagian CI — `TODO.md` CI-01).
- Pastikan OG image ada & benar untuk tiap halaman penting.

## Kata kunci inti (indikatif)
- Produk: "cara membuat renja opd", "contoh lkjip", "kak tor", "cascading kinerja", "sakip",
  "rkpd perubahan", "iku smart" (+ "AI"/"generator"/"template").
- Jasa: "jasa pembuatan website [daerah]", "website instansi pemerintah", "landing page murah",
  "konsultan transformasi digital".

## Prinsip
- **E-E-A-T** = aset terbesar: tonjolkan Andri sebagai praktisi ASN (Person schema) — pertahankan.
- Jangan mengejar volume dengan konten AI dangkal. Akurasi & kegunaan menang.
- Setiap perubahan URL → 301 (jangan pernah hapus tanpa redirect).

Terkait: `CONTENT_STRATEGY.md`, `PERFORMANCE.md` (Core Web Vitals bagian dari SEO), `AUDIT_REPORT.md`.
</content>
