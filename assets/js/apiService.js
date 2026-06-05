/**
 * apiService.js — Shared Gemini API service (BYOK mode)
 * API key disimpan di localStorage, TIDAK pernah di source code.
 */

const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export function getApiKey() {
  return localStorage.getItem('gemini_api_key') || '';
}

export function saveApiKey(key) {
  if (key && key.trim()) {
    localStorage.setItem('gemini_api_key', key.trim());
  } else {
    localStorage.removeItem('gemini_api_key');
  }
}

export function checkProAccess() {
  try {
    const raw = localStorage.getItem('pro_access');
    if (!raw) return { active: false, tier: null };
    const data = JSON.parse(raw);
    if (!data.until) return { active: false, tier: null };
    const until = new Date(data.until);
    if (until < new Date()) return { active: false, tier: null, expired: true };
    return { active: true, tier: data.tier, until };
  } catch { return { active: false, tier: null }; }
}

/**
 * Panggil Gemini API.
 * @param {string} prompt - Full prompt text
 * @param {object} opts - { temperature, maxTokens }
 * @returns {Promise<string>} - Teks respons AI
 */
export async function callGemini(prompt, { temperature = 0.7, maxTokens = 2048 } = {}) {
  const key = getApiKey();
  if (!key) throw new Error('NO_KEY');

  const res = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature, maxOutputTokens: maxTokens }
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = err?.error?.message || `HTTP ${res.status}`;
    if (res.status === 400) throw new Error('API_BAD_REQUEST: ' + msg);
    if (res.status === 401 || res.status === 403) throw new Error('API_KEY_INVALID');
    if (res.status === 429) throw new Error('API_QUOTA');
    throw new Error('API_ERROR: ' + msg);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('API_EMPTY_RESPONSE');
  return text;
}

/**
 * Tampilkan pesan error API yang ramah pengguna.
 * @param {Error} err
 * @returns {string} Pesan HTML
 */
export function formatApiError(err) {
  const msg = err.message || '';
  if (msg === 'NO_KEY') return 'Silakan masukkan API Key Gemini Anda terlebih dahulu.';
  if (msg === 'API_KEY_INVALID') return 'API Key tidak valid atau tidak punya akses. Periksa kembali di <a href="https://aistudio.google.com/app/apikey" target="_blank">Google AI Studio</a>.';
  if (msg === 'API_QUOTA') return 'Kuota API habis. Coba lagi nanti atau gunakan API key lain.';
  if (msg === 'Failed to fetch' || msg.includes('NetworkError')) return 'Gagal terhubung ke server AI. Periksa koneksi internet Anda.';
  return 'Terjadi kesalahan: ' + msg;
}
