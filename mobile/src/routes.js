import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

/** Switch navigator */
import SignIn from '~/pages/SignIn';

/** Stack navigation with Bottom tab */
import Checkin from '~/pages/Checkin';
import Main from '~/pages/HelpRequests/Main';

/** Stack navigation pages */
import NewHelpRequest from '~/pages/HelpRequests/NewHelpRequest';
import HelpRequestAnswer from '~/pages/HelpRequests/HelpRequestAnswer';

/** top background image */
import HeaderLogo from '~/components/HeaderLogo';

/** Stack Navigation Header default */
const defaultNavigationOptions = {
  headerBackground: HeaderLogo,
  headerBackImage: <Icon name="navigate-before" size={24} color="#444" />,
};

export default (signedIn = true) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Checkin: {
              screen: createStackNavigator(
                {
                  Checkin,
                },
                {
                  navigationOptions: {
                    tabBarLabel: 'Check-ins',
                    tabBarIcon: ({ tintColor }) => (
                      <Icon name="edit-location" size={20} color={tintColor} />
                    ),
                  },
                  defaultNavigationOptions,
                }
              ),
            },
            HelpRequests: {
              screen: createStackNavigator(
                {
                  Main,
                  NewHelpRequest,
                  HelpRequestAnswer,
                },
                {
                  navigationOptions: {
                    tabBarLabel: 'Pedir ajuda',
                    tabBarIcon: ({ tintColor }) => (
                      <Icon name="live-help" size={22} color={tintColor} />
                    ),
                  },
                  defaultNavigationOptions,
                }
              ),
            },
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4e62',
              inactiveTintColor: 'rgba(0,0,0, 0.4)',
              style: {
                backgroundColor: '#fff',
                paddingTop: 10,
                paddingBottom: 10,
                height: 60,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
