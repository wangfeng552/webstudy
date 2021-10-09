import Vue from 'vue';
import Router from 'vue-router';
/**
 * 重写路由push方法
 * 解决相同路由跳转时，报错
 * 添加，相同路由跳转时，触发watch
 */

// 保存原来的push函数
const routerPush=Router.prototype.push
Router.prototype.push = function push(location) {
    // 用来解决报错
    // 调用原来的push函数，并捕获异常
    return routerPush.call(this, location).catch((err) => err)
  }