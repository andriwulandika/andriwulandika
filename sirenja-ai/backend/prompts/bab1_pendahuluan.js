'use strict';

function promptLatarBelakang(data) {
  const namaOPD = data.namaOPD || 'OPD';
  const kabupaten = data.kabupaten || 'Aceh Tenggara';
  const tahunRenja = data.tahunRenja || new Date().getFullYear() + 1;
  const tugasPokok = data.tugasPokok || 'melaksanakan urusan pemerintahan daerah';
  const visiMisi = data.visiMisi || 'mendukung pembangunan daerah yang berkelanjutan';

  return `Tuliskan narasi Latar Belakang untuk Bab I Pendahuluan dalam dokumen Rencana Kerja (Renja) Tahun ${tahunRenja} milik ${namaOPD} Kabupaten ${kabupaten}, Provinsi Aceh.

Narasi harus mencakup 4-5 paragraf yang membahas:
1. Konteks perencanaan pembangunan daerah dan kedudukan Renja OPD dalam sistem perencanaan nasional (mengacu pada UU 25/2004 tentang SPPN, UU 23/2014 tentang Pemerintahan Daerah, PP 8/2008, Permendagri 86/2017)
2. Pentingnya Renja sebagai dokumen operasional tahunan yang menjabarkan Renstra OPD dan merupakan pedoman dalam penyusunan RKA-OPD
3. Keterkaitan Renja ${namaOPD} dengan RKPD Kabupaten ${kabupaten} dan Renstra ${namaOPD} serta RPJMD Kabupaten
4. Tugas pokok dan fungsi ${namaOPD}: "${tugasPokok}" dalam konteks pembangunan daerah
5. Visi dan misi yang menjadi landasan: "${visiMisi}"

Gunakan bahasa Indonesia formal birokrasi yang baku dan mengalir dalam bentuk paragraf naratif. Tidak menggunakan bullet point atau daftar bernomor.`;
}

function promptDasarHukum(data) {
  const namaOPD = data.namaOPD || 'OPD';
  const kabupaten = data.kabupaten || 'Aceh Tenggara';
  const tahunRenja = data.tahunRenja || new Date().getFullYear() + 1;

  return `Tuliskan narasi Dasar Hukum untuk Bab I Pendahuluan dalam dokumen Rencana Kerja (Renja) Tahun ${tahunRenja} milik ${namaOPD} Kabupaten ${kabupaten}, Provinsi Aceh.

Narasi harus terdiri dari 1-2 paragraf yang menjelaskan landasan hukum penyusunan Renja, kemudian secara naratif (bukan daftar) menyebutkan dan menjelaskan relevansi dari peraturan-peraturan berikut:

1. Undang-Undang Nomor 23 Tahun 2014 tentang Pemerintahan Daerah sebagaimana telah beberapa kali diubah, terakhir dengan Undang-Undang Nomor 9 Tahun 2015
2. Undang-Undang Nomor 25 Tahun 2004 tentang Sistem Perencanaan Pembangunan Nasional
3. Peraturan Pemerintah Nomor 8 Tahun 2008 tentang Tahapan, Tata Cara Penyusunan, Pengendalian dan Evaluasi Pelaksanaan Rencana Pembangunan Daerah
4. Peraturan Pemerintah Nomor 12 Tahun 2019 tentang Pengelolaan Keuangan Daerah
5. Peraturan Menteri Dalam Negeri Nomor 86 Tahun 2017 tentang Tata Cara Perencanaan, Pengendalian dan Evaluasi Pembangunan Daerah
6. Peraturan Menteri Dalam Negeri Nomor 70 Tahun 2019 tentang Sistem Informasi Pemerintahan Daerah
7. Qanun/Perda Kabupaten Aceh Tenggara tentang RPJMD

Tuliskan secara naratif paragraf yang mengalir, bukan hanya daftar peraturan.`;
}

function promptMaksudTujuan(data) {
  const namaOPD = data.namaOPD || 'OPD';
  const kabupaten = data.kabupaten || 'Aceh Tenggara';
  const tahunRenja = data.tahunRenja || new Date().getFullYear() + 1;

  return `Tuliskan narasi Maksud dan Tujuan untuk Bab I Pendahuluan dalam dokumen Rencana Kerja (Renja) Tahun ${tahunRenja} milik ${namaOPD} Kabupaten ${kabupaten}, Provinsi Aceh.

Narasi harus terdiri dari 2-3 paragraf yang menjelaskan:

Paragraf pertama - Maksud penyusunan Renja:
- Maksud penyusunan Renja ${namaOPD} sebagai dokumen perencanaan tahunan yang menjadi acuan pelaksanaan program dan kegiatan
- Fungsi Renja sebagai pedoman penyusunan RKA-OPD
- Keterkaitan dengan sistem akuntabilitas kinerja instansi pemerintah (SAKIP)

Paragraf kedua dan ketiga - Tujuan penyusunan Renja:
- Mewujudkan sinkronisasi dan sinergi antara perencanaan jangka menengah (Renstra) dengan pelaksanaan tahunan
- Memberikan arah yang jelas bagi seluruh aparatur ${namaOPD} dalam melaksanakan program dan kegiatan
- Menjamin konsistensi antara perencanaan, penganggaran, pelaksanaan, dan pengawasan pembangunan
- Meningkatkan transparansi dan akuntabilitas pengelolaan anggaran ${namaOPD}

Gunakan bahasa Indonesia formal birokrasi yang baku, mengalir, dan profesional.`;
}

module.exports = { promptLatarBelakang, promptDasarHukum, promptMaksudTujuan };
