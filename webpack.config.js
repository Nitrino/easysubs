const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/inject.ts',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [{
      use: 'ts-loader',
      exclude: /node_modules/
    },
    {
      test: /\.js$/,
      use: ["source-map-loader"],
      enforce: "pre"
    }
    ],
  },
  output: {
    filename: 'inject.js',
    path: path.resolve(__dirname, 'dist/inject')
  },
};
