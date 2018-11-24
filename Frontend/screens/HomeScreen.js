import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import * as firebase from 'firebase';
import _ from 'lodash';
import firebase_config from '../constants/Firebase';

const firebaseRef = firebase.initializeApp(firebase_config);

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home     '
  };
  constructor(props) {
    super(props);
    this.userRef = firebaseRef.database().ref('user/1');
    this.userRef.on('value', snapshot => {
      console.log(snapshot);
      this.setState({
        firstName: snapshot.val().firstName,
        surname: snapshot.val().surname,
        balance: snapshot.val().balance
      });
    });
    this.state = {
      firstName: '',
      surname: '',
      balance: 0,
      isLoadingComplete: false
    };
  }
  getUserInfo = () => {
    return firebase
      .database()
      .ref('/user/1')
      .once('value')
      .then(
        function(snapshot) {
          this.setState({
            firstName: snapshot.val().firstName,
            surname: snapshot.val().surname,
            balance: snapshot.val().balance
          });
        }.bind(this)
      );
  };

  change = () => {
    database.ref('/user/1/').update({
      balance: 28
    });
    console.log(
      'The value of balance for ' + this.state.firstName + ' is now 28'
    );
  };

  componentWillMount() {
    this.getUserInfo();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>ENSTO EV CHARGE</Text>
        <Text style={styles.text2}>
          Welcome {this.state.firstName} {this.state.surname}
        </Text>
        <Text style={styles.text2}>
          Current Balance : {this.state.balance} €
        </Text>
        <View style={styles.onbutton}>
          <Button onPress={() => navigate('Charge')} title="Charge" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  text: {
    color: '#0989D1',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    flex: 1
  },
  text2: {
    color: '#0989D1',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    flex: 1
  },
  onbutton: {
    flex: 1
  }
});
