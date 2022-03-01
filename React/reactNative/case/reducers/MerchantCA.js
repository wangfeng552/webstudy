import * as types from '../actions/ActionTypes';

const initialState = {
  storeName: '',
  storeTel: '',
  storeAddress: '',
  contactName: '',
  cell_phone: '',
  telephone: '',
  mailbox: '',
  contactAddress: '',
  licenseImg: '',
  licenseImgRelative: '',
  licenseState: 0,
};

export default function MerchantCA(state = initialState, action) {
  switch (action.type) {
    case types.MERCHANTCA_GET_INFO:
      return Object.assign({}, state, {
        storeName: action.storeName,
        storeTel: action.storeTel,
        storeAddress: action.storeAddress,
        contactName: action.contactName,
        cell_phone: action.cell_phone,
        telephone: action.telephone,
        mailbox: action.mailbox,
        contactAddress: action.contactAddress,
        licenseImg: action.licenseImg,
        licenseImgRelative: action.licenseImgRelative,
        licenseState: action.licenseState,
      });
    case types.MERCHANTCA_LICENSE_STATE:
      return Object.assign({}, state, {
        licenseState: action.licenseState,
      });
    case types.MERCHANTCA_INPUT_STORE_NAME:
      return Object.assign({}, state, {
        storeName: action.storeName,
      });
    case types.MERCHANTCA_INPUT_STORE_TEL:
      return Object.assign({}, state, {
        storeTel: action.storeTel,
      });
    case types.MERCHANTCA_INPUT_STORE_ADDRESS:
      return Object.assign({}, state, {
        storeAddress: action.storeAddress,
      });
    case types.MERCHANTCA_INPUT_CONTACT_NAME:
      return Object.assign({}, state, {
        contactName: action.contactName,
      });
    case types.MERCHANTCA_INPUT_CELL_PHONE:
      return Object.assign({}, state, {
        cell_phone: action.cell_phone,
      });
    case types.MERCHANTCA_INPUT_TELEPHONE:
      return Object.assign({}, state, {
        telephone: action.telephone,
      });
    case types.MERCHANTCA_INPUT_MAILBOX:
      return Object.assign({}, state, {
        mailbox: action.mailbox,
      });
    case types.MERCHANTCA_BUSINESS_LICENSE:
      return Object.assign({}, state, {
        licenseImg: action.licenseImg,
        licenseImgRelative: action.licenseImgRelative,
      });
    case types.MERCHANTCA_INPUT_CONTACT_ADDRESS:
      return Object.assign({}, state, {
        contactAddress: action.contactAddress,
      });
    case types.MERCHANTCA_CLEAR:
      return initialState;
    default:
      return state;
  }
}
