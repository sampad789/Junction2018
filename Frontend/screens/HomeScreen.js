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
        <View style={styles.empty}></View>
        <View style={styles.headerContainer}>
          <Image source={require('../img/logo.png')} style={styles.logo} />
          <Text style={styles.header}>
            EV CHARGE
          </Text>
        </View>

        <View style={styles.text2Container}>
          <Text style={styles.textWelcome}>
            {"\n"}Welcome
            {"\n"} {this.state.firstName} {this.state.surname}
          </Text>
          <Text style={styles.text2}>
            {"\n"}Current Balance
          </Text>
          <View style={styles.line} />
          <Text style={styles.text2}>
            {this.state.balance} €
          </Text>
        </View>
        <View style={styles.empty}></View>
        <View style={styles.onbutton}>
          <Button onPress={() => navigate('Charge')} title='Charge' />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerContainer: {
    flex: 1,
    marginHorizontal: 10,
  },

  logo: {
    resizeMode: 'contain',
    flex: .5,
    width: undefined,
    height: undefined,
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },

  header: {
    color: "#0989D1",
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: .1,
  },

  text2Container: {
    backgroundColor: '#0989D1',
    marginHorizontal: 10,
    flex: 1.8,
  },

  textWelcome: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 10,
  },

  text2: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 5,
  },
  onbutton: {
    flex: .2,
  },

  line: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },

  empty: {
    flex:.15,
  }

});