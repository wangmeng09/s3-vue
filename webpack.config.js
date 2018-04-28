
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry:"./src/desktop.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle-desktop.js",
    library: 's3vue',
    libraryTarget:'umd'
  },
  devtool: 'none',
  module: {
      rules: [
        {
          test:/\.vue$/,
          loader:'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    })
  ]
};

