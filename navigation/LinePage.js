import React, { Component } from 'react';
import { NavigatorIOS, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import KafLine from '../containers/KafLine';

const LinePage = StackNavigator({
    Line: {
      screen: KafLine,
      navigationOptions: ({navigation}) => ({
        header: false
      }),
    },
  }, {
    navigationOptions: ({ navigation }) => ({
      gesturesEnabled: false,
    }),
  }
);

export default LinePage;
