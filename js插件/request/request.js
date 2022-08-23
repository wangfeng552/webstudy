/**
 * request 网络请求工具:umi-request
 */
 import { extend, RequestOptionsInit } from 'umi-request';
 import { notification } from 'antd';
 import router from 'umi/router';
 
 const codeMessage = {
   200: '服务器成功返回请求的数据。',
   201: '新建或修改数据成功。',
   202: '一个请求已经进入后台排队（异步任务）。',
   204: '删除数据成功。',
   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
   401: '用户没有权限（令牌、用户名、密码错误）。',
   403: '用户得到授权，但是访问是被禁止的。',
   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
   406: '请求的格式不可得。',
   410: '请求的资源被永久删除，且不会再得到的。',
   422: '当创建一个对象时，发生一个验证错误。',
   500: '服务器发生错误，请检查服务器。',
   502: '网关错误。',
   503: '服务不可用，服务器暂时过载或维护。',
   504: '网关超时。',
 };
 
 /**
  * 异常处理程序
  */
 let isRefreshing = true;
 let subscribers = [] as Array<any>;
 const errorHandler = (error: any) => {
   const { response = {} } = error;
   if (response && response.status) {
     const errorText = codeMessage[response.status] || response.statusText;
     const { status, url } = response;
     if (status !== 403) {
       notification.error({
         message: `请求错误 ${status}: ${url}`,
         description: errorText,
       });
     }
   }
   else if (!response) {
     notification.error({
       description: '您的网络发生异常，无法连接服务器',
       message: '网络异常',
     });
   }
   return response;
 };
 
 /**
  * 配置request请求时的默认参数
  */
 const request = extend({
   errorHandler, // 默认错误处理
   credentials: 'include', // 默认请求是否带上cookie
 });
 
 /**
  * request拦截器
  */
 request.interceptors.request.use((url, options) => {
   const idToken = localStorage.getItem('uaes_id_token');
   if (idToken) {
     options.headers = {
       ...options.headers,
       'authorization': idToken,
       'lag-uaes': 'zh-CN',
     }
   }
   return {
     url,
     options: { ...options, interceptors: true },
   };
 });
 
 // 并发请求时最先到达的请求会去刷新token，其余请求保存到数组中等待刷新好token之后重新去执行。
 function onAccessTokenFetched() {
   subscribers.forEach((callback) => {
     callback();
   });
   subscribers = [];
 }
 
 // 刷新token请求接口
 function refreshTokenRequest() {
   // 将并发异步请求存入并发数组中，返回刷新成功之后再轮询重新调用。by xiawang.liu
   request(`/uaes-istio-iam/public/user/oauth/refreshTokens?refreshToken=${localStorage.getItem('refresh_token')}`)
     .then((result) => {
       // msgCode不等于10000时表示刷新token失败，此时应该执行登出逻辑。by xiawang.liu
       if (result.msgCode === 10000) {
         localStorage.setItem('access_token', `${result.content.token_type} ${result.content.id_token}`);
         localStorage.setItem('refresh_token', result.content.refresh_token);
         onAccessTokenFetched();
         isRefreshing = true;
       } else {
         notification.error({
           message: '未登录或登录已过期，请重新登录。',
         });
         // @HACK
         /* eslint-disable no-underscore-dangle */
         window.g_app._store.dispatch({
           type: 'login/logout',
         });
       }
     })
 }
 
 // 存放并发请求
 function addSubscriber(callback: any) {
   subscribers.push(callback)
 }
 
 /**
  * response拦截器
  */
 request.interceptors.response.use(async (response: Response, options: RequestOptionsInit) => {
   const { status, url } = response;
   const { method, params, data } = options;
   if (response.status === 403) {
     if (localStorage.getItem('access_token')) {
       if (isRefreshing) {
         refreshTokenRequest();
       }
       isRefreshing = false;
       // 这个Promise函数很关键
       const retryOriginalRequest = new Promise((resolve) => {
         addSubscriber(() => {
           resolve(request(url, {
             method: method,
             data: data,
           }));
         })
       });
       return retryOriginalRequest;
     } else {
       // notification.error({
       //   message: '未登录或登录已过期，请重新登录。',
       // });
       // @HACK
       /* eslint-disable no-underscore-dangle */
       window.g_app._store.dispatch({
         type: 'login/logout',
       });
       return response;
     }
   }
   if (response.headers.get('Content-Type') === "application/json;charset=UTF-8") {
     const data = await response.clone().json();
     if (data && data.msgCode && data.msgCode !== "10000") {
       notification.error({
         message: `请求错误: ${data.msgCode}`,
         description: data.msg || "暂无",
       });
     }
   }
   return response;
 })
 
 export default request;
 