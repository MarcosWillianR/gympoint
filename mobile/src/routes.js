import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from '~/pages/SignIn';

import Checkin from '~/pages/Checkin';
import HelpRequests from '~/pages/HelpRequests';

import HeaderLogo from '~/components/HeaderLogo';

const bottomNavigator = createBottomTabNavigator(
  {
    Checkin,
    HelpRequests,
  },
  {
    tabBarOptions: {
      keyboardHidesTabBar: true,
      activeTintColor: '#ee4e62',
      inactiveTintColor: 'rgba(0,0,0, 0.4)',
      style: {
        backgroundColor: '#fff',
        padding: 4,
      },
    },
  }
);

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createStackNavigator(
          {
            tabs: bottomNavigator,
          },
          {
            defaultNavigationOptions: {
              headerBackground: HeaderLogo,
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
