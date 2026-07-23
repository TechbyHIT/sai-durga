# syntax=docker/dockerfile:1

FROM node:22-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NEXT_IMAGE_UNOPTIMIZED=1
RUN npm run build \
  && npm prune --omit=dev \
  && npm cache clean --force \
  && rm -rf /root/.npm /tmp/* /root/.cache

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_IMAGE_UNOPTIMIZED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NODE_OPTIONS="--max-old-space-size=384"

RUN apk add --no-cache tini libc6-compat \
  && addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/scripts/startup.sh /app/scripts/startup.sh
COPY --from=builder --chown=nextjs:nodejs /app/scripts/cleanup.sh /app/scripts/cleanup.sh
COPY --from=builder --chown=nextjs:nodejs /app/scripts/monitor.sh /app/scripts/monitor.sh
COPY --from=builder --chown=nextjs:nodejs /app/scripts/healthcheck.sh /app/scripts/healthcheck.sh

RUN chmod +x /app/scripts/startup.sh /app/scripts/cleanup.sh /app/scripts/monitor.sh /app/scripts/healthcheck.sh \
  && mkdir -p .next/cache /tmp \
  && chown -R nextjs:nodejs .next/cache /tmp

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD /app/scripts/healthcheck.sh

ENTRYPOINT ["/sbin/tini", "--", "/app/scripts/startup.sh"]
