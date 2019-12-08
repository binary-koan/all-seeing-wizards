const { uniq } = require("lodash")
const { title, run, exec, fatal } = require("../utils")
const { ENVIRONMENTS } = require("../config")

module.exports = function(environment, ...apps) {
  const environmentConfig = ENVIRONMENTS[environment]

  if (!environmentConfig) {
    fatal(`Expected an environment as the first argument (one of ${Object.keys(ENVIRONMENTS)})`)
  }

  if (apps.length === 0) {
    apps = ["api", "client"]
  }

  if (environment === "staging") {
    branch = branch || "master"
  }

  apps.forEach(app => {
    title(`Building docker container for ${app}`)
    run("docker", [
      "build",
      "-f",
      `dokku/files/${app}.dockerfile`,
      "-t",
      `dokku/${app}:latest`,
      "."
    ])
  })

  apps.forEach(app => {
    const serverConfigs = uniq(environmentConfig[app].map(config => config.server))

    serverConfigs.forEach(server => {
      title(`Uploading ${app} container to ${server.location}`)
      exec(
        `docker save dokku/${app}:latest | bzip2 | ssh ${server.superuser}@${server.location} "bunzip2 | sudo docker load"`
      )
    })
  })

  apps.forEach(app => {
    environmentConfig[app].forEach(config => {
      title(`Deploying ${app} to ${config.app} on ${config.server.location}`)
      if (config.app !== app) {
        run("ssh", [
          `${config.server.superuser}@${config.server.location}`,
          `sudo docker tag dokku/${app}:latest dokku/${config.app}:latest`
        ])
      }
      run("ssh", [`dokku@${config.server.location}`, "tags:deploy", config.app, "latest"])
    })
  })
}
