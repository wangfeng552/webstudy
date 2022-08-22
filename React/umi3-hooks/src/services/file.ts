import request from '../utils/request';

// 上传文件
export function uploadFile(data: any) {
  return request('/fsapi/file/_upload/v1', {
    requestType: 'form',
    method: 'post',
    data,
  });
}
