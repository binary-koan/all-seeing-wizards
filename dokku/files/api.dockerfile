FROM node:12-alpine
ARG NODE_ENV=production

WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app/api

RUN apk --no-cache add --virtual builds-deps build-base python

COPY package.json yarn.lock tsconfig.json ./
COPY api/package.json ./api/package.json
RUN yarn install --frozen-lockfile --production=false --silent

COPY api ./api
COPY common ./common

CMD yarn workspace api start
