import request from '../utils/request'
export async function getTags() {
    return request('/api/tags', {
        method: 'get'
    });

}