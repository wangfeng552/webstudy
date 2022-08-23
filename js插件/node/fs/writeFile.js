var fs =require('fs')
//写入文件
// fs.writeFile(file,data[,opeions],callback)
//默认是w模式，如果文件存在，该方法写入的内容会覆盖旧的文件内容
/*
file - 文件名或文件描述符。

data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(流) 对象。

options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'

callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。*/

fs.writeFile('wf.txt','我是写入的内容',function (err) {

})