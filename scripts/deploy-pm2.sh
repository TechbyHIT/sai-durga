#!/bin/sh
# Build, prepare standalone output, optionally prune node_modules, start/reload PM2.
# Usage on VPS:
#   ./scripts/deploy-pm2.sh
#   PRUNE_NODE_MODULES=0 ./scripts/deploy-pm2.sh   # keep node_modules for faster rebuilds
#   PORT=3003 PM2_APP_NAME=site-2 ./scripts/deploy-pm2.sh
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

log() { echo "[deploy-pm2] $*"; }

if ! command -v node >/dev/null 2>&1; then
  log "ERROR: Node.js is required"
  exit 1
fi

if ! command -v pm2 >/dev/null 2>&1; then
  log "ERROR: PM2 is required — install with: npm install -g pm2"
  exit 1
fi

log "Installing dependencies"
if ! npm ci; then
  log "WARN: npm ci failed — syncing lock file with npm install"
  npm install
fi

log "Building production bundle"
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1
npm run build

log "Preparing standalone folder"
"$ROOT/scripts/prepare-standalone.sh"

if [ "${PRUNE_NODE_MODULES:-1}" = "1" ]; then
  BEFORE=$(du -sh "$ROOT/node_modules" 2>/dev/null | awk '{print $1}' || echo "?")
  rm -rf "$ROOT/node_modules"
  log "Removed node_modules (was ~${BEFORE}) — rebuild needs npm ci"
fi

mkdir -p "$ROOT/logs"

if pm2 describe "${PM2_APP_NAME:-sai-durga}" >/dev/null 2>&1; then
  log "Reloading PM2 app ${PM2_APP_NAME:-sai-durga} on port ${PORT:-3002}"
  pm2 reload ecosystem.config.cjs --update-env
else
  log "Starting PM2 app ${PM2_APP_NAME:-sai-durga} on port ${PORT:-3002}"
  pm2 start ecosystem.config.cjs
fi

pm2 save
log "Deploy complete — app on http://127.0.0.1:${PORT:-3002}/"
log "Disk: standalone $(du -sh .next/standalone 2>/dev/null | awk '{print $1}') | .next $(du -sh .next 2>/dev/null | awk '{print $1}')"
