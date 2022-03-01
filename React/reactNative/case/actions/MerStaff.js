import * as types from '../actions/ActionTypes';
import {
  URL_MER_GET_GroupMemberTaskList,
  URL_MER_CHECK_MEMBER_TASK,
  URL_MER_DELETE_MEMBER_PERSON,
  URL_MER_GET_GroupMemberTaskCount,
} from '../constant/url';
import request from '../utils/request';
import Toast from '../utils/Toast';

export function getStaffInfo(status, start, token,isEdit) {
  const param = JSON.stringify({
    memberGroupMemberTaskFilter: status,
    start: start,
    length: 12,
  });
  return dispatch => {
    if (start === 0) {
      dispatch(pullDropRefresh(true));
    } else {
      dispatch(pullUpRefresh(true));
    }
    request(dispatch, URL_MER_GET_GroupMemberTaskList, param, token)
      .then(response => {
        if (response.code === 0) {
          let personList = response.data.list;
          if(isEdit){
            personList.forEach((v)=>{
              v.isShow = true
            })
          }

          switch (status) {
            case 'unchecked':
              dispatch({
                type: types.MER_STAFF_GET_CHECK_LIST,
                check: personList,
                checkTotal: response.data.total,
                checkStart: response.data.startRow,
              });
              break;
            case 'checked':
              dispatch({
                type: types.MER_STAFF_GET_AUDITED_LIST,
                audited: personList,
                auditedTotal: response.data.total,
                auditedStart: response.data.startRow,
              });
              break;
            case 'all':
              dispatch({
                type: types.MER_STAFF_GET_ALL_LIST,
                all: personList,
                allNums: response.data.total,
                allStart: response.data.startRow,
              });
              break;
            default:
              break;
          }
        } else {
          //   Toast.show('服务器出错了,请稍后再试');
        }
        if (start === 0) {
          dispatch(pullDropRefresh(false));
        } else {
          dispatch(pullUpRefresh(false));
        }
      })
      .catch(error => {
        // Toast.show('网络错误,请稍后再试');
        dispatch(pullDropRefresh(false));
        dispatch(pullUpRefresh(false));
      });
  };
}

export function staffCheck(staffID, status, memberTitle, navIndex, token) {
  const string = JSON.stringify({
    mgmtId: staffID,
    status: status,
    memberTitle: memberTitle,
  });
  return dispatch =>
    request(dispatch, URL_MER_CHECK_MEMBER_TASK, string, token)
      .then(response => {
        if (response.code === 0) {
          Toast.show('员工审核成功');
          if (navIndex === 0) {
            dispatch(getStaffInfo('all', 0, token));
          } else if (navIndex === 1) {
            dispatch(getStaffInfo('unchecked', 0, token));
          } else {
            dispatch(getStaffInfo('checked', 0, token));
          }
          dispatch(showVerifyPopup(false, ''));
          dispatch(getIdentityValue(''));
          dispatch(getUncheckPersonCount('unchecked',token))
        } else {
          Toast.show(response.msg);
        }
      })
      .catch(error => {
        Toast.show('网络错误,请稍后重试');
      });
}

// 删除员工
export function deletePersonArr(mgmtIds, navIndex, token) {
  const string = JSON.stringify({
    mgmtIds: mgmtIds,
  });
  return dispatch =>
    request(dispatch, URL_MER_DELETE_MEMBER_PERSON, string, token)
      .then(response => {
        if (response.code === 0) {
          Toast.show('删除成功');
          if (navIndex === 0) {
            dispatch(getStaffInfo('all', 0, token));
          } else if (navIndex === 1) {
            dispatch(getStaffInfo('unchecked', 0, token));
          } else {
            dispatch(getStaffInfo('checked', 0, token));
          }
          dispatch(showFixDel(false))
          dispatch(getUncheckPersonCount('unchecked',token))
        } else {
          Toast.show(response.msg);
        }
      })
      .catch(error => {
        Toast.show('网络错误,请稍后重试');
      });
}

export function getUncheckPersonCount(state,token){
  const param = JSON.stringify({
    memberGroupMemberTaskFilter: state,
  });
  return dispatch => {
    request(dispatch, URL_MER_GET_GroupMemberTaskCount, param, token)
      .then(result => {
        if (result.code === 0) {
          dispatch({
            type:types.MER_STAFF_UNCHECK_PERSON,
            uncheckPerosnCount:result.data
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

export function showVerifyPopup(isTrue, userID) {
  return {
    type: types.MER_STAFF_VERIFY_POPUP_SHOW,
    verifyPopupShow: isTrue,
    userID: userID,
  };
}
export function getIdentityValue(identityValue) {
  return {
    type: types.MER_STAFF_IDENTITY_VALUE,
    identityValue: identityValue,
  };
}

export function showFixDel(isTrue) {
  return {
    type: types.MER_STAFF_FIXDEL_SHOW,
    fixDelShow: isTrue,
  };
}

export function showAllCheckSelect(isTrue) {
  return {
    type: types.MER_STAFF_SET_CHECKBOX_ALL,
    showAllCheck: isTrue,
  };
}

export function setNavIndex(index) {
  return {
    type: types.MER_STAFF_NAV_INDEX,
    navIndex: index,
  };
}

export function setCheckBox(listValue, navIndex) {
  if (navIndex === 0) {
    return {
      type: types.MER_STAFF_SET_All_CHECKBOX,
      all: listValue,
    };
  }
  if (navIndex === 1) {
    return {
      type: types.MER_STAFF_SET_WAIT_CHECKBOX,
      check: listValue,
    };
  }
  if (navIndex === 2) {
    return {
      type: types.MER_STAFF_SET_FINSH_CHECKBOX,
      audited: listValue,
    };
  }
}

// 在等待加载新数据时将此属性设为true，列表就会显示出一个正在加载的符号。
function pullDropRefresh(type) {
  return {
    type: types.MER_STAFF_PULLDROP_REFRESH,
    pullDropRefresh: type,
  };
}

function pullUpRefresh(type) {
  return {
    type: types.MER_STAFF_PULLUP_REFRESH,
    pullUpRefresh: type,
  };
}

export function clearStaffInfo() {
  return {
    type: types.MER_STAFF_CLEAR,
  };
}
