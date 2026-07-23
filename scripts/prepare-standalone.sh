#!/bin/sh
# Copy public/ and .next/static into the standalone output folder.
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STANDALONE="$ROOT/.next/standalone"

if [ ! -f "$STANDALONE/server.js" ]; then
  echo "[prepare-standalone] ERROR: $STANDALONE/server.js not found — run npm run build first"
  exit 1
fi

log() { echo "[prepare-standalone] $*"; }

log "Copying public/ → standalone/"
rm -rf "$STANDALONE/public"
cp -r "$ROOT/public" "$STANDALONE/public"

log "Copying .next/static → standalone/.next/static"
mkdir -p "$STANDALONE/.next"
rm -rf "$STANDALONE/.next/static"
cp -r "$ROOT/.next/static" "$STANDALONE/.next/static"

log "Copying ops scripts → standalone/scripts/"
rm -rf "$STANDALONE/scripts"
cp -r "$ROOT/scripts" "$STANDALONE/scripts"
chmod +x "$STANDALONE/scripts"/*.sh 2>/dev/null || true

mkdir -p "$STANDALONE/.next/cache" "$ROOT/logs"

log "Ready: $STANDALONE ($(du -sh "$STANDALONE" 2>/dev/null | awk '{print $1}'))"
