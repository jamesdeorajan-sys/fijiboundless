-- Migration 004 — Search Logging
-- Feeds the weekly digest and future analytics. Logged on every
-- GET /api/facilities call (see functions/api/facilities.js).
-- Run: wrangler d1 execute fijiboundless --local  --file=database/migrations/004-searches-log.sql
-- Run: wrangler d1 execute fijiboundless --remote --file=database/migrations/004-searches-log.sql

CREATE TABLE IF NOT EXISTS searches_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  searched_at   TEXT    NOT NULL DEFAULT (datetime('now')),
  category      TEXT,
  division      TEXT,
  island        TEXT,
  has_gps       INTEGER NOT NULL DEFAULT 0,
  result_count  INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_searches_log_searched_at ON searches_log(searched_at DESC);
CREATE INDEX IF NOT EXISTS idx_searches_log_category     ON searches_log(category);
