const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
  entry: "./src/main.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: { loader: "esbuild-loader", options: { loader: "tsx", target: "es2015" } }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset"
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ["dist"] }),
    new HtmlWebpackPlugin({
      template: "index.html"
    })
  ],
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist")
  }
}
