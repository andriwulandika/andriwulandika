/**
 * masterData.js — Data referensi perencanaan daerah Indonesia
 * Sumber: Kepmendagri 050-5889/2021, PermenPANRB 88/2021, 53/2014
 */

export const URUSAN = [
  { kode: '1.01', nama: 'Pendidikan' },
  { kode: '1.02', nama: 'Kesehatan' },
  { kode: '1.03', nama: 'Pekerjaan Umum dan Penataan Ruang' },
  { kode: '1.04', nama: 'Perumahan Rakyat dan Kawasan Permukiman' },
  { kode: '1.05', nama: 'Ketentraman, Ketertiban Umum, dan Perlindungan Masyarakat' },
  { kode: '1.06', nama: 'Sosial' },
  { kode: '2.01', nama: 'Tenaga Kerja' },
  { kode: '2.02', nama: 'Pemberdayaan Perempuan dan Perlindungan Anak' },
  { kode: '2.03', nama: 'Pangan' },
  { kode: '2.04', nama: 'Pertanahan' },
  { kode: '2.05', nama: 'Lingkungan Hidup' },
  { kode: '2.06', nama: 'Administrasi Kependudukan dan Pencatatan Sipil' },
  { kode: '2.07', nama: 'Pemberdayaan Masyarakat dan Desa' },
  { kode: '2.08', nama: 'Pengendalian Penduduk dan Keluarga Berencana' },
  { kode: '2.09', nama: 'Perhubungan' },
  { kode: '2.10', nama: 'Komunikasi dan Informatika' },
  { kode: '2.11', nama: 'Koperasi, Usaha Kecil, dan Menengah' },
  { kode: '2.12', nama: 'Penanaman Modal' },
  { kode: '2.13', nama: 'Kepemudaan dan Olahraga' },
  { kode: '2.14', nama: 'Statistik' },
  { kode: '2.15', nama: 'Persandian' },
  { kode: '2.16', nama: 'Kebudayaan' },
  { kode: '2.17', nama: 'Perpustakaan' },
  { kode: '2.18', nama: 'Kearsipan' },
  { kode: '3.01', nama: 'Kelautan dan Perikanan' },
  { kode: '3.02', nama: 'Pariwisata' },
  { kode: '3.03', nama: 'Pertanian' },
  { kode: '3.04', nama: 'Kehutanan' },
  { kode: '3.05', nama: 'Energi dan Sumber Daya Mineral' },
  { kode: '3.06', nama: 'Perdagangan' },
  { kode: '3.07', nama: 'Perindustrian' },
  { kode: '3.08', nama: 'Transmigrasi' },
  { kode: '4.01', nama: 'Administrasi Pemerintahan (Penunjang)' },
  { kode: '4.02', nama: 'Pengawasan (Penunjang)' },
  { kode: '4.03', nama: 'Perencanaan (Penunjang)' },
  { kode: '4.04', nama: 'Keuangan (Penunjang)' },
  { kode: '4.05', nama: 'Kepegawaian (Penunjang)' },
  { kode: '4.06', nama: 'Pendidikan dan Pelatihan (Penunjang)' },
  { kode: '4.07', nama: 'Penelitian dan Pengembangan (Penunjang)' },
  { kode: '4.08', nama: 'Unsur Kewilayahan' },
  { kode: '4.09', nama: 'Pemerintahan Umum' },
];

export const SATUAN_IKU = [
  'Persen (%)', 'Nilai', 'Skor', 'Indeks', 'Orang', 'Unit', 'Dokumen',
  'Kegiatan', 'Paket', 'Kilometer (km)', 'Meter (m)', 'Hektar (Ha)',
  'Ton', 'Kilogram (kg)', 'Rupiah (Rp)', 'Buah', 'Desa/Kelurahan',
  'Kecamatan', 'Sekolah', 'Puskesmas', 'Lainnya'
];

export const PREDIKAT_SAKIP = [
  { skor: [90, 100], predikat: 'AA', kategori: 'Sangat Memuaskan' },
  { skor: [80, 90],  predikat: 'A',  kategori: 'Memuaskan' },
  { skor: [70, 80],  predikat: 'BB', kategori: 'Sangat Baik' },
  { skor: [60, 70],  predikat: 'B',  kategori: 'Baik' },
  { skor: [50, 60],  predikat: 'CC', kategori: 'Cukup' },
  { skor: [30, 50],  predikat: 'C',  kategori: 'Kurang' },
  { skor: [0,  30],  predikat: 'D',  kategori: 'Sangat Kurang' },
];

/**
 * Hitung capaian kinerja (%) berdasarkan realisasi dan target.
 * @param {number} realisasi
 * @param {number} target
 * @param {'maximize'|'minimize'} polaritas - maximize: lebih tinggi lebih baik
 * @returns {number} persentase capaian (dibatasi 0-150%)
 */
export function hitungCapaian(realisasi, target, polaritas = 'maximize') {
  if (!target || target === 0) return 0;
  let capaian;
  if (polaritas === 'maximize') {
    capaian = (realisasi / target) * 100;
  } else {
    capaian = (target / realisasi) * 100;
  }
  return Math.min(Math.max(capaian, 0), 150);
}

/**
 * Tentukan kategori capaian per PermenPANRB 88/2021 Pasal 12.
 */
export function kategoriCapaian(persen) {
  if (persen >= 100) return { label: 'Sangat Berhasil', warna: '#16a34a' };
  if (persen >= 85)  return { label: 'Berhasil', warna: '#2563eb' };
  if (persen >= 70)  return { label: 'Cukup Berhasil', warna: '#d97706' };
  return { label: 'Tidak Berhasil', warna: '#dc2626' };
}

export const REGULASI = {
  lkjip: ['PermenPANRB 53/2014', 'PermenPANRB 88/2021'],
  pk:    ['PermenPANRB 53/2014'],
  renja: ['Permendagri 81/2022', 'PP 17/2017'],
  kak:   ['Perpres 16/2018', 'PermenPANRB 53/2014'],
};
