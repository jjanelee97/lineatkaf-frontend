import React, { Component } from 'react';
import { NavigatorIOS, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

import KafSuggestions from '../containers/KafSuggestions';

export const SuggestionsPage = StackNavigator({
    Suggestions: {
      screen: KafSuggestions,
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

export default SuggestionsPage;
