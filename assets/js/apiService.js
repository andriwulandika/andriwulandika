/**
 * apiService.js — Shared AI service via Cloudflare Pages Functions
 * Backend (_worker.js) menyimpan API key Gemini & memvalidasi kode akses berbayar.
 * Karena backend kini satu domain dengan website, semua request memakai path relatif.
 * Tanpa kode aktif: hasil dipotong (demo/preview).
 */

// Kosong = same-origin: /generate, /verify, /admin/* dilayani _worker.js di domain ini.
export const WORKER_URL = '';

export function getAccessCode() {
  return localStorage.getItem('access_code') || '';
}

export function saveAccessCode(code) {
  if (code && code.trim()) localStorage.setItem('access_code', code.trim().toUpperCase());
  else localStorage.removeItem('access_code');
}

export function getAccessInfo() {
  try { return JSON.parse(localStorage.getItem('access_info')) || null; } catch { return null; }
}

export function saveAccessInfo(info) {
  if (info) localStorage.setItem('access_info', JSON.stringify(info));
  else localStorage.removeItem('access_info');
}

export function clearAccess() {
  localStorage.removeItem('access_code');
  localStorage.removeItem('access_info');
}

/**
 * Status akses dari cache lokal (tanpa request ke server).
 * Model pay-as-you-go: akses aktif jika masih punya kredit (credits > 0) atau
 * langganan lama yang belum kedaluwarsa (unlimited). `loggedIn` true jika kode
 * pernah diverifikasi, walau saldo 0 (untuk menampilkan ajakan top-up).
 */
export function getAccessStatus() {
  const info = getAccessInfo();
  if (!info) return { active: false, loggedIn: false, credits: 0 };
  const unlimited = !!info.unlimited && !!info.expiresAt && new Date(info.expiresAt) > new Date();
  const credits = Number.isInteger(info.credits) ? info.credits : 0;
  return {
    active: unlimited || credits > 0,
    loggedIn: true,
    credits,
    unlimited,
    expiresAt: info.expiresAt || null,
    name: info.name || null,
    engine: info.engine || 'claude',
  };
}

/** Perbarui sisa kredit di cache lokal (dipanggil setelah tiap generate). */
export function updateCredits(credits) {
  const info = getAccessInfo();
  if (info && Number.isInteger(credits)) {
    info.credits = credits;
    saveAccessInfo(info);
  }
}

/** Verifikasi kode akses ke server, simpan hasilnya jika valid. */
export async function verifyAccessCode(code) {
  const res = await fetch(`${WORKER_URL}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  const data = await res.json();
  if (data.valid) {
    saveAccessCode(code);
    saveAccessInfo({
      credits: data.credits,
      unlimited: data.unlimited,
      expiresAt: data.expiresAt,
      name: data.name,
      engine: data.engine || 'claude',
    });
  }
  return data;
}

/**
 * Panggil AI lewat Worker. Mengembalikan { text, isDemo }.
 * isDemo = true berarti hasil dipotong (preview) karena tidak ada kode akses aktif.
 */
export async function callAI(prompt, { temperature = 0.7, maxTokens = 4096 } = {}) {
  const code = getAccessCode();
  let res;
  try {
    res = await fetch(`${WORKER_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, temperature, maxTokens, code }),
    });
  } catch {
    throw new Error('NETWORK_ERROR');
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `API_ERROR_${res.status}`);
  }
  const data = await res.json();
  // Sinkronkan sisa kredit dari server agar saldo lokal selalu terbaru.
  if (data && typeof data.credits === 'number') updateCredits(data.credits);
  return data;
}

export function formatApiError(err) {
  const msg = err.message || '';
  if (msg === 'NETWORK_ERROR') return 'Gagal terhubung ke server AI. Periksa koneksi internet Anda.';
  if (msg === 'API_QUOTA' || msg.startsWith('API_ERROR')) return 'Server AI sedang sibuk. Coba lagi dalam beberapa saat.';
  return 'Terjadi kesalahan: ' + msg;
}
