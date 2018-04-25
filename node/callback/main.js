//阻塞代码示例
var fs = require("fs");
var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log('程序执行结束!')

//在文件读取完成后才执行完程序。

//总结 阻塞是按顺序执行的，而非阻塞是不需要按顺序的，所以如果需要处理回调函数的参数，我们就需要写在回调函数内。
// 同步 阻塞
// 异步 非阻塞