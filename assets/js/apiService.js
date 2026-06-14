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

/** Status akses dari cache lokal (tanpa request ke server). */
export function getAccessStatus() {
  const info = getAccessInfo();
  if (!info || !info.expiresAt) return { active: false };
  if (new Date(info.expiresAt) < new Date()) return { active: false, expired: true };
  return { active: true, tier: info.tier, engine: info.engine || 'gemini', expiresAt: info.expiresAt, name: info.name || null };
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
    saveAccessInfo({ tier: data.tier, engine: data.engine || 'gemini', expiresAt: data.expiresAt, name: data.name });
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
  return res.json();
}

export function formatApiError(err) {
  const msg = err.message || '';
  if (msg === 'NETWORK_ERROR') return 'Gagal terhubung ke server AI. Periksa koneksi internet Anda.';
  if (msg === 'API_QUOTA' || msg.startsWith('API_ERROR')) return 'Server AI sedang sibuk. Coba lagi dalam beberapa saat.';
  return 'Terjadi kesalahan: ' + msg;
}
