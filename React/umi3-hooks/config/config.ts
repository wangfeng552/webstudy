import { defineConfig } from 'umi';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd:{
    dark:false
  },
  dva: {
    hmr: true,
  },
  layout: {
    // 支持任何不需要 dom 的
    // https://procomponents.ant.design/components/layout#prolayout
    name: 'Ant Design',
    locale: true,
    layout: 'side',
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
  },
  routes: [
    
    { path: '/login', component: '@/pages/login' ,name:'登录',layout:false,hideInMenu: true,},
    { path: '/', component: '@/pages/index' ,name:'首页',access: 'isWorker'},
    { path: '/tree', component: '@/pages/tree/dragTree' ,name:'树',access: 'isWorker',},
   
    {
      path:'/order',
      name:'study',
      routes:[
        { path: '/order/list', component: '@/pages/order/index' ,name:'路由跳转',},
        { path: '/order/create', component: '@/pages/order/creatOrder' ,name:'表单创建',},
        { path: '/order/oldlist', component: '@/pages/list/oldList' ,name:'普通请求列表',},
        { path: '/order/hooklist', component: '@/pages/list/hookList' ,name:'hook列表',},
      ]
    },
  ],
  fastRefresh: {},
  exportStatic: {},
});
