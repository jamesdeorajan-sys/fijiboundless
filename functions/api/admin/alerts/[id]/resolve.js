import { json, err, cors, requireAdmin } from '../../../../_shared.js';

export async function onRequestOptions() { return cors(); }

export async function onRequestPost({ params, request, env }) {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const id = parseInt(params.id);
  if (isNaN(id)) return err('Invalid alert ID');

  try {
    const result = await env.DB
      .prepare("UPDATE live_alerts SET is_resolved = 1, resolved_at = datetime('now') WHERE id = ? AND is_resolved = 0")
      .bind(id)
      .run();

    if (result.meta.changes === 0) return err('Alert not found or already resolved', 404);

    return json({ success: true, alert_id: id });
  } catch (e) {
    return err('Database error: ' + e.message, 500);
  }
}
