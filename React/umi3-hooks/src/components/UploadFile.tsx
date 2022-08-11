import { message } from 'antd'
function uploadFile(files, options) {
  if (!files || !files.length) {
    return
  }
//   let uploadFileServer = commonApi.imgUploadApi //上传地址
  let uploadFileServer = 'http://www.baidu.com' //上传地址
  const maxSize = 100 * 1024 * 1024 //100M
  const maxSizeM = maxSize / 1000 / 1000
  const maxLength = 1
  const uploadFileName = 'file'
  const uploadFileParams = {}
  const uploadFileParamsWithUrl = {}
  const timeout = 5 * 60 * 1000 //5 min
  // ------------------------------ 验证文件信息 ------------------------------
  const resultFiles = []
  const errInfo = []
  for (let file of files) {
    const name = file.name
    const size = file.size
    // chrome 低版本 name === undefined
    if (!name || !size) {
      return
    }
    if (maxSize < size) {
      // 上传附件过大
      errInfo.push('\u3010' + name + '\u3011\u5927\u4E8E ' + maxSizeM + 'M')
      return
    }
    // 验证通过的加入结果列表
    resultFiles.push(file)
  }
  // 抛出验证信息
  if (errInfo.length) {
    this._alert('附件验证未通过: \n' + errInfo.join('\n'))
    return
  }
  if (resultFiles.length > maxLength) {
    this._alert('一次最多上传' + maxLength + '个文件')
    return
  }
  // ------------------------------ 自定义上传 ------------------------------
  // 添加附件数据
  const formdata = new FormData()
  for (let file of resultFiles) {
    const name = uploadFileName || file.name
    formdata.append(name, file)
  }
  // ------------------------------ 上传附件 ------------------------------
  if (uploadFileServer && typeof uploadFileServer === 'string') {
    for (key in uploadFileParams) {
      val = encodeURIComponent(uploadFileParams[val])
      formdata.append(key, val)
    }
    // 定义 xhr
    const xhr = new XMLHttpRequest()
    xhr.open('POST', uploadFileServer)
    // 设置超时
    xhr.timeout = timeout
    xhr.ontimeout = function() {
      if (options.timeout && typeof options.timeout === 'function') {
        options.timeout(xhr, editor)
      }
      message.error('上传附件超时')
    }
    // 监控 progress
    if (xhr.upload) {
      xhr.upload.onprogress = function(e) {
        let percent = void 0
        // 进度条
        if (e.lengthComputable) {
          percent = e.loaded / e.total
          if (options.onProgress && typeof options.onProgress === 'function') {
            options.onProgress(percent)
          }
        }
      }
    }
    // 返回数据
    xhr.onreadystatechange = function() {
      let result = void 0
      if (xhr.readyState === 4) {
        if (xhr.status < 200 || xhr.status >= 300) {
          // hook - error
          if (options.onFail && typeof options.onFail === 'function') {
            options.onFail(xhr, editor)
          }
          return
        }
        result = xhr.responseText
        if ((typeof result === 'undefined' ? 'undefined' : typeof result) !== 'object') {
          try {
            result = JSON.parse(result)
          } catch (ex) {
            // hook - fail
            if (options.onFail && typeof options.onFail === 'function') {
              options.onFail(xhr, editor, result)
            }
            return
          }
        }
        const data = result || []
        if (data.code == 0) {
          options.onOk && options.onOk(data.data)
        }
      }
    }
    // 自定义 headers
    // for (let key in uploadFileHeaders) {
    //   xhr.setRequestHeader(key, uploadFileHeaders[key])
    // }
    // 跨域传 cookie
    xhr.withCredentials = false
    // 发送请求
    xhr.send(formdata)
  }
}
export default uploadFile