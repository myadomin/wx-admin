const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')

const webpackConfigDev = {
  output: {
    // webpack-dev-server不能用chunkhash 只能用hash
    filename: '[name].[hash].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      // react源码入口会判断process.env.NODE_ENV是development还是production做优化处理
      // 定义process.env.NODE_ENV让react源码读取 这里的process.env.NODE_ENV只可以在react源码及项目业务组件中读取
      'process.env.NODE_ENV': JSON.stringify('development'),
      SERVER: JSON.stringify('localhost')
    }),
    // 控制台打印
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        // 通过 npm script cross-env NODE_ENV=abc 传参数，这个参数只能在webpack配置中读取到
        messages: [`PROXY_ENV: ${process.env.PROXY_ENV}`],
        notes: ['Some additionnal notes to be displayed unpon successful compilation']
      },
      onErrors: function (severity, errors) {
      }
    })
  ],
  // dev环境用eval-source-map prod环境用source-map
  devtool: 'eval-source-map',
  devServer: {
    host: 'localhost',
    port: 8200,
    open: true,
    quiet: true,
    // 本地开发跨域请求设置
    proxy: {
      // '/api/*': {
      //     target: 'http://beeossdev.egtest.cn:7777',
      //     changeOrigin: true
      // }
    }
  }
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
