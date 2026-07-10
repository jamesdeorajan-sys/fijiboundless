-- Migration 003 — Alert Intelligence
-- Adds AI-classified severity and resolution estimate columns to
-- live_alerts, populated by a background Claude call when a new alert
-- is posted (see functions/_shared.js scheduleAlertClassification()).
-- Run: wrangler d1 execute fijiboundless --local  --file=database/migrations/003-alert-intelligence.sql
-- Run: wrangler d1 execute fijiboundless --remote --file=database/migrations/003-alert-intelligence.sql

ALTER TABLE live_alerts ADD COLUMN ai_severity TEXT;
ALTER TABLE live_alerts ADD COLUMN ai_resolution_estimate TEXT;
