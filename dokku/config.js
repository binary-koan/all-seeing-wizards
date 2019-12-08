const SERVERS = {
  app: { location: "apps.mingard.io", superuser: "root" }
}

const ENVIRONMENTS = {
  production: {
    api: [{ server: SERVERS.app, app: "asw-api" }],
    client: [{ server: SERVERS.app, app: "asw" }]
  }
}

module.exports = { SERVERS, ENVIRONMENTS }
