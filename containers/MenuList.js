import React, { Component } from 'react';
import { NavigatorIOS, Dimensions, View, Text, ListView, StyleSheet, Image, Button, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Accordion from '@ercpereda/react-native-accordion';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgb(247, 247, 247)',
    fontFamily: 'Quicksand-Medium',
    fontSize: 20,
  },
  listview: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#bbbbbb',
  },
  inStock: {
    width: 13,
    height: 47,
    backgroundColor: 'rgb(158, 219, 109)'
  },
  outStock: {
    width: 13,
    height: 47,
    backgroundColor: 'rgb(223, 113, 66)'
  },
  oneReport:  {
    width: 13,
    height: 47,
    backgroundColor: 'rgb(223, 170, 66)'
  },
  header: {
    fontFamily: 'Quicksand-Medium',
    fontSize: 10,
    padding: 3,
    textAlign: 'center',
    color: 'rgb(98, 98, 98)',
  },
  title:  {
    fontFamily: 'Quicksand-Bold',
    padding: 5,
    fontSize: 18,
    textAlign: 'center',
    color: 'rgb(31, 31, 31)',
  },
  closedText: {
    color: '#e74c3c',
    fontSize: 17,
    marginTop: 15,
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
    marginBottom: 17
  },
  stockText:  {
    borderRadius: 3,
    color: 'black',
    borderWidth: 1,
    backgroundColor: '#fd9386',
    padding: 7
  },
  foldContent:  {
    display: 'flex',
    width: width-90,
    backgroundColor: '#ededed',
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15
  },
  foldName: {
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    backgroundColor: '#f9f9f9'
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


class MenuList extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource: dataSource.cloneWithRows({}),
      todaysReport: [],
    };
    this.incrementStock = this.incrementStock.bind(this);
    this.renderCell = this.renderCell.bind(this);
    this.refreshstock = this.refreshstock.bind(this);
  }

  componentDidMount() {
    this.refreshstock();
  }

  fetchData() {
    axios
      .get('https://lineatkaf.herokuapp.com/menu')
      .then((response) => {
        let menuArr = response.data
        let filtered = menuArr.filter((_) => { return _.category == this.props.category })

        const dataSource = new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.setState({
          dataSource: dataSource.cloneWithRows(filtered)
        });

      })
      .catch((error) => {
        console.log(error);
      });
  }

  // function to call at the beginning
  refreshstock()  {
    axios
      .get('https://lineatkaf.herokuapp.com/reports')
      .then((response) => {
        let reportArr = response.data;
        const day = new Date().getDate(); const month = new Date().getMonth() + 1; const year = new Date().getFullYear();
        const today = `${month.toString()}-${day.toString()}-${year.toString()}`;
        let filteredReport = reportArr.filter((_) => { return _.date == today && _.votes >= 1 });
        this.setState({ todaysReport: filteredReport });
        this.fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // get this function to return stock and send incremented version
  incrementStock(clickedItem)  {
    console.log(clickedItem)
    axios
      .post('https://lineatkaf.herokuapp.com/reports', {
        itemID: clickedItem._id,
        itemName: clickedItem.name
      })
      .then((response) => {
        Alert.alert(
          'Thanks for reporting!',
          '',
          [
            { text: 'Ok', onPress: () => {
                let reportArr = response.data;
                const day = new Date().getDate(); const month = new Date().getMonth() + 1; const year = new Date().getFullYear();
                const today = `${month.toString()}-${day.toString()}-${year.toString()}`;
                let filteredReport = reportArr.filter((_) => { return _.date == today && _.votes >= 1 });
                this.setState({ todaysReport: filteredReport });
                this.fetchData();
              }
            }
          ],
        )
      })
      .catch((error) => {
        console.log(error);
      });
  }


  onPressButton = (clickedItem) => {
    Alert.alert(
      'Would you like to report this item out of stock?',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.incrementStock(clickedItem)},
      ]
    );
  }

  renderCell(item) {
    let Name = ({ isOpen }) =>
      <View style={styles.foldName}>
          <View>
            <Text>{`${isOpen ? '▼ ' : '▶ '} ${item.name}`}</Text>
          </View>
        </View>;
    let Content = (
      <View style={styles.foldContent}>
          <Text style={{color: '#000000'}}>
            {item.price}
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 20,
              alignItems: 'center',
            }}
            onPress={ () => this.onPressButton(item) }>
            <Text
              style={styles.stockText}>
              Report Out of Stock
            </Text>
          </TouchableOpacity>
        </View>);

    // check each item in todaysReport
    let state = 0; // 0 - green, 1 - orange, 2 - red
    console.log(this.state.todaysReport);
    this.state.todaysReport.forEach(function(i) {
      if (i.itemName === item.name && i.votes === 1)  {
        state = 1;
      }
      else if (i.itemName === item.name && i.votes >= 2)  {
        state = 2;
      }
    });
    return (
      <View style={styles.container}>
        <View style=  {
          state === 0 ? styles.inStock :
          state === 1 ? styles.oneReport : styles.outStock
        } />

        <Accordion
          header={Name}
          content={Content}
          duration={300}
        />
      </View>
    );
  }

  render() {
    if (this.state.dataSource.rowIdentities[0].length < 2) {
      return (
        <View style={{ backgroundColor: 'rgb(255, 255, 255)', flex: 0.3 }}>
          <Text style={styles.title}>
            {this.props.category}
          </Text>
          <Text style={styles.header}>
              Subject to Availability
           </Text>

          <Text style={styles.closedText}> LOADING... </Text>
        </View>
      );
    }
    return (
      <View style={{ backgroundColor: 'rgb(255, 255, 255)', flex: 0.3 }}>
         <Text style={styles.title}>
           {this.props.category}
         </Text>
         <View
            style={{
              borderBottomColor: 'rgb(136, 136, 136)',
              borderBottomWidth: 0.4,
              marginLeft: 5,
              marginRight: 5
            }}
          />
         <Text style={styles.header}>
            Subject to Availability
         </Text>
         <ListView
          removeClippedSubviews={false}
          automaticallyAdjustContentInsets={false}
          renderSeparator={(sectionID, rowID) =>
            <View key={`${sectionID}-${rowID}`} style={styles.separator} />
          }
          dataSource={this.state.dataSource}
          renderRow={e => this.renderCell(e)}
          style={styles.listView}
        />
      </View>
    );
  }
}



export default MenuList;
