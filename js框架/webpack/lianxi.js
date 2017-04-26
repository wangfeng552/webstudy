var webpack=require("webpack");
var path=require("path");
module.exports({
    entry:{pagr:"./src/sd.js",wfjs:"./src/wf.js"}, //页面入口配置文件
    output:{
        path:"src/js",  //输出的路径地址
        filename:"[name].min.js" //最终输出的文件名 pagr.min.js 和wfjs.min.js 在页面引入
    },
    module:{
        //加载器配置
        loaders:[
            {test:/\.css$/,loader:"style!css"}, //css加载器
            {test:/\.(png|jpg)$/,loader:"url?limit=8192"}//图片加载器
        ]
    }
})