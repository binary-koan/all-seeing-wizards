const { SERVERS } = require('../config')
const { title, run, fatal } = require('../utils')

module.exports = (server, command, ...args) => {
  const serverConfig = SERVERS[server]

  if (!serverConfig) {
    fatal(`Expected a server as the first argument (one of ${Object.keys(SERVERS)})`)
  }

  title('Running dokku command')
  run('ssh', [`dokku@${serverConfig.location}`, command, ...args])
}
