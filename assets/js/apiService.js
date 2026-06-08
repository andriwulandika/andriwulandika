/**
 * apiService.js — Shared Gemini API service (BYOK mode)
 * API key disimpan di localStorage, TIDAK pernah di source code.
 */

export function getApiKey() {
  return localStorage.getItem('gemini_api_key') || '';
}

export function saveApiKey(key) {
  if (key && key.trim()) localStorage.setItem('gemini_api_key', key.trim());
  else localStorage.removeItem('gemini_api_key');
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
 * Panggil Gemini API dengan fallback otomatis ke gemini-1.5-flash jika 429.
 */
export async function callGemini(prompt, { temperature = 0.7, maxTokens = 2048 } = {}) {
  const key = getApiKey();
  if (!key) throw new Error('NO_KEY');
  for (const model of ['gemini-2.0-flash', 'gemini-1.5-flash']) {
    let res;
    try {
      res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature, maxOutputTokens: maxTokens }
          })
        }
      );
    } catch { throw new Error('NETWORK_ERROR'); }
    if (res.ok) {
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('API_EMPTY_RESPONSE');
      return text;
    }
    if (res.status === 401 || res.status === 403) throw new Error('API_KEY_INVALID');
    if (res.status === 429) continue;
    throw new Error('API_ERROR: ' + res.status);
  }
  throw new Error('API_QUOTA');
}

export function formatApiError(err) {
  const msg = err.message || '';
  if (msg === 'NO_KEY') return 'Silakan masukkan API Key Gemini Anda terlebih dahulu.';
  if (msg === 'API_KEY_INVALID') return 'API Key tidak valid. Periksa di <a href="https://aistudio.google.com/app/apikey" target="_blank">Google AI Studio</a>.';
  if (msg === 'API_QUOTA') return 'Kuota harian habis (sudah dicoba model cadangan). Tunggu reset pukul 07.00 WIB atau buat API key baru.';
  if (msg === 'NETWORK_ERROR') return 'Gagal terhubung ke server AI. Periksa koneksi internet.';
  return 'Terjadi kesalahan: ' + msg;
}
