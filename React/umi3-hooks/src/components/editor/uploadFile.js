import { message } from 'antd'

/**
 * 上传附件功能的实现
 * @param {*} files 
 * @param {*} options 
 * @returns 
 */
function uploadFile(files, options) {
  if (!files || !files.length) {
    return
  }
  let uploadFileServer = options?.uploadFileServer; //上传地址
  const maxFileSize = options?.maxFileSize || 10;
  const maxSize = maxFileSize * 1024 * 1024 //100M
  const maxLength = 1; // 目前限制单次只可上传一个附件
  const timeout = 1 * 60 * 1000 // 超时 1min
  // ------------------------------ 验证文件信息 ------------------------------
  const resultFiles = [];
  for (let file of files) {
    const name = file.name;
    const size = file.size;
    // chrome 低版本 name === undefined
    if (!name || !size) {
      options.onFail('');
      return
    }
    if (maxSize < size) {
      // 上传附件过大
      message.warning('上传附件不可超过' + maxFileSize + 'M');
      options.onFail('上传附件不可超过' + maxFileSize + 'M');
      return
    }
    // 验证通过的加入结果列表
    resultFiles.push(file);
  }
  if (resultFiles.length > maxLength) {
    message.warning('一次最多上传' + maxLength + '个文件');
    options.onFail('一次最多上传' + maxLength + '个文件');
    return
  }


  // 添加附件数据（目前只做单文件上传）
  const formData = new FormData()
  formData.append('file', files[0]);
  // ------------------------------ 上传附件 ------------------------------
  if (uploadFileServer && typeof uploadFileServer === 'string') {
    // 定义 xhr
    const xhr = new XMLHttpRequest();
    xhr.open('POST', uploadFileServer);
    // 设置超时
    xhr.timeout = timeout;
    xhr.ontimeout = function () {
      message.error('上传附件超时');
      options.onFail('上传附件超时');
    }
    // 监控 progress
    if (xhr.upload) {
      xhr.upload.onprogress = function (e) {
        let percent = void 0;
        // 进度条
        if (e.lengthComputable) {
          percent = e.loaded / e.total;
          console.log('上传进度：', percent);
          if (options.onProgress && typeof options.onProgress === 'function') {
            options.onProgress(percent);
          }
        }
      }
    }
    // 返回数据
    xhr.onreadystatechange = function () {
      let result = void 0;
      if (xhr.readyState === 4) {
        if (xhr.status < 200 || xhr.status >= 300) {
          // hook - error
          if (options.onFail && typeof options.onFail === 'function') {
            options.onFail(result);
          }
          message.error('上传失败');
          return;
        }
        result = xhr.responseText
        if ((typeof result === 'undefined' ? 'undefined' : typeof result) !== 'object') {
          try {
            result = JSON.parse(result);
          } catch (ex) {
            // hook - fail
            if (options.onFail && typeof options.onFail === 'function') {
              options.onFail(result);
            }
            message.error('上传失败');
            return;
          }
        }
        const res = result || []
        if (res?.code == 200) {
          options.onOk && options.onOk(res.data);
        }
      }
    }
    // 自定义 headers
    xhr.setRequestHeader('token', sessionStorage.getItem('token'));

    // 跨域传 cookie
    xhr.withCredentials = false;
    // 发送请求
    xhr.send(formData);
  }
}
export default uploadFile