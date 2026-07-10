import { json, err, cors } from '../_shared.js';

export async function onRequestOptions() { return cors(); }

export async function onRequestGet({ env }) {
  try {
    const { results } = await env.DB.prepare(`
      SELECT f.id,
        (SELECT MAX(verified_at) FROM verifications WHERE facility_id = f.id) AS last_verified
      FROM facilities f
      WHERE f.is_active = 1
    `).all();

    const nowMs = Date.now();
    let verified30 = 0, verified90 = 0, stale = 0, never = 0;

    for (const f of results) {
      if (!f.last_verified) { never++; continue; }
      const days = (nowMs - new Date(f.last_verified).getTime()) / 86400000;
      if (days <= 30) verified30++;
      else if (days <= 90) verified90++;
      else stale++;
    }

    return json({
      total_facilities: results.length,
      verified_last_30_days: verified30,
      verified_30_90_days: verified90,
      stale_90_plus_days: stale,
      never_verified: never,
    });
  } catch (e) {
    return err('Database error: ' + e.message, 500);
  }
}
