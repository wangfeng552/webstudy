<template>
    <div id="routerdemo">
        <ul>
            <!-- 使用 router-link 组件来导航,默认会被渲染成一个<a>标签,to指定链接 -->
            <li><router-link to="/addinput">addinput</router-link></li>
            <li><router-link to="/filters">filters</li>
            <li><router-link to="/loading">loading</router-link></li>
            <li><router-link to="/directive">自定义指令</router-link></li>
            <li><router-link to="/tab">tab</router-link></li>
            <li><router-link to="/router/56787789">路由{{$route.params.id}}</router-link></li>
        </ul>

        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
        <router-view name="a"></router-view>
        <router-view name="b"></router-view>

        <!--模式	                        匹配路径	                        $route.params
        /user/:username	                /user/evan	                    { username: 'evan' }
        /user/:username/post/:post_id	/user/evan/post/123	            { username: 'evan', post_id: 123 }-->
    </div>
</template>
<style>
    .router-link-active{ color: red;}
</style>