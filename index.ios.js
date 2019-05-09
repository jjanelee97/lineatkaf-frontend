import React, { Component } from 'react';
import { AppRegistry, Image, Dimensions } from 'react-native';
import { TabNavigator } from 'react-navigation';

import LinePage from './navigation/LinePage';
import MenuPage from './navigation/MenuPage';
import HoursPage from './navigation/HoursPage';
import SuggestionsPage from './navigation/SuggestionsPage';

const { height, width } = Dimensions.get('window');

<script src="http://localhost:8097"></script>

console.disableYellowBox = true;

const navImgSizes = {
  width: 55,
  height: 55,
}

const tabBarLeverage = 0;
if ( height > 800 ){
  tabBarLeverage = 40;
}

const LineAtKaf = TabNavigator({
  Line: {
    screen: LinePage,
    navigationOptions: ({navigation}) => {
      const tabBar = navigation.state.routes[0] && navigation.state.routes[0].params && navigation.state.routes[0].params.params['hideTabBar'];
      return ({
        tabBarLabel: '',
        tabBarIcon: ({ focused }) => {
          const source = focused ? require('./img/navTabIcons/line_selected.png') : require('./img/navTabIcons/line.png');
          return (<Image
                    source={source}
                    style={{ width: navImgSizes.width + 6, height: navImgSizes.height + 2, marginBottom: 9, marginTop: 7}}
                    />);
        },
        showIcon: true,
        tabBarVisible: tabBar,
        animationEnabled: true
      })
    },
  },
  Menu: {
    screen: MenuPage,
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        const source = focused ? require('./img/navTabIcons/menu_selected.png') : require('./img/navTabIcons/menu.png');
        return (<Image
          source={source}
          style={{ width: 45, height: 45, marginBottom: 10 }}
        />
        );
      },
      showIcon: true,
    },
  },
  Hours: {
    screen: HoursPage,
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        const source = focused ? require('./img/navTabIcons/info_selected.png') : require('./img/navTabIcons/info.png');
        return (<Image
          source={source}
          style={{ width: navImgSizes.width, height: navImgSizes.height, marginBottom: 10 }}
        />
        );
      },
      showIcon: true,
    },
  },
  Suggestions: {
    screen: SuggestionsPage,
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        const source = focused ? require('./img/navTabIcons/suggestions_selected.png') : require('./img/navTabIcons/suggestions.png');
        return (<Image
          source={source}
          style={{ width: navImgSizes.width, height: navImgSizes.height, marginBottom: 10}}
        />
        );
      },
      showIcon: true,
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: true,
    inactiveTintColor: false,
    inactiveBackgroundColor: 'transparent',
    showLabel: false,
    style: {
      backgroundColor: '#4a5858',
      height: 75,
      borderTopColor: "transparent",
      paddingBottom: tabBarLeverage
    },
  },
});

AppRegistry.registerComponent('LineAtKaf', () => LineAtKaf);
