import fetch from  '../config/fetch';

class HomeService {
	//获取banner
	getSliderList(){
		return fetch('ad/recommend', {keyId:'Mall_Carousel',ip:'172.16.20.24'}, 'POST')
	}
	//获取品质专区图
	getQualityList(){
		return fetch('ad/recommend', {keyId:'Mall_quality',ip:'172.16.20.24'}, 'POST')
	}
	//获取商品活动区商品
	getActiveListOne(){
		return fetch('product/recommend', {keyId:'Mall_activity1', ip:'172.16.20.24'}, 'POST')
	}
	getActiveListTwo(){
		return fetch('product/recommend', {keyId:'Mall_activity2', ip:'172.16.20.24'}, 'POST')
	}
	getActiveListThree(){
		return fetch('product/recommend', {keyId:'Mall_activity3', ip:'172.16.20.24'}, 'POST')
	}
	getActiveListFour(){
		return fetch('product/recommend', {keyId:'Mall_activity4', ip:'172.16.20.24'}, 'POST')
	}
	getActiveListFive(){
		return fetch('product/recommend', {keyId:'Mall_activity5', ip:'172.16.20.24'}, 'POST')
	}
	getActiveListSix(){
		return fetch('product/recommend', {keyId:'Mall_activity6', ip:'172.16.20.24'}, 'POST')
	}
	getActiveListSeven(){
		return fetch('product/recommend', {keyId:'Mall_activity7', ip:'172.16.20.24'}, 'POST')
	}
	getActiveListEight(){
		return fetch('product/recommend', {keyId:'Mall_activity8', ip:'172.16.20.24'}, 'POST')
	}
	getActiveListNine(){
		return fetch('product/recommend', {keyId:'Mall_activity9', ip:'172.16.20.24'}, 'POST')
	}
	getActiveListTen(){
		return fetch('product/recommend', {keyId:'Mall_activity10', ip:'172.16.20.24'}, 'POST')
	}
}

export default new HomeService()
