import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, BackgroundImage, Dimensions } from 'react-native';
import axios from 'axios';
import Svg, { Image as ImageSVG, Circle, Ellipse, Rect, Text as TextSVG } from 'react-native-svg';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    flexDirection: 'column',
  },
  img: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    resizeMode: 'contain',
  },
  statcontainer: {
    flex: 3,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'HelveticaNeue-CondensedBlack',
    alignItems: 'center',
    color: '#2C2926',
    fontSize: 20,
    paddingTop: 15,
  },
  linetext: {
    fontFamily: 'HelveticaNeue-CondensedBlack',
    alignItems: 'center',
    color: '#2C2926',
    fontSize: 20,
    paddingTop: 15,
    flex: 1,
  },
  circle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // width: 100,
    // height: 100,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    borderRadius: 100 / 2,
    backgroundColor: '#C2A667',
  },
  numberStat: {
    fontFamily: 'HelveticaNeue-CondensedBlack',
    backgroundColor: 'transparent',
    fontSize: 48,
    // color: "#DFE5E5",
    color: 'white',
  },
  textStat: {
    fontFamily: 'HelveticaNeue-CondensedBlack',
    backgroundColor: 'transparent',
    fontSize: 12,
    // color: "#DFE5E5",
    color: 'white',
  },
  linecontainer: {
    flex: 8,
  }
});

class KafLine extends Component {
  static navigationOptions = {
    title: 'Line@KAF',
  };
  constructor(props) {
    super(props);
    this.state = {
      lineOneLength: 0,
      lineOneTime: 0,
      lineOnePpl: 0,
      lineTwoLength: 0,
      refreshing: false,
      lineTwo: false,
    };

    this.fetchData = this.fetchData.bind(this);

    setInterval(() => {
      this.setState({ refreshing: !this.state.refreshing });
    }, 3000);

    setInterval(() => {
      this.setState({ lineTwoLength: Math.floor(Math.random() * 16) });
    }, 3000);
  }
  componentWillMount() {
    setInterval(this.fetchData, 3000);
  }
  fetchData() {
    // Make a request for a user with a given ID
    axios
      .get('https://lineatkaf.herokuapp.com/line')
      .then((response) => {
        console.log(response);
        // let time = mapTime(response.data.lineLength);
        // let ppl = mapPpl(response.data.lineLength);
        this.setState({
          lineOneLength: response.data.lineLength,
          lineOneTime: (response.data.lineLength - 4) * 2 + 2,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  mapTime(line) {
    const max = 30;
    const min = 2;
    return (line - 4) / (15 - 4) * (max - min) + min;
  }

  renderLineOne() {

    // Determine what kind of iPhone is it

    // normal iPhone
    let xCoordinate = 156;
    let yCoordinate = 270;
    let radius = 47;
    let rxBean = 9;
    let ryBean = 13;
    let beanWidth = 16;
    let beanHeight = 56;

    // iPhone Plus
    if ( width > 400 && height > 700 ){
      xCoordinate = 155;
      yCoordinate = 304;
      radius = 55;
      rxBean = 11;
      ryBean = 15;
      beanWidth = 17;
      beanHeight = 60;
    }
    const beans = [];

    const firstIndex = 13;
    for (let i = 16; i > 0; i -= 1) {
      if (i == 14) {
        // this is where the handle is
      } else if (firstIndex - i < this.state.lineOneLength && firstIndex - i >= 0) {
        beans.push(<Ellipse key={i} x={xCoordinate.toString()} y={yCoordinate.toString()} rx={rxBean} ry={ryBean} width={beanWidth} height={beanHeight} fill="#7c5617" fillOpacity="1" />);
      } else {
        beans.push(<Ellipse key={i} x={xCoordinate.toString()} y={yCoordinate.toString()} rx={rxBean} ry={ryBean} width={beanWidth} height={beanHeight} fill="#7c5617" fillOpacity="0.25" />);
      }
      xCoordinate += (radius  * Math.cos(2 * Math.PI * i / 16));
      yCoordinate += (radius * Math.sin(2 * Math.PI * i / 16));
      console.log(`Bean ${i}: (${yCoordinate},${xCoordinate})`);
    }

    return beans;
  }

  renderStats() {
    const stats = [];
    stats.push(
      <Circle
        key={'1'}
        r="45"
        stroke="#DFE5E5"
        strokeWidth="2.5"
        fill="#C2A667"
      />);
    return stats;
  }

  /*
  <Svg height="500" width="400">
    {lineOne}
  </Svg>
  */

  render() {
    const lineOne = this.renderLineOne();
    const stats = this.renderStats();
    const { height, width } = Dimensions.get('window');

    // <Text style={styles.numberStat}> { this.state.lineOneLength } </Text>
    return (
      <View style={styles.container}>


        <Text style={styles.linetext}> Window 1 </Text>
        <View style={styles.linecontainer}>
          <Image
            source={require('../img/coffee_cup.png')}
            style={styles.img}>
            <Svg height={300 * height / 667} width={500 * width / 375} >
              {lineOne}
            </Svg>
          </Image>
        </View>

        <Text style={styles.linetext}> Current Status </Text>
        <View style={styles.statcontainer}>
          <View style={styles.circle}>
            <Text style={styles.numberStat}> { this.state.lineOneLength } </Text>
            <Text style={styles.textStat}> in line </Text>
          </View>
          <View style={styles.circle}>
            <Text style={styles.numberStat}> {this.state.lineOneTime } </Text>
            <Text style={styles.textStat}> min wait </Text>
          </View>
          <View style={styles.circle}>
            <Text style={styles.numberStat}> 3 </Text>
            <Text style={styles.textStat}> till next rush </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default KafLine;
