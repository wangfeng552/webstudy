var fs = require('fs')

// 异步读取

fs.readFile('text.txt',function(err,data){
    if(err){
        return console.error(err)
    }
    console.log(data.toString())
})