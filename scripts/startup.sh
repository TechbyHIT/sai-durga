#!/bin/sh
# Production startup — background maintenance loops + standalone Next.js server.
set -e

log() { echo "[startup] $*"; }

start_background_jobs() {
  (
    while true; do
      sleep 43200
      /app/scripts/cleanup.sh --quiet || true
    done
  ) &
  log "Cleanup scheduler started (every 12 hours)"

  (
    while true; do
      sleep 60
      /app/scripts/monitor.sh --quiet || true
    done
  ) &
  log "Monitor scheduler started (every 60 seconds)"
}

if [ -x /app/scripts/cleanup.sh ]; then
  /app/scripts/cleanup.sh --quiet --startup || true
fi

start_background_jobs

log "Starting Next.js standalone server on port ${PORT:-3000}"
exec node server.js
