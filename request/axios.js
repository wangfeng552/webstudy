// https://blog.csdn.net/qq_32442967/article/details/123918895
// 如果用户登录后，过一段时间，token失效了，用户在使用时调用刷新token接口，替换本地的token，然后返回成功的结果

// 1.在本地没有旧的token的情况下，不进行刷新操作；
// 2.如果刷新token接口还是失败的话，不再进行刷新操作；
// 3.如果同时请求多个接口，只第一个接口触发刷新token操作，其它接口等待刷新成功后重新请求并返回结果
import axios from "axios"
import { getActivityToken, setActivityToken } from "./index"

const axiosAsync = axios.create()

let bRefreshToken = false // 是否刷新token中
/**
 * 适用于async|await 可返回错误信息 const [err, res] = await requestFunction
 * @param {{
 *   method: 'String 请求方法',
 *   url: 'String 请求地址',
 *   params: 'Object 是即将与请求一起发送的 URL 参数',
 *   data: 'Object 是作为请求主体被发送的数据',
 *   bToken: 'Boolean 是否传token',
 * }} axiosParams
 * @returns {Promise<unknown>} [null, res]
 */
export function axiosRequest(axiosParams) {
  const {
    method = "get",
    url = "",
    authUrl = "", // 刷新token使用的授权域名
    params = undefined,
    headers = {},
    data = {},
    bToken = true,
    secondRequest = false, // 是否是 刷新token过来的第二次请求
  } = axiosParams
  let token = getActivityToken().access_token
  if (bToken) {
    headers["Authorization"] = "Bearer " + token
  }
  return new Promise((resolve) => {
    axiosAsync({
      method,
      url,
      params,
      data,
      headers: {
        ...headers,
      },
    })
      .then((res) => {
        resolve([null, res.data])
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.status == 401 &&
          !secondRequest &&
          authUrl
        ) {
          // 如果本地没有refreshToken，不执行刷新token操作
          const refreshToken = getActivityToken().refresh_token
          if (!refreshToken) {
            // 如果本地没有refreshToken，不执行刷新token操作
            resolve([err.response ? err.response : "error", null])
            return
          }
          // 如果没有调用刷新token接口，则调用
          if (!bRefreshToken) {
            fnRefreshToken(refreshToken, authUrl)
          }
          // 将当前的请求保存在观察者数组中
          addSubscriber(() => {
            resolve(axiosRequest({ ...axiosParams, secondRequest: true }))
          })
        } else {
          resolve([err.response ? err.response : "error", null])
        }
      })
  })
}

// 刷新token操作
const fnRefreshToken = (refreshToken, authUrl) => {
  bRefreshToken = true
  axiosAsync({
    method: "get",
    url:
      authUrl + `/v1/auth/student_refresh_token?refresh_token=${refreshToken}`,
  }).then((res) => {
    // 刷新完成后,将新token和refreshToken存储到本地
    res.data && setActivityToken(res.data)
    // 将所有存储到观察者数组中的请求重新执行
    onAccessTokenFetched()
    bRefreshToken = false
  })
}

// 观察者数组
let subscribers = []
function onAccessTokenFetched() {
  subscribers.forEach((callback) => {
    callback()
  })
  subscribers = []
}
// 添加进观察者数组
function addSubscriber(callback) {
  subscribers.push(callback)
}
