<template>
    <div id="routerdemo">
        <ul>
            <!-- 使用 router-link 组件来导航. -->
            <!-- 通过传入 `to` 属性指定链接. -->
            <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
            <li><router-link to="/addinput">addinput</router-link></li>
            <li><router-link to="/animals">animals</router-link></li>
        </ul>
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    </div>
</template>
<style>
    .router-link-active{ color: red;}
    /*routes redirect*/
</style>