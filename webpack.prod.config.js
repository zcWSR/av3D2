const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: {
    index: './src/index.js'
    // vendor: ['three']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      warnings: false
    }),
    new webpack.DefinePlugin({
      'window.env': {
        ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'], // manifest：不再重复打包vendor.js影响速度
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      ),
      filename: '[name].[hash].js'
    }),
    new ExtractTextPlugin('style.[hash].css'),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new BundleAnalyzerPlugin()
  ]
};
