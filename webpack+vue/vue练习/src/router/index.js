
// 这里面负责写路由映射，便于管理

// 引入路由模块并使用它
import Vue from "vue"
import Addinput from "../components/Addinput.vue"
import Loading from "../components/Loading.vue"
import Directive from "../components/Directive.vue"
import Tab from "../components/Tab.vue"
import RouterHtml from "../components/router.vue"
import A from "../components/a.vue"
import B from "../components/b.vue"
import filters from "../components/filters.vue"
// 引入子模块
import UserHome from "../components/userHome.vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

// 创建路由实例并配置路由映射
// path:'*',redirect:'/home'  重定向到path是/home的映射
const router=new VueRouter({
    mode: 'history',  //History 模式
    routes:[
        {
            path:"/addinput",
            //同级展示多个组件
            components:{
                default:Addinput, //default 默认
                a:A,
                b:B
            },
            //redirect:"/tab" //重定向
        },
        {path:"/filters",component:filters},
        {path:"/loading",component:Loading},
        {path:"/directive",component:Directive},
        {path:"/tab",component:Tab},
        // 动态路径参数 以冒号开头
        // {path:"/router/:id/post/:user",component:RouterHtml,},
        {path:"/router/:id",component:RouterHtml,
            // 嵌套路由
            children:[
                // 当 /router/:id 匹配成功，
                // UserHome 会被渲染在 router 的 <router-view> 中
                { path: 'profile', component: UserHome },
            ]
        },
        {path:"*",redirect:"/addinput"}
    ]
})
// 输出router
export default router