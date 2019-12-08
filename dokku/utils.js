const { spawnSync, execSync } = require('child_process')
const magenta = (text) => `\x1b[35m${text}\x1b[0m`
const yellow = (text) => `\x1b[33m${text}\x1b[0m`
const red = (text) => `\x1b[31m${text}\x1b[0m`

module.exports.title = (text) => {
  console.log(magenta(`\n# ${text}\n`))
}

module.exports.fatal = (message, status = 1) => {
  console.log(red(message))
  process.exit(status)
}

module.exports.run = (command, args = []) => {
  console.log(yellow(`> RUN ${command} ${formatArgs(args)}`))
  const result = spawnSync(command, args, { stdio: 'inherit' })

  if (result.status !== 0) {
    module.exports.fatal(
      `Command appears to have failed (exited with code ${result.status})`,
      result.status
    )
  }
}

module.exports.exec = (command) => {
  console.log(yellow(`> EXEC ${command}`))
  execSync(command)
}

const formatArgs = (args) =>
  args.map((arg) => (/\s/.test(arg) ? JSON.stringify(arg) : arg)).join(' ')
