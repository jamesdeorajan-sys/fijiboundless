-- Migration 005 — Place Suggestions
-- Backs the public /suggest form (POST /api/suggest).
-- Run: wrangler d1 execute fijiboundless --local  --file=database/migrations/005-suggestions.sql
-- Run: wrangler d1 execute fijiboundless --remote --file=database/migrations/005-suggestions.sql

CREATE TABLE IF NOT EXISTS suggestions (
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  place_name           TEXT    NOT NULL,
  address              TEXT,
  category             TEXT,
  accessibility_notes  TEXT,
  submitter_email      TEXT,
  submitted_at         TEXT    NOT NULL DEFAULT (datetime('now')),
  status               TEXT    NOT NULL DEFAULT 'new' CHECK(status IN ('new','reviewed','added','rejected'))
);

CREATE INDEX IF NOT EXISTS idx_suggestions_submitted_at ON suggestions(submitted_at DESC);
