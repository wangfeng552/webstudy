import {createStackNavigator} from 'react-navigation-stack';
import MerMainTab from './MerMainTab';
import MerShopInfo from '../screens/MerShopInfo';
import MerShopCard from '../screens/MerShopCard';
import MerPointDetail from '../screens/MerPointDetail';
import MerInformation from '../screens/MerInformation';
import SafeSetting from '../screens/SafeSetting';
import MerchantCA from '../screens/MerchantCA';
import MerQRScanner from '../screens/MerQRScanner';
import MerCouponRecycle from '../screens/MerCouponRecycle';
import EditShopName from '../screens/MerEditShop/EditShopName';
import EditShopTel from '../screens/MerEditShop/EditShopTel';
import EditShopDetail from '../screens/MerEditShop/EditShopDetail';
import EditShopAddress from '../screens/MerEditShop/EditShopAddress';
import EditPhone from '../screens/SafeSetting/EditPhone';
import ResetPassword from '../screens/SafeSetting/ResetPassword';
import FindPassword from '../screens/RegisterInfo/FindPassword';
import MerDetail from '../screens/MerchantCA/merDetail';
import MerStaff from '../screens/MerStaff/Index';
import MerCollectMoney from '../screens/MerCollectMoney';

const AppStack = createStackNavigator(
  {
    MerMainTab: {screen: MerMainTab},
    MerShopInfo: {screen: MerShopInfo},
    EditShopName: {screen: EditShopName},
    EditShopTel: {screen: EditShopTel},
    EditPhone: {screen: EditPhone},
    ResetPassword: {screen: ResetPassword},
    EditShopDetail: {screen: EditShopDetail},
    FindPassword: {screen: FindPassword},
    EditShopAddress: {screen: EditShopAddress},
    MerShopCard: {screen: MerShopCard},
    MerPointDetail: {screen: MerPointDetail},
    MerStaff: {screen: MerStaff},
    MerInformation: {screen: MerInformation},
    SafeSetting: {screen: SafeSetting},
    MerchantCA: {screen: MerchantCA},
    MerDetail: {screen: MerDetail},
    MerQRScanner: {screen: MerQRScanner},
    MerCouponRecycle: {screen: MerCouponRecycle},
    MerCollectMoney: {screen: MerCollectMoney},
  },
  {
    defaultNavigationOptions: {
      headerBackTitleVisible: false,
    },
  },
);

export default AppStack;
