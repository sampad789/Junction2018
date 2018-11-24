import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from "firebase";
import firebase_config from "./constants/Firebase";

const firebaseRef = firebase.initializeApp(firebase_config);

// Initialize firebase database
const database = firebase.database();
 
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.databaseRef = firebaseRef.database().ref('user/1');
    this.state = {
      firstName: 'Janne',
      surname: 'Johansson',
      balance: 0
    }
  }
 
  getUserInfo = () => {
    return database.ref('/user/1').once('value').then(function(snapshot) {
      var username = snapshot.val().firstName;
      var surname = snapshot.val().surname;
      console.log(username);
      console.log(surname);
    });
  }
 
  componentWillMount() {
    this.getUserInfo();
  }
 
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome, {this.state.firstName}!</Text>
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