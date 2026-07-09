import { json, err, cors } from '../_shared.js';

const VALID_TYPES = ['ramp_repair','hoist_down','flooded','closed_temp','road_damage','ferry_cancelled','power_outage','other'];

export async function onRequestOptions() { return cors(); }

export async function onRequestGet({ request, env }) {
  const url        = new URL(request.url);
  const facilityId = url.searchParams.get('facility_id');

  try {
    let query  = `SELECT la.*, f.name AS facility_name, f.town_or_area
                  FROM live_alerts la JOIN facilities f ON f.id = la.facility_id
                  WHERE la.is_resolved = 0`;
    const params = [];
    if (facilityId) { query += ' AND la.facility_id = ?'; params.push(facilityId); }
    query += ' ORDER BY la.reported_at DESC LIMIT 50';

    const { results } = await env.DB.prepare(query).bind(...params).all();
    return json({ active_alerts: results });
  } catch (e) {
    return err('Database error: ' + e.message, 500);
  }
}

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return err('Invalid JSON'); }

  const { facility_id, alert_type, message, reported_by } = body;
  if (!facility_id || !alert_type || !message) return err('facility_id, alert_type, and message are required');
  if (!VALID_TYPES.includes(alert_type)) return err('Invalid alert_type');

  try {
    const result = await env.DB
      .prepare('INSERT INTO live_alerts (facility_id, alert_type, message, reported_by) VALUES (?, ?, ?, ?)')
      .bind(facility_id, alert_type, message, reported_by || 'anonymous')
      .run();

    return json({ success: true, alert_id: result.meta.last_row_id }, 201);
  } catch (e) {
    return err('Database error: ' + e.message, 500);
  }
}
