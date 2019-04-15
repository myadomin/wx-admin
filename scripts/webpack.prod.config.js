
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const webpackConfigProd = {
  output: {
    // 必须用chunkhash 否则vendor每次打包后hash都会变化就无法缓存了
    filename: '[name].[chunkhash].js',
    // 打包后 引用任何文件都是./(index.html的同级目录)
    publicPath: './'
  },
  plugins: [
    // 压缩优化代码
    new webpack.optimize.UglifyJsPlugin({ minimize: true })
    // 分析代码
    // new BundleAnalyzerPlugin({ analyzerPort: 3011 })
  ],
  devtool: 'source-map'
}

module.exports = (env) => {
  webpackConfigProd.plugins.push(new webpack.DefinePlugin({
    // react源码判断process.env.NODE_ENV是development还是production做相应的优化
    'process.env.NODE_ENV': JSON.stringify('production'),
    // npm run dev 进入webpack.dev.config, SERVER是localhost
    // npm run build-test，通过--env=testserver传参 SERVER是testserver
    // npm run build-www，通过--env=prodserver传参 SERVER是wwwserver
    // 在业务代码中通过 SERVER 判断是本地开发还是测试服环境还是生产服环境
    SERVER: JSON.stringify(env)
  }))
  return merge(webpackConfigBase, webpackConfigProd)
}
