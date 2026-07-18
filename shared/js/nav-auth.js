/**
 * nav-auth.js — Sinkronkan tombol "Masuk" dengan status akses.
 * Saat akses Berbayar aktif (cache lokal), setiap tautan navigasi "Masuk"
 * yang menuju aktifkan-pro.html otomatis berubah menjadi "Dashboard"
 * yang menuju dashboard.html — konsisten di seluruh halaman.
 */
import { getAccessStatus } from './apiService.js';

try {
  if (getAccessStatus().active) {
    document.querySelectorAll('a[href$="aktifkan-pro.html"]').forEach((a) => {
      if (a.textContent.trim().toLowerCase() === 'masuk') {
        a.textContent = 'Dashboard';
        a.setAttribute('href', 'dashboard.html');
      }
    });
  }
} catch (_e) { /* abaikan: localStorage tidak tersedia */ }
