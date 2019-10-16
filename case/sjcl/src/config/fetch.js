import {baseUrl,amountUrl} from './env';
import {browserUtil, createSign} from'../assets/js/common';

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	if(url.indexOf('confirm')<0){
		url = baseUrl + url;
	}else {
		url = amountUrl + url;
	}
	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';   // 将对象转为 name=张三&
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));  // 去掉最后一个&  name=张三
			url = url + '?' + dataStr;  // =>  //test-m-stg.ppppoints.com/?name=张三
		}
	}

	if (window.fetch && method == 'fetch') {
	  // 请求设置
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			mode: "cors",
			cache: "force-cache"
		}
		// 数据
		var postData = {
			authType: 'MD5',
			msgVersion: browserUtil.jfmore || '1.0.0',
			custString: browserUtil.jfmore ? 'jfmore_app_h5': 'jfmore_h5',
			platform: browserUtil.ios ? 'ios': 'android',
			appId: (browserUtil.jfmore ? 'jfmore_h5': browserUtil.weixin ? 'weixin_h5': 'h5'),
			coordinate: '120,30',
			machineNo:'A9F625F6040163C231CE6ACD1C6D037C01B0EB6E',
		    reqTime:new Date().getTime() + ''
		    // login_token:token
		};
		postData = {...postData, ...data}; // 数据合并
		postData.sign = createSign(postData);
		// 如果是post从新设置requestConfig的值
		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(postData)
			})
		}

		try {
      // async 用于声明一个异步函数, 该函数需返回一个 Promise 对象.
      //   而 await 同步 通常后接一个 Promise对象, 需等待该 Promise 对象的 resolve() 方法执行并且返回值后才能继续执行.
			const response = await fetch(url, requestConfig);  //等待fetch被resolve()后才能继续执行
			const responseJson = await response.json();
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	} else {
	  //没有fetch走这里
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest(); //IE7+、Firefox、Chrome、Safari 以及 Opera
			} else {
				requestObj = new ActiveXObject; // IE5 6
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(type, url, true); // true 异步
			requestObj.setRequestHeader("Content-type", "application/json"); // 设置请求头
			requestObj.send(sendData); // 发送

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {  //HTTP 响应已经完全接收。
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') { // 返回的值不是对象就转为对象格式
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}
// https://zhuanlan.zhihu.com/p/24329240
// fetch(input, init).then(function(response) { /*请求成功回调*/ });`
/*input
定义要获取的资源。可以是一个 USVString 字符串，包含要获取资源的 URL。 也可以是一个 Request 对象。
init
这个参数是可选的，它传入一个配置项对象，可以用它来包括所对请求进行设置。*/
