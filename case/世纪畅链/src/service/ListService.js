
class ListService {
	testFetch( options = {} ) {
		return fetch('/api/testapi', {
			type: 'guess'
		});
	}
}
export default new ListService();

