const path = require("path")
const glob = require("glob")

const appsPath = path.resolve(__dirname, "apps")
const frontendApps = glob.sync(appsPath + "/*/webpack.config.js")

module.exports = frontendApps.map(configFile => require(configFile))
