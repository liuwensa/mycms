/**
 * Created by admin on 2017/6/12.
 */

'use strict';

const path    = require('path');
const webpack = require('webpack');

const pathJoin = (p) => path.join(__dirname, p);

module.exports = {
  entry  : pathJoin('./src/main.js'),
  output : {
    path    : path.resolve(__dirname, '../server/public'),
    filename: "build.js"
  },
  resolve: {
    extensions: ['', '.js', '.vue']
  },
  module : {
    loaders: [
      {test: /\.vue$/, loader: 'vue-loader'},
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/}
    ]
  },
  vue    : {
    loaders: {
      js: 'babel'
    }
  },
  babel  : {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
