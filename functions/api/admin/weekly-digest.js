import { json, err, cors, requireAdmin } from '../../_shared.js';

export async function onRequestOptions() { return cors(); }

export async function onRequestGet({ request, env }) {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  try {
    const [newFacilities, alertsPosted, alertsResolved, topCategories, staleFacilities] = await Promise.all([
      env.DB.prepare(`
        SELECT id, name, category, division FROM facilities
        WHERE created_at >= datetime('now', '-7 days')
        ORDER BY created_at DESC
      `).all(),
      env.DB.prepare(`
        SELECT COUNT(*) AS c FROM live_alerts WHERE reported_at >= datetime('now', '-7 days')
      `).first(),
      env.DB.prepare(`
        SELECT COUNT(*) AS c FROM live_alerts
        WHERE is_resolved = 1 AND resolved_at >= datetime('now', '-7 days')
      `).first(),
      env.DB.prepare(`
        SELECT category, COUNT(*) AS searches FROM searches_log
        WHERE searched_at >= datetime('now', '-7 days') AND category IS NOT NULL
        GROUP BY category ORDER BY searches DESC LIMIT 5
      `).all(),
      env.DB.prepare(`
        SELECT f.id, f.name,
          (SELECT MAX(verified_at) FROM verifications WHERE facility_id = f.id) AS last_verified
        FROM facilities f WHERE f.is_active = 1
      `).all(),
    ]);

    const nowMs = Date.now();
    const stale = staleFacilities.results
      .filter(f => !f.last_verified || (nowMs - new Date(f.last_verified).getTime()) / 86400000 > 90)
      .slice(0, 10)
      .map(({ id, name }) => ({ id, name }));

    const digest = {
      period: 'last 7 days',
      new_facilities: newFacilities.results,
      alerts_posted_count: alertsPosted.c,
      alerts_resolved_count: alertsResolved.c,
      most_searched_categories: topCategories.results,
      stale_facilities: stale,
    };

    let newsletterDraft = null;
    if (env.ANTHROPIC_API_KEY) {
      newsletterDraft = await draftNewsletter(env, digest).catch(e => `(Newsletter draft failed: ${e.message})`);
    }

    return json({ digest, newsletterDraft });
  } catch (e) {
    return err('Database error: ' + e.message, 500);
  }
}

async function draftNewsletter(env, digest) {
  const system = `You write a short, warm, plain-text weekly newsletter draft for the FijiBoundless team
(an accessible travel platform for Fiji). Audience: internal team and engaged subscribers who care about
accessible tourism. No markdown, no HTML — plain text ready to paste into an email client. Keep it under
350 words. Include a subject line as the first line, prefixed "Subject: ".`;

  const user = `Here is this week's data digest as JSON:
${JSON.stringify(digest, null, 2)}

Write the newsletter draft now.`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 900,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    throw new Error(`Anthropic API error (${res.status}): ${errBody.slice(0, 200)}`);
  }

  const data = await res.json();
  const text = data.content?.find(b => b.type === 'text')?.text;
  if (!text) throw new Error('Anthropic API returned no text');
  return text;
}
