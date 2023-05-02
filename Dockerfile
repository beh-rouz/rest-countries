FROM node:18-alpine3.17

RUN apk update && apk upgrade && apk add dumb-init

RUN npm install --global pnpm

COPY .npmrc package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build