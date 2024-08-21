FROM node:20 AS node

FROM node AS base
RUN npm install -g pnpm@9.0.6

FROM base AS builder
WORKDIR /app
RUN npm install -g turbo@2.0.12
COPY . .
RUN turbo prune backend --docker

FROM base AS installer
WORKDIR /app

# Install dependencies
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 expressjs \
 && adduser --system --uid 1001 expressjs
USER expressjs

COPY --from=installer --chown=expressjs:expressjs /app .

EXPOSE 8080
CMD ["pnpm", "--filter", "backend", "start:prod:bun"]

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -f http://localhost:8080/api/v1/health || exit 1
