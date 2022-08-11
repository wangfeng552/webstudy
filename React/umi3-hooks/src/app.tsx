import React from 'react'
import { history } from 'umi'
import TopHeaderRight from '@/components/TopHeaderRight'

// 初始化某些全局数据的运行时配置
export async function getInitialState() {
    let userState:any = {
        isLogin: false,
        userinfo: null
    }
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
        rightContentRender:()=><TopHeaderRight/>
    }
}