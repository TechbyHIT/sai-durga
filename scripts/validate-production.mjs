#!/usr/bin/env node
/**
 * Production validation — run after build to verify bounded routes and config.
 * Usage: node scripts/validate-production.mjs
 */
import { readFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const errors = [];
const warnings = [];
const ok = [];

function check(name, pass, detail) {
  if (pass) ok.push(`✓ ${name}: ${detail}`);
  else errors.push(`✗ ${name}: ${detail}`);
}

function warn(name, detail) {
  warnings.push(`! ${name}: ${detail}`);
}

const nextConfig = readFileSync(join(ROOT, "next.config.mjs"), "utf8");
check("standalone output", nextConfig.includes('output: "standalone"'), "enabled");
check("ISR disk flush disabled", nextConfig.includes("isrFlushToDisk: false"), "enabled");
check("no source maps", nextConfig.includes("productionBrowserSourceMaps: false"), "disabled");

const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
check("start script", pkg.scripts.start === "node server.js", pkg.scripts.start);
check("build script", typeof pkg.scripts.build === "string", "present");

const compose = readFileSync(join(ROOT, "docker-compose.yml"), "utf8");
check("read_only container", compose.includes("read_only: true"), "enabled");
check("log rotation", compose.includes('max-size: "10m"'), "10m x 3");
check("tmpfs cache", compose.includes("/app/.next/cache"), "100m cap");
check("ops-monitor sidecar", compose.includes("ops-monitor"), "present");
check("memory limit", compose.includes("memory: 512M"), "512M");

const standaloneDir = join(ROOT, ".next", "standalone");
if (existsSync(standaloneDir)) {
  let bytes = 0;
  const walk = (dir) => {
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, ent.name);
      if (ent.isDirectory()) walk(p);
      else bytes += statSync(p).size;
    }
  };
  walk(standaloneDir);
  const mb = Math.round(bytes / 1024 / 1024);
  check("standalone size", mb <= 400, `${mb}MB (limit 400MB)`);
} else {
  warn("standalone", "run npm run build first");
}

const requiredScripts = ["startup.sh", "cleanup.sh", "monitor.sh", "healthcheck.sh"];
for (const s of requiredScripts) {
  check(`script ${s}`, existsSync(join(ROOT, "scripts", s)), "exists");
}

console.log("\n=== Production Validation ===\n");
ok.forEach((l) => console.log(l));
warnings.forEach((l) => console.log(l));
errors.forEach((l) => console.log(l));
console.log(`\n${ok.length} passed, ${warnings.length} warnings, ${errors.length} errors\n`);
process.exit(errors.length > 0 ? 1 : 0);
