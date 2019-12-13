const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = env => ({
  mode: env,
  devtool: env === "production" ? false : "inline-source-map",
  entry: {
    inject: "./src/inject.ts",
    background: "./src/background.ts",
    browser_action: "./src/browser_action.tsx",
    styles: "./src/css/styles.scss"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        use: ["babel-loader", "ts-loader"]
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      }
    ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, env === "production" ? "release" : "dist")
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "styles",
      path: path.resolve(__dirname, env === "production" ? "release" : "dist")
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html"
    }),
    new HtmlWebpackPlugin({
      filename: "browser_action.html",
      template: "src/browser_action.html",
      inject: false
    }),
    new CopyPlugin([
      { from: "manifest.json", to: "." },
      { from: "icons", to: "icons" },
      { from: "_locales", to: "_locales" }
    ])
  ]
});
