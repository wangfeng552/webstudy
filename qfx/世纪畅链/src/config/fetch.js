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
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}

	if (window.fetch && method == 'fetch') {
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
		postData = {...postData, ...data};
		postData.sign = createSign(postData);
		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(postData)
			})
		}
		
		try {
			const response = await fetch(url, requestConfig);
			const responseJson = await response.json();
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/json");
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
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