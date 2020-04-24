import * as types from './ActionTypes';
import request from '../utils/request';
import Toast from '../utils/Toast';
import {
  URL_MER_UPLOAD_BUSINESSLICENSE_IMG,
  URL_MER_UPLOAD_ENT_DATA,
  URL_MER_GET_ENTDATA_INFO,
} from '../constant/url';

export function getMerchantCAInfo(v) {
  let licenseState = v.certifyStatus;
  let authorState = 0;
  if (licenseState === 'submit' || licenseState === 'update') {
    authorState = 2;
  } else if (licenseState === 'success') {
    authorState = 1;
  } else if (licenseState === 'failure' || licenseState === 'update_failure') {
    authorState = 3;
  }

  return {
    type: types.MERCHANTCA_GET_INFO,
    storeName: v.entName,
    storeTel: v.entTel,
    storeAddress: v.entAddress,
    contactName: v.entContactName,
    cell_phone: v.entContactTel,
    telephone: v.entContactMobile,
    mailbox: v.entContactEmail,
    contactAddress: v.entContactAddress,
    licenseImg: v.entLicenceImgUrl,
    licenseImgRelative: v.entLicenceImg,
    licenseState: authorState,
  };
}

export function inputStoreName(text) {
  return {
    type: types.MERCHANTCA_INPUT_STORE_NAME,
    storeName: text,
  };
}

export function inputStoreTel(text) {
  return {
    type: types.MERCHANTCA_INPUT_STORE_TEL,
    storeTel: text,
  };
}

export function inputStoreAddress(text) {
  return {
    type: types.MERCHANTCA_INPUT_STORE_ADDRESS,
    storeAddress: text,
  };
}

export function inputContactName(text) {
  return {
    type: types.MERCHANTCA_INPUT_CONTACT_NAME,
    contactName: text,
  };
}

export function inputCell_phone(text) {
  return {
    type: types.MERCHANTCA_INPUT_CELL_PHONE,
    cell_phone: text,
  };
}

export function inputTelephone(text) {
  return {
    type: types.MERCHANTCA_INPUT_TELEPHONE,
    telephone: text,
  };
}

export function inputMailbox(text) {
  return {
    type: types.MERCHANTCA_INPUT_MAILBOX,
    mailbox: text,
  };
}

export function inputContactAddress(text) {
  return {
    type: types.MERCHANTCA_INPUT_CONTACT_ADDRESS,
    contactAddress: text,
  };
}

export function inputLicenseImg(imgurl, relativeUrl) {
  return {
    type: types.MERCHANTCA_BUSINESS_LICENSE,
    licenseImg: imgurl,
    licenseImgRelative: relativeUrl,
  };
}

export function uploadBusinessLicenseImg(img, token) {
  const param = JSON.stringify({
    companyLicenceImg64: img,
  });
  return dispatch => {
    request(dispatch, URL_MER_UPLOAD_BUSINESSLICENSE_IMG, param, token)
      .then(result => {
        if (result.code === 0) {
          Toast.show('上传成功');
          dispatch(inputLicenseImg(result.data.visitUrl, result.data.url));
          // nav.navigate('App');
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

export function submitMerchantCA(props) {
  const {
    storeName,
    storeTel,
    storeAddress,
    contactName,
    cell_phone,
    telephone,
    mailbox,
    contactAddress,
    licenseImgRelative,
    token,
  } = props;
  const param = JSON.stringify({
    entName: storeName,
    entAddress: storeAddress,
    entTel: storeTel,
    entContactName: contactName,
    entContactTel: cell_phone,
    entContactMobile: telephone,
    entContactEmail: mailbox,
    entContactAddress: contactAddress,
    entLicenceImg: licenseImgRelative,
  });
  return dispatch => {
    request(dispatch, URL_MER_UPLOAD_ENT_DATA, param, token)
      .then(result => {
        if (result.code === 0) {
          Toast.show('提交成功');
          // nav.navigate('App');
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

export function getMerchantInfo(token) {
  return dispatch => {
    request(dispatch, URL_MER_GET_ENTDATA_INFO, '', token)
      .then(result => {
        if (result.code === 0) {
          dispatch(getMerchantCAInfo(result.data));
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

export function clearMerchantCA() {
  return {
    type: types.MERCHANTCA_CLEAR,
  };
}
