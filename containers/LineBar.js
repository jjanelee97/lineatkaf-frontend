import React, { Component } from 'react';
import { View, StyleSheet, Text, Animated, Dimensions, Image } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import Dash from 'react-native-dash';
import axios from 'axios';

const { height, width } = Dimensions.get('window');
const LINE_HEIGHT = .74 * height - 1.5;
const LINE_WIDTH = .9 * width - 2.5;
const MAX_LENGTH = 15;
const BORDER_RADIUS = 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3C16F',
    flexDirection: 'column',
    // alignItems: 'center',
    // zIndex: 100,
    marginLeft: -7,
    // marginTop: -30,
  },
  rectangle: {
    marginTop: 0,
    position: 'relative',
    width: LINE_WIDTH,
    height: LINE_HEIGHT,
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    marginBottom: 20,
  },
  linerect: {
    position: 'absolute',
    width: LINE_WIDTH,
    height: 0,
    backgroundColor: '#8BDF5B',
    borderRadius: BORDER_RADIUS,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  lineIcon: {
    position: 'absolute',
    zIndex: 2,
    flex: 1,
    width: LINE_WIDTH / 6,
    height: LINE_WIDTH / 6,
    marginLeft: (LINE_WIDTH / 15) - (LINE_WIDTH / 12),
    resizeMode: 'contain',
  },
  // lineIconText: {
  //   position: 'absolute',
  //   zIndex: 2,
  //   // fontSize: 10,
  //   // opacity: .7,
  //   marginTop: .15 * LINE_HEIGHT,
  //   marginLeft: .03 * LINE_HEIGHT,
  // },
  coffeeCupIcon: {
    marginTop: (LINE_HEIGHT / 30),
  },
  doorIcon: {
    marginTop: (.75 * LINE_HEIGHT),
  },
  signIcon: {
    marginTop: (.3 * LINE_HEIGHT),
  },
  dottedLine: {
    width:1,
    height: .92 * LINE_HEIGHT,
    marginTop: .04 * LINE_HEIGHT,
    flexDirection:'column',
    position: 'absolute',
    zIndex: 1,
    marginLeft: LINE_WIDTH / 15,
    opacity: .3,
  },
  textContainer: {
    flexDirection: 'row',
  },
  lineTextSmall: {
    marginBottom: -100,
    backgroundColor: 'white',
  },
  lineTextLarge: {
    marginBottom: 10,
  },
  lineNumber: {
    fontSize: 80,
    fontFamily: 'Quicksand-Regular',
  },
  lineText: {
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
  },
  closedText: {
    color: '#e74c3c',
    fontSize: 17,
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
    marginTop: -.12 * LINE_HEIGHT,
    fontFamily: 'Quicksand-Bold',
  },
  peronWaitText: {
    marginTop: 10,
  }
});

class LineBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      lineLength: 0,
      startingLength: 0,
      open: false,
    };
    this.interpolateData = this.interpolateData.bind(this);
    this.refreshLine = this.refreshLine.bind(this);
    this.findColorTransitions = this.findColorTransitions.bind(this);
    this.renderVariableIcon = this.renderVariableIcon.bind(this);
    this.renderLineOrClosed = this.renderLineOrClosed.bind(this);
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 100,
      duration: 1500
    }).start();
    this.fetchData();
    setInterval(() => { this.fetchData() }, 4000);
  }

  fetchData() {
    let h = new Date().getHours();
    // commenting out because we are changing logic for hours to be in backend (in mongo config)
    // if ( h < 8 || h >= 17 ){
    //   this.setState({
    //     loaded: true,
    //     open: false
    //   });
    //   return;
    // }
    // Make a request for a user with a given ID
    axios
      .get(`https://lineatkaf.herokuapp.com/line?line=${this.props.window + 1}`)
      .then((response) => {
        if ( response.data.open == false ){
          this.setState({
            loaded: true,
            open: false,
          });
        }
        else {
          this.setState({
            loaded: true,
            open: true,
          });
        }
        if ( response.data.line ){
          this.refreshLine(response.data.line);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  refreshLine(newLength) {
    let oldLength = this.state.lineLength;
    // console.log("new length", newLength);
    this.setState({
      startingLength: oldLength,
      lineLength: newLength,
    }, () => {
      this.animatedValue.setValue(0);
      Animated.timing(this.animatedValue, {
        toValue: 100,
        duration: 1500
      }).start();
    });
  }

  interpolateData() {
    let startingLength = Math.min(1.0, this.state.startingLength / MAX_LENGTH) * LINE_HEIGHT;
    let endingLength = Math.min(1.0, this.state.lineLength / MAX_LENGTH) * LINE_HEIGHT;
    colorTransitions = this.findColorTransitions();
    return {
      color: this.animatedValue.interpolate({
        inputRange: colorTransitions.intRange,
        outputRange: colorTransitions.colorRange}),
      barHeight: this.animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [startingLength, endingLength]})
    };
  }

  findColorTransitions() {
    let startingColor;
    let middleColor;
    let endingColor;
    if (this.state.startingLength <= 6) {
      startingColor = 'rgb(158, 219, 109)';
    } else if (this.state.startingLength <= 12) {
      startingColor = 'rgb(255, 218, 121)';
    } else {
      startingColor = 'rgb(255, 147, 131)';
    }
    if (this.state.lineLength <= 6) {
      endingColor = 'rgb(158, 219, 109)';
    } else if (this.state.lineLength <= 12) {
      endingColor = 'rgb(255, 218, 121)';
    } else {
      endingColor = 'rgb(255, 147, 131)';
    }
    if (this.state.lineLength >= 13 && this.state.startingLength <= 6 ||
          this.state.startingLength >= 13 && this.state.startingLength <= 6) {
      middleColor = 'rgb(255, 218, 121)';
    }
    if (middleColor) {
      return {
        intRange: [0, 50, 100],
        colorRange: [startingColor, middleColor, endingColor]
      }
    } else {
      return {
        intRange: [0, 100],
        colorRange: [startingColor, endingColor],
      }
    }
  }

  renderVariableIcon() {
    if (this.props.window == 0) {
      // console.log('here');
      return (
        <Image style={[styles.lineIcon, styles.doorIcon]} source={require('../img/door_icon.png')} />
      );
    } else {
      return (
        <Image style={[styles.lineIcon, styles.signIcon]} source={require('../img/sign_icon.png')} />
      );
    }
  }

  renderLineOrClosed() {
    if ( !this.state.loaded ){
      return (
        <Text style={styles.closedText} >LOADING...</Text>
      );
    }
    else if (this.state.open) {
      let data = this.interpolateData();
      const animatedBackgroundColor = {
        backgroundColor: data.color,
      }
      const animatedLineHeight = {
        height: data.barHeight,
      }

      let lineTextStyle;
      let textColor;
      if (this.state.lineLength < 5) {
        lineTextStyle = styles.lineTextSmall;
        textColor = {color: 'rgb(158, 219, 109)'};
      } else {
        lineTextStyle = styles.lineTextLarge;
        textColor = {color: 'white'};
      }

      let personWait;
      let lineLength;
      if (this.state.lineLength >= 15) {
        personWait = '+\nperson\nwait';
        lineLength = 15
      }
      else {
        personWait = '\nperson\nwait';
        lineLength = this.state.lineLength;
      }
      return (
        <Animated.View style={[styles.linerect, animatedBackgroundColor, animatedLineHeight]}>
          <View style={[lineTextStyle, styles.textContainer]}>
            <Text style={[styles.lineNumber, textColor]}>
              { lineLength }
            </Text>
            <Text style={[styles.lineText, textColor, styles.peronWaitText]}>
              { personWait }
            </Text>
          </View>
        </Animated.View>
      );
    } else {
      return(
        <Text style={styles.closedText} >WINDOW CLOSED</Text>
      );
    }
  }

  render() {
    // for when labels are added below line icons
    // <Animated.View style={[styles.lineIconText, animatedBackgroundColor]}>
    //   <Text>order</Text>
    // </Animated.View>
    return (
      <View style={styles.container}>
        <View style={styles.rectangle} />
        <Dash style={styles.dottedLine} />
        <Image style={[styles.lineIcon, styles.coffeeCupIcon]} source={require('../img/coffee_cup_icon.png')} />
        { this.renderVariableIcon() }
        { this.renderLineOrClosed() }
      </View>
    );
  }
}

export default LineBar;
