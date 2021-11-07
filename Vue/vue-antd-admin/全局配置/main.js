// 主要引入插件、初始化路由以及路由守卫、添加请求拦截器
import Vue from 'vue' //引入vue

import App from './App.vue' //引入入口

import {initRouter} from './router' //引入初始化router方法

import './theme/index.less' //引入主题样式

import Antd from 'ant-design-vue' //引入antd

import Viser from 'viser-vue' //引入antv-g2绘制图形

import '@/mock' //引入mock数据

import store from './store' //引入vuex

import 'animate.css/source/animate.css' //引入动画样式

import Plugins from '@/plugins' //引入自定义插件

import {initI18n} from '@/utils/i18n' //引入国际化

import bootstrap from '@/bootstrap' //引入启动引导方法

const router = initRouter(store.state.setting.asyncRoutes) //加载异步路由

const i18n = initI18n('CN', 'US') //初始化国际化语言

Vue.use(Antd) //vue挂载antd

Vue.config.productionTip = false //

Vue.use(Viser) //挂载antv-g2

Vue.use(Plugins) //挂载自定义中间件

bootstrap({router, store, i18n, message: Vue.prototype.$message}) //初始化路由以及路由守卫、axios拦截器

new Vue({

  router,

  store,

  i18n,

  render: h => h(App),

}).$mount('#app') //挂载到dom  