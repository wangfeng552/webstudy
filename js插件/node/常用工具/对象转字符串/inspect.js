var util = require('util');

function Person(){
    this.name = 'busdf';
    this.toString = function(){
        return this.name
    }
}

var obj = new Person();
console.log(util.inspect(obj,true))

//util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。它至少接受一个参数 object，即要转换的对象。