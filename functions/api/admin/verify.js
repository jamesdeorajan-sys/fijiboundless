import { json, err, cors, requireAdmin, insertVerification } from '../../_shared.js';

export async function onRequestOptions() { return cors(); }

export async function onRequestPost({ request, env }) {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  let body;
  try { body = await request.json(); } catch { return err('Invalid JSON'); }

  try {
    const verificationId = await insertVerification(env, body);
    return json({ success: true, verification_id: verificationId }, 201);
  } catch (e) {
    const isValidation = e.message.includes('required') || e.message.startsWith('Invalid');
    return err(isValidation ? e.message : 'Database error: ' + e.message, isValidation ? 400 : 500);
  }
}
