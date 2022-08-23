var fs = require('fs');
var src = 'icons';



// 写入文件  fs.writeFile(file, data[, options], callback)
/*fs.writeFile('wf.txt','我是通过fs.writeFile写入文件的',function (err) {
    if(err){return console.log(err)}
    console.log('写入数据成功')
    fs.readFile('wf.txt',function (err,data) {
        if(err){return console.log(err)}
        console.log('读出数据' + data.toString())
    })
})*/

//读取文件  fs.read(fd, buffer, offset, length, position, callback)
var buf =new Buffer(1024)
fs.open('wf.txt','r+',function (err,fd) {
    if(err){return console.error(err)}
    console.log('文件打开成功，准备读取文件')
    fs.read(fd,buf,0,buf.length,0,function (err,bytes) {
        if(err){
            console.log(err)
        };
        console.log(bytes + ' 字节被读取')
        if(bytes > 0){
            console.log(buf.slice(0,bytes).toString())
        }

    })
})


