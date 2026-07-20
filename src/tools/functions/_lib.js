/**
 * _lib.js — Logika bersama untuk Cloudflare Pages Functions.
 * Bukan endpoint (tidak meng-export onRequest*); hanya diimpor oleh file route.
 *
 * Backend = proxy ke AI (Claude untuk Berbayar, Gemini untuk demo) + sistem kode akses berbayar.
 * Karena Functions satu domain dengan website, frontend memanggil path relatif
 * (/generate, /verify, /admin/*) sehingga tidak perlu CORS.
 *
 * Setup di dashboard Cloudflare (project Pages "andriwulandika" -> Settings):
 *  1. Bindings -> KV namespace: variable "ACCESS_CODES" -> pilih namespace ACCESS_CODES.
 *  2. Variables and Secrets (type Secret):
 *       GEMINI_API_KEY   (dari https://aistudio.google.com/app/apikey)
 *       CLAUDE_API_KEY   (dari https://console.anthropic.com/settings/keys, mesin AI pengguna Berbayar)
 *       ADMIN_PASSWORD   (password bebas untuk halaman admin-kode)
 */

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // tanpa 0/O dan 1/I
const DEMO_CHAR_LIMIT = 700;
const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];
const CLAUDE_MODELS = ['claude-sonnet-4-6', 'claude-haiku-4-5'];
const CREDIT_COST = 1; // kredit terpotong per dokumen yang berhasil dibuat (pay-as-you-go)

// Rate limiting: max 100 requests per minute per IP untuk /generate publik
const RATE_LIMIT_REQUESTS = 100;
const RATE_LIMIT_WINDOW = 60; // seconds
// Endpoint /admin/* jauh lebih jarang dipakai pemilik & lebih sensitif (brute-force
// password) -> batas lebih ketat, namespace KV terpisah dari rate limit publik.
const ADMIN_RATE_LIMIT_REQUESTS = 20;
// Endpoint /verify dipakai untuk mengecek kode akses saat login. Batas ketat
// mencegah upaya menebak kode akses secara massal (enumerasi), namun tetap
// longgar untuk pemakaian normal (login sesekali). Namespace KV terpisah.
const VERIFY_RATE_LIMIT_REQUESTS = 10;

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

// Input validation
function sanitizePrompt(prompt) {
  if (!prompt || typeof prompt !== 'string') return null;
  const trimmed = prompt.trim();
  if (trimmed.length < 5 || trimmed.length > 5000) return null;
  return trimmed;
}

function validateTemperature(temp) {
  if (temp === undefined || temp === null) return 0.7;
  const num = parseFloat(temp);
  if (isNaN(num)) return 0.7;
  return Math.max(0, Math.min(2, num)); // Clamp between 0 and 2
}

function validateMaxTokens(tokens) {
  if (tokens === undefined || tokens === null) return 4096;
  const num = parseInt(tokens, 10);
  if (isNaN(num)) return 4096;
  return Math.max(100, Math.min(8000, num)); // Clamp between 100 and 8000
}

// Rate limiting helper — fail-closed: tanpa binding KV, request DITOLAK (bukan
// diam-diam diloloskan). `keySuffix` membedakan namespace (mis. IP polos untuk
// /generate publik, `admin:<ip>` untuk /admin/*) supaya kuota tidak saling makan.
async function checkRateLimit(env, keySuffix, limit, windowSeconds = RATE_LIMIT_WINDOW) {
  if (!env.ACCESS_CODES) return false;
  const key = `ratelimit:${keySuffix}`;
  const current = await env.ACCESS_CODES.get(key);
  const count = current ? parseInt(current, 10) : 0;

  if (count >= limit) {
    return false;
  }

  // Increment and set expiry
  await env.ACCESS_CODES.put(key, String(count + 1), { expirationTtl: windowSeconds });
  return true;
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
            generationConfig: {
              temperature,
              maxOutputTokens: maxTokens,
              // Model "thinking" memakai sebagian budget maxOutputTokens untuk token
              // internal, menyisakan sedikit/tanpa token untuk jawaban akhir -> hasil
              // terpotong. Matikan thinking agar seluruh budget dipakai untuk jawaban.
              thinkingConfig: { thinkingBudget: 0 },
            },
          }),
        }
      );
    } catch {
      throw new Error('NETWORK_ERROR');
    }
    if (res.ok) {
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text || '')
        .join('');
      if (!text) throw new Error('API_EMPTY_RESPONSE');
      return text;
    }
    if (res.status === 429) continue; // coba model cadangan
    throw new Error(`API_ERROR_${res.status}`);
  }
  throw new Error('API_QUOTA');
}

async function callClaudeAPI(prompt, env, { temperature = 0.7, maxTokens = 4096 } = {}) {
  for (const model of CLAUDE_MODELS) {
    let res;
    try {
      res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model,
          max_tokens: maxTokens,
          temperature,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
    } catch {
      throw new Error('NETWORK_ERROR');
    }
    if (res.ok) {
      const data = await res.json();
      const text = data?.content?.map((c) => c.text || '').join('');
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
  return { code, ...JSON.parse(raw) };
}

// ── Helper akses & kredit ──────────────────────────────────────────────
// Sebuah kode kini berperan sebagai "dompet": punya field `credits` (sisa
// dokumen). Kode langganan lama (punya `expiresAt`) tetap dihormati sebagai
// akses tanpa batas sampai kedaluwarsa, tanpa memotong kredit.
function creditsOf(data) { return data && Number.isInteger(data.credits) ? data.credits : 0; }
function subActive(data) { return !!(data && data.expiresAt && new Date(data.expiresAt) > new Date()); }
function hasAccess(data) { return !!data && (subActive(data) || creditsOf(data) > 0); }

// Perbandingan waktu-konstan (tidak short-circuit di karakter pertama yang beda)
// supaya durasi respons tidak bocor informasi soal seberapa banyak awal password
// yang benar-tebak.
function timingSafeEqual(a, b) {
  const enc = new TextEncoder();
  const aBytes = enc.encode(String(a ?? ''));
  const bBytes = enc.encode(String(b ?? ''));
  const len = Math.max(aBytes.length, bBytes.length, 1);
  let diff = aBytes.length === bBytes.length ? 0 : 1;
  for (let i = 0; i < len; i++) {
    diff |= (aBytes[i] || 0) ^ (bBytes[i] || 0);
  }
  return diff === 0;
}

function isAdmin(body, env) {
  if (!body.password || !env.ADMIN_PASSWORD) return false;
  return timingSafeEqual(body.password, env.ADMIN_PASSWORD);
}

export async function handleGenerate(body, env, clientIp) {
  // Rate limiting check
  if (!await checkRateLimit(env, clientIp, RATE_LIMIT_REQUESTS)) {
    return json({ error: 'Rate limit exceeded. Max 100 requests per minute.' }, 429);
  }

  const prompt = sanitizePrompt(body.prompt);
  if (!prompt) return json({ error: 'Prompt harus antara 5-5000 karakter' }, 400);

  const temperature = validateTemperature(body.temperature);
  const maxTokens = validateMaxTokens(body.maxTokens);

  const record = await checkCode(env, body.code);
  const paid = hasAccess(record);
  // Pengguna dengan kredit/langganan memakai Claude; mode demo tetap Gemini.
  const engine = paid ? 'claude' : 'gemini';

  // Panggil AI dulu. Jika gagal, error dilempar ke route handler dan kredit
  // TIDAK terpotong — pengguna hanya membayar untuk dokumen yang berhasil.
  const text = paid
    ? await callClaudeAPI(prompt, env, { temperature, maxTokens })
    : await callGeminiAPI(prompt, env, { temperature, maxTokens });

  if (paid) {
    let credits = creditsOf(record);
    // Langganan aktif = tanpa potong kredit; selain itu potong 1 kredit/dokumen.
    if (!subActive(record)) {
      credits = Math.max(0, credits - CREDIT_COST);
      const { code, ...data } = record;
      data.credits = credits;
      await env.ACCESS_CODES.put(code, JSON.stringify(data));
    }
    return json({ text, isDemo: false, engine, credits, unlimited: subActive(record) });
  }

  return json({ text: truncateDemo(text), isDemo: true, engine, credits: creditsOf(record) });
}

export async function handleVerify(body, env, clientIp) {
  // Rate limit per IP untuk mencegah upaya menebak kode akses secara massal.
  // Pesan sengaja ramah & tidak membocorkan detail teknis.
  if (!await checkRateLimit(env, `verify:${clientIp}`, VERIFY_RATE_LIMIT_REQUESTS)) {
    return json({
      valid: false,
      message: 'Terlalu banyak percobaan. Mohon tunggu sekitar satu menit, lalu coba lagi.',
    }, 429);
  }
  const record = await checkCode(env, body.code);
  if (!record) return json({ valid: false });
  // valid:true selama kode dikenal (meski 0 kredit), supaya pengguna bisa
  // "masuk" untuk melihat saldo & melakukan top-up. Akses generate tetap
  // dijaga server-side oleh hasAccess().
  return json({
    valid: true,
    credits: creditsOf(record),
    unlimited: subActive(record),
    expiresAt: record.expiresAt || null,
    name: record.name || null,
    engine: 'claude',
  });
}

// Buat kode "dompet" baru dengan saldo kredit awal.
export async function handleAdminGenerate(body, env, clientIp) {
  if (!await checkRateLimit(env, `admin:${clientIp}`, ADMIN_RATE_LIMIT_REQUESTS)) {
    return json({ error: 'Rate limit exceeded' }, 429);
  }
  if (!isAdmin(body, env)) return json({ error: 'Unauthorized' }, 401);
  const credits = parseInt(body.credits, 10);
  if (!Number.isInteger(credits) || credits < 1 || credits > 100000) {
    return json({ error: 'Jumlah kredit tidak valid (1-100000)' }, 400);
  }
  const name = (body.name || '').trim() || null;
  const code = 'AW-' + randomCode(8);
  const data = { credits, name, createdAt: new Date().toISOString() };
  await env.ACCESS_CODES.put(code, JSON.stringify(data));
  return json({ code, ...data });
}

// Tambah saldo kredit ke kode yang sudah ada (top-up).
export async function handleAdminTopup(body, env, clientIp) {
  if (!await checkRateLimit(env, `admin:${clientIp}`, ADMIN_RATE_LIMIT_REQUESTS)) {
    return json({ error: 'Rate limit exceeded' }, 429);
  }
  if (!isAdmin(body, env)) return json({ error: 'Unauthorized' }, 401);
  const code = String(body.code || '').trim().toUpperCase();
  if (!code) return json({ error: 'code diperlukan' }, 400);
  const amount = parseInt(body.credits, 10);
  if (!Number.isInteger(amount) || amount < 1 || amount > 100000) {
    return json({ error: 'Jumlah kredit tidak valid (1-100000)' }, 400);
  }
  const raw = await env.ACCESS_CODES.get(code);
  if (!raw) return json({ error: 'Kode tidak ditemukan' }, 404);
  const data = JSON.parse(raw);
  data.credits = creditsOf(data) + amount;
  await env.ACCESS_CODES.put(code, JSON.stringify(data));
  return json({ code, ...data });
}

export async function handleAdminList(body, env, clientIp) {
  if (!await checkRateLimit(env, `admin:${clientIp}`, ADMIN_RATE_LIMIT_REQUESTS)) {
    return json({ error: 'Rate limit exceeded' }, 429);
  }
  if (!isAdmin(body, env)) return json({ error: 'Unauthorized' }, 401);
  const list = await env.ACCESS_CODES.list();
  const codes = await Promise.all(
    list.keys
      .filter((k) => !k.name.startsWith('ratelimit:'))
      .map(async (k) => {
        const raw = await env.ACCESS_CODES.get(k.name);
        return { code: k.name, ...JSON.parse(raw) };
      })
  );
  codes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return json({ codes });
}

export async function handleAdminRevoke(body, env, clientIp) {
  if (!await checkRateLimit(env, `admin:${clientIp}`, ADMIN_RATE_LIMIT_REQUESTS)) {
    return json({ error: 'Rate limit exceeded' }, 429);
  }
  if (!isAdmin(body, env)) return json({ error: 'Unauthorized' }, 401);
  if (!body.code) return json({ error: 'code diperlukan' }, 400);
  await env.ACCESS_CODES.delete(String(body.code).trim().toUpperCase());
  return json({ revoked: true });
}
