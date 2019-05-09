import React, { Component } from 'react';
import Hr from 'react-native-hr';
import { Text, View, Dimensions, StyleSheet} from 'react-native';
import Svg, { Rect, Text as TextSVG , Line} from 'react-native-svg';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    marginTop: 0,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

class TrendChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
    };
  }

  componentDidMount(){
    this.setState({
      date: new Date(),
    });
  }


  render(){
    //SET THE SETTINGS HERE:
    const graphSettings = {
      maxLine: 15,
      diffX: 14,
      initialX: 20,
      initialY: this.props.y,
    }
    let times = [];
    let line = [];
    let opLine = [];

    for( let i = 0 ; i < this.props.graphData.length; i ++ ){
      times.push(this.props.graphData[i].time);
      line.push(this.props.graphData[i].line);
      opLine.push(graphSettings.maxLine - this.props.graphData[i].line)
    }

    const colorMapping = {
      green: 'rgb(158, 219, 109)',
      yellow: 'rgb(255, 218, 121)',
      red: 'rgb(255, 147, 131)',
    }


    const d = this.state.date;
    const hour = d.getHours();
    const minute = d.getMinutes();
    const day = d.getDay();

    // Draw the bars on the bar graph
    let x = graphSettings.initialX;
    const bars = times.map((time, i) => {
      x += graphSettings.diffX;
      // Green
      let color = colorMapping.green;
      if ( line[i] > 11 ){
        // Yellow
        color = colorMapping.red;
      }
      else if ( line[i] > 7){
        color = colorMapping.yellow;
      }

      let fillOpacity = 1;
      let stroke = 'none';

      if ( time == hour && time % 1 == 0 && minute < 30 && this.props.day == day){
        fillOpacity = 1;
        stroke = 'black';
      }
      else if ( time % 1 > 0 && Math.floor(time) == hour && minute >= 30 && this.props.day == day ){
        fillOpacity = 1;
        stroke = 'black';
      }
      return (<Rect
        key={i}
        x={x}
        y={opLine[i] * 6 + graphSettings.initialY}
        width={graphSettings.diffX - 5}
        height={line[i] * 6 + graphSettings.initialY}
        fill={color}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={0.5}
      />);
    });

    x = graphSettings.initialX;
    const labels = times.map((time, i) => {
      x += graphSettings.diffX;
      if ( i % 2 == 1){
        return (
          <Text key={i}></Text>
        );
      }

      let weight = '100';

      if ( time == hour && time % 1 == 0 && minute < 30 && this.props.day == day){
        weight = '900'
      }
      else if ( time % 1 > 0 && Math.floor(time) == hour && minute >= 30 && this.props.day == day ){
        weight = '900';
      }

      return (
        <TextSVG x={x} key={i} y={100 + graphSettings.initialY} fill="black" fontSize="11" fontFamily="Quicksand-Light" fontWeight={weight}>{time % 12 ? time % 12 : 12}</TextSVG>
      );
    });

    return (
      <View style={styles.container}>
        <Svg height={180} width="330">
          {bars}
          <Line x1={graphSettings.initialX + graphSettings.diffX} x2={x + graphSettings.diffX - 5} y1={96 + this.props.y} y2={96 + this.props.y} stroke="grey" strokeWidth="1"/>
          {labels}
        </Svg>
      </View>
    );
  }

}

export default TrendChart;
