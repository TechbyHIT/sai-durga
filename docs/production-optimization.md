# Production Optimization Report — Sai Durga Invisible Grills

Optimized for **10–20 websites on a single 200 GB VPS** with strict disk, RAM, and cache limits.

---

## 1. Optimizations Applied

### Next.js (`next.config.mjs`)
| Change | Why |
|--------|-----|
| `output: "standalone"` | Minimal Docker image (~330 MB traced output vs full node_modules) |
| `productionBrowserSourceMaps: false` | No `.map` files in production |
| `experimental.isrFlushToDisk: false` | **ISR cache stays in RAM** — no unbounded `.next/cache` on disk |
| `NEXT_IMAGE_UNOPTIMIZED=1` | Serves pre-optimized static images; **no runtime image cache** |
| Reduced `deviceSizes` / `imageSizes` | Fewer image variants if optimization is re-enabled |
| `minimumCacheTTL: 7 days` | Shorter TTL if image optimization is enabled later |
| Security headers | `X-Frame-Options`, `Permissions-Policy`, `nosniff` |
| `logging.fetches.fullUrl: false` | Less production log noise |

### Routes (already safe)
| Route | Build-time pages | On-demand |
|-------|------------------|-----------|
| `/[slug]` | ~331 priority slugs (`PRIORITY_LIMITS`) | Yes, but ISR **not flushed to disk** |
| `/locations/[city]` | All cities (~25) | Yes, memory-only ISR |
| `/areas/[area]` | Top 40 areas | Yes, memory-only ISR |
| `/blog/[slug]` | Top 20 posts | Yes, memory-only ISR |
| Sitemaps | 13 bucket files | XML generated in memory, not written to disk |

**No recursive or unlimited `generateStaticParams`.** Long-tail SEO pages render on demand without filling disk.

### Docker (`Dockerfile`)
| Change | Why |
|--------|-----|
| **3-stage build** (deps → builder → runner) | Smaller final image |
| `npm ci` + `npm prune --omit=dev` | No devDependencies in runtime |
| `npm cache clean --force` | No npm cache in image |
| Non-root user `nextjs` (uid 1001) | Security |
| `tini` init | Graceful signal handling |
| `HEALTHCHECK` | Auto-restart unhealthy containers |
| `node server.js` | Standalone server (no npm overhead) |

### Docker Compose (`docker-compose.yml`)
| Change | Why |
|--------|-----|
| `read_only: true` | **Writable layer cannot grow** |
| `tmpfs` on `/app/.next/cache` (100 MB) | Bounded cache; **cleared on restart** |
| `tmpfs` on `/tmp` (50 MB) | Temp files never touch disk layer |
| Log rotation `10m × 3 files` | Max ~30 MB Docker logs |
| Memory limit `512M`, CPU `1.0` | Fair sharing on multi-site VPS |
| `NODE_OPTIONS=--max-old-space-size=384` | V8 heap cap |

### Runtime scripts
| Script | Purpose |
|--------|---------|
| `scripts/startup.sh` | Startup cleanup + background loops + `node server.js` |
| `scripts/cleanup.sh` | Prune cache/tmp; runs every 12h |
| `scripts/monitor.sh` | Warn when limits exceeded; runs every 60s |
| `scripts/healthcheck.sh` | Docker health probe |
| `scripts/monitor-cron.sh` | Sidecar monitor loop |
| `scripts/cleanup-cron.sh` | Sidecar cleanup loop (via docker.sock) |
| `nginx.conf` | Reverse proxy to port 8080 |

### Frontend (already optimized)
- `SiteExploreLinksLazy` — explore block deferred (smaller first paint)
- `prefetch={false}` on sitemap links
- Server-rendered header/footer
- Mobile menu client island only

---

## 2. Performance Report

| Metric | Target | Current |
|--------|--------|---------|
| First Load JS (homepage) | < 150 kB | **121 kB** ✓ |
| Shared JS | < 120 kB | **102 kB** ✓ |
| Build-time static pages | Bounded | **433 pages** ✓ |
| Standalone output | < 400 MB | **~330 MB** ✓ |
| Full `.next` (build only) | ≤ 500 MB | **~841 MB** (build artifact, not shipped) |

**Core Web Vitals helpers:**
- Logo: `priority` + `next/image` with `unoptimized` (no optimizer delay)
- Fonts: `display: swap` via `next/font`
- Below-fold explore section lazy-loaded
- ISR 12h–3d revalidation (low CPU churn)

---

## 3. Security Report

| Control | Status |
|---------|--------|
| Non-root container user | ✓ |
| `read_only` root filesystem | ✓ |
| `no-new-privileges` | ✓ |
| No source maps in production | ✓ |
| Security headers (frame, MIME, referrer) | ✓ |
| `.env` excluded from Docker image | ✓ |
| No world-writable dirs (tmpfs 1777 only on /tmp) | ✓ |

**Recommended:** Add Hostinger firewall, HTTPS via Nginx/Certbot, rate limiting at Nginx layer.

---

## 4. Disk Usage Report

| Location | Build | Runtime (container) |
|----------|-------|-------------------|
| Docker image | — | **≤ 400 MB** (target) |
| Writable layer | — | **~0 MB** (`read_only` + tmpfs) |
| `.next/cache` | N/A at build | **≤ 100 MB tmpfs** (RAM-backed) |
| `/tmp` | — | **≤ 50 MB tmpfs** |
| Docker logs | — | **≤ 30 MB** (10m × 3) |
| Image optimizer cache | — | **0** (`NEXT_IMAGE_UNOPTIMIZED=1`) |

**Why disk will not grow over time:**
1. ISR not flushed to disk
2. Image optimization disabled
3. Read-only container filesystem
4. Cache on tmpfs (ephemeral)
5. Automatic cleanup script on startup

---

## 5. Memory Report

| Setting | Value |
|---------|-------|
| Container memory limit | 512 MB |
| V8 `--max-old-space-size` | 384 MB |
| ISR in-memory cache | ~50 MB (Next.js default) |
| Expected idle RAM | **< 200 MB** |
| Expected under load | 200–400 MB |

---

## 6. VPS Multi-Site Guidance (200 GB)

Per site footprint (this project):
- Image: ~350 MB
- Runtime writable layer: ~0 MB
- Logs: ~30 MB max
- tmpfs cache: 256 MB RAM (not disk)

**20 sites × 350 MB images ≈ 7 GB** — well within 200 GB VPS.

Schedule on VPS host (optional if sidecars unavailable):
```bash
0 3 * * * docker exec sai-durga-app /app/scripts/cleanup.sh --quiet
*/5 * * * * docker exec sai-durga-app /app/scripts/monitor.sh --quiet
```

---

## 7. Deploy on Hostinger

**Compose URL:**
```
https://raw.githubusercontent.com/TechbyHIT/sai-durga/main/docker-compose.yml
```

After deploy:
- App: `http://VPS_IP:8080`
- Domain: point `saidurgainvisiblegrills.in` → Nginx → port 8080
- Use `nginx.conf` on the host (proxy to `127.0.0.1:8080`)

---

## 8. Verification Checklist

- [x] `npm run build` succeeds with standalone output
- [x] `generateStaticParams` bounded (433 build pages)
- [x] ISR disk flush disabled
- [x] Image optimizer disabled in production
- [x] Docker read-only + tmpfs cache
- [x] Log rotation configured
- [x] Healthcheck configured
- [x] Non-root user
- [ ] Docker build on VPS (run after git push)
- [ ] 24h stability test on VPS (monitor script)

---

## 9. Files Changed

```
next.config.mjs          — standalone, ISR, images, security
Dockerfile               — multi-stage production build
docker-compose.yml       — limits, tmpfs, logging, healthcheck, ops sidecars
.dockerignore            — exclude build artifacts
package.json             — start via node server.js
middleware.ts            — security headers, path traversal block
lib/runtimeLimits.ts     — documented limits
scripts/startup.sh       — entrypoint with cleanup + monitor loops
scripts/cleanup.sh       — cache/tmp cleanup
scripts/monitor.sh       — resource monitoring
scripts/healthcheck.sh   — health probe
nginx.conf               — reverse proxy template
.env.example             — production env reference
docs/production-optimization.md — full reports
```
