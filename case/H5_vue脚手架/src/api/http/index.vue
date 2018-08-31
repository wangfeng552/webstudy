<template>
  <div id="http" style="opacity:0;display:none"></div>
</template>
<script>
import store from '@/store'
import { Toast } from 'mint-ui';
import request from '@/utils/request'
import createExchange from './exchange'
createExchange(request)
let vInstance = {}
const ServiceCustomeCode = {
  '401': '900102'
}

const debug = false
const tokenHeader = 'ucex-web-api-token'
const defaultTimeout = 20000
const showToast = (msg)=>{
  setTimeout(()=>{
    Toast(msg)
  }, 0)
}
request.interceptors.request.use(
  config => {
    let token = store.getters.token
    if (token) {
      config.headers[tokenHeader] = token
    }
    const params = config.params
    config.params = {
      t: +new Date(),
      ...params
    }
    config.timeout = config.timeout || (config.data && config.data.timeout) || defaultTimeout
    return config
  },
  err => Promise.reject(err)
)
request.interceptors.response.use(
  response => {
    const { headers, config, data: { data = '', result = '' } = {}} = response
    const { callback, showError } = config || {}
    let rdata = data
    if (typeof data === 'undefined'){
      rdata = result
    }
    if (headers[tokenHeader]) {
      localStorage.setItem('userToken', headers[tokenHeader])
      vInstance.$store && vInstance.$store.dispatch('updateUserToken', headers[tokenHeader])
    }
    if (handleCustomHeader(response.data)){
      return Promise.reject(response.data)
    }
    // success callback in request confi
    if (callback){
      callback.call(vInstance, rdata)
    }

    if ((debug || showError) && rdata.msg){
      showToast(rdata.msg)
    }
    return rdata
  },
  (res) => {
    if (res instanceof Error){
      if (/timeout/i.test(res.toString())){
        return Promise.reject({
          timeout: true,
          data: res
        })
      }
      return Promise.reject({
        data: res
      })
    }
    const { config: { silent401, callback, noToast = false }, status, data } = res
    if (callback){
      callback.call(vInstance, data)
    }
    // handleCustomHeader(data)
    if (typeof data === 'string' && !noToast){
      showToast(data)
      return Promise.reject({
        toasted: true,
        data
      })
    }
    if (data && data.msg && !noToast){
      showToast(data.msg)
      return Promise.reject({
        toasted: true,
        data })
    }
    if (debug){
      showToast(status + JSON.stringify(data))
    }
    // if status is not 200
    // this is reject in request.js
    if (status === 401){
      vInstance.$store.dispatch('logout')

      if (silent401){
        console.log('silent401')
        return Promise.reject({ data })
      }
      setTimeout(
        () => vInstance.$router.push(vInstance.routePath.goLogin()), 0)
    }
    // if (status == 500){
    //   setTimeout(() => {
    //     showToast(vInstance.$t('500'))
    //   }, 0)
    // handleOtherStatus(status, data)
    return Promise.reject({ data })
  },
  err => Promise.reject(err)
)

export default {
  watch: {
    '$store.state.lang'(lang) {
      request.defaults.headers.common['Accept-Language'] = lang
    }
  },
  created() {
    vInstance = this
  }
}
function handleCustomHeader({ code }){
  let reject = false
  if (code == ServiceCustomeCode['401']){
    store.dispatch('updateUserToken', '')
    Toast('登录已过期')
    reject = true
  } else if (code == 1503){
    Toast('通过忘记密码，更新密码')
    reject = true
  }
  return reject
}

export * from './exchange'
</script>
