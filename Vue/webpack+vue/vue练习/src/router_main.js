import Vue from "vue"
import RouterApp from "./RouterApp.vue"
import router from "./router/index.js" //这里引入的是router目录，会默认识别里面的index.js文件（不能是其他名字）

import VueResource from "vue-resource"
Vue.use(VueResource)

new Vue({
    el:"#routerdemo",
    router,
    render:h=>h(RouterApp)

    // 这里的render: h => h(App)是es6的写法
    // 转换过来就是：  暂且可理解为是渲染App组件
    // render:(function(h){
    // 	return h(App);
    // });
})