#!/bin/sh
# External ops monitor — runs every 60 seconds against the app service.
set -e

APP_URL="${APP_URL:-http://app:3000/}"
INTERVAL="${MONITOR_INTERVAL:-60}"

apk add --no-cache wget >/dev/null 2>&1 || true

while true; do
  if wget -qO- "$APP_URL" >/dev/null 2>&1; then
    echo "[ops-monitor] OK $(date 2>/dev/null || date)"
  else
    echo "[ops-monitor] CRITICAL app unreachable at $APP_URL $(date 2>/dev/null || date)"
  fi
  sleep "$INTERVAL"
done
