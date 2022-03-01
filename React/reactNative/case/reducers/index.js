import {combineReducers} from 'redux';
import Splash from './Splash';
import SignIn from './SignIn';
import Register from './Register';
import RegisterInfo from './RegisterInfo';
import MerMine from './MerMine';
import MerPointDetail from './MerPointDetail';
import MerStaff from './MerStaff';
import MerInformation from './MerInformation';
import MerchantCA from './MerchantCA';
import MerHome from './MerHome';
import MerCouponRecycle from './MerCouponRecycle';
import MerShopInfo from './MerShopInfo';
import MerEditShop from './MerEditShop';
import SafeSetting from './SafeSetting';
import UserInfo from './UserInfo';
import FindPassword from './FindPassword';

const index = combineReducers({
  Splash,
  MerMine,
  SignIn,
  MerPointDetail,
  MerStaff,
  MerInformation,
  MerchantCA,
  MerHome,
  Register,
  RegisterInfo,
  MerCouponRecycle,
  MerShopInfo,
  MerEditShop,
  SafeSetting,
  UserInfo,
  FindPassword,
});

export default index;
