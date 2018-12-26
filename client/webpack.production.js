const merge = require("webpack-merge")
const common = require("./webpack.common.js")

const TerserPlugin = require("terser-webpack-plugin")

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      })
    ]
  }
})
