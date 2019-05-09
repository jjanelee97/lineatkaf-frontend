import React, { Component } from 'react';
import Hr from 'react-native-hr';
import { Text, View, StyleSheet, Dimensions} from 'react-native';
import Svg, { Rect, Text as TextSVG } from 'react-native-svg';
import Swiper from 'react-native-swiper';
import axios from 'axios';

import TrendChart from './TrendChart';
import Credits from './Credits'

const { height, width } = Dimensions.get('window');
const LINE_HEIGHT = .74 * height - 1.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a5858',
    flexDirection: 'column',
    marginTop: 0,
    alignItems: 'center',
    shadowOpacity: 0.75,
  },
  header: {
    marginTop: 50,
    fontFamily: 'Quicksand-Medium',
    fontSize: 20,
    color: 'white',
  },
  swiperContainer: {
    position: 'relative',
    marginTop: 10,
    paddingTop: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    height: height - (height *0.2625),
    width: width - 40,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    display: 'flex',

  },
  dayLabel: {
    fontFamily: 'Quicksand-Medium',
    color: '#4a5858',
    fontSize: 14,
    marginBottom: 35,
    marginTop: 15,
    letterSpacing: 5,
  },
  infoContainer: {
    alignItems: 'center'
  },
  hours: {
    fontFamily: 'Quicksand-Medium',
    color: 'rgb(74, 88, 88)',
    marginBottom: 20,
    letterSpacing: 3,
  },
  windowLabel: {
    marginTop: -50,
    marginBottom: height/15,
    color: 'rgb(74, 88, 88)',
    fontFamily: 'Quicksand-Regular',
    fontSize: 14,
    letterSpacing: 3,
  },
  closedText: {
    color: '#e74c3c',
    fontSize: 17,
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
    marginTop: -.12 * LINE_HEIGHT,
    fontFamily: 'Quicksand-Bold',
    marginBottom: 17
  },
  buttonText: {
    fontSize: 20,
    color: '#4a5858'
  },
  top:  {
    flexDirection: 'row'
  },
});

class KafHours extends Component {
  constructor(props) {
    super(props);

    this.state = {
      graph1Data:[],
      graph2Data: [],
      data1loaded: false,
      data2loaded: false,
      currIndex: new Date().getDay()
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(){
    axios
      .get('https://lineatkaf.herokuapp.com/trends?line=1')
      .then((response) => {
        this.setState({
          graph1Data: response.data,
          data1loaded: true
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get('https://lineatkaf.herokuapp.com/trends?line=2')
      .then((response) => {
        this.setState({
          graph2Data: response.data,
          data2loaded: true
        });
        console.log(this.state.graphData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  renderCharts(){
    const days = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri','Sat'];
    const dayMapping = {
      Sun: 'SUNDAY',
      Mon: 'MONDAY',
      Tue: 'TUESDAY',
      Wed: 'WEDNESDAY',
      Thu: 'THURSDAY',
      Fri: 'FRIDAY',
      Sat: 'SATURDAY'
    }
    let elements = [];
    const tempData = [{"time":8,"line":1},{"time":8.5,"line":1},{"time":9,"line":1},
    {"time":9.5,"line":1},{"time":10,"line":1},{"time":10.5,"line":1},
    {"time":11,"line":1},{"time":11.5,"line":1},{"time":12,"line":1},
    {"time":12.5,"line":1},{"time":13,"line":1},{"time":13.5,"line":1},
    {"time":14,"line":1},{"time":14.5,"line":1},{"time":15,"line":1},
    {"time":15.5,"line":1},{"time":16,"line":1},{"time":16.5,"line":1},
    {"time":17,"line":1}]
    for ( let i = 0; i < days.length; i++ ){
      let dayLabel
      elements.push(
          <View key={i} style={styles.infoContainer}>
            <Text style={styles.dayLabel}> {dayMapping[days[i]]} TRENDS </Text>
            <TrendChart day={i} graphData={this.state.graph1Data[days[i]]} y={0}/>
            <Text style={styles.windowLabel}> WINDOW ONE </Text>
            <TrendChart day={i} graphData={this.state.graph2Data[days[i]]} y={0}/>
            <Text style={styles.windowLabel}> WINDOW TWO </Text>
          </View>
        )
    }
    return elements;
  }

  renderChartsEmpty(){
    const days = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri','Sat',];
    const dayMapping = {
      Sun: 'SUNDAY',
      Mon: 'MONDAY',
      Tue: 'TUESDAY',
      Wed: 'WEDNESDAY',
      Thu: 'THURSDAY',
      Fri: 'FRIDAY',
      Sat: 'SATURDAY'
    }
    const i = new Date().getDay();
    let elementsEmpty = [];
    let dayLabel
    elementsEmpty.push(
      <View key={i} style={styles.infoContainer}>
        <Text style={styles.dayLabel}> {dayMapping[days[i]]} TRENDS </Text>
        <TrendChart day={i} graphData={tempData} y={0}/>
        <Text style={styles.windowLabel}> WINDOW ONE </Text>
        <TrendChart day={i} graphData={tempData} y={0}/>
        <Text style={styles.windowLabel}> WINDOW TWO </Text>
      </View>
    )
    return elementsEmpty;
  }

  renderHours(){
    const day = new Date().getDay();
    if ( day == 0 || day == 6 ){
      return (
        <Text style={styles.hours}> TODAY'S HOURS: 10AM - 4PM </Text>
      )
    }

    return (
      <Text style={styles.hours}> TODAY'S HOURS: 8AM - 5PM </Text>
    )
  }

  render(){
    if (this.state.data1loaded && this.state.data2loaded) {
        return(
          <View style={styles.container}>
            <View style={styles.top}>
              <Text style={styles.header}> hours & information </Text>
              <Credits />
            </View>
            <View style={styles.swiperContainer}>
              <Swiper
                height={20}
                showsButtons={true}
                scrollBy={this.state.currIndex}
                index={this.state.currIndex}
                loop={true}
                removeClippedSubviews={false}
                activeDotColor="#ACB7FF"
                nextButton={<Text style={styles.buttonText}>›</Text>}
                prevButton={<Text style={styles.buttonText}>‹</Text>}
                showsPagination={false}
                buttonWrapperStyle={{
                  marginTop: 0,
                  width: .8 * width,
                  left: .05 * width,
                  alignItems: 'baseline',
                  color: '#4a5858',
                }}
                >
                {this.renderCharts()}
              </Swiper>
              {this.renderHours()}
            </View>
          </View>
        )
      } else {
        return (
          <View style={styles.container}>
            <View style={styles.top}>
              <Text style={styles.header}> hours & information </Text>
              <Credits />
            </View>
            <View style={styles.swiperContainer}>
              <Swiper
                height={20}
                showsButtons={true}
                scrollBy={this.state.currIndex}
                index={this.state.currIndex}
                loop={true}
                removeClippedSubviews={false}
                activeDotColor="#ACB7FF"
                nextButton={<Text style={styles.buttonText}></Text>}
                prevButton={<Text style={styles.buttonText}></Text>}
                showsPagination={false}
                buttonWrapperStyle={{
                  marginTop: 0,
                  width: 300,
                  left: 18 / 375 * width,
                  alignItems: 'baseline',
                  fontColor: '#4a5858',
                }}
                ><Text style={styles.closedText} >LOADING...</Text>
              </Swiper>
              <Text style={styles.closedText} >LOADING...</Text>
            </View>
        </View>
      )}
    }
  }

export default KafHours;
