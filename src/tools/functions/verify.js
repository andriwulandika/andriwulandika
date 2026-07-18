import { json, readBody, handleVerify } from './_lib.js';

export async function onRequestPost(context) {
  const body = await readBody(context.request);
  if (!body) return json({ error: 'JSON tidak valid' }, 400);
  try {
    return await handleVerify(body, context.env);
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}
