var fs = require("fs")
var data = ""

// 从流中读取数据

var readerStream = fs.createReadStream('input.txt');
readerStream.setEncoding('UTF8');

readerStream.on("data",function(chunk){
   data += chunk
})

readerStream.on("end",function(){
    console.log(data)
})

readerStream.on("error",function(err){
    console.log(err.stack);
})

console.log("执行完毕")