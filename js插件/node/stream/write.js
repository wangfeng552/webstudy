var fs =require("fs");
var data = '菜鸟是的范德萨附近';

// 创建一个可以写入的流，写入到文件output.txt中
var writeStream = fs.createWriteStream('output.txt')

writeStream.write(data,'UTF8');

writeStream.end()

writeStream.on('finish',function(){
    console.log('写入完成')
})

writeStream.on('error',function(err){
    console.log(err.stack)
})

console.log('执行完毕')