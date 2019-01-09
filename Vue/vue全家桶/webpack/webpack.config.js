var webpack = require('webpack');
module.exports={
    entry:{
        page1:"./js/main.js",
        page2:"./js/shop.js"
    },
    output: {
        filename: 'dist/[name].js'
    },
}