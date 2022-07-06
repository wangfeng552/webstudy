import App from "./App.vue";
import router, { setupRouter } from "./router";
import { setupStore } from "@/store";
import { setupI18n } from "@/locales/setupI18n";
import "dayjs/locale/zh-cn";
import Cookies from "js-cookie";
import Button from './components/button/index'
// 样式 无法处理非组件模块，这种组件需要手动加载
import "ant-design-vue/es/message/style/css";
import "ant-design-vue/es/modal/style/css";

import "virtual:windi-base.css";
import "virtual:windi-components.css";
import "virtual:windi-utilities.css";

const app = createApp(App);
app.component('Button', Button)
// 配置 store
setupStore(app);

// 挂载路由
setupRouter(app);

// 设置全局属性
app.config.globalProperties.$name = 'wf'
app.config.globalProperties.$showName = function (name: string): void {
    console.log(name);

}

// 异步案例：语言文件可能从服务器端获取
await setupI18n(app);
const TokenKey = "Admin-Token";
Cookies.set(TokenKey, "token");

let whiteList = ['/login']

router.beforeEach((to, from, next) => {
    if (whiteList.includes(to.path) || localStorage.getItem('token')) {
        next()
    } else {
        next('/login')
    }
})

router.isReady().then(() => app.mount("#app"));
