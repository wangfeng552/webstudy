class SliderService {
	debugger
	getSliderList( options = {} ) {
		return fetch('/api/homeSlider', {
			type: 'guess'
		});
	}
}
export default new SliderService();