/**
 * Data Toko Sinar Aceh
 * ====================
 * Edit file ini untuk mengubah info toko, jam buka, dan daftar kategori
 * produk — TIDAK perlu menyentuh index.html atau file lain.
 *
 * PENTING — bagian yang WAJIB diisi sebelum situs live:
 *   1. whatsappNumber  -> nomor WA toko (format 62xxxxxxxxxx, tanpa "+" / "0" di depan)
 *   2. hours            -> jam buka-tutup asli tiap hari
 *   3. mapsEmbedSrc      -> src iframe Google Maps (lihat README.md cara ambilnya)
 *   4. mapsLink          -> link "Buka di Google Maps" asli
 *   5. images per kategori -> ganti "assets/img/..." dengan foto produk asli
 *      (foto asli TIDAK WAJIB ada dari awal; jika kosong, ikon placeholder
 *      bawaan akan tetap tampil rapi)
 */

window.TOKO_DATA = {
  store: {
    name: "Toko Sinar Aceh",
    tagline: "Teman Belanja Harian Warga Kutacane",
    description:
      "Toko sembako dan kelontong terpercaya di pusat Kutacane. Menyediakan kebutuhan dapur dan harian dengan harga bersaing, stok lengkap, dan pelayanan ramah untuk warga Aceh Tenggara.",

    // TODO: ganti dengan nomor WA toko asli. Format: kode negara tanpa "+", tanpa angka 0 di depan.
    // Contoh nomor 0812-3456-7890 -> "6281234567890"
    whatsappNumber: "6280000000000",

    address: {
      line1: "Jln Ahmad Yani No. 2",
      line2: "Di samping BRI Unit Nusantara",
      line3: "Kute Kotacane Barisan, Kec. Babussalam",
      line4: "Kabupaten Aceh Tenggara, Aceh 24651",
      note: "Dekat Sabata Elektronik / Cafe Truenoch",
      full: "Jln Ahmad Yani No. 2, Kute Kotacane Barisan, Kec. Babussalam, Kabupaten Aceh Tenggara, Aceh 24651",
    },

    // TODO: setelah dapat link Google Maps toko, buka link tsb di browser,
    // klik "Bagikan" -> "Sertakan peta" -> salin kode iframe -> ambil isi atribut src="..."
    // lalu tempel di bawah ini. Sebelum diisi, embed peta akan tampil sebagai
    // kartu placeholder dengan tombol "Buka di Google Maps" saja.
    mapsEmbedSrc: "",

    // TODO: ganti dengan link Google Maps asli toko (link "Bagikan" biasa, bukan embed)
    mapsLink:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(
        "Toko Sinar Aceh, Jln Ahmad Yani No. 2, Kute Kotacane Barisan, Kec. Babussalam, Kabupaten Aceh Tenggara, Aceh 24651"
      ),

    // TODO: isi jam operasional asli. Format 24 jam "HH:MM". Set closed: true untuk hari tutup.
    hours: {
      1: { label: "Senin", open: "08:00", close: "21:00", closed: false },
      2: { label: "Selasa", open: "08:00", close: "21:00", closed: false },
      3: { label: "Rabu", open: "08:00", close: "21:00", closed: false },
      4: { label: "Kamis", open: "08:00", close: "21:00", closed: false },
      5: { label: "Jumat", open: "08:00", close: "21:00", closed: false },
      6: { label: "Sabtu", open: "08:00", close: "21:00", closed: false },
      0: { label: "Minggu", open: "08:00", close: "21:00", closed: false },
    },
  },

  // Setiap kategori otomatis dirender jadi kartu di section "Kategori Produk Unggulan".
  // Tombol "Tanya Harga" membuka WhatsApp dengan pesan yang sudah terisi nama kategori.
  // "icon" merujuk ke ikon SVG bawaan (lihat assets/js/main.js -> ICONS) — aman diganti
  // dengan foto asli lewat "image" (path ke file di assets/img/).
  categories: [
    {
      id: "beras",
      name: "Beras",
      icon: "beras",
      image: "",
      desc: "Berbagai merek & ukuran karung",
    },
    {
      id: "minyak-goreng",
      name: "Minyak Goreng",
      icon: "minyak",
      image: "",
      desc: "Kemasan botol, refill & jerigen",
    },
    {
      id: "gula",
      name: "Gula",
      icon: "gula",
      image: "",
      desc: "Gula pasir & gula merah",
    },
    {
      id: "tepung",
      name: "Tepung",
      icon: "tepung",
      image: "",
      desc: "Tepung terigu, beras & tapioka",
    },
    {
      id: "bumbu-dapur",
      name: "Bumbu Dapur",
      icon: "bumbu",
      image: "",
      desc: "Bumbu masak & rempah harian",
    },
    {
      id: "minuman",
      name: "Minuman",
      icon: "minuman",
      image: "",
      desc: "Air mineral, kopi, teh & sirup",
    },
    {
      id: "rokok",
      name: "Rokok",
      icon: "rokok",
      image: "",
      desc: "Berbagai merek rokok eceran & bungkus",
    },
    {
      id: "kebutuhan-harian",
      name: "Kebutuhan Harian Lainnya",
      icon: "harian",
      image: "",
      desc: "Sabun, deterjen & perlengkapan rumah",
    },
  ],

  whyUs: [
    {
      icon: "harga",
      title: "Harga Bersaing",
      desc: "Harga sembako harian yang wajar dan bersahabat untuk warga sekitar.",
    },
    {
      icon: "lengkap",
      title: "Stok Lengkap",
      desc: "Kebutuhan dapur sampai kebutuhan harian tersedia dalam satu toko.",
    },
    {
      icon: "lokasi",
      title: "Lokasi Strategis",
      desc: "Tepat di Jln Ahmad Yani, di samping BRI Unit Nusantara — mudah ditemukan.",
    },
    {
      icon: "ramah",
      title: "Ramah & Bisa Antar Dekat",
      desc: "Pelayanan ramah, siap bantu antar untuk area sekitar toko.",
    },
  ],
};
