// 链式流

var fs = require('fs');
var zlib = require('zlib');

// 压缩 input.txt 文件为input.txt.gz
// fs.createReadStream('input.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('input.txt.gz'))

// 解压
fs.createReadStream('input.txt.gz').pipe(zlib.createGunzip()).pipe(fs.createWriteStream('input.txt'))


console.log('文件压缩完毕')