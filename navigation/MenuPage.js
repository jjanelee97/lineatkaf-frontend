import React, { Component } from 'react';
import { NavigatorIOS, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import KafMenu from '../containers/KafMenu';

export const MenuPage = StackNavigator({
    Menu: {
      screen: KafMenu,
      navigationOptions: ({navigation}) => ({
        header: false
      }),
    },
  }, {
    navigationOptions: ({ navigation }) => ({
      gesturesEnabled: false,
    }),
});

export default MenuPage;
