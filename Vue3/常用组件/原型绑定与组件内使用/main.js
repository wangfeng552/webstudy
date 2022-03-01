import { createApp } from "vue"
import App from "./App.vue"
const app = createApp(App)

// 获取原型
const prototype = app.config.globalProperties

// 绑定参数
prototype.name = "Jerry"
