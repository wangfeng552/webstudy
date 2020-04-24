import {createStackNavigator} from 'react-navigation-stack';
import SignIn from '../screens/SignIn';
import Register from '../screens/Register';
import RegisterInfo from '../screens/RegisterInfo';

const AuthStack = createStackNavigator(
  {
    Register,
    RegisterInfo,
    SignIn,
  },
  {
    initialRouteName: 'SignIn',
  },
);

export default AuthStack;
