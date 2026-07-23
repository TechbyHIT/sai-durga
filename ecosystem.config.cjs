/**
 * PM2 config — run the Next.js standalone server (no Docker).
 *
 * Single site (default port 3002):
 *   npm run build && npm run prepare:standalone && pm2 start ecosystem.config.cjs
 *
 * Multi-site on one VPS (one port per clone):
 *   PORT=3003 PM2_APP_NAME=sai-durga-2 pm2 start ecosystem.config.cjs
 */
const path = require("path");

const appRoot = path.resolve(__dirname, ".next/standalone");
const appName = process.env.PM2_APP_NAME || "sai-durga";
const port = Number(process.env.PORT || 3002);

module.exports = {
  apps: [
    {
      name: appName,
      cwd: appRoot,
      script: "server.js",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      kill_timeout: 5000,
      listen_timeout: 10000,
      env: {
        NODE_ENV: "production",
        PORT: port,
        HOSTNAME: "0.0.0.0",
        NEXT_TELEMETRY_DISABLED: "1",
        NEXT_IMAGE_UNOPTIMIZED: process.env.NEXT_IMAGE_UNOPTIMIZED || "1",
        NEXT_PUBLIC_SITE_URL:
          process.env.NEXT_PUBLIC_SITE_URL || "https://saidurgainvisiblegrills.in",
        NODE_OPTIONS: process.env.NODE_OPTIONS || "--max-old-space-size=384",
      },
      error_file: path.join(__dirname, "logs/pm2-error.log"),
      out_file: path.join(__dirname, "logs/pm2-out.log"),
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    },
  ],
};
