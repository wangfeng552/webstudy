var util = require('util');
function Base(){
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function(){
        console.log('Hello' + this.name )
    }
}
Base.prototype.showName = function(){
    console.log(this.name)
}

function Sub(){
    this.name = 'sub'
}

util.inherits(Sub,Base);  // 是一个实现对象间原型继承的函数

var objBase =new Base();
objBase.showName()
objBase.sayHello()
console.log(objBase)

var objSub = new Sub();
objSub.showName()
// objSub.sayHello()  XXXX不能继承

console.log(objSub)