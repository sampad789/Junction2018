import React from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import * as firebase from "firebase";
import _ from 'lodash';
 
YellowBox.ignoreWarnings(['Setting a timer']);
 
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCwa1Tds6ig7KsltrVvvMsMx7-zLK9UgrY",
  authDomain: "junction2018-223415.firebaseapp.com",
  databaseURL: "https://junction2018-223415.firebaseio.com",
  projectId: "junction2018-223415",
  storageBucket: "junction2018-223415.appspot.com",
  messagingSenderId: "429487068420"
};
const firebaseRef = firebase.initializeApp(config);
 
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.userRef = firebaseRef.database().ref('user/1');
    this.userRef.on('value', (snapshot) => {
      console.log(snapshot)
      this.setState({
        firstName: snapshot.val().firstName,
        surname: snapshot.val().surname,
        balance: snapshot.val().balance
      })
    });
    this.state = {
      firstName: '',
      surname: '',
      balance: 0
    }
  }
 
  getUserInfo = () => {
    return firebase.database().ref('/user/1').once('value').then(function(snapshot) {
      this.setState({
        firstName: snapshot.val().firstName,
        surname: snapshot.val().surname,
        balance: snapshot.val().balance
      });
    }.bind(this));
  }

  change = () => {
    database.ref("/user/1/").update({
      balance: 28
    })
    console.log("The value of balance for " + this.state.firstName + " is now 28")
  }
 
  componentWillMount() {
    this.getUserInfo();
  }
 
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome, {this.state.firstName}!</Text>
        <Text>Current balance: {this.state.balance}€</Text>
        <Button onPress={this.change} title="test"></Button>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});