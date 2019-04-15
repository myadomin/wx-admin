const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = (relatedPath) => path.resolve(__dirname, relatedPath)

const webpackConfigBase = {
  entry: {
    // 一些不常变化的库打包成vendor.js
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'antd', 'babel-polyfill'],
    main: resolve('../src/main.js')
  },
  output: {
    path: resolve('../dist')
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@src': resolve('../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [resolve('../src')],
        // 一定要加这个 否则检测不到
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          options: {
            // 不符合Eslint规则时只console warning(默认false 直接error)
            // emitWarning: true
          }
        }]
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        exclude: [resolve('../node_modules')],
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            // less modules
            modules: true,
            localIdentName: '[name]__[local]__[hash:base64:5]'
          }
        }, 'less-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            // prod的publicPath是'./', 所以build后所有的img src、background url等图片引用目录变为./
            // 例如开发时background: url('../../assets/logo.png')，打包后url会变成./static/logo.png
            name: 'static/[hash:8].[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('../src/index.html')
    }),
    // https://www.jb51.net/article/131865.htm
    // 抽取chunk vendor.js
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
    // vendor.js中变化的部分抽取为manifest.js
    // filename用chunkhash才能保证vendor.hashxxx.js的hash值不变化
    // 然后设置一个长的max-age缓存，之后vendor.hashxxx.js就都是缓存加载了
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
}

module.exports = webpackConfigBase
