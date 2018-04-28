// 下边代码添加在main.js中
Vue.http.interceptors.push((request, next) => {
  console.log(this)//此处this为请求所在页面的Vue实例
  // modify request
  request.method = 'POST';//在请求之前可以进行一些预处理和配置

  // continue to next interceptor
  next((response) => {//在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法

    response.body = '...';
    return response;

  });
});

 // 实例
/******************拦截器设置请参考这部分(开始)******************/
Vue.http.interceptors.push((request, next)  =>{
  //登录成功后将后台返回的TOKEN在本地存下来,每次请求从sessionStorage中拿到存储的TOKEN值
  let TOKEN=sessionStorage.getItem('STORAGE_TOKEN');
  if(TOKEN){
    //如果请求时TOKEN存在,就为每次请求的headers中设置好TOKEN,后台根据headers中的TOKEN判断是否放行
    request.headers.set('TOKEN',TOKEN);
  }
  next((response) => {
    return response;
  });
});
/******************拦截器设置请参考这部分(结束)******************/

Vue.http.interceptors.push((request, next) => {
//                  console.log(Login.item);
  var tokens = localStorage.getItem('token');
  request.headers.set('Authorization', tokens);
//                  console.log(request.headers);
  help.showLoading = true;

  next((response) => {
//                      console.log(response);
    help.showLoading = false;
    return response
  })
})