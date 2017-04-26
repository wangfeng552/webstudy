var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                // vue-loader 选项在这里配置
                //独立css文件
                options: {
                    loaders:{
                        sass: ExtractTextPlugin.extract({
                            loader: ['css-loader', 'sass-loader'],
                            fallbackLoader: 'vue-style-loader'
                        })
                        // css: ExtractTextPlugin.extract({ fallbackLoader: 'vue-style-loader', loader: 'css-loader!sass-loader'})
                    }
                }
                //内嵌在网页的css
               /* options: {
                    loaders:  {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this nessessary.
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }*/
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash:8]'
                }
            }
        ]
    },
    plugins: [new ExtractTextPlugin({ filename: 'wf.min.css', allChunks: true })],
    /*resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },*/
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
