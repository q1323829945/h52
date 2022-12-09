// const path = require('path')
// const resolve = function (dir) {
//   return path.join(__dirname, dir)
// }

const path = require('path')
const resolve = function (dir) {
  return path.join(__dirname, dir)
}

const isProd = ['production', 'uat'].includes(process.env.VUE_APP_ENV) // 是否生产环境

console.log('运行环境==', process.env.VUE_APP_ENV)

module.exports = {
  // assetsDir: "static",
  publicPath: `.${process.env.VUE_APP_BASEURLPATH}`,
  transpileDependencies: ['vue-clamp', 'resize-detector'],
  outputDir: `dist${process.env.VUE_APP_BASEURLPATH}`,
  assetsDir: 'static',
  lintOnSave: true, // 是否开启eslint保存检测
  // 在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件
  pages: undefined,
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  parallel: require('os').cpus().length > 1,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  },
  chainWebpack: config => {
    config.resolve.symlinks(true)
    config.plugins.delete('prefetch').delete('preload').end()
    config.module.rule('svg').exclude.add(path.resolve('src/assets/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.resolve
      .set('symlinks', false) // https://github.com/vuejs/vue-cli/issues/2675
      .extensions.merge(['.js', '.jsx', '.vue', '.json'])
      .end()

    // 路径起别名，便于简写
    config.resolve.alias
      .set('@', resolve('src'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
      .set('assets', path.resolve('src/assets'))
      .set('styles', path.resolve('src/assets/styles'))
      .set('images', path.resolve('src/assets/images'))
      .set('utils', resolve('src/utils'))
      .end()

    // 打包分割
    config.optimization.splitChunks({
      //缓存组，将所有加载模块放在缓存里面一起分割打包
      cacheGroups: {
        assetsImg: {
          name: 'assetsImg',
          test: /[\\/]src\/assets[\\/]_?(images)(.*)/,
          chunks: 'all', //async异步代码分割 initial同步代码分割 all同步异步分割都开启
          priority: 90, //优先级，先打包到哪个组里面，值越大，优先级越高
          reuseExistingChunk: true, //模块嵌套引入时，判断是否复用已经被打包的模块
          enforce: true
        }
      }
    })
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 8192, esModule: false }))
    config.plugin('html').tap(args => {
      args[0].noProd = !isProd
      return args
    })
  },
  devServer: {
    // host: 'localhost',
    disableHostCheck: true,
    port: process.env.VUE_APP_PORT || '3000',
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器  open: 'Google Chrome'-默认启动谷歌
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/': {
        target: process.env.VUE_APP_SERVERURL,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/': '/'
        }
      }
    }
  }
}
