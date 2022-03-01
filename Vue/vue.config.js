"use strict"
const path = require("path")
const webpack = require("webpack")
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const { inspect } = require("util")
function resolve(dir) {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === "production"
const productionGzipExtensions = ["js", "css"]

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: "Vue",
    "vue-router": "VueRouter",
    vuex: "Vuex",
    axios: "axios",
  },
  css: ["https://unpkg.com/element-ui/lib/theme-chalk/index.css"],
  js: [
    "//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js",
    "//cdn.jsdelivr.net/npm/vue-router@3.3.4/dist/vue-router.min.js",
    "//cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js",
    "//cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js",
  ],
}

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  runtimeCompiler: true,
  publicPath: "/wf/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    hot: true,
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "/api": {
        target: "http://192.168.11.179:9011",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "http://192.168.11.179:9011",
        },
      },
    },
  },
  configureWebpack: (config) => {
    // 开启gzip压缩
    config.plugins.push(
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8,
      })
    )

    // 开发生产共同配置，新增一些别名设置
    Object.assign(config, {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@c": path.resolve(__dirname, "./src/components"),
          "@p": path.resolve(__dirname, "./src/pages"),
          "@v": path.resolve(__dirname, "./src/views"),
        },
      },
    })

    // 生产环境,排除打包
    if (isProd) {
      config.externals = assetsCDN.externals
    }
  },
  chainWebpack(config) {
    // 生产环境下使用CDN
    if (isProd) {
      config.plugin("html").tap((args) => {
        args[0].cdn = assetsCDN
        return args
      })
    }

    // 在项目打包上线后，去除掉代码中所有的console.log
    config.optimization.minimizer("terser").tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })

    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial",
      },
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch")

    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end()
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end() //返回上一级
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end()
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
}

// vue inspect > output.js 导出webpack配置
