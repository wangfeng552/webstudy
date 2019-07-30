var fs = require('fs')
var data = '咖啡壶sdfh 123'
var writerStream = fs.createWriteStream('text.txt')
writerStream.write(data,'UTF8')

console.log('over')