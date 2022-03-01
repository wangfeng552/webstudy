import * as types from './ActionTypes';
// import request from '../utils/request';

// import {URL_HOME_GET_INFO} from '../constant/url';
// import Toast from 'react-native-root-toast';

export function getHomeInfo(appSessionId) {
  //   return dispatch => {
  //     request(dispatch, URL_HOME_GET_INFO, '', appSessionId)
  //       .then(result => {
  //         if (result.code === 0) {
  //           // 需要另外校验有无商户认证信息
  //           return dispatch({
  //             type: types.HOME_GET_INFO,
  //             info: {},
  //           });
  //         } else {
  //           Toast.show(result.msg);
  //         }
  //       })
  //       .catch(error => {
  //         // console.log('erroroo', error);
  //         Toast.show('网络请求失败，请稍后重试！');
  //       });
  //   };
  return {
    type: types.MERHOME_GET_INFO,
    info: {
      headImg: '',
      nick: 'HongMaLi',
      coupon: 10,
      couponTotal: 200,
      integral: 10,
      integralTotal: 200,
      data: [
        {
          title: '01月09日 周四',
          data: [
            {
              id: 123456789321456,
              title: '保养工时抵用券100元',
              time: '2020-01-09~2020-02-09',
              num: 3,
              useTime:'2020-02-29 13:44',
            },
            {
              id: 123456789321456,
              title: '免费机油',
              time: '2020-01-09~2020-02-09',
              num: 3,
              useTime:'2020-02-29 13:44',
            },
          ],
        },
        {
          title: '01月08日 周三',
          data: [
            {
              id: 1,
              title: '保养工时抵用券100元',
              time: '2020-01-09~2020-02-09',
              num: 3,
              useTime:'2020-02-29 13:44',
            },
            {
              id: 2,
              title: '免费机油',
              time: '2020-01-09~2020-02-09',
              num: 3,
              useTime:'2020-02-29 13:44',
            },
          ],
        },
      ],
    },
  };
}

export function clearHomeInfo() {
  return {
    type: types.MERHOME_INFO_CLEAR,
  };
}
