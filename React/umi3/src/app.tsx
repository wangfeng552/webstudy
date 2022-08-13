import React from 'react'
import { history } from 'umi'
import TopHeaderRight from '@/components/TopHeaderRight'
import { PageLoading } from '@ant-design/pro-layout'

// 上线后页面加载loading
export const initialStateConfig = {
  loading:<PageLoading />
};

// 初始化某些全局数据的运行时配置
export async function getInitialState() {
  // 自定义数据包 可以使用dva和model存储
    let userState:any = {
        isLogin: true,
        userinfo: null
    }
    // localStorage.getItem('userInfo')
    console.log('初始化数据', userState);

    return userState;
}

// layout 运行时配置
export const layout = ({ initialState }) => {
    return {
        title:'111',
        onPageChange: () => {
            // 可以根据用户的登录状态，引导用户进行指定的路由访问
            console.log(initialState);
            const { isLogin } = initialState;
            const { location } = history;
            // 如果没有登录，重定向到 login
            if (!isLogin && location.pathname !== '/login') {
                history.push('/login');
            }
        },
        rightContentRender:()=><TopHeaderRight/>,
        menu: {
            // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
            params: {
              userId: initialState?.currentUser?.userid,
            },
            request: async (params, defaultMenuData) => {

                const   routes= [
    
                    { path: '/login', component: '@/pages/login' ,name:'登录',layout:false,hideInMenu: true,},
                    { path: '/', component: '@/pages/index' ,name:'首页',access: 'isWorker'},
                   
                    {
                      path:'/order',
                      name:'订单管理',
                      routes:[
                        { path: '/order/list', component: '@/pages/order/index' ,name:'订单列表',},
                      ]
                    }
                  ]
              // initialState.currentUser 中包含了所有用户信息
            //   const menuData = await fetchMenuData();
              return routes;
            },
          },
    }
}