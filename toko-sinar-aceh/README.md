# Toko Sinar Aceh — Website

Landing page katalog + generator pesanan WhatsApp untuk Toko Sinar Aceh,
toko sembako/kelontong di Kutacane, Aceh Tenggara. **Bukan** toko online —
tidak ada keranjang/checkout. Semua tombol produk membuka WhatsApp dengan
pesan yang sudah terisi otomatis.

Situs statis: HTML/CSS/JS vanilla, tanpa framework atau proses build.

## Struktur folder

```
toko-sinar-aceh/
├── index.html              # Seluruh halaman (single-page, per-section)
├── data/
│   └── products.js         # SEMUA data yang bisa Anda ubah sendiri
├── assets/
│   ├── css/style.css       # Desain (warna, tipografi, layout)
│   ├── js/main.js          # Render dinamis + link WhatsApp
│   └── img/                # Favicon, ikon, gambar OG
├── robots.txt
└── sitemap.xml
```

## Cara update produk, harga, jam buka, dll (TANPA edit HTML)

Buka **`data/products.js`** — semua yang perlu diubah ada di situ dengan
komentar `TODO`. Beberapa hal WAJIB diisi sebelum situs live:

1. **Nomor WhatsApp** — `store.whatsappNumber`, format `62xxxxxxxxxx`
   (tanpa `+`, tanpa `0` di depan).
2. **Jam operasional asli** — `store.hours`, per hari. Set `closed: true`
   untuk hari tutup.
3. **Link Google Maps** —
   - `store.mapsLink`: link "Bagikan" biasa dari Google Maps (untuk tombol
     "Buka di Google Maps"). Saat ini memakai link pencarian otomatis dari
     alamat teks toko sebagai placeholder yang sudah berfungsi.
   - `store.mapsEmbedSrc`: kode embed peta. Cara ambil: buka lokasi toko di
     Google Maps → **Bagikan** → **Sertakan peta** → salin kode `<iframe>`
     yang muncul → ambil isi atribut `src="...”` saja → tempel sebagai
     string di `mapsEmbedSrc`. Selama kosong, halaman menampilkan kartu
     placeholder dengan tombol "Buka di Google Maps" saja (tanpa iframe).
4. **Kategori produk** — array `categories`. Tambah/hapus/ubah item bebas;
   setiap item otomatis jadi kartu baru di section "Kategori Produk
   Unggulan" lengkap dengan tombol "Tanya Harga" ke WhatsApp.
   - `icon`: pilih salah satu id ikon bawaan (`beras`, `minyak`, `gula`,
     `tepung`, `bumbu`, `minuman`, `rokok`, `harian`) — lihat daftar
     `<symbol id="icon-...">` di bagian bawah `index.html`.
   - `image`: isi dengan path foto asli (mis. `assets/img/beras.jpg`) untuk
     mengganti ikon dengan foto produk sungguhan. Kosongkan untuk tetap
     pakai ikon.
5. **Foto toko** — ganti ilustrasi placeholder di hero. Cara termudah:
   tambahkan file foto ke `assets/img/`, lalu di `index.html` cari komentar
   `<!-- TODO: ganti dengan foto asli tampak depan toko -->` dan ganti blok
   `<svg class="store-illustration">...</svg>` dengan
   `<img src="assets/img/nama-foto-anda.jpg" alt="Tampak depan Toko Sinar Aceh" width="480" height="360" />`.

Setelah edit `data/products.js`, simpan lalu **refresh browser** — tidak
ada proses build/compile yang perlu dijalankan.

## Preview lokal

Situs ini statis, jadi bisa dibuka langsung dengan server file sederhana,
misalnya:

```bash
cd toko-sinar-aceh
python3 -m http.server 8080
# buka http://localhost:8080
```

(Membuka `index.html` langsung lewat `file://` juga bisa, tapi beberapa
browser membatasi fitur tertentu — server lokal lebih aman untuk testing.)

## Domain

Meta tag (`canonical`, `og:url`, dst.), `robots.txt`, dan `sitemap.xml`
saat ini memakai domain **placeholder** `tokosinaraceh.id`. Ganti ke domain
asli begitu sudah ditentukan — cari-ganti string tsb di:

- `index.html` (bagian `<head>`)
- `robots.txt`
- `sitemap.xml`

## Deploy

Folder ini berada di dalam repo `andriwulandika/andriwulandika` yang sudah
memakai **Cloudflare Pages** untuk situs-situs lain (`site/`, `tools/`).
Pola yang sama paling mudah dipakai di sini:

1. Di dashboard Cloudflare Pages, buat **project baru** yang terhubung ke
   repo ini.
2. Set **Root directory** (build output) ke `toko-sinar-aceh`.
3. Build command: kosongkan (situs statis, tidak perlu build step).
4. Setelah deploy pertama sukses, tambahkan **custom domain** di tab
   *Custom domains* project tsb — Cloudflare akan memandu menambahkan
   record DNS yang diperlukan otomatis (karena domain sudah dikelola di
   Cloudflare DNS).

**Alternatif (GitHub Pages + Cloudflare DNS)** — jika folder ini nanti
dipindah ke repo GitHub tersendiri:

1. Push isi folder `toko-sinar-aceh/` ke root repo baru tsb.
2. Di repo tsb: **Settings → Pages** → source: branch `main`, folder `/`.
3. Tambahkan domain custom di kolom **Custom domain**, lalu di Cloudflare
   DNS tambahkan:
   - `CNAME` record (untuk subdomain) atau `A` record ke IP GitHub Pages
     (untuk apex domain) — GitHub Pages menampilkan nilai persis yang
     dibutuhkan di halaman Settings → Pages setelah domain didaftarkan.
   - Set proxy status Cloudflare ("awan oranye") sesuai preferensi
     (proxied untuk dapat CDN + SSL Cloudflare, DNS-only jika ingin
     langsung ke GitHub).

## Yang masih perlu diisi sebelum live (checklist)

- [ ] Nomor WhatsApp asli (`data/products.js` → `whatsappNumber`)
- [ ] Jam operasional asli (`data/products.js` → `hours`)
- [ ] Link Google Maps asli (`mapsLink` + `mapsEmbedSrc`)
- [ ] Foto asli toko (hero)
- [ ] Foto produk per kategori (opsional — ikon placeholder tetap rapi
      tanpa foto)
- [ ] Domain asli (ganti dari placeholder `tokosinaraceh.id`)
