import * as types from './ActionTypes';
import {
  URL_MER_LOGIN_BY_PASSWORD,
  URL_MER_GET_SMS_CODE,
  URL_MER_LOGIN_BY_SMSCODE,
} from '../constant/url';
import request from '../utils/request';
import Toast from '../utils/Toast';
// import {SwitchActions} from 'react-navigation';
// import {NavigationActions} from 'react-navigation';
import {upgradeToken} from './UserInfo';

export function setModle(modle) {
  return {
    type: types.SIGNIN_SET_MODLE,
    modle: modle,
  };
}

export function clearSignIn() {
  return {
    type: types.SIGNIN_CLEAR,
  };
}
export function inputPhone(text) {
  return {
    type: types.SIGNIN_INPUT_PHONE,
    phone: text,
  };
}

export function inputPassword(text) {
  return {
    type: types.SIGNIN_INPUT_PASSWORD,
    password: text,
  };
}

export function inputCode(text) {
  return {
    type: types.SIGNIN_INPUT_CODE,
    code: text,
  };
}

export function setCodeButton(status, value) {
  return {
    type: types.SIGNIN_SET_CODEBUTTON,
    status: status,
    value: value,
  };
}

export function setTempToken(tempToken) {
  return {
    type: types.SIGNIN_SET_TEMPTOKEN,
    tempToken: tempToken,
  };
}

export function signInByPassword(phone, password) {
  const param = JSON.stringify({
    mobile: phone,
    password: password,
  });
  return dispatch => {
    request(dispatch, URL_MER_LOGIN_BY_PASSWORD, param, '')
      .then(result => {
        if (result.code === 0) {
          if (result.appSessionId && result.appSessionId !== '') {
            dispatch(upgradeToken(result.appSessionId));
          }
          // dispatch(SwitchActions.jumpTo({routeName: 'App'}));
        } else {
          Toast.show(result.msg);
        }
      })
      .catch(() => {
        Toast.show('网络异常，请检查网络！');
      });
  };
}

export function getCode(phone) {
  return dispatch => {
    dispatch(setCodeButton('request', '请稍后'));
    const param = JSON.stringify({
      key: 'merLogin',
      mobile: phone,
    });
    request(dispatch, URL_MER_GET_SMS_CODE, param, '')
      .then(result => {
        if (result.code === 0) {
          Toast.show('发送成功！');
          dispatch(setTempToken(result.appSessionId));
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

function setCodeWaitTime(dispatch, time) {
  let isClearTime;
  if (time > 0) {
    dispatch(setCodeButton('wait', `${time}s`));
    let next = --time;
    isClearTime = setTimeout(() => {
      setCodeWaitTime(dispatch, next);
    }, 1000);
  } else if (time === 0) {
    clearTimeout(isClearTime);
    dispatch(setCodeButton('idle', '获取验证码'));
  }
}

export function signInByCode(phone, code, token, nav) {
  const param = JSON.stringify({
    mobile: phone,
    verifyCode: code,
  });
  return dispatch => {
    request(dispatch, URL_MER_LOGIN_BY_SMSCODE, param, token)
      .then(result => {
        if (result.code === 0) {
          if (result.appSessionId && result.appSessionId !== '') {
            dispatch(upgradeToken(result.appSessionId));
            nav.navigate('App');
          }
          // dispatch(SwitchActions.jumpTo({routeName: 'App'}));
        } else {
          Toast.show(result.msg);
        }
      })
      .catch(() => {
        Toast.show('网络异常，请检查网络！');
      });
  };
}
