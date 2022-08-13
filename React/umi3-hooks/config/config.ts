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
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
  },
  routes: [
    
    { path: '/login', component: '@/pages/login' ,name:'登录',layout:false,hideInMenu: true,},
    { path: '/', component: '@/pages/index' ,name:'首页',access: 'isWorker'},
    { path: '/tree', component: '@/pages/tree/dragTree' ,name:'树',access: 'isWorker',},
   
    {
      path:'/order',
      name:'订单管理',
      routes:[
        { path: '/order/list', component: '@/pages/order/index' ,name:'订单列表',},
        { path: '/order/create', component: '@/pages/order/creatOrder' ,name:'订单创建',},
      ]
    }
  ],
  fastRefresh: {},
  exportStatic: {},
});
