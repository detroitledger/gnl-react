var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsConfig = require('./webpack-isomorphic-tools');

var ip = process.env.IP || '0.0.0.0';
var port = (+process.env.PORT + 1) || 3001;
var DEBUG = process.env.NODE_ENV !== 'production';

var config = {
  devtool: DEBUG ? 'inline-source-map' : false,
  entry: [
    'babel-polyfill',
    path.join(__dirname, '../src/client'),
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.[hash].js',
    publicPath: DEBUG ? 'http://' + ip + ':' + port + '/' : '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'" + process.env.NODE_ENV + "'",
        PORT: port,
      }
    }),
  ],
  resolve: {
    modulesDirectories: ['src', 'node_modules'],
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.json/,
        loaders: ['json-loader'],
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?modules&localIdentName=[name]---[local]---[hash:base64:5]',
      },
      {
        test: /\.png$/,
        loader: 'url?prefix=images/&limit=8000&mimetype=image/png',
      },
      {
        test: /\.jpg$/,
        loader: 'url?prefix=images/&limit=8000&mimetype=image/jpeg',
      },
      {
        test: /\.woff$/,
        loader: 'url?prefix=fonts/&limit=8000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf$/,
        loader: 'file?prefix=fonts/',
      },
      {
        test: /\.eot$/,
        loader: 'file?prefix=fonts/',
      },
    ],
  },
};

if (DEBUG) {
  config.entry.unshift(
    'webpack-dev-server/client?http://' + ip + ':' + port + '/',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch'
  );

  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig)
  ]);
} else {
  config.plugins = config.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig),
  ]);
}

module.exports = config;
