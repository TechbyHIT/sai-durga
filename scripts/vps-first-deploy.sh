#!/bin/sh
# First-time VPS setup + deploy for sai-durga (PM2, port 3002, no Docker).
# Run on the VPS as root or a sudo user:
#   curl -fsSL https://raw.githubusercontent.com/TechbyHIT/sai-durga/main/scripts/vps-first-deploy.sh | sh
# Or after clone:
#   chmod +x scripts/vps-first-deploy.sh && ./scripts/vps-first-deploy.sh
set -e

REPO="${REPO:-https://github.com/TechbyHIT/sai-durga.git}"
APP_DIR="${APP_DIR:-/var/www/sai-durga}"
BRANCH="${BRANCH:-main}"
PORT="${PORT:-3002}"
PM2_APP_NAME="${PM2_APP_NAME:-sai-durga}"
DOMAIN="${DOMAIN:-saidurgainvisiblegrills.in}"

log() { echo "[vps-deploy] $*"; }

if [ "$(id -u)" -ne 0 ]; then
  SUDO="sudo"
else
  SUDO=""
fi

log "Installing system packages (Node 22, git, nginx, certbot)..."
if command -v apt-get >/dev/null 2>&1; then
  $SUDO apt-get update -qq
  $SUDO apt-get install -y curl git nginx certbot python3-certbot-nginx
  if ! command -v node >/dev/null 2>&1 || [ "$(node -v | cut -d. -f1 | tr -d v)" -lt 20 ] 2>/dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_22.x | $SUDO bash -
    $SUDO apt-get install -y nodejs
  fi
elif command -v dnf >/dev/null 2>&1; then
  $SUDO dnf install -y curl git nginx certbot python3-certbot-nginx nodejs npm
else
  log "ERROR: unsupported OS — install Node 22+, git, nginx manually"
  exit 1
fi

if ! command -v pm2 >/dev/null 2>&1; then
  log "Installing PM2..."
  $SUDO npm install -g pm2
  pm2 startup systemd -u "${SUDO_USER:-root}" --hp "${HOME}" 2>/dev/null || pm2 startup
fi

log "Cloning/updating repo at $APP_DIR"
$SUDO mkdir -p "$(dirname "$APP_DIR")"
if [ -d "$APP_DIR/.git" ]; then
  cd "$APP_DIR"
  git fetch origin
  git reset --hard "origin/$BRANCH"
else
  $SUDO git clone --branch "$BRANCH" "$REPO" "$APP_DIR"
  cd "$APP_DIR"
fi

if [ ! -f .env ]; then
  cp .env.example .env
  log "Created .env from .env.example"
fi

chmod +x scripts/*.sh

export PORT PM2_APP_NAME
log "Building and starting app on port $PORT..."
./scripts/deploy-pm2.sh

log "Configuring Nginx..."
NGINX_SITE="/etc/nginx/sites-available/$DOMAIN"
if [ -d /etc/nginx/sites-available ]; then
  $SUDO cp nginx-pm2.conf "$NGINX_SITE"
  $SUDO ln -sf "$NGINX_SITE" "/etc/nginx/sites-enabled/$DOMAIN"
  $SUDO rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true
  $SUDO nginx -t
  $SUDO systemctl reload nginx
else
  $SUDO cp nginx-pm2.conf "/etc/nginx/conf.d/$DOMAIN.conf"
  $SUDO nginx -t
  $SUDO systemctl reload nginx
fi

log "Requesting SSL certificate (skip if DNS not pointed yet)..."
if certbot certificates 2>/dev/null | grep -q "$DOMAIN"; then
  $SUDO certbot renew --quiet || true
else
  $SUDO certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos -m "invisiblegrillssaidurga@gmail.com" --redirect || \
    log "WARN: certbot failed — point DNS to this VPS first, then run: sudo certbot --nginx -d $DOMAIN"
fi

log "Done!"
log "  App:  http://127.0.0.1:$PORT/"
log "  Site: https://$DOMAIN/"
log "  PM2:  pm2 status $PM2_APP_NAME"
log "  Logs: pm2 logs $PM2_APP_NAME"
