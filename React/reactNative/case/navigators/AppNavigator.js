import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import Splash from '../screens/Splash';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const AppNavigator = createSwitchNavigator(
  {
    Splash: {
      screen: Splash,
    },
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(AppNavigator);
