const fs = require('fs')
const { fatal } = require('./utils')

const [command, ...args] = process.argv.slice(2)

if (fs.existsSync(`${__dirname}/commands/${command}.js`)) {
  require(`./commands/${command}`)(...args)
} else {
  fatal('Expected a known command as the first argument (look in `commands/`)')
}
