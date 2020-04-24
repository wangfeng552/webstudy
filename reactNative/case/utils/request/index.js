import {SwitchActions} from 'react-navigation';
// import {upgradeToken} from '../../actions/UserInfo';
import {Linking, Alert} from 'react-native';
import {VERSION_CODE, PLATFORM_OS} from '../devices';
let showExpired = false;

export default function request(
  dispatch,
  url,
  body,
  token = '',
  headers,
  method = 'POST',
) {
  // console.log('url = ', url, body, token);
  let isOk;
  // const beginTime = new Date().getTime();
  let h = Object.assign(
    {Accept: 'application/json', 'Content-Type': 'application/json'},
    {appSessionId: token, appType: PLATFORM_OS, appVersion: '4.0.1'},
    headers,
  );
  let b = body;
  if (!body || body === '') {
    b = JSON.stringify({});
  }
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(
      () => reject(new Error('request timeout')),
      30000,
    );
    // console.log('request >>>',b.length, url, method, h, b);

    fetch(url, {
      method: method,
      headers: h,
      body: b,
    })
      .then(response => {
        // console.log('Response >> ', response);
        // const endTime = new Date().getTime();
        // console.log('time consuming ', endTime - beginTime, '   URL -->>', url);
        if (response.ok) {
          isOk = true;
        } else {
          isOk = false;
        }
        return response.json();
      })
      .then(responsejson => {
        console.log('URL responsejson >>> ', url, body, token, responsejson);
        if (
          responsejson.code === 0 &&
          token !== '' &&
          responsejson.appSessionId &&
          responsejson.appSessionId !== '' &&
          responsejson.appSessionId !== token
        ) {
          //更新token
          // dispatch(upgradeToken(responsejson.appSessionId));
          return responsejson;
        } else if (responsejson.code === 1 && responsejson.msgCode === '401') {
          //防止多次弹框提示
          if (!showExpired) {
            showExpired = true;
            let msg = '登录状态已过期，请重新登录！';
            if (responsejson.msg && responsejson.msg !== '') {
              msg = responsejson.msg;
            }
            Alert.alert(
              '提示',
              msg,
              [
                {
                  text: '取消',
                  onPress: () => {
                    showExpired = false;
                    // dispatch(clearUserInfo());
                    dispatch(SwitchActions.jumpTo({routeName: 'App'}));
                  },
                },
                {
                  text: '重新登录',
                  onPress: () => {
                    showExpired = false;
                    // dispatch(clearUserInfo());
                    dispatch(SwitchActions.jumpTo({routeName: 'Auth'}));
                  },
                },
              ],
              {cancelable: false},
            );
          }
        } else if (responsejson.code === 1 && responsejson.msgCode === '418') {
          let msg = '版本过低,版本已不支持,请立即更新！';
          if (responsejson.msg && responsejson.msg !== '') {
            msg = responsejson.msg;
          }
          //防止多次弹框提示
          if (!showExpired) {
            showExpired = true;
            Alert.alert(
              '提示',
              msg,
              [
                {
                  text: '取消',
                  onPress: () => {
                    showExpired = false;
                    dispatch(SwitchActions.jumpTo({routeName: 'App'}));
                  },
                },
                {
                  text: '立即更新',
                  onPress: () => {
                    showExpired = false;
                    if (PLATFORM_OS === 'ios') {
                      let URL_APPLE =
                        'itms-apps://itunes.apple.com/cn/app/id1498720157?mt=8';
                      Linking.openURL(URL_APPLE).catch(err => {
                        console.log('Error', err);
                      });
                    } else if (PLATFORM_OS === 'android') {
                      let URL_ANDROID =
                        'market://details?id=com.zoomatec.hy.hml';
                      Linking.openURL(URL_ANDROID).catch(err => {
                        console.log('Error', err);
                      });
                    }
                  },
                },
              ],
              {cancelable: false},
            );
          }
        } else if (responsejson.code === 1 && responsejson.msgCode === '419') {
          //防止多次弹框提示
          if (!showExpired) {
            showExpired = true;
            let msg = '您的帐号已在其他设备登录,请重新登录！';
            if (responsejson.msg && responsejson.msg !== '') {
              msg = responsejson.msg;
            }
            Alert.alert(
              '提示',
              msg,
              [
                {
                  text: '取消',
                  onPress: () => {
                    showExpired = false;
                    // dispatch(clearUserInfo());
                    dispatch(SwitchActions.jumpTo({routeName: 'App'}));
                  },
                },
                {
                  text: '重新登录',
                  onPress: () => {
                    showExpired = false;
                    // dispatch(clearUserInfo());
                    dispatch(SwitchActions.jumpTo({routeName: 'Auth'}));
                  },
                },
              ],
              {cancelable: false},
            );
          }
        } else {
          return responsejson;
        }
      })
      .then(responseData => {
        clearTimeout(timeoutId);
        if (isOk) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
        // console.log('responseData>> ', responseData);
      })
      .catch(error => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}
