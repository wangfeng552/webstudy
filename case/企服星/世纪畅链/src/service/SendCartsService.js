import fetch from  '../config/fetch';

class SendCartsService {
	//
	sendCarts(){
		return fetch('/trolley/queryCart',{},'POST')
	}
	delCarts(params){
		return fetch('/trolley/removeCart',{params},'POST')
	}
	
}
export default new SendCartsService ()
