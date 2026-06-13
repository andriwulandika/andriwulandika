/**
 * _lib.js — Logika bersama untuk Cloudflare Pages Functions.
 * Bukan endpoint (tidak meng-export onRequest*); hanya diimpor oleh file route.
 *
 * Backend = proxy ke Google Gemini API + sistem kode akses berbayar.
 * Karena Functions satu domain dengan website, frontend memanggil path relatif
 * (/generate, /verify, /admin/*) sehingga tidak perlu CORS.
 *
 * Setup di dashboard Cloudflare (project Pages "andriwulandika" -> Settings):
 *  1. Bindings -> KV namespace: variable "ACCESS_CODES" -> pilih namespace ACCESS_CODES.
 *  2. Variables and Secrets (type Secret):
 *       GEMINI_API_KEY   (dari https://aistudio.google.com/app/apikey)
 *       ADMIN_PASSWORD   (password bebas untuk halaman admin-kode)
 */

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // tanpa 0/O dan 1/I
const DEMO_CHAR_LIMIT = 700;
const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/** Baca JSON body request; null jika tidak valid. */
export async function readBody(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function randomCode(len = 8) {
  let out = '';
  for (let i = 0; i < len; i++) out += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  return out;
}

function truncateDemo(text) {
  if (text.length <= DEMO_CHAR_LIMIT) return text;
  let cut = text.slice(0, DEMO_CHAR_LIMIT);
  const lastBreak = Math.max(cut.lastIndexOf('\n\n'), cut.lastIndexOf('. '));
  if (lastBreak > DEMO_CHAR_LIMIT * 0.5) cut = cut.slice(0, lastBreak + 1);
  return cut.trim() + '\n\n---\n🔒 **Ini adalah preview demo (hasil dipotong).** Aktifkan paket Berbayar untuk mendapatkan dokumen lengkap — lihat halaman Harga.';
}

async function callGeminiAPI(prompt, env, { temperature = 0.7, maxTokens = 4096 } = {}) {
  for (const model of GEMINI_MODELS) {
    let res;
    try {
      res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature, maxOutputTokens: maxTokens },
          }),
        }
      );
    } catch {
      throw new Error('NETWORK_ERROR');
    }
    if (res.ok) {
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('API_EMPTY_RESPONSE');
      return text;
    }
    if (res.status === 429) continue; // coba model cadangan
    throw new Error(`API_ERROR_${res.status}`);
  }
  throw new Error('API_QUOTA');
}

async function checkCode(env, rawCode) {
  if (!rawCode) return null;
  const code = String(rawCode).trim().toUpperCase();
  const raw = await env.ACCESS_CODES.get(code);
  if (!raw) return null;
  const data = JSON.parse(raw);
  if (new Date(data.expiresAt) < new Date()) return null;
  return { code, ...data };
}

function isAdmin(body, env) {
  return !!body.password && body.password === env.ADMIN_PASSWORD;
}

export async function handleGenerate(body, env) {
  const { prompt, temperature, maxTokens, code } = body;
  if (!prompt || typeof prompt !== 'string') return json({ error: 'prompt diperlukan' }, 400);

  const access = await checkCode(env, code);
  const text = await callGeminiAPI(prompt, env, { temperature, maxTokens });

  if (access) return json({ text, isDemo: false });
  return json({ text: truncateDemo(text), isDemo: true });
}

export async function handleVerify(body, env) {
  const access = await checkCode(env, body.code);
  if (!access) return json({ valid: false });
  return json({ valid: true, tier: access.tier, expiresAt: access.expiresAt, name: access.name || null });
}

export async function handleAdminGenerate(body, env) {
  if (!isAdmin(body, env)) return json({ error: 'Unauthorized' }, 401);
  const tier = body.tier === 'tahunan' ? 'tahunan' : 'bulanan';
  const months = tier === 'tahunan' ? 12 : 1;
  const name = (body.name || '').trim() || null;

  const now = new Date();
  const expires = new Date(now);
  expires.setMonth(expires.getMonth() + months);

  const code = 'AW-' + randomCode(8);
  const data = { tier, name, createdAt: now.toISOString(), expiresAt: expires.toISOString() };
  await env.ACCESS_CODES.put(code, JSON.stringify(data));
  return json({ code, ...data });
}

export async function handleAdminList(body, env) {
  if (!isAdmin(body, env)) return json({ error: 'Unauthorized' }, 401);
  const list = await env.ACCESS_CODES.list();
  const codes = await Promise.all(
    list.keys.map(async (k) => {
      const raw = await env.ACCESS_CODES.get(k.name);
      return { code: k.name, ...JSON.parse(raw) };
    })
  );
  codes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return json({ codes });
}

export async function handleAdminRevoke(body, env) {
  if (!isAdmin(body, env)) return json({ error: 'Unauthorized' }, 401);
  if (!body.code) return json({ error: 'code diperlukan' }, 400);
  await env.ACCESS_CODES.delete(String(body.code).trim().toUpperCase());
  return json({ revoked: true });
}
