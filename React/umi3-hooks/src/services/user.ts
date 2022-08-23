// import request from '../utils/request'
import { request } from 'umi'
export async function getTags() {
    return request('/api/tags', {
        method: 'get',
    })
}

export async function deleteTag(data) {
    return request('/api/delete', {
        method: 'DELETE',
        data
    });
}

export async function getUserList(params: any) {
    return request('/api/user/list', {
        method: 'get',
        params
    });
}

export async function deleteUser(data) {
    return request('/api/user/delete', {
        method: 'DELETE',
        data
    });
}

export async function login(data) {
    return request('/api/login', {
        method: 'post',
        data
    });
}

export async function reqGetTreeNode() {
    return request('/api/getTree', {
        method: 'get'
    });

}


export async function reqAddTreeNode(data) {
    return request('/api/login', {
        method: 'post',
        data
    });
}

export async function reqUpdateTreeNode(data) {
    return request('/api/login', {
        method: 'post',
        data
    });
}
export async function reqDeleteTreeNode(data) {
    return request('/api/login', {
        method: 'post',
        data
    });
}
