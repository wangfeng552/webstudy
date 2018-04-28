import fetch from  '../config/fetch';

class api {
	//获取景区详情信息
	GetSceneryDetailService(params) {
		return fetch('pointgate/ly/scenery/detail', params, 'POST')
	}
}

export default new api()
