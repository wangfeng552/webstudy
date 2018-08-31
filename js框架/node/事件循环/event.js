var events = require('events');
var eventEmitter=new events.EventEmitter();
var lis1=function () {
    console.log('监听器 lis1 执行')
}
var lis2 = function () {
    console.log('监听器 lis2 执行')
}

eventEmitter.addListener('connection',lis1)
eventEmitter.on('connection',lis2)

var eventListerners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListerners + '个监听器监听连接事件');

eventEmitter.emit('connection')
//移除监绑定的lis1 函数
eventEmitter.removeListener('connection',lis1)
console.log('lis1 不在受监听')

//触发连接事件
eventEmitter.emit('connection')

eventListerners=require('events').EventEmitter.listenerCount(eventEmitter,'connection')
console.log(eventListerners)

console.log('程序执行完毕')

/*
* listenerCount(emitter, event) 返回指定事件的监听器数量。
*
* removeListener(event, listener)
* 移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。
* 它接受两个参数，第一个是事件名称，第二个是回调函数名称。

1、eventEmitter.on()与eventEmitter.addListener()没有区别，且一个事件可以绑定多个回调函数；

2、若事件队列中出现一个未绑定事件则触发error事件，若未绑定 error事件则程序抛出异常结束执行
* */