const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BomPlugin = require("webpack-utf8-bom");
const webpack = require("webpack");

module.exports = (env) => ({
  mode: env.production ? "production" : "development",
  devtool: env.production ? false : "inline-source-map",
  entry: {
    inject: "./src/inject.ts",
    background: "./src/background.ts",
    browser_action: "./src/browser_action.tsx",
    styles: "./src/css/styles.scss",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"],
    fallback: {
      stream: require.resolve("stream-browserify"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ["source-map-loader"],
        enforce: "pre",
      },
      {
        test: /\.(scss|css)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(
                __dirname,
                env.production ? "release" : "dist"
              ),
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.svg$/,
        exclude: /(node_modules)/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, env.production ? "release" : "dist"),
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: "browser_action.html",
      template: "src/browser_action.html",
      inject: false,
    }),
    new CopyPlugin({
      patterns: [
        { from: "manifest.json", to: "." },
        { from: "icons", to: "icons" },
        { from: "_locales", to: "_locales" },
      ],
    }),
    new BomPlugin(true),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
  ],
  optimization: {
    minimize: env.production,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
});
