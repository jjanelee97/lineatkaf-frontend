import React, { Component } from 'react';
import Hr from 'react-native-hr';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Modal from "react-native-modal";

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 50,
    left: 40,
    height: 25,
    width: 25,
    resizeMode:"contain",
  },
  headerFont:  {
    fontFamily: 'Quicksand-Medium',
    fontSize: 25,
    color: 'white',
  },
  header2Font:  {
    paddingBottom: 10,
    paddingTop: 20,
    fontFamily: 'Quicksand-Regular',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  contentFont:  {
    fontFamily: 'Quicksand-Light',
    fontSize: 17,
    color: 'white',
  },
  modal:  {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image:  {
    height: 200,
    width: 300,
    resizeMode:"contain"
  },
  close:  {
    paddingLeft: 20, paddingRight: 20,
    paddingTop: 10, paddingBottom: 10,
    fontFamily: 'Quicksand-Medium',
    fontSize: 15,
    color: 'white',
    backgroundColor: '#47a8c4',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fcfcfc',
  }
});

class Credits extends Component {
  constructor(props) {
      super(props)
      this.state = {
        pressed: false
      }
  }

  onPress = () => {
    this.setState(prevState => ({
      pressed: !prevState.pressed
    }));
  }

  _toggleModal = () =>
     this.setState({ pressed: !this.state.pressed });

  render() {
    if ( !this.state.pressed ){
      return (
        <View>
          <TouchableOpacity onPress={this.onPress} hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}>
            <Image
              style={styles.button}
              source={require('../img/question.png')} />
          </TouchableOpacity>
        </View>
      );
    }
    else {
      return (
        <View>
          <Modal
            isVisible={this.state.pressed}
             backdropOpacity="0.9">
            <View style={styles.modal}>
              <Text style={styles.headerFont}>About Line@KAF</Text>
              <View>
                <Text style={styles.header2Font}>Partners</Text>
                <Text style={styles.contentFont}>Cosan Lab:   Jin Cheong | Eshin Jolly </Text>
                <Text style={styles.header2Font}>Developers</Text>
                <Text style={styles.contentFont}>DALI Lab:      Jane Lee '19 | Teddy Ni '19 </Text>
                <Text style={styles.header2Font}>Designers</Text>
                <Text style={styles.contentFont}>DALI Lab:      Anne Muller '18 </Text>


              </View>
              <Text style={styles.header2Font}>lineatkaf@gmail.com</Text>

              <Image
                style={styles.image}
                source={require('../img/DALI.png')} />
              <TouchableOpacity onPress={this._toggleModal}>
                <Text style={styles.close}>CLOSE</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      );
    }
  }
}


export default Credits;
