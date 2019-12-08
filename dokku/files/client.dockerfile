FROM node:12.4
ARG NODE_ENV=production

RUN mkdir -p /tmp/asw/client
RUN mkdir -p /tmp/asw/api
WORKDIR /tmp/asw
COPY client/package.json client/
COPY package.json yarn.lock tsconfig.json ./
RUN yarn install --frozen-lockfile --production=false --silent
COPY client /tmp/asw/client
COPY common /tmp/asw/common
RUN yarn workspace client run build

FROM nginx:1.17
COPY dokku/files/single-page-app-nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /tmp/asw/client/dist /usr/share/nginx/html
