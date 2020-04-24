import * as types from './ActionTypes';

export function upgradeToken(token) {
  return {
    type: types.USERINFO_UPGRADE_USERTOKEN,
    token: token,
  };
}
