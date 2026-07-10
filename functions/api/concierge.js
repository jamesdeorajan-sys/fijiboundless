import { json, err, cors, CATEGORIES, DIVISIONS, FACILITY_SELECT } from '../_shared.js';

export async function onRequestOptions() { return cors(); }

const WHEELCHAIR_TYPES = ['none', 'manual', 'power', 'scooter'];
const SENSITIVITIES    = ['noise', 'bright_light', 'crowds', 'strong_smells'];
const MAX_CANDIDATES    = 18;

// Score a joined facility row against the traveller's stated needs so the
// itinerary is built from the best-matching places first, without SQL WHERE
// clauses that could zero out results for anyone with several needs at once.
function scoreFacility(f, needs) {
  let score = 0;
  if (f.verification_status === 'verified') score += 3;
  if (needs.wheelchairType !== 'none' && (f.step_free_entry || f.all_terrain_wheelchair)) score += 3;
  if (needs.hoistRequired && (f.hoisting_equipment || f.pool_hoist)) score += 3;
  if (needs.sensitivities.includes('noise') && f.noise_level_rating && f.noise_level_rating <= 2) score += 2;
  if (needs.sensitivities.includes('noise') && f.sensory_friendly_rating && f.sensory_friendly_rating >= 4) score += 1;
  if (needs.sensitivities.includes('bright_light') && f.low_lighting_option) score += 2;
  if (needs.sensitivities.includes('crowds') && f.quiet_hours_start) score += 1;
  if (f.active_alerts > 0) score -= 4;
  return score;
}

export async function onRequestPost({ request, env }) {
  if (!env.ANTHROPIC_API_KEY) {
    return err('AI concierge is not configured (missing ANTHROPIC_API_KEY)', 500);
  }

  let body;
  try { body = await request.json(); } catch { return err('Invalid JSON'); }

  const wheelchairType = WHEELCHAIR_TYPES.includes(body.wheelchairType) ? body.wheelchairType : 'none';
  const hoistRequired  = !!body.hoistRequired;
  const sensitivities   = Array.isArray(body.sensitivities) ? body.sensitivities.filter(s => SENSITIVITIES.includes(s)) : [];
  const divisions       = Array.isArray(body.divisions) ? body.divisions.filter(d => DIVISIONS.includes(d)) : [];
  const categories       = Array.isArray(body.categories) ? body.categories.filter(c => CATEGORIES.includes(c)) : [];
  const tripLengthDays  = Math.min(Math.max(parseInt(body.tripLengthDays) || 5, 1), 21);
  const notes            = typeof body.notes === 'string' ? body.notes.slice(0, 600) : '';

  try {
    let query    = FACILITY_SELECT + ' WHERE f.is_active = 1';
    const params = [];

    if (divisions.length)  { query += ` AND f.division IN (${divisions.map(() => '?').join(',')})`;  params.push(...divisions); }
    if (categories.length) { query += ` AND f.category IN (${categories.map(() => '?').join(',')})`; params.push(...categories); }

    query += ' ORDER BY f.name LIMIT 200';

    const { results } = await env.DB.prepare(query).bind(...params).all();
    if (results.length === 0) {
      return err('No facilities match those filters yet — try widening the region or type selection.', 404);
    }

    const needs = { wheelchairType, hoistRequired, sensitivities };
    const candidates = results
      .map(f => ({ ...f, _score: scoreFacility(f, needs) }))
      .sort((a, b) => b._score - a._score)
      .slice(0, MAX_CANDIDATES);

    const needsForClaude = { wheelchairType, hoistRequired, sensitivities, divisions, categories, tripLengthDays, notes };
    const itinerary = await callClaude(env, needsForClaude, candidates);
    const anxietyGuide = await callAnxietyGuide(env, needsForClaude, itinerary).catch(() => null);

    return json({
      itinerary,
      anxietyGuide,
      facilities: candidates.map(({ _score, ...f }) => f),
    });
  } catch (e) {
    return err(e.message || 'Concierge request failed', 502);
  }
}

async function callClaude(env, needs, candidates) {
  const facilityList = candidates.map(f => ({
    id: f.id,
    name: f.name,
    category: f.category,
    division: f.division,
    island: f.island,
    town_or_area: f.town_or_area,
    verification_status: f.verification_status || 'unverified',
    step_free_entry: !!f.step_free_entry,
    door_width_cm: f.door_width_cm,
    hoisting_equipment: !!f.hoisting_equipment,
    pool_hoist: !!f.pool_hoist,
    beach_wheelchair_available: !!f.beach_wheelchair_available,
    all_terrain_wheelchair: !!f.all_terrain_wheelchair,
    sensory_friendly_rating: f.sensory_friendly_rating,
    noise_level_rating: f.noise_level_rating,
    boat_accessible: !!f.boat_accessible,
    boat_notes: f.boat_notes,
    active_alerts: f.active_alerts,
  }));

  const systemPrompt = `You are the FijiBoundless AI Concierge, a travel planner specialising in accessible tourism in Fiji.
Build a warm, practical, day-by-day itinerary using ONLY the facilities provided in the JSON list below — never invent
a place, address, or accessibility feature that is not in the list. If the list can't fill every day, say so honestly
and suggest the traveller search fijiboundless.pages.dev for more options rather than inventing one.
For every place you recommend, briefly note the specific accessibility detail that makes it a good fit for this
traveller's needs. Flag any facility with active_alerts > 0 as needing a live status check before visiting.
Write in Markdown with a short intro, then "## Day N" headings. Keep it concise — aim for under 700 words.`;

  const userPrompt = `Traveller accessibility profile:
- Wheelchair type: ${needs.wheelchairType}
- Hoist required: ${needs.hoistRequired ? 'yes' : 'no'}
- Sensory sensitivities: ${needs.sensitivities.length ? needs.sensitivities.join(', ') : 'none specified'}
- Preferred regions: ${needs.divisions.length ? needs.divisions.join(', ') : 'any'}
- Interested in: ${needs.categories.length ? needs.categories.join(', ') : 'any'}
- Trip length: ${needs.tripLengthDays} days
- Additional notes: ${needs.notes || 'none'}

Verified/candidate facilities (JSON):
${JSON.stringify(facilityList)}`;

  return anthropicMessage(env, { system: systemPrompt, user: userPrompt, maxTokens: 1800 });
}

// Second Claude call: turns the itinerary into a calm, concrete "what to
// expect" walkthrough for travellers who experience travel anxiety.
async function callAnxietyGuide(env, needs, itineraryText) {
  const needsSummary = [
    `wheelchair type: ${needs.wheelchairType}`,
    needs.hoistRequired ? 'requires hoist access' : null,
    needs.sensitivities.length ? `sensory sensitivities: ${needs.sensitivities.join(', ')}` : null,
    needs.notes ? `additional context: ${needs.notes}` : null,
  ].filter(Boolean).join('; ');

  const system = `You write calm, reassuring, concrete "what to expect" travel guides for anxious travellers.
Tone: warm, specific, never patronising. No generic platitudes — give exact sequences, exact phrases to say,
and a contingency plan for each day. Write in Markdown with "## Day N" headings matching the itinerary given.
Keep it under 500 words.`;

  const user = `Given this itinerary:

${itineraryText}

Write a calm, reassuring day-by-day "what to expect" guide for a traveller with these accessibility needs who
experiences travel anxiety: ${needsSummary || 'no specific needs given'}.

For each day, focus on:
- The exact arrival sequence (what happens first, second, third)
- Who to speak to and what to say if they need help
- The sensory environment they can expect at each step (noise, crowds, lighting)
- A contingency plan if something isn't as expected`;

  return anthropicMessage(env, { system, user, maxTokens: 1400 });
}

async function anthropicMessage(env, { system, user, maxTokens }) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => '');
    throw new Error(`Anthropic API error (${res.status}): ${errBody.slice(0, 300)}`);
  }

  const data = await res.json();
  const text = data.content?.find(block => block.type === 'text')?.text;
  if (!text) throw new Error('Anthropic API returned no text');
  return text;
}
