import axios from "axios";
import store from "@/store";
let request;
export default function createOther(re) {
  request = re;
}
const instance = axios.create({
  withCredentials: true
});
const instance2 = axios.create({
  withCredentials: true
});
let lastCaptchHeader = "";
instance.interceptors.response.use(
  ({ data: { code, data } }) => {
    if (code != 200) {
      console.error("error in other " + code);
    }
    return data;
  },
  data => {
    console.log(data);
  }
);
export async function getCaptcha() {
  return instance2("/exchange/codes/captcha", {
    responseType: "arraybuffer"
  }).then(response => {
    const image = btoa(
      new Uint8Array(response.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    lastCaptchHeader = response.headers["ucex-captcha"];
    return {
      captchaHeader: lastCaptchHeader,
      data: `data:${response.headers[
        "content-type"
      ].toLowerCase()};base64,${image}`
    };
  });
}
export async function verifyCaptcha(captcha) {
  return request(`/exchange/codes/verify/captcha`, {
    method: "post",
    headers: {
      "UCEX-CAPTCHA": lastCaptchHeader
    },
    params: {
      captcha
    }
  });
}

export async function queryAnnouncement() {
  return instance2(`/ucex-controller/announcement/pc`).then(({ data }) => {
    const { data: pData, result, code } = data;
    if (result == "Success" || code == 0) {
      return pData;
    }
  });
}

export async function queryHotCoin() {
  return request(`/ucex-controller/coins/getCoinHotList`); //http://192.168.190.145:10002
}

export async function getPhoneCaptcha({ captcha, cellPhone }) {
  return request(`/exchange/codes/phone`, {
    method: "POST",
    headers: {
      "UCEX-CAPTCHA": lastCaptchHeader
    },
    params: {
      captcha
    },
    data: {
      cellPhone
    }
  });
}

export async function getEmailCaptcha({ captcha, email }) {
  return request(`/exchange/codes/email`, {
    method: "POST",
    headers: {
      "UCEX-CAPTCHA": lastCaptchHeader
    },
    params: {
      captcha,
      email
    },
    data: {
      email
    }
  });
}

export async function verifyPhone({ phoneCode, cellPhone }) {
  return request(`/exchange/codes/verify/phone`, {
    method: "POST",
    params: {
      phoneCode
    },
    data: {
      cellPhone
    }
  });
}

export async function verifyEmail({ emailCode, email }) {
  return request(`/exchange/codes/verify/email`, {
    method: "POST",
    params: {
      emailCode,
      email
    },
    data: {
      emailCode,
      email
    }
  });
}

//查询app下载地址
export function queryAppDownload({ type } = {}) {
  let version = 3;
  if (/ios/i.test(type)) {
    version = 4;
  }
  return instance(`/ucex-controller/app/version/${version}`);
}
