import React, { Component } from 'react';
import { View, Text, NavigatorIOS , Dimensions, StyleSheet, Alert, AsyncStorage } from 'react-native';
import axios from 'axios';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SplashScreen from 'react-native-splash-screen'

import Credits from './Credits'
import Onboard from './Onboarding';
import LineBar from './LineBar';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a5858'
  },
  pagination: {
    marginTop: 20,
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    height: 20,
  },
  paginationDot: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 16,
  },
  paginationDotActive: {
    fontFamily: 'Quicksand-Bold',
  },
  paginationDotInactive: {
    fontFamily: 'Quicksand-Light',
  },
  carousel: {
    marginTop: -100,
  }
});

export class KafLine extends Component {
  constructor(props) {
    super(props);

    let w1 = {
      id: 0,
      paginationDotText: 'window one'
    }
    let w2 = {
      id: 1,
      paginationDotText: 'window two'
    }
    this.state = {
      hideNavBar: true,
      activeSlide: 0,
      items: [w1, w2]
    };

  }

  componentDidMount() {
      SplashScreen.hide();
      AsyncStorage.getItem('onboard').then((value) => {
        if ( !value ){
          this.setState({
            first: true,
          });
          const setParamsAction = this.props.navigation.setParams({
            params: {hideTabBar: false}
          });
          AsyncStorage.setItem('onboard', 'true');
        }
      });
      this.fetchNotifications();
  }

  fetchNotifications() {
    axios
      .get(`https://lineatkaf.herokuapp.com/notifications`)
      .then((response) => {
        const id = response.data._id;
        console.log(id);
        AsyncStorage.getItem('notificationId').then((value)=>{
          console.log(value);
          if ( value != id ){
            Alert.alert(response.data.message);
            AsyncStorage.setItem('notificationId', id);
          }
        });
      });
  }


  _renderItem ({item, index}) {
      // test closed window 2, just to illustrate setting a window line to closed
      if (index == 1) {
        return (
          <LineBar window={index} open={true} />
        );
      }
      // test open window 1
      return (
          <LineBar window={index} open={true} />
      );
  }

  get pagination () {
        const { items, activeSlide } = this.state;
        const onPressTo0 = () => {
          this.refs && this.refs._snapToItem(this.refs._getPositionIndex(0));
        }
        const onPressTo1 = () => {
          this.refs && this.refs._snapToItem(this.refs._getPositionIndex(1));
        }
        return (
            <Pagination
              dotsLength={items.length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: '#4a5858', marginBottom: -15}}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'blue'
              }}
              renderDots={(activeIndex) => {
                if ( activeIndex == 0 ){
                  return (
                    <View style={styles.pagination}>
                      <Text style={[styles.paginationDot, styles.paginationDotActive]}> window one </Text>
                      <Text onPress={onPressTo1} style={[styles.paginationDot, styles.paginationDotInactive]}> window two </Text>
                    </View>
                  );
                }
                else {
                  return (
                    <View style={styles.pagination}>
                      <Text onPress={onPressTo0} style={[styles.paginationDot, styles.paginationDotInactive]}> window one </Text>
                      <Text style={[styles.paginationDot, styles.paginationDotActive]}> window two </Text>
                    </View>
                  );
                }
              }}
              carouselRef={this.refs}
            />
        );
    }


  render () {
    if ( this.state.first ){
      const finishOnboard = () => {
        this.setState({
          first: false,
        });
        const setParamsAction = this.props.navigation.setParams({
          params: {hideTabBar: true}
        });
        this.props.navigation.dispatch(setParamsAction);
      }
      return (
        <Onboard finishOnboard={finishOnboard}> </Onboard>
      )
    }
    itemWidth = width * 6/7;
    return (

      <View style={styles.container}>
          { this.pagination }
          <Carousel
            ref={r => this.refs=r }
            data={this.state.items}
            renderItem={this._renderItem}
            sliderWidth={width}
            itemWidth={itemWidth}
            sliderHeight={200}
            onSnapToItem={(index) => this.setState({ activeSlide: index }) }
          />
      </View>
    );
  }

}

export default KafLine;
