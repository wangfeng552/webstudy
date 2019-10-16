import axios from "axios";
import store from "@/store";
let request;
const root = process.env.API_URL
function formatUrl(url) {
  return root + url;
}
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
    if (code !== 200) {
      console.error("error in other " + code);
    }
    return data;
  },
  data => {
    console.log(data);
  }
);

// 快捷登录
export async function goLogin(data) {
  const { user_name, sms_code, true_name } = data
  return request(formatUrl('/api/drive/user/ajax_sms_login'), {
    method: "post",
    showError:false,
    data: {
      user_name,
      sms_code,
      true_name
    }
  });
}