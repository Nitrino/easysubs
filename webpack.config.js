const path = require('path');

module.exports = {
  entry: './src/inject.js',
  output: {
    filename: 'inject.js',
    path: path.resolve(__dirname, 'dist/inject')
  }
};