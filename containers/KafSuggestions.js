// using https://github.com/evblurbs/react-native-md-textinput library for text input

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Linking, Text, View, Button, ScrollView, StyleSheet, Alert, Dimensions, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import Svg, { Rect, Text as TextSVG } from 'react-native-svg';
import axios from 'axios';
import TextField from 'react-native-md-textinput';
import Communications from 'react-native-communications';
import Credits from './Credits'
// import DoneButton from 'react-native-keyboard-done-button';
const { height, width } = Dimensions.get('window');


const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#4a5858'
  },
  header: {
    marginTop: 50,
    fontFamily: 'Quicksand-Medium',
    fontSize: 20,
    color: 'white',
    marginLeft: 0.5,
    marginRight: 0.5,
  },
  allContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    shadowOpacity: 1.0,
  },
  suggestionsContainer: {
    height: 205,
  },
  textContainer:  {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  email:  {
    marginTop: 40,
  },
  top:  {
    flexDirection: 'row'
  },
  button:  {
    position: 'absolute',
    top: 50,
    left: -60,
    height: 25,
    width: 25,
    resizeMode:"contain",
  },
  socialButtonView:  {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  socialButton:  {
    height: 30,
    width: 30,
    margin: 15,
    resizeMode:"contain",
  }
});

class KafSuggestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      suggestion: '',
      blankField: false,

    };
    this.validate = this.validate.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateSuggestion = this.updateSuggestion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === true)  {
      console.log("Email is Correct");
      return false;
    }
    else {
      console.log("Email is Incorrect");
      return true;
    }
  }


  updateEmail(text) {
    this.setState({
      email: text,
    });
  }
  updateSuggestion(text) {
    this.setState({
      suggestion: text,
    });
  }

  handleSubmit()  {
    if (this.state.email.trim() === '' || this.state.suggestion.trim() === '') {
      Alert.alert('Please enter both fields');
      return;
    }
    else if (this.validate(this.state.email)) {
      Alert.alert('Email not valid');
       return;
    }
    else {
      // Responds with:
      // { success: 1/0 }
      axios
        .post('https://lineatkaf.herokuapp.com/suggestion', {
          email: this.state.email.toLowerCase(),
          message: this.state.suggestion,
        })
        .then((response) => {
          console.log(response);
          if ( response.data.success == '1' ){
            Alert.alert('Successfully submitted to the KAF team!');
            this.setState({email: '', suggestion: ''});
          }
          else {
            Alert.alert('Failed to submit... please try again in a bit');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <View style={styles.backgroundContainer}>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => Communications.phonecall('6036462007', true)} hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}>
            <Image
              style={styles.button}
              source={require('../img/phone.png')} />
          </TouchableOpacity>
          <Text style={styles.header}> suggestions for KAF </Text>
          <Credits />
        </View>


        <View style={styles.allContainer}>
          <View style={styles.textContainer}>
            <View style={styles.suggestionsContainer}>
              <ScrollView>
                <TextField
                  onChangeText={this.updateSuggestion}
                  value={this.state.suggestion}
                  label={'Submit a Suggestion'}
                  highlightColor={'#00BCD4'}
                  height={170}
                  autogrow={true}
                  multiline={true}
                  returnKeyType = { "done" }
                />
              </ScrollView>
            </View>
            <TextField
              onChangeText={this.updateEmail}
              value={this.state.email}
              label={'Your Email Address'}
              highlightColor={'#00BCD4'}
              keyboardType={'email-address'}
              onSubmitEditing={Keyboard.dismiss}
              returnKeyType = { "done" }
            />
          </View>

          <Button onPress={this.handleSubmit}
          title="Submit"
          color="#841584" />
          <View style={styles.socialButtonView}>
              <TouchableOpacity onPress={()=> Linking.openURL('https://www.facebook.com/lineAtKAF/').catch(err => console.error('An error occurred', err))} hitSlop={{top: 2, bottom: 2, left: 2, right: 2}}>
                <Image
                  style={styles.socialButton}
                  source={require('../img/facebook.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> Linking.openURL('https://www.instagram.com/lineatkaf/').catch(err => console.error('An error occurred', err))} hitSlop={{top: 2, bottom: 2, left: 2, right: 2}}>
                <Image
                  style={styles.socialButton}
                  source={require('../img/instagram.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> Linking.openURL('https://www.twitter.com/lineAtKAF/').catch(err => console.error('An error occurred', err))} hitSlop={{top: 2, bottom: 2, left: 2, right: 2}}>
                <Image
                  style={styles.socialButton}
                  source={require('../img/twitter.png')} />
              </TouchableOpacity>
          </View>
        </View>
      </View>

    );
  }
}



export default KafSuggestions;
