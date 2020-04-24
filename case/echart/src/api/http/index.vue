<template>
<div id="http">
  <slot></slot>
</div>
</template>

<script>
import store from "@/store"
import request from "@/utils/request"
import createExchange from "./exchange"
import createOther from "./other"
createExchange(request)
createOther(request)
let vInstance = {}
const ServiceCustomeCode = {
  "401": "401"
}
const debug = false
const tokenHeader = "is_login"
const defaultTimeout = 20000
// const showToast = msg => {
//   setTimeout(() => {
//     Toast({
//       message: msg,
//       position: "bottom",
//       duration: 3000
//     })
//   }, 0)
// }
request.interceptors.request.use(
  config => {
    const params = config.params
    config.params = {
      // t: +new Date(),
      ...params
    }
    config.timeout =
      config.timeout || (config.data && config.data.timeout) || defaultTimeout
    return config
  },
  err => Promise.reject(err)
)
request.interceptors.response.use(
  response => {
    const {
      headers,
      config,
      data: {
        data = "",
        result = "",
        msg
      } = {}
    } = response
    const {
      callback,
      showError,
      noWrap
    } = config || {}
    if (noWrap) {
      return response.data
    }

    if (data == null && !showError) {
      return Promise.reject(msg)
    }
    let rdata = data
    if (typeof data === "undefined") {
      rdata = result
    }

    // success callback in request confi
    if (callback) {
      callback.call(vInstance, rdata)
    }

    if ((debug || showError) && msg && !data) {
      // showToast(msg)
      return Promise.reject(msg)
    }
    return rdata
  },
  res => {
    if (res instanceof Error) {
      if (/timeout/i.test(res.toString())) {
        return Promise.reject({
          timeout: true,
          data: res
        })
      }
      return Promise.reject({
        data: res
      })
    }
    const {
      config: {
        silent401,
        callback,
        noToast = false
      },
      status,
      data
    } = res
    if (status >= 500 && status < 600) {
      return Promise.reject({
        data: res
      })
    }

    if (callback) {
      callback.call(vInstance, data)
    }
    // handleCustomHeader(data)
    if (typeof data === "string" && !noToast) {
      // showToast(data)
      return Promise.reject({
        toasted: true,
        data
      })
    }
    if (data && data.msg && !noToast) {
      // showToast(data.msg)
      return Promise.reject({
        toasted: true,
        data
      })
    }
    if (debug) {
      // showToast(status + JSON.stringify(data))
    }
    // if status is not 200
    // this is reject in request.js
    if (status === 401) {
      vInstance.$store.dispatch("logout")

      if (silent401) {
        return Promise.reject({
          data
        })
      }
      setTimeout(() => vInstance.$router.push("/login"))
    }
    return Promise.reject({
      data
    })
  },
  err => Promise.reject(err)
)

export default {
  created() {
    vInstance = this
  }
}

export * from "./exchange"
export * from "./other"
</script>
