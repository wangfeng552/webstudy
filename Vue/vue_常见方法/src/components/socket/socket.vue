<template>
    <div>

    </div>
</template>

<script>
// https://www.cnblogs.com/dreamsqin/p/12018866.html
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'ws://127.0.0.1:30000',  
  options: { path: "/", transports: ['websocket', 'polling', 'flashsocket'] }
}))
export default {

}
</script>
