import { json, err, cors, requireAdmin } from '../../_shared.js';
import { runMonthlyAudit } from '../../_audit.js';

export async function onRequestOptions() { return cors(); }

export async function onRequestPost({ request, env }) {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  try {
    const result = await runMonthlyAudit(env);
    return json({ success: true, ...result }, 201);
  } catch (e) {
    return err('Audit failed: ' + e.message, 500);
  }
}
