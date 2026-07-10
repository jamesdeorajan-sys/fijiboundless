import { err, json, cors } from '../../_shared.js';

export async function onRequestOptions() { return cors(); }

const SUBJECT_TYPES = ['doorway', 'ramp', 'step', 'bathroom'];
const VALID_MEDIA_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_BASE64_LENGTH = 7_000_000; // ~5MB image, base64-inflated

export async function onRequestPost({ request, env }) {
  if (!env.ANTHROPIC_API_KEY) {
    return err('Vision analyser is not configured (missing ANTHROPIC_API_KEY)', 500);
  }

  let body;
  try { body = await request.json(); } catch { return err('Invalid JSON'); }

  const { imageBase64, mediaType, subjectType } = body;
  if (!imageBase64 || !mediaType) return err('imageBase64 and mediaType are required');
  if (!VALID_MEDIA_TYPES.includes(mediaType)) return err('Unsupported image type');
  if (imageBase64.length > MAX_BASE64_LENGTH) return err('Image too large — please use a photo under ~5MB');
  const subject = SUBJECT_TYPES.includes(subjectType) ? subjectType : 'doorway';

  const prompt = `You are an accessibility assessor. Analyse this image of a ${subject}. Estimate:
1) door width in cm if visible (look for standard objects for scale)
2) ramp gradient percentage if applicable
3) whether a standard manual wheelchair could pass
4) whether a large power wheelchair (70cm wide) could pass
5) key accessibility concerns
6) confidence level (low/medium/high)

Return JSON only, matching this exact shape (use null for any field that doesn't apply or can't be estimated):
{
  "door_width_cm": number|null,
  "ramp_gradient_percent": number|null,
  "manual_wheelchair_passable": "yes"|"no"|"unclear",
  "power_wheelchair_passable": "yes"|"no"|"unclear",
  "concerns": string[],
  "confidence": "low"|"medium"|"high"
}`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 700,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType, data: imageBase64 } },
            { type: 'text', text: prompt },
          ],
        }],
      }),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      return err(`Anthropic API error (${res.status}): ${errBody.slice(0, 300)}`, 502);
    }

    const data = await res.json();
    const text = data.content?.find(block => block.type === 'text')?.text || '';

    let analysis;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      analysis = JSON.parse(jsonMatch ? jsonMatch[0] : text);
    } catch {
      return err('Could not parse analysis from the model response', 502);
    }

    return json({ subject, analysis });
  } catch (e) {
    return err('Vision check failed: ' + e.message, 502);
  }
}
