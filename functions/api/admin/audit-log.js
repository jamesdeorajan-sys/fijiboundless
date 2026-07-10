import { json, err, cors, requireAdmin } from '../../_shared.js';

export async function onRequestOptions() { return cors(); }

export async function onRequestGet({ request, env }) {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  try {
    const { results } = await env.DB
      .prepare('SELECT * FROM audit_log ORDER BY run_at DESC LIMIT 50')
      .all();
    return json({ runs: results });
  } catch (e) {
    return err('Database error: ' + e.message, 500);
  }
}
