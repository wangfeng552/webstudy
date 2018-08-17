const nodeExternals = require("webpack-node-externals")
const path = require("path")
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "u2b",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  /*
  ** Build configuration
  */
  build: {
    analyze: true,
    babel: {
      plugins: [
        [
          "import",
          {
            libraryName: "iview",
            libraryDirectory: "src/components"
          }
        ]
      ]
    },
    rules: {
      images: [
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          loader: "url-loader",
          exclude: /(assets\/svg)/,
          query: {
            limit: 100001, // 1KO
            name: "img/[name].[hash:7].[ext]"
          }
        }
      ]
    },
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: "url-loader",
        query: {
          limit: 100002,
          name: "img/[name].[hash].[ext]"
        }
      }
    ],
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient, isServer }) {
      if (isServer) {
        config.externals = [
          nodeExternals({
            // default value for `whitelist` is
            // [/es6-promise|\.(?!(?:js|json)$).{1,5}$/i]
            whitelist: [
              /es6-promise|\.(?!(?:js|json)$).{1,5}$/i,
              /^vue-echarts/,
              /^iview/
            ]
          })
        ]
      }
      Object.assign(config.resolve.alias, {
        Components: path.resolve(__dirname, "components"),
        Plugins: path.resolve(__dirname, "plugins"),
        Assets: path.resolve(__dirname, "assets"),
        Static: path.resolve(__dirname, "static"),
        Api: path.resolve(__dirname, "api")
      })
      if (isDev && isClient) {
        console.log(config.module.rules)
        for (let i = 0; i < config.module.rules.length; i++) {
          const obj = config.module.rules[i]
          console.log(obj.test.toString())
          if (obj.test.toString().indexOf("gif|svg") >= 0) {
            // config.module.rules.splice(i, 1)
          }
        }
        config.module.rules.push(
          ...[
            // {
            //   enforce: "pre",
            //   test: /\.(js|vue)$/,
            //   loader: "eslint-loader",
            //   exclude: /(node_modules)/
            // },
            // {
            //   test: /\.(gif|png|jpe?g|svg)$/i,
            //   loader: "url-loader",
            //   options: {
            //     limit: 10000,
            //     name: "img/[name].[hash].[ext]"
            //   }
            // }
            // {
            //   test: /\.(png|jpe?g|gif|svg)$/,
            //   loader: "url-loader",
            //   options: {
            //     limit: 10000, // 1KO
            //     name: "img/[name].[hash:7].[ext]"
            //   }
            // }
          ]
        )
        console.log(config.module.rules)
      }
    }
  },
  vendor: ["axios", "vue-echarts", "view"],
  css: [
    "iview/dist/styles/iview.css",
    "~/style/reset.css",
    "~/style/common.css",
    "~/style/main.css"
  ],
  plugins: [
    "~/plugins/v-input-range.js",
    "~/plugins/v-transfer-dom.js",
    "~/plugins/globalComponent.js",
    { src: "~/plugins/iview.js", ssr: true },
    { src: "~/plugins/echart.js", ssr: true }
  ],
  modules: ["@nuxtjs/proxy"],
  proxy: [["/app", { target: "http://www.biger.in" }]]
}
