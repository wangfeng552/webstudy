/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */




// 生产环境
//let baseUrl = '//m.jfmore.com/pointgate/service/'; //生产
//let amountUrl = '//m.jfmore.com/'; //生产
//let imgBaseUrl = '//m.jfmore.com/'; //生产

// 测试环境
let baseUrl = '//test-m-stg.ppppoints.com/pointgate/service/'; //测试 
let amountUrl = '//test-m-stg.ppppoints.com/'; //测试
let imgBaseUrl = '//test-m-stg.ppppoints.com/'; //测试

// let imgBaseUrl = 'http://m16.jflm.com/';//本地
// let baseUrl = 'http://172.16.16.16:9000/points-gateway/service/';

let routerMode = 'hash';

if (process.env.NODE_ENV == 'development') {

}else if(process.env.NODE_ENV == 'production'){

	// baseUrl = 'http://cangdu.org:8001';
}

export {
	baseUrl,
	amountUrl,
	routerMode,
	imgBaseUrl,
}