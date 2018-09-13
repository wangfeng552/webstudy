<template>
  <div id="http" style="opacity:0;display:none"></div>
</template>
<script>
import { browserUtil } from "@/assets/js/common";
import store from "@/store";
import { Toast } from "mint-ui";
import request from "@/utils/request";
import createExchange from "./exchange";
import createOther from "./other";
createExchange(request);
createOther(request);
let vInstance = {};
const ServiceCustomeCode = {
  "401": "900102"
};

const debug = false;
const appHeader = "ucex-api-token";
const tokenHeader = "ucex-h5-api-token";
const defaultTimeout = 20000;
const showToast = msg => {
  setTimeout(() => {
    Toast({
      message: msg,
      position: "bottom",
      duration: 5000
    });
  }, 0);
};
request.interceptors.request.use(
  config => {
    let token = store.getters.token;

    if (token) {
      if (browserUtil().bigerAndroid || browserUtil().bigerIos) {
        config.headers[appHeader] = token;
      } else {
        config.headers[tokenHeader] = token;
      }
    }
    const params = config.params;
    config.params = {
      t: +new Date(),
      ...params
    };
    config.timeout =
      config.timeout || (config.data && config.data.timeout) || defaultTimeout;
    return config;
  },
  err => Promise.reject(err)
);
request.interceptors.response.use(
  response => {
    const {
      headers,
      config,
      data: { data = "", result = "", msg } = {}
    } = response;
    const { callback, showError } = config || {};
    if (data == null && !showError) {
      return Promise.reject(msg);
    }
    let rdata = data;
    if (typeof data === "undefined") {
      rdata = result;
    }
    if (browserUtil().bigerAndroid || browserUtil().bigerIos) {
      if (headers[appHeader]) {
        localStorage.setItem("userToken", headers[appHeader]);
        rdata.token = headers[appHeader];
      }
    } else {
      if (headers[tokenHeader]) {
        localStorage.setItem("userToken", headers[tokenHeader]);
        rdata.token = headers[tokenHeader];
        // vInstance.$store && vInstance.$store.dispatch('updateUserToken', headers[tokenHeader])
      }
    }
    if (headers[appHeader]) {
      localStorage.setItem("userToken", headers[appHeader]);
      rdata.token = headers[appHeader];
    }

    if (headers["ucex-captcha"]) {
      localStorage.setItem("ucex-captcha", headers["ucex-captcha"]);
    }
    if (handleCustomHeader(response.data)) {
      return Promise.reject(response.data);
    }
    // success callback in request confi
    if (callback) {
      callback.call(vInstance, rdata);
    }

    if ((debug || showError) && msg && !data) {
      showToast(msg);
      return Promise.reject(msg);
    }
    return rdata;
  },
  res => {
    if (res instanceof Error) {
      if (/timeout/i.test(res.toString())) {
        return Promise.reject({
          timeout: true,
          data: res
        });
      }
      return Promise.reject({
        data: res
      });
    }
    const {
      config: { silent401, callback, noToast = false },
      status,
      data
    } = res;
    if (status >= 500 && status < 600) {
      return Promise.reject({
        data: res
      });
    }

    if (callback) {
      callback.call(vInstance, data);
    }
    // handleCustomHeader(data)
    if (typeof data === "string" && !noToast) {
      showToast(data);
      return Promise.reject({
        toasted: true,
        data
      });
    }
    if (data && data.msg && !noToast) {
      showToast(data.msg);
      return Promise.reject({
        toasted: true,
        data
      });
    }
    if (debug) {
      showToast(status + JSON.stringify(data));
    }
    // if status is not 200
    // this is reject in request.js
    if (status === 401) {
      vInstance.$store.dispatch("logout");

      if (silent401) {
        return Promise.reject({ data });
      }
      setTimeout(() => vInstance.$router.push({ name: "signIn" }), 0);
    }
    // if (status == 500){
    //   setTimeout(() => {
    //     showToast(vInstance.$t('500'))
    //   }, 0)
    // handleOtherStatus(status, data)
    return Promise.reject({ data });
  },
  err => Promise.reject(err)
);

export default {
  watch: {
    "$store.state.lang"(lang) {
      request.defaults.headers.common["Accept-Language"] = lang;
    }
  },
  created() {
    vInstance = this;
  }
};
function handleCustomHeader({ code }) {
  let reject = false;
  if (code == ServiceCustomeCode["401"]) {
    store.dispatch("logout", "");
    Toast("登录已过期");
    reject = true;
  } else if (code == 1503) {
    Toast("通过忘记密码，更新密码");
    reject = true;
  }
  return reject;
}

export * from "./exchange";
export * from "./other";
</script>
