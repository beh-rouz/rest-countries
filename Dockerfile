FROM node:tls-aplpine as base

RUN apk update && apk upgrade && apk add dumb-init && adduser -D nuxtuser
RUN npm i -g pnpm

USER nuxtuser

FROM base as dependencies

WORKDIR /app
COPY --chown=nuxtuser package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base AS build

WORKDIR /app
COPY . .
COPY --chown=nuxtuser --from=dependencies /app/node_modules ./node_modules
RUN pnpm build
RUN pnpm prune --prod

FROM base AS deploy

WORKDIR /app
COPY --chown=nuxtuser --from=build /app/.output ./
EXPOSE 8080

ENV HOST=0.0.0.0 PORT=8080 NODE_ENV=production

CMD ["dumb-init", "node", "/app/server/index.mjs"]
