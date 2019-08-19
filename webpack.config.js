const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/inject.js',
  output: {
    filename: 'inject.js',
    path: path.resolve(__dirname, 'dist/inject')
  }
};