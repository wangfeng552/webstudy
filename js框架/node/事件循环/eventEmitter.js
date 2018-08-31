var events = require('events');
var emitter = new events.EventEmitter();

// 支持 若干个事件监听器,当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。
emitter.on('someEvent', function(arg1, arg2) {
    console.log('listener1', arg1, arg2);
});
emitter.on('someEvent',function (a,b) {
    console.log('aa',a,b)
})
emitter.on('someEvent',function (a,b) {
    console.log('listerner3',a,b)
})

//由一个事件名和若干个参数组成，事件名是一个字符串
emitter.emit('someEvent','arg1参数','arg2参数')
