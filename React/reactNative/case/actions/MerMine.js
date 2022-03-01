import * as types from './ActionTypes';
import {URL_MER_GET_MERCHANT_INFO,URL_MER_GET_GroupMemberTaskCount} from '../constant/url';
import request from '../utils/request';
import Toast from '../utils/Toast';

export function addMineInfo(data) {
  return {
    type: types.MERMINE_ADD_INFO,
    info: {
      imgIcon: data.faceImgUrl,
      shopName: data.realName,
      shopId: data.username,
      isAuthentication: data.certifyStatus,
      staffNo: 0,
    },
  };
}

export function getMerchantInfo(token) {
  return dispatch => {
    request(dispatch, URL_MER_GET_MERCHANT_INFO, '', token)
      .then(result => {
        if (result.code === 0) {
          dispatch(addMineInfo(result.data));
        } else {
          Toast.show(result.msg);
        }
      })
      .catch(() => {
        Toast.show('网络异常，请检查网络！');
      });
  };
}

export function getMemberGroupTaskCount(state,token){
  const param = JSON.stringify({
    memberGroupMemberTaskFilter: state,
  });
  return dispatch => {
    request(dispatch, URL_MER_GET_GroupMemberTaskCount, param, token)
      .then(result => {
        if (result.code === 0) {
          dispatch({
            type:types.MERMINE_UNCHECKED_PERSON,
            uncheckPersonCount:result.data
          })
        } else {
          Toast.show(result.msg);
        }
      })
      .catch(() => {
        Toast.show('网络异常，请检查网络！');
      });
  };
}

export function clearMineInfo() {
  return {
    type: types.MERMINE_INFO_CLEAR,
  };
}
