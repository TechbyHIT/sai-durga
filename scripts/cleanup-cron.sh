#!/bin/sh
# External ops cleanup coordinator — triggers in-container cleanup every 12 hours.
# Requires Docker socket on the VPS host (optional sidecar).
set -e

INTERVAL="${CLEANUP_INTERVAL:-43200}"
CONTAINER="${TARGET_CONTAINER:-sai-durga-app}"

if [ -S /var/run/docker.sock ]; then
  apk add --no-cache docker-cli >/dev/null 2>&1 || true
  while true; do
    echo "[ops-cleanup] Running cleanup in $CONTAINER $(date 2>/dev/null || date)"
    docker exec "$CONTAINER" /app/scripts/cleanup.sh --report 2>/dev/null || \
      echo "[ops-cleanup] WARN: could not exec cleanup (container may be starting)"
    sleep "$INTERVAL"
  done
else
  echo "[ops-cleanup] No docker.sock — cleanup handled by in-app startup scheduler"
  sleep infinity
fi
