var webpack=require('webpack');
module.exports={
    entry:{
        index:"./src/js/index.js",
    },
    output:{
        path:'dist/page',
        filename:"[name].bundle.js"
    },
    module:{
        loaders:[
            {test:/\.css$/,loader:'style-loader!css-loader'},
            {test:/\.js$/,loader:'js-loader'}
        ]
    }
}