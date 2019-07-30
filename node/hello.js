var events = require('events')
var eventEmitter = new events.EventEmitter

eventEmitter.on('say',function(err,data){
  if(err) return console.log(err)
  console.log('yes')
})
eventEmitter.emit('say')
console.log('edn')