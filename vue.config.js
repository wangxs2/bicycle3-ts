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
    port: 8181, // 端口号
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
  configureWebpack: config =>{
      //生产环境
      
      let pluginsPro = [
        new CompressionPlugin({
          //文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
          filename: '[path].gz[query]', // 文件名称
          algorithm: 'gzip', // 压缩方法
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 8192, // 对超过的数据进行压缩
          minRatio: 0.8 // 最小压缩比
        }),
        //	Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
        // new BundleAnalyzerPlugin()
      ]
  
      //开发环境
      let pluginsDev = []
  
      if (process.env.NODE_ENV === 'production') {
        // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
        config.plugins = [...config.plugins, ...pluginsPro]
      } else {
        // 为开发环境修改配置...
        config.plugins = [...config.plugins, ...pluginsDev]
      }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/common/scss/index.scss";`
      },
    }
  }
}
