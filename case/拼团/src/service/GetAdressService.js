import fetch from  '../config/fetch';

class GetAdressService {
	//获取收货地址
	getAdress(params){
		return fetch('confirm/defaultaddress.htm?_='+ new Date().getTime(),params,'GET','fetch',false)
	}
}

export default new GetAdressService()
