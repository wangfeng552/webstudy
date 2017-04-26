var webpack=require("webpack");
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports={
    //插件项
    plugins:[commonsPlugin],

    //页面入口文件配置  即入口文件最终要生成什么名字的文件
    entry:{
        index:"./src/js/page/index.js",
        page1: "./page1",
        //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
        page2: ["./entry1", "./entry2"]
    },
    //页面入口输出配置  存放到哪里
    output:{
        path:'dist/js/page',
        filename:"[name].bundle.js"
    },

    module:{
        //加载器配置
        loaders:[
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //.js 文件使用 jsx-loader 来编译处理
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    //其他解决方案配置
    resolve: {
        //查找module的话从这里开始查找
        root: 'E:/github/flux-example/src', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
}


//1.plugins 是插件项，这里我们使用了一个 CommonsChunkPlugin 的插件，它用于提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用。

//2.entry 是页面入口文件配置，output 是对应输出项配置（即入口文件最终要生成什么名字的文件、存放到哪里），其语法大致为：
//该段代码最终会生成一个index.bundle.js / page1.bundle.js 和 page2.bundle.js，并存放到 ./dist/js/page 文件夹下。

/*
 3.module.loaders 是最关键的一块配置。它告知 webpack 每一种文件都需要使用什么加载器来处理：
 "-loader"其实是可以省略不写的，多个loader之间用“!”连接起来。
 注意所有的加载器都需要通过 npm 来加载，并建议查阅它们对应的 readme 来看看如何使用。
 拿最后一个 url-loader 来说，它会将样式中引用到的图片转为模块来处理，使用该加载器需要先进行安装：
 npm install url-loader -save-dev
 配置信息的参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式（其实应该说超过8kb的才使用 url-loader 来映射到文件，否则转为data url形式）。
 */

4.
