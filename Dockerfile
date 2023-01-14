FROM node:18 AS builder
ARG NODE_ENV=production

RUN mkdir -p /app/client
WORKDIR /app
COPY client/package.json client/
COPY package.json yarn.lock tsconfig.json ./
RUN yarn install --frozen-lockfile --production=false --silent
COPY client /app/client
COPY common /app/common
RUN yarn workspace client run build

FROM node:18-alpine
ARG NODE_ENV=production

WORKDIR /app

RUN apk --no-cache add --virtual builds-deps build-base python3

COPY package.json yarn.lock tsconfig.json ./
RUN mkdir -p /app/api
COPY api/package.json ./api/package.json
RUN yarn install --frozen-lockfile --production=false --silent

COPY api ./api
COPY common ./common

COPY --from=builder /app/client/dist /app/static

ENV STATIC_PATH=/app/static

CMD yarn workspace api start
