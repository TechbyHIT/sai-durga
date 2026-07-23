#!/bin/sh
# Automatic cache and temp cleanup — safe for production containers.
set -e

QUIET=0
STARTUP=0
REPORT=0
for arg in "$@"; do
  case "$arg" in
    --quiet) QUIET=1 ;;
    --startup) STARTUP=1 ;;
    --report) REPORT=1 ;;
  esac
done

log() { [ "$QUIET" -eq 0 ] && echo "[cleanup] $*"; }

MAX_CACHE_MB=100
MAX_TMP_MB=50
MAX_AGE_HOURS=72

dir_size_mb() {
  if [ -d "$1" ]; then
    du -sm "$1" 2>/dev/null | awk '{print $1}'
  else
    echo 0
  fi
}

prune_old_files() {
  dir="$1"
  hours="$2"
  if [ -d "$dir" ]; then
    find "$dir" -type f -mmin +"$((hours * 60))" -delete 2>/dev/null || true
    find "$dir" -type d -empty -delete 2>/dev/null || true
  fi
}

prune_if_oversized() {
  dir="$1"
  limit_mb="$2"
  size=$(dir_size_mb "$dir")
  if [ "$size" -gt "$limit_mb" ]; then
    log "Pruning $dir (${size}MB > ${limit_mb}MB)"
    find "$dir" -type f 2>/dev/null | head -n 200 | while read -r f; do
      rm -f "$f" 2>/dev/null || true
    done
    find "$dir" -type d -empty -delete 2>/dev/null || true
  fi
}

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
APP_ROOT="${APP_ROOT:-$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)}"

CACHE_DIR="${CACHE_DIR:-$APP_ROOT/.next/cache}"
TMP_DIR="${TMP_DIR:-/tmp}"
VAR_TMP="${VAR_TMP:-/var/tmp}"

prune_old_files "$CACHE_DIR" "$MAX_AGE_HOURS"
prune_old_files "$TMP_DIR" 24
prune_old_files "$VAR_TMP" 24
prune_if_oversized "$CACHE_DIR" "$MAX_CACHE_MB"
prune_if_oversized "$TMP_DIR" "$MAX_TMP_MB"

CACHE_MB=$(dir_size_mb "$CACHE_DIR")
TMP_MB=$(dir_size_mb "$TMP_DIR")

if [ "$REPORT" -eq 1 ] || [ "$STARTUP" -eq 1 ]; then
  log "Report: cache=${CACHE_MB}MB tmp=${TMP_MB}MB at $(date 2>/dev/null || echo now)"
fi
