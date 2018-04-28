import Vue from "vue"
import router from "./router/index.js" //这里引入的是router目录，会默认识别里面的index.js文件（不能是其他名字）


new Vue({
    el:"#routerdemo",
    router,
    render:h=>h(RouterApp)
})