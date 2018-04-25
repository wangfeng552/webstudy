//非阻塞代码示例
var fs = require("fs");
fs.readFile('input.txt',function (err,data) {
    if(err)return console.error(err);
    console.log(data.toString());
})
console.log('程序执行结束!')

// 不需要等待文件读取完，这样就可以在读取文件时同时执行接下来的代码，大大提高了程序的性能。
// 在 Node 应用程序中，执行异步操作的函数将回调函数作为最后一个参数， 回调函数接收错误对象作为第一个参数。