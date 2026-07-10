import { runMonthlyAudit } from '../functions/_audit.js';

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(runMonthlyAudit(env));
  },
  // A GET handler so `wrangler dev` and manual smoke tests have something to
  // hit — actual production invocation is exclusively via the cron trigger.
  async fetch(request, env) {
    const result = await runMonthlyAudit(env);
    return new Response(JSON.stringify(result, null, 2), {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
