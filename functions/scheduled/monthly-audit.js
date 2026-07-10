// NOTE: Cloudflare Pages projects do not support Cron Triggers — scheduled()
// handlers only run on plain Workers, deployed via `wrangler deploy`, not
// `wrangler pages deploy`. A file here can't actually be invoked on a
// schedule by Cloudflare; Pages only routes files under functions/ as HTTP
// handlers (onRequestGet/onRequestPost etc.).
//
// The real monthly automation lives in cron-worker/ as a small standalone
// Worker with its own wrangler.toml and `[triggers] crons`. This file exists
// per the original spec and shows the same logic in the shape Cloudflare
// expects a scheduled handler to take, re-exporting the shared audit function
// so there is exactly one implementation (functions/_audit.js) — not two
// copies that could drift out of sync.
//
// Manual/on-demand runs of this same logic are available right now via the
// admin panel's "Run audit now" button, POST /api/admin/run-audit.

import { runMonthlyAudit } from '../_audit.js';

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(runMonthlyAudit(env));
  },
};
