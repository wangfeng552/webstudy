let request;
export default function createExchange(rt) {
  request = rt;
}
//获取韭菜节主页数据
export async function chivesActivity() {
  return request("/activity/activity/chivesActivity");
}

//获取中奖记录
export async function getUserRewardRecords() {
  return request("/activity/record/getUserRewardRecords");
}

//获取分享地址
export async function getShareConfigList() {
  return request("/ucex-controller/share/web/getShareConfigList");
}
//APP获取分享地址
export async function getShareConfigListApp() {
  return request("/ucex-controller/share/getShareConfigList");
}

// 获取用户中奖统计
export async function getUserRewardRecordCount() {
  return request("/activity/record/getUserRewardRecordCount");
}

// 获取好友中奖记录
export async function getFriendsRewardRecords() {
  return request("/activity/record/getFriendsRewardRecords");
}

//获取账户余额
export async function getAccountInfo(data) {
  const { activityId } = data;
  return request("/activity/account/getAccountInfo", {
    params: {
      activityId
    }
  });
}

//参与活动
export async function buyTicket(data) {
  const { activityId, num } = data;
  return request(`/activity/activity/buyTicket`, {
    method: "POST",
    showError: false,
    data: {
      activityId,
      num
    }
  });
}

//区块高度
export async function getActivityPeriodList(data) {
  const { activityId } = data;
  return request(`/activity/activity/getActivityPeriodList`, {
    params: {
      activityId,
      status: "OPENED"
    }
  });
}

// 充XMX币
export async function createDeposit(data) {
  const { coinCode } = data;
  return request(`/exchange/accounts/create/deposit`, {
    method: "POST",
    data: {
      coinCode
    }
  });
}

//选择币种
export async function getAllCoins() {
  return request(`/exchange/coins/query/all`, {});
}

//注册
export async function userRegisterPhone(payload) {
  const { phonecode, cellphone, password, sourceParam } = payload;
  return request(`/exchange/users/register/phone`, {
    method: "post",
    headers: {
      "request-client-type": "H5"
    },
    params: {
      phonecode
    },
    data: {
      cellphone,
      password,
      sourceParam
    }
  });
}

// 登录
export async function userLogin(payload) {
  const { email, password } = payload;
  return request("/exchange/users/api/login", {
    method: "POST",
    headers: {
      "request-client-type": "H5"
    },
    data: { ...payload, email, password }
  });
}

//微信
export async function getJsapiSignature(data) {
  const { url } = data;
  return request(`/activity/weixin/getJsapiSignature`, {
    params: {
      url
    }
  });
}
