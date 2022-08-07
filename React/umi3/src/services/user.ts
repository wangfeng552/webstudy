import request from '../utils/request'
export async function getTags() {
    return request('/api/tags', {
        method: 'get'
    });

}

export async function login(data) {
    return request('/api/login', {
        method: 'post',
        data
    });

}