#!/bin/sh
# Healthcheck script — used by Docker HEALTHCHECK and ops-monitor sidecar.
set -e

URL="${HEALTH_URL:-http://127.0.0.1:${PORT:-3000}/}"

if command -v wget >/dev/null 2>&1; then
  wget -qO- "$URL" >/dev/null 2>&1
  exit $?
fi

node -e "fetch('$URL').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
