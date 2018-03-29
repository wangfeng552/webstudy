// 这里面负责写路由映射，便于管理

// 引入路由模块并使用它
import Vue from "vue"
import Addinput from "../components/Addinput.vue"
import Animals from "../components/animals.vue"
import VueRouter from "vue-router"

//懒加载
// 通过懒加载就不会一次性把所有组件都加载进来，而是当你访问到那个组件的时候才会加载那一个。对于组件比较多的应用会提高首次加载速度。
const login = resolve => require(['../components/Addinput'],resolve)、

const Province = r => require.ensure([], () => r(require('@/components/Province.vue')), 'chunkname1')
// 1.空数组作为参数

//使用路由
Vue.use(VueRouter)

// 创建路由实例并配置路由映射
// path:'*',redirect:'/home'  重定向到path是/home的映射
const router=new VueRouter({
    routes:[
        {path:"/addinput",component:Addinput},
        {path:"/animals",component:Animals},
        {path:"/login",component:login,hidden:true},
        {path:"*",redirect:"addinput"},
    ]
})

// 输出router
export default router

/*
高级路由
 { path: '/' },
 // params are denoted with a colon ":"
 { path: '/params/:foo/:bar' },
 // a param can be made optional by adding "?"
 { path: '/optional-params/:foo?' },
 // a param can be followed by a regex pattern in parens
 // this route will only be matched if :id is all numbers
 { path: '/params-with-regex/:id(\\d+)' },
 // asterisk can match anything
 { path: '/asterisk/*' },
 // make part of th path optional by wrapping with parens and add "?"
 { path: '/optional-group/(foo/)?bar' }

 <li><router-link to="/">/</router-link></li>
 <li><router-link to="/params/foo/bar">/params/foo/bar</router-link></li>
 <li><router-link to="/optional-params">/optional-params</router-link></li>
 <li><router-link to="/optional-params/foo">/optional-params/foo</router-link></li>
 <li><router-link to="/params-with-regex/123">/params-with-regex/123</router-link></li>
 <li><router-link to="/params-with-regex/abc">/params-with-regex/abc</router-link></li>
 <li><router-link to="/asterisk/foo">/asterisk/foo</router-link></li>
 <li><router-link to="/asterisk/foo/bar">/asterisk/foo/bar</router-link></li>
 <li><router-link to="/optional-group/bar">/optional-group/bar</router-link></li>
 <li><router-link to="/optional-group/foo/bar">/optional-group/foo/bar</router-link></li>
 */
