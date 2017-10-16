class QualityService {
	debugger
	getQualityList( options = {} ) {
		return fetch('/api/qualityGoods', {
			type: 'guess'
		});
	}
}
export default new QualityService();