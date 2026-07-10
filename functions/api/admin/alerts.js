import { json, err, cors, requireAdmin, scheduleAlertClassification } from '../../_shared.js';

const VALID_TYPES = ['ramp_repair','hoist_down','flooded','closed_temp','road_damage','ferry_cancelled','power_outage','other'];

export async function onRequestOptions() { return cors(); }

export async function onRequestPost({ request, env, waitUntil }) {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  let body;
  try { body = await request.json(); } catch { return err('Invalid JSON'); }

  const { facility_id, alert_type, message, reported_by } = body;
  if (!facility_id || !alert_type || !message) return err('facility_id, alert_type, and message are required');
  if (!VALID_TYPES.includes(alert_type)) return err('Invalid alert_type');

  try {
    const result = await env.DB
      .prepare('INSERT INTO live_alerts (facility_id, alert_type, message, reported_by) VALUES (?, ?, ?, ?)')
      .bind(facility_id, alert_type, message, reported_by || 'FijiBoundless Admin')
      .run();

    const alertId = result.meta.last_row_id;
    scheduleAlertClassification(waitUntil, env, alertId, alert_type, message);

    return json({ success: true, alert_id: alertId }, 201);
  } catch (e) {
    return err('Database error: ' + e.message, 500);
  }
}
