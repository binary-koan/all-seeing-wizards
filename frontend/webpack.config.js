const path = require("path")
const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  name: "frontend",
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("bundle.css"),
    new webpack.DefinePlugin({
      BASE_URL: "'http://localhost:3000'",
      BASE_SOCKET_URL: "'ws://localhost:3000/cable'"
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist")
  }
}
