
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry:"./src/mobile.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    library: 's3vue',
    libraryTarget:'umd'
  },
  devtool: 'none',

  externals: {
     //'s3Vue':'window.s3vue'
  },
  module: {
      rules: [
        {
          test:/\.vue$/,
          loader:'vue-loader'
        },
        {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};

