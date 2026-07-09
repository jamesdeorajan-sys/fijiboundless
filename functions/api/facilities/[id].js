import { json, err, cors, FACILITY_SELECT } from '../../_shared.js';

export async function onRequestOptions() { return cors(); }

export async function onRequestGet({ params, env }) {
  const id = parseInt(params.id);
  if (isNaN(id)) return err('Invalid facility ID');

  try {
    const facility = await env.DB
      .prepare(FACILITY_SELECT + ' WHERE f.id = ?')
      .bind(id)
      .first();

    if (!facility) return err('Facility not found', 404);

    const { results: alerts } = await env.DB
      .prepare('SELECT * FROM live_alerts WHERE facility_id = ? AND is_resolved = 0 ORDER BY reported_at DESC')
      .bind(id)
      .all();

    return json({ facility, active_alerts: alerts });
  } catch (e) {
    return err('Database error: ' + e.message, 500);
  }
}
