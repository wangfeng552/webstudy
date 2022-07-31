import { defineConfig } from 'umi';

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
  routes: [
    { path: '/', component: '@/pages/index' ,name:'首页'},
   
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
});
