// Shared monthly data-freshness audit logic — called from the admin-triggered
// POST /api/admin/run-audit Pages Function, and from the companion cron
// Worker (cron-worker/) for real scheduled automation. Kept out of
// _shared.js since it's a distinct subsystem with its own thresholds.

const STALE_DAYS   = 60;
const OVERDUE_DAYS = 180;

export async function runMonthlyAudit(env) {
  const { results: facilities } = await env.DB.prepare(`
    SELECT f.id,
      (SELECT MAX(verified_at) FROM verifications WHERE facility_id = f.id) AS last_verified
    FROM facilities f
    WHERE f.is_active = 1
  `).all();

  const nowMs = Date.now();
  let facilitiesFlagged = 0;
  let alertsPosted = 0;

  for (const f of facilities) {
    const daysSince = f.last_verified
      ? (nowMs - new Date(f.last_verified).getTime()) / 86400000
      : Infinity;

    if (daysSince <= STALE_DAYS) continue;

    await env.DB.prepare(`
      INSERT INTO verifications (facility_id, verified_by, status, notes)
      VALUES (?, 'ai_audit', 'needs_update', 'Scheduled monthly review — manual re-verification required')
    `).bind(f.id).run();
    facilitiesFlagged++;

    if (daysSince > OVERDUE_DAYS) {
      await env.DB.prepare(`
        INSERT INTO live_alerts (facility_id, alert_type, message, reported_by)
        VALUES (?, 'other', 'Accessibility data overdue for re-verification. Treat as unconfirmed until updated.', 'FijiBoundless Monthly Audit')
      `).bind(f.id).run();
      alertsPosted++;
    }
  }

  const notes = `Reviewed ${facilities.length} active facilities; ${facilitiesFlagged} flagged as stale (>${STALE_DAYS}d), ${alertsPosted} overdue alerts posted (>${OVERDUE_DAYS}d).`;

  const result = await env.DB.prepare(`
    INSERT INTO audit_log (facilities_flagged, alerts_posted, notes) VALUES (?, ?, ?)
  `).bind(facilitiesFlagged, alertsPosted, notes).run();

  return {
    audit_id: result.meta.last_row_id,
    facilities_reviewed: facilities.length,
    facilities_flagged: facilitiesFlagged,
    alerts_posted: alertsPosted,
    notes,
  };
}
