import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DropdownMenu from 'react-native-dropdown-menu';
import axios from 'axios';
import Swiper from 'react-native-swiper';

import DefaultTabBar from './CustomTabBar'
import Credits from './Credits'
import MenuList from './MenuList';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#4a5858'
  },
  top:  {
    flexDirection: 'row'
  },
  allContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    marginTop: 10,
    height: height - (height *0.2625),
    width: width - 40,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  header: {
    marginTop: 50,
    marginRight: 68,
    marginLeft: 68,
    fontFamily: 'Quicksand-Medium',
    fontSize: 20,
    color: 'white',
  },
  button: {
    position: 'absolute',
    top: 50,
    left: -60,
    height: 25,
    width: 25,
    resizeMode:"contain",
  }
});

class KafMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dummy: false,
    };
    this.refreshstock = this.refreshstock.bind(this);
  }

  refreshstock = () => {
    this.refs.menu1.refreshstock();
  }

  updateSelection = (selection, row) => {
    this.setState({
      selected: this.state.data[row],
    });
  }

  render() {
    if (this.state.data.length != 0) {
      return (
        <View style={styles.backgroundContainer}>
          <Text style={styles.header}> menu </Text>
          <View style={styles.allContainer}>
            <Text> loading menu... </Text>
          </View>
        </View>
      );
    }

    let data = [this.state.data];
    return (
      <View style={styles.backgroundContainer}>
        <View style={styles.top}>
          <TouchableOpacity onPress={this.refreshstock} hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}>
            <Image
              style={styles.button}
              source={require('../img/reload.png')} />
          </TouchableOpacity>
          <Text style={styles.header}> menu </Text>
          <Credits />
        </View>

        <View style={styles.allContainer}>
        <ScrollableTabView renderTabBar={() => <DefaultTabBar/>}>
          <MenuList category={"Drinks"} tabLabel="0" ref="menu1"/>
          <MenuList category={"Pastries"} tabLabel="1" ref="menu1"/>
          <MenuList category={"Sandwiches"} tabLabel="2"ref="menu1"/>
          <MenuList category={"Salads"} tabLabel="3"ref="menu1"/>
        </ScrollableTabView>
        </View>
      </View>

    );
  }
}

export default KafMenu;
