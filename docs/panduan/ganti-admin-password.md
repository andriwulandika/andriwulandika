# Panduan Mengganti ADMIN_PASSWORD

Panduan langkah-demi-langkah untuk mengganti password panel admin
(`ADMIN_PASSWORD`) melalui dashboard Cloudflare Pages. Password ini yang Anda
pakai di halaman **admin-kode** (`/admin-kode.html`) untuk membuat kode akses,
menambah kredit (top-up), melihat daftar kode, dan mencabut kode.

> **Penting:** `ADMIN_PASSWORD` adalah *secret* — jangan pernah menuliskannya di
> kode, di HTML, di pesan WhatsApp, atau di mana pun selain kolom Secret di
> dashboard Cloudflare. Panduan ini **tidak** mengubah password apa pun; Anda
> yang menggantinya sendiri lewat dashboard.

---

## Kapan sebaiknya diganti?

- Secara berkala (mis. beberapa bulan sekali) sebagai kebiasaan keamanan.
- Segera, jika Anda menduga password pernah bocor atau dipakai orang lain.
- Setelah ada orang yang sebelumnya tahu password dan tidak lagi perlu akses.

---

## Bagian 1 — Menyiapkan password baru yang kuat

Password admin yang baik itu **panjang dan acak**. Semakin panjang, semakin aman.

Saran praktis:

- Gunakan minimal **16 karakter**, campur huruf besar, huruf kecil, angka, dan
  simbol.
- Jangan memakai kata yang mudah ditebak (nama, tanggal lahir, "admin123", nama
  instansi, dsb).
- Jangan memakai ulang password yang sama dengan email atau akun lain.

Cara mudah membuat password acak:

- **Pakai password manager** (mis. Bitwarden, 1Password, atau fitur bawaan
  Google Chrome/Safari) — klik "Generate password", pilih panjang 20+ karakter,
  lalu simpan di sana.
- **Atau buat sendiri secara acak**, contoh pola: gabungkan 4-5 kata acak yang
  tidak berhubungan ditambah angka dan simbol, misalnya
  `Kopi-Gunung-72-Payung!Merah`. Pola seperti ini panjang, mudah Anda salin,
  tetapi tetap sulit ditebak.

Setelah dibuat, **simpan password baru di tempat aman** (password manager atau
catatan pribadi yang terkunci) sebelum melanjutkan. Anda akan membutuhkannya
untuk login setelah diganti.

---

## Bagian 2 — Mengganti di dashboard Cloudflare Pages

Ikuti langkah berikut satu per satu:

1. Buka **https://dash.cloudflare.com** dan login dengan akun Cloudflare Anda.
2. Di menu kiri, klik **Workers & Pages** (atau **Compute (Workers)** →
   **Workers & Pages**, tergantung tampilan dashboard Anda).
3. Pada daftar proyek, klik proyek Pages untuk AI Tools — namanya
   **`andriwulandika-tools`** (yang melayani `ai.andriwulandika.uk`).
   Endpoint admin (`/admin/*`) berjalan di proyek inilah, jadi pastikan Anda
   memilih proyek yang benar.
4. Klik tab **Settings**.
5. Cari bagian **Variables and Secrets** (di sebagian tampilan namanya
   **Environment variables**). Klik untuk membukanya.
6. Temukan baris variabel bernama **`ADMIN_PASSWORD`**. Nilainya tampil
   tersembunyi (bertanda titik-titik / "Encrypted") karena bertipe **Secret**.
7. Di ujung baris `ADMIN_PASSWORD`, klik tombol **Edit** (ikon pensil).
   - Jika tampilan Anda tidak mengizinkan mengedit nilai Secret secara langsung,
     hapus variabel `ADMIN_PASSWORD` yang lama lalu buat ulang: klik
     **Add variable**, isi **Name** dengan persis `ADMIN_PASSWORD`, tempel
     password baru pada **Value**, dan **pilih tipe "Secret" / "Encrypt"**.
8. Tempel **password baru** yang sudah Anda siapkan di Bagian 1. Periksa agar
   tidak ada spasi ikut tersalin di awal/akhir.
9. Pastikan variabel ini berada di lingkungan **Production**. Jika Anda juga
   memakai lingkungan **Preview** untuk pengujian admin, ganti di sana juga
   (opsional).
10. Klik **Save**.

> **Catatan:** Perubahan Secret biasanya baru benar-benar aktif setelah ada
> **deployment baru**. Cukup tunggu deploy otomatis berikutnya, atau picu
> **Retry deployment / Redeploy** dari tab **Deployments** pada proyek yang sama
> agar password baru langsung dipakai. Sampai deploy baru berjalan, password
> lama mungkin masih berlaku sesaat.

---

## Bagian 3 — Memastikan login admin masih bekerja

Setelah menyimpan dan (bila perlu) melakukan redeploy:

1. Buka halaman admin: **https://ai.andriwulandika.uk/admin-kode.html**.
2. Masukkan **password baru**, lalu coba lakukan salah satu tindakan admin,
   misalnya **melihat daftar kode** atau **membuat 1 kode uji** dengan jumlah
   kredit kecil.
3. Jika tindakan berhasil (daftar kode muncul atau kode baru tergenerate),
   berarti password baru **sudah aktif**. Selamat, penggantian berhasil.
4. Sebagai pemeriksaan tambahan, coba masukkan **password lama**. Seharusnya
   sekarang **ditolak** (muncul "Unauthorized" / gagal). Jika password lama
   masih diterima, kemungkinan deploy baru belum berjalan — picu **Redeploy**
   sekali lagi lalu ulangi pengujian.

Jika kode uji tadi tidak diperlukan, Anda bisa **mencabut (revoke)** kode uji
tersebut dari halaman admin agar daftar tetap rapi.

---

## Kalau lupa atau salah

- **Salah tempel / login gagal:** ulangi Bagian 2, pastikan password diketik/
  ditempel dengan benar (perhatikan huruf besar-kecil dan tidak ada spasi
  tambahan), simpan, dan redeploy.
- **Lupa password baru:** karena Secret tidak bisa dilihat kembali setelah
  disimpan, buat saja password baru lagi mengikuti Bagian 1–2. Tidak masalah
  menggantinya berkali-kali.

---

*Dokumen ini hanya panduan operasional. Tidak ada password atau secret yang
disimpan di dalam file ini maupun di repositori.*
