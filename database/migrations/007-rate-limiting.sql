-- Migration 007 — Rate Limiting
-- Backs a simple D1-based per-IP rate limiter for expensive AI-calling
-- endpoints (starting with /api/concierge, which makes two Claude calls
-- per request). See functions/_shared.js checkRateLimit().
-- Run: wrangler d1 execute fijiboundless --local  --file=database/migrations/007-rate-limiting.sql
-- Run: wrangler d1 execute fijiboundless --remote --file=database/migrations/007-rate-limiting.sql

CREATE TABLE IF NOT EXISTS rate_limit_log (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  ip           TEXT    NOT NULL,
  endpoint     TEXT    NOT NULL,
  requested_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_rate_limit_lookup ON rate_limit_log(ip, endpoint, requested_at DESC);
