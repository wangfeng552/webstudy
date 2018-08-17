// 开发后台管理页面的时候，我们经常有autu认证需求，如果没有登录，或者权限问题，都有一个脚本去控制跳转，中间件就派上用场了。
export default function ({ store, redirect }) {
  if (!store.state.user) {
    return redirect('/login')
  }
}

//页面单独使用

/*export default {
  middleware: 'auth'
}*/

//全局使用

/*module.exports = {
  router: {
    middleware: 'auth'
  }
}*/
