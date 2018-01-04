const path = require("path")
const webpack = require("webpack")

module.exports = {
  name: "frontend",
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist")
  },
  plugins: [
    new webpack.DefinePlugin({
      BASE_URL: "'http://localhost:3000'",
      BASE_SOCKET_URL: "'ws://localhost:3000/cable'"
    })
  ]
}
