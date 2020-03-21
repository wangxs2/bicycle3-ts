const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin') //Gzip
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  publicPath: './', // 部署项目路径
  devServer: {
    port: 8083, // 端口号
    open: false, //配置自动启动浏览器
    proxy: {
      '/kindnessplatform': {
        // target: 'http://47.100.200.255:9966/kindnessplatform', // 线上
        // target: 'http://47.100.200.255:19955/kindnessplatform',  // 测试
        target: 'https://medicalsupplies.sitiits.com/kindnessplatform',  // 测试
        changeOrigin: true,
        pathRewrite: {
          '^/kindnessplatform': '/'
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@img', resolve('src/assets/image'))
  },
  configureWebpack: {
      //生产环境
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'windows.jQuery': 'jquery'
        })
      ]
      
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/common/scss/index.scss";`
      },
    }
  }
}
