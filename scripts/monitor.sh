#!/bin/sh
# Resource monitor — warns when container limits are exceeded.
set -e

QUIET=0
for arg in "$@"; do
  case "$arg" in
    --quiet) QUIET=1 ;;
  esac
done

log() { [ "$QUIET" -eq 0 ] && echo "[monitor] $*"; }
warn() { echo "[monitor] WARNING: $*"; }
critical() { echo "[monitor] CRITICAL: $*"; }

LIMIT_CACHE_MB=100
LIMIT_TMP_MB=50
LIMIT_APP_MB=1024
WARN=0
CRIT=0

dir_size_mb() {
  if [ -d "$1" ]; then
    du -sm "$1" 2>/dev/null | awk '{print $1}'
  else
    echo 0
  fi
}

check_dir() {
  name="$1"
  path="$2"
  limit="$3"
  mb=$(dir_size_mb "$path")
  if [ "$mb" -gt "$limit" ]; then
    critical "$name is ${mb}MB (limit ${limit}MB)"
    CRIT=1
  elif [ "$mb" -gt $((limit * 80 / 100)) ]; then
    warn "$name is ${mb}MB (80% of ${limit}MB limit)"
    WARN=1
  else
    log "OK $name ${mb}MB"
  fi
}

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
APP_ROOT="${APP_ROOT:-$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)}"

check_dir "cache" "$APP_ROOT/.next/cache" "$LIMIT_CACHE_MB"
check_dir "tmp" "/tmp" "$LIMIT_TMP_MB"
check_dir "app" "$APP_ROOT" "$LIMIT_APP_MB"

if [ -r /proc/meminfo ]; then
  MEM_TOTAL_KB=$(awk '/MemTotal:/ {print $2}' /proc/meminfo)
  MEM_AVAIL_KB=$(awk '/MemAvailable:/ {print $2}' /proc/meminfo)
  MEM_USED_MB=$(((MEM_TOTAL_KB - MEM_AVAIL_KB) / 1024))
  if [ "$MEM_USED_MB" -gt 400 ]; then
    warn "memory pressure ${MEM_USED_MB}MB used"
    WARN=1
  else
    log "OK memory ~${MEM_USED_MB}MB used"
  fi
fi

if [ -r /proc/self/status ]; then
  FD_COUNT=$(awk '/open files:/ {print $4}' /proc/self/status 2>/dev/null || echo 0)
  if [ "${FD_COUNT:-0}" -gt 500 ] 2>/dev/null; then
    warn "high open file descriptors: $FD_COUNT"
    WARN=1
  fi
fi

HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:${PORT:-3000}/}"
if command -v wget >/dev/null 2>&1; then
  if ! wget -qO- "$HEALTH_URL" >/dev/null 2>&1; then
    critical "healthcheck failed for $HEALTH_URL"
    CRIT=1
  fi
elif command -v node >/dev/null 2>&1; then
  if ! node -e "fetch('$HEALTH_URL').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))" 2>/dev/null; then
    critical "healthcheck failed for $HEALTH_URL"
    CRIT=1
  fi
fi

if [ "$CRIT" -eq 1 ]; then
  log "Recommend: $SCRIPT_DIR/cleanup.sh --report"
  exit 2
fi

if [ "$WARN" -eq 1 ]; then
  log "Recommend: $SCRIPT_DIR/cleanup.sh"
  exit 1
fi

log "All checks passed"
exit 0
