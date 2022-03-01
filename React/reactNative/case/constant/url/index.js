// const service = 'https://m.zq-im.com/v1';
const service = 'http://192.168.0.120:8080';

// 账户
export const URL_MER_REGISTER = `${service}/merchant/login/registerLogin`;
export const URL_MER_LOGIN_BY_SMSCODE = `${service}/merchant/login/login`;
export const URL_MER_LOGIN_BY_PASSWORD = `${service}/mobileMember/login/loginByPassword`;
export const URL_MER_SET_FIRST_PASSWORD = `${service}/merchant/merchant/firstLoginPassword`;
export const URL_MER_SET_FIND_PASSWORD = `${service}/merchant/merchant/editLoginPasswordByFindLoginPassword`;

// 验证
export const URL_MER_VERIFY_FIND_PASSWORD = `${service}/merchant/verify/verifyFindLoginPassword`;
export const URL_MER_GET_SMS_CODE = `${service}/merchant/verify/getSmsVerifyCode`;

// 商户
export const URL_MER_UPLOAD_BUSINESSLICENSE_IMG = `${service}/merchant/ent/uploadEntLicenceImg`;
export const URL_MER_UPLOAD_ENT_DATA = `${service}/merchant/ent/uploadEntData`;
export const URL_MER_GET_ENTDATA_INFO = `${service}/merchant/ent/getEntDataInfo`;
export const URL_MER_GET_MERCHANT_INFO = `${service}/merchant/merchant/getMerchantInfo`;

// 商铺
export const URL_MER_GET_COMPANY_INFO = `${service}/merchant/company/getCompanyInfo`;
export const URL_MER_SET_COMPANY_NAME = `${service}/merchant/company/setName`;
export const URL_MER_SET_NEW_PHONE = `${service}/merchant/company/setContactMobile`;
export const URL_MER_GET_SMS_VERIFYCODE_FORCURRENT = `${service}/merchant/verify/getSmsVerifyCodeForCompanyMobile`;
export const URL_MER_VERIFY_CHANGE_COMPANY_MOBILE_OLD = `${service}/merchant/verify/verifyChangeCompanyMobileOld`;
export const URL_MER_SET_ADDRESS = `${service}/merchant/company/setAddress`;
export const URL_MER_SET_DESCP = `${service}/merchant/company/setDescp`;
export const URL_MER_SET_SHOP_IS_OPEN = `${service}/merchant/company/setIsOpen`;
export const URL_MER_SET_SHOP_FACEIMG = `${service}/merchant/company/setFaceImg`;

// 员工
export const URL_MER_GET_GroupMemberTaskCount = `${service}/merchant/memberGroup/getMemberGroupMemberTaskCount`;
export const URL_MER_GET_GroupMemberTaskList = `${service}/merchant/memberGroup/getMemberGroupMemberTaskList`;
export const URL_MER_CHECK_MEMBER_TASK = `${service}/merchant/memberGroup/checkMemberGroupMemberTask`;
export const URL_MER_DELETE_MEMBER_PERSON = `${service}/merchant/memberGroup/deleteMemberGroupMemberTaskBatch`;
