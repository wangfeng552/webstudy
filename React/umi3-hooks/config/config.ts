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
  lessLoader:{
    javascriptEnabled: true,
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
    { path: '/login', component: '@/pages/login' ,name:'login',layout:false,hideInMenu: true,},
    { path: '/home', component: '@/pages/index' ,name:'home',access: 'isWorker'},
    { path: '/tree', component: '@/pages/tree/dragTree' ,name:'tree',access: 'isWorker',},
    {
      path:'/study',
      name:'study',
      routes:[
        { path: '/study/router', component: '@/pages/study/router' ,name:'router',},
        { path: '/study/create', component: '@/pages/study/create' ,name:'create',},
        { path: '/study/oldlist', component: '@/pages/study/oldList' ,name:'oldList',},
        { path: '/study/hooklist', component: '@/pages/study/hookList' ,name:'hookList',},
        { path: '/study/hookListNew', component: '@/pages/study/hookListNew' ,name:'hookListNew',},
        { path: '/study/parent', component: '@/pages/study/parent' ,name:'parent',},
        { path: '/study/memo', component: '@/pages/study/memo' ,name:'memo',},
        { path: '/study/nanoid', component: '@/pages/study/nanoid' ,name:'nanoid',},
      ]
    },
  ],
  fastRefresh: {},
  exportStatic: {},
});
