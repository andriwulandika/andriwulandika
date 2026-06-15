import { json, readBody, handleAdminTopup } from '../_lib.js';

export async function onRequestPost(context) {
  const body = await readBody(context.request);
  if (!body) return json({ error: 'JSON tidak valid' }, 400);
  try {
    return await handleAdminTopup(body, context.env);
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}
