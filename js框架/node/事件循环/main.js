// 引入events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter =new events.EventEmitter(); //事件触发与事件监听器功能的封装

// 创建事件处理程序
var connectHandler = function connected() {
    console.log('链接成功。')

    // 触发 data_received 事件
    eventEmitter.emit('data_received');
}

// 绑定 connection 事件处理程序
eventEmitter.on('connection',connectHandler);

// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received',function () {
    console.log('数据接收成功。')
})

// 触发 connection 事件
eventEmitter.emit('connection');
console.log('程序执行完毕。')

/*事件就是需要 eventEmitter.on 去绑定一个事件
通过 eventEmitter.emit 去触发这个事件
其次说的是事件的接收和发生是分开的，就像一个外卖店你可以不停的接受很多订单, 接受以后开始告诉厨师去做外卖, 做好的外卖对应的外送给每个用户，
如果单线程的话那只能是接收一个订单, 做好以后在接收下一个外卖订单，明显效率非常低。
事件可以不停的接受不停的发生也是为了提高效率。*/