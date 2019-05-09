import React, { Component } from 'react';
import { NavigatorIOS, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import KafHours from '../containers/KafHours';

export const HoursPage = StackNavigator({
    Hours: {
      screen: KafHours,
      navigationOptions: ({navigation}) => ({
        header: false
      }),
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      gesturesEnabled: false,
    }),
  },
);

export default HoursPage;
