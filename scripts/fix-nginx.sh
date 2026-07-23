#!/bin/sh
# Fix Nginx 502 — point domain to PM2 app on port 3002.
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DOMAIN="${DOMAIN:-saidurgainvisiblegrills.in}"
PORT="${PORT:-3002}"

log() { echo "[fix-nginx] $*"; }

if [ "$(id -u)" -ne 0 ]; then
  SUDO="sudo"
else
  SUDO=""
fi

log "Checking app on 127.0.0.1:$PORT"
if ! curl -sf "http://127.0.0.1:$PORT/" >/dev/null; then
  log "ERROR: app not responding on port $PORT — run: pm2 restart sai-durga"
  exit 1
fi
log "App OK on port $PORT"

log "Installing nginx site config"
$SUDO cp "$ROOT/nginx-pm2.conf" "/etc/nginx/sites-available/$DOMAIN"
$SUDO ln -sf "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/$DOMAIN"
$SUDO rm -f /etc/nginx/sites-enabled/default

if [ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
  log "No SSL cert yet — getting certificate for $DOMAIN only"
  $SUDO certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m invisiblegrillssaidurga@gmail.com --redirect || true
fi

log "Testing nginx config"
$SUDO nginx -t
$SUDO systemctl reload nginx

log "Testing HTTP"
curl -I "http://$DOMAIN/" 2>/dev/null | head -5 || true

log "Testing HTTPS"
curl -Ik "https://$DOMAIN/" 2>/dev/null | head -5 || true

log "Done. Open https://$DOMAIN/"
