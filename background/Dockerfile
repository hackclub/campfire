FROM oven/bun:1 AS base

FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
COPY prisma ./prisma
RUN bun install --frozen-lockfile

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bunx prisma generate

CMD ["sh", "-c", "bunx prisma migrate deploy && bun run start"]
