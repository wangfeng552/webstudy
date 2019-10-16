var fs = require('fs');
var buf =new Buffer(1024);
// 关闭文件 fs.close(fd,callback)

/*fs.open('wf.txt','r+',function (err,fd) {
    if(err){return console.error(err)}
    console.log('文件打开成功，准备读取文件')
    fs.read(fd,buf,0,buf.length,0,function (err,bytes) {
        if(err){return console.error(err)}
        if(bytes>0){
            console.log(buf.slice(0,bytes).toString())
        }
        fs.close(fd,function (err) {
            if(err){return console.error(err)}
            console.log('文件关闭成功')
        })
    })
})*/

//创建目录
/*fs.mkdir('wf123',function () {
    console.log('创建成功')
})*/

//读取目录
/*fs.readdir('./icons',function (err,files) {
    files.forEach(function (file) {
        console.log(file)
    })
})*/

//删除目录
fs.rmdir('./wf123',function (err) {
})



