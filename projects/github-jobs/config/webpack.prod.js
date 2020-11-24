const { merge } = require('webpack-merge');
const { url, baseurl } = require('@frontend/site-meta');

const paths = require('./paths');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',

  target: 'browserslist',

  devtool: false,

  output: {
    path: paths.build,
    filename: 'js/[name].[contenthash].bundle.js',
    publicPath: `${url}${baseurl}/github-jobs`,
  },

  optimization: {
    minimize: true,
    runtimeChunk: {
      name: 'runtime',
    },
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
