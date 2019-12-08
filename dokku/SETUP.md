# Deploying with Dokku

[Dokku](http://dokku.viewdocs.io) is an open-source Heroku clone built on Docker, which makes it
easy to deploy and run multiple apps using either Dockerfiles or Heroku buildpacks (we use Dockerfiles).

## Server creation

Create a DigitalOcean server using the Dokku app in the marketplace, then complete the web installer.
Follow the dokku installation guide, then make sure `dokku/config.js` is pointing to the right server.

## Server setup

> Note: `dokku <command>` can be done with `ssh dokku@staging.tokyocatch.com <command>` on your
> local machine, but `sudo dokku` must be done when SSH'd into the server as a user other than dokku

```bash
# Optimization: Remove temporary containers after `dokku run` commands complete
dokku config:set --global DOKKU_RM_CONTAINER=1

# Install essential plugins
# 1. Allow specifying a custom dockerfile location
sudo dokku plugin:install https://github.com/mimischi/dokku-dockerfile.git
# 2. MongoDB (skip if connecting to MongoDB Atlas)
sudo dokku plugin:install https://github.com/dokku/dokku-mongo.git mongo
# 3. Let's Encrypt for SSL certificates (skip if generating certificates manually)
sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
# Initial setup to allow Let's Encrypt to generate certificates
dokku config:set --global --no-restart DOKKU_LETSENCRYPT_EMAIL=reason.koan@gmail.com

# Create a dokku app for all the servers
dokku apps:create asw-api
dokku apps:create asw

# Set the dockerfile location for each server
dokku dockerfile:set asw-api dokku/files/api.dockerfile
dokku dockerfile:set asw dokku/files/client.dockerfile
# Run any build commands in each dockerfile with the correct NODE_ENV
dokku docker-options:add asw-api build '--build-arg NODE_ENV=production'
dokku docker-options:add asw build '--build-arg NODE_ENV=production'

# Create a database and link it to the api app
# (if connecting to MongoDB Atlas, instead use `dokku config:set MONGO_URL=<url-from-atlas>`)
dokku mongo:create asw
dokku mongo:link asw asw-api
```

## First deploy

Run locally:

```
GIT_BRANCH=some-branch-name yarn dokku deploy production
```

## After the first deploy

```bash
# Set up Let's Encrypt SSL on all web-facing apps
dokku letsencrypt asw-api
dokku letsencrypt asw
```
