import * as types from './ActionTypes';
import {
  URL_MER_SET_COMPANY_NAME,
  URL_MER_GET_SMS_CODE,
  URL_MER_SET_NEW_PHONE,
  URL_MER_GET_SMS_VERIFYCODE_FORCURRENT,
  URL_MER_VERIFY_CHANGE_COMPANY_MOBILE_OLD,
  URL_MER_SET_ADDRESS,
  URL_MER_GET_COMPANY_INFO,
  URL_MER_SET_DESCP,
} from '../constant/url';
import request from '../utils/request';
import Toast from '../utils/Toast';

export function inputName(name) {
  return {
    type: types.MER_EDIT_SHOP_NAME,
    name: name,
  };
}

export function clearCompany() {
  return {
    type: types.MER_EDIT_SHOP_CLEAR,
  };
}

export function inputPhone(phone) {
  return {
    type: types.MER_EDIT_SHOP_TEL,
    phone: phone,
  };
}

export function inputOldPhone(phone) {
  return {
    type: types.MER_EDIT_SHOP_OLD_TEL,
    oldPhone: phone,
  };
}

export function inputSMSCode(code) {
  return {
    type: types.MER_EDIT_SHOP_GET_SMSCODE,
    SMSCode: code,
  };
}

export function inputOldSMSCode(code) {
  return {
    type: types.MER_EDIT_SHOP_OLD_SMSCODE,
    oldCode: code,
  };
}

export function changeAddressName(addressName) {
  return {
    type: types.MER_EDIT_SHOP_ADDRESS_NAME,
    addressName: addressName,
  };
}

export function BindPhone(isTrue) {
  return {
    type: types.MER_EDIT_SHOP_BIND_PHONE,
    isBindPhone: isTrue,
  };
}

export function setShopAddressArea(area) {
  return {
    type: types.MER_EDIT_SHOP_ADDRESS_AREA,
    shopAddress: area,
  };
}

export function setAddressCode(code) {
  return {
    type: types.MER_EDIT_SHOP_ADDRESS_CODE,
    addressCode: code,
  };
}

export function setCodeButton(status, value) {
  return {
    type: types.MER_EDIT_SHOP_SET_CODEBUTTON,
    status: status,
    value: value,
  };
}
export function inputDetail(shopdetail) {
  return {
    type: types.MER_EDIT_SHOP_INPUT_SHOP_DETAIL,
    shopDetail: shopdetail,
  };
}

export function setCompanyName(name, token, nav) {
  return dispatch => {
    const param = JSON.stringify({
      name,
    });
    request(dispatch, URL_MER_SET_COMPANY_NAME, param, token)
      .then(result => {
        if (result.code === 0) {
          Toast.show('设置成功');
          nav.navigate('MerShopInfo');
        } else {
          Toast.show(result.msg);
        }
      })
      .catch(() => {
        Toast.show('网络异常，请检查网络！');
      });
  };
}

function setCodeWaitTime(dispatch, time) {
  if (time > 0) {
    dispatch(setCodeButton('wait', `${time}s后重新获取`));
    let next = --time;
    setTimeout(() => {
      setCodeWaitTime(dispatch, next);
    }, 1000);
  } else if (time === 0) {
    dispatch(setCodeButton('idle', '获取验证码'));
  }
}

export function getSMSCode(phone, token) {
  return dispatch => {
    dispatch(setCodeButton('request', '请稍后'));
    const param = JSON.stringify({
      key: 'merChangeCompanyMobileNew',
      mobile: phone,
    });
    request(dispatch, URL_MER_GET_SMS_CODE, param, token)
      .then(result => {
        if (result.code === 0) {
          Toast.show('发送成功！');
          setCodeWaitTime(dispatch, 60);
        } else {
          Toast.show('发送失败，请稍后重试！');
          dispatch(setCodeButton('idle', '获取验证码'));
        }
      })
      .catch(() => {
        Toast.show('网络异常，请检查网络！');
        dispatch(setCodeButton('idle', '获取验证码'));
      });
  };
}

export function getOldSMSCode(token) {
  return dispatch => {
    dispatch(setCodeButton('request', '请稍后'));
    const param = JSON.stringify({
      key: 'merChangeCompanyMobileOld',
    });
    request(dispatch, URL_MER_GET_SMS_VERIFYCODE_FORCURRENT, param, token)
      .then(result => {
        if (result.code === 0) {
          Toast.show('发送成功！');
          setCodeWaitTime(dispatch, 60);
        } else {
          Toast.show('发送失败，请稍后重试！');
          dispatch(setCodeButton('idle', '获取验证码'));
        }
      })
      .catch(() => {
        Toast.show('网络异常，请检查网络！');
        dispatch(setCodeButton('idle', '获取验证码'));
      });
  };
}

export function submitFinshPhone(phone, code, token) {
  return dispatch => {
    const param = JSON.stringify({
      contactMobile: phone,
      verifyCode: code,
    });
    request(dispatch, URL_MER_SET_NEW_PHONE, param, token)
      .then(result => {
        if (result.code === 0) {
          Toast.show('设置成功');
          // nav.navigate('MerShopInfo');
        } else {
          Toast.show(result.msg);
        }
      })
      .catch(() => {
        Toast.show('网络异常，请检查网络！');
      });
  };
}

export function verifyOldPhone(code, token) {
  return dispatch => {
    const param = JSON.stringify({
      verifyCode: code,
    });
    request(dispatch, URL_MER_VERIFY_CHANGE_COMPANY_MOBILE_OLD, param, token)
      .then(result => {
        if (result.code === 0) {
          Toast.show('验证成功');
          dispatch(BindPhone(false));
          // nav.navigate('MerShopInfo');
        } else {
          Toast.show(result.msg);
        }
      })
      .catch(() => {
        Toast.show('网络异常，请检查网络！');
      });
  };
}

export function getDianpuInfo(token) {
  return dispatch => {
    request(dispatch, URL_MER_GET_COMPANY_INFO, '', token)
      .then(result => {
        let data = result.data;
        if (result.code === 0) {
          let addressObj = {
            cityCode: data.regionCityId,
            cityName: data.regionCityName,
            countyCode: data.regionCountyId,
            countyName: data.regionCountyName,
            provinceCode: data.regionProvinceId,
            provinceName: data.regionProvinceName,
            townCode: data.regionTownId,
            townName: data.regionTownName,
          };
          let str =
            data.regionProvinceName +
            data.regionCityName +
            data.regionCountyName +
            data.regionTownName;
          dispatch(setAddressCode(addressObj));
          dispatch(setShopAddressArea(str));
          dispatch(changeAddressName(data.addressDetail));
        } else {
          Toast.show(result.msg);
        }
      })
      .catch(() => {
        Toast.show('网络异常，请检查网络！');
      });
  };
}

export function saveCompanyAddress(code, detail, token) {
  return dispatch => {
    const param = JSON.stringify({
      regionProvinceId: code.provinceCode,
      regionCityId: code.cityCode,
      regionCountyId: code.countyCode,
      regionTownId: code.townCode,
      addressDetail: detail,
    });
    request(dispatch, URL_MER_SET_ADDRESS, param, token)
      .then(result => {
        if (result.code === 0) {
          Toast.show('设置成功');
          // nav.navigate('MerShopInfo');
        } else {
          Toast.show(result.msg);
        }
      })
      .catch(() => {
        Toast.show('网络异常，请检查网络！');
      });
  };
}

export function saveShopDetails(detail, token) {
  return dispatch => {
    const param = JSON.stringify({
      descp: detail,
    });
    request(dispatch, URL_MER_SET_DESCP, param, token)
      .then(result => {
        if (result.code === 0) {
          Toast.show('设置成功');
          // nav.navigate('MerShopInfo');
        } else {
          Toast.show(result.msg);
        }
      })
      .catch(() => {
        Toast.show('网络异常，请检查网络！');
      });
  };
}
