/**
 * default post Conent-Type
 * default timeout
 * reject 200!=statusCode
 * cancel the same request
 */
import axios from "axios"
const stringify = JSON.stringify.bind(JSON)
const CancelToken = axios.CancelToken
const pending = new Map()
export const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
}

// axios.defaults.timeout = 5000
// axios.defaults.headers.common['Accept'] = `application/json;${API_SERIES}, version=${API_VERSION}`
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest' // need to set allow-header in server
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

const instance = axios.create({
  validateStatus: () => {
    return true // I'm always returning true, you may want to do it depending on the status received
  }
})
instance.defaults.withCredentials = true
instance.defaults.headers.post["Content-Type"] =
  "application/json; charset=utf-8"
instance.interceptors.request.use(
  config => {
    // set cancelToken in every request
    let clearKey = false
    const requestKey =
      config.url + "--" + config.method + "--" + JSON.stringify(config.params)
    pending.forEach(({ cancel }, key) => {
      if (key == requestKey) {
        if (config.params.cancelable) {
          cancel()
          clearKey = true
        }
      }
    })
    if (clearKey) {
      pending.delete(requestKey)
    }
    config.cancelToken = new CancelToken(cancel => {
      pending.set(requestKey, { cancel })
    })

    if (config.method === "post") {
      // config.data = qs.stringify(config.data)
    }
    // config.headers['Accept-Language'] = 'zh'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// code状态码200判断
instance.interceptors.response.use(
  res => {
    for (const [key, value] of pending) {
      if (stringify(key) == stringify(res.config)) {
        value.cancel()
        pending.delete(key)
      }
    }
    if (res.status != "200") {
      return Promise.reject(res)
    }
    return res
    // return res.data
  },
  error => {
    return Promise.reject(error)
  }
)
export default instance
