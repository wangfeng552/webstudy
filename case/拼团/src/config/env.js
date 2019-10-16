/**
 * 配置编译环境和线上环境之间的切换
 * 
 * routerMode: 路由模式
 * baseUrl: 接口域名路径
 * imgBaseUrl: 图片域名路径
 * 
 */

let baseUrl = location.origin +'/';
let imgBaseUrl = location.origin +'/';

let routerMode = 'hash';

if (process.env.NODE_ENV == 'development') {

} else if (process.env.NODE_ENV == 'production') {

}

export {
	routerMode,
	baseUrl,
	imgBaseUrl
}