var fs = require('fs')
// var data = fs.readFileSync('text.txt')
fs.readFile('text.txt',function(err,data){
    if(err) return console.log(err)
    console.log(data.toString())
})
console.log('123')