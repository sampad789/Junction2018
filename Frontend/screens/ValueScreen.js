import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Title,
  Button,
  TextInput,
  Text,
  View,
  YellowBox,
  TouchableOpacity
} from 'react-native';
import * as firebase from 'firebase';
import Toast, { DURATION } from 'react-native-easy-toast'

YellowBox.ignoreWarnings(['Setting a timer'])

export default class ValueScreen extends React.Component {
  static navigationOptions = {
    title: 'Value      '
  };

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      surname: '',
      balance: '',
      newBalance: 0
    };
  }

  componentDidMount() {
    this.onPageLoad();
  }

  onPageLoad = () => {
    firebase
      .database()
      .ref('/user/1')
      .on('value', snapshot => {
        this.setState({
          firstname: snapshot.val().firstName,
          surname: snapshot.val().surname,
          balance: snapshot.val().balance
        });
      });
  };

  editValue = () => {
    firebase
      .database()
      .ref('/user/1/')
      .update({
        balance: Number(this.state.balance) + Number(this.state.newBalance)
      });
    this.setState({
      newBalance: 0
    })
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.empty}></View>
        <View style={styles.headerContainer}>
          <Image source={require('../img/logo.png')} style={styles.logo} />
          <Text style={styles.header}>
            EV CHARGE
          </Text>
        </View>

        <View style={styles.content}>

          <Text style={styles.textMain}>
            {"\n"}Your balance{'\n'}
          </Text>
          <View style={styles.line} />
          <Text style={styles.textMain}>
            {this.state.balance + "€"}{"\n"}
          </Text>
          <Text style={styles.textSecondary}>
            {"\n"}{"\n"}Increase balance (€){'\n'}
          </Text>
          <View style={styles.line} />
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={newBalance => this.setState({ newBalance })}
              value={`${this.state.newBalance}`}
              keyboardType="numeric"
              style={styles.input}
            />
            <View style={styles.toastContainer}>
              <TouchableOpacity style={styles.toast} onPress={() => {
                this.refs.toast.show('Payment confirmed!', 500, () => {
                  this.editValue();
                  });
                }}>
                <Text style={styles.button}>Bank{"\n"}Card</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.toast} onPress={() => {
                this.refs.toast.show('Payment confirmed!', 500, () => {
                  this.editValue();
                  });
                }}>
                <Text style={styles.button}>Mobile{"\n"}Pay</Text>
              </TouchableOpacity>
              <Toast
                ref="toast"
                position="top"
                style={{ backgroundColor: "gray" }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  headerContainer: {
    flex: 1,
    marginHorizontal: 10,
  },

  logo: {
    resizeMode: 'contain',
    flex: 5,
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

  content: {
    backgroundColor: '#0989D1',
    marginHorizontal: 10,
    flex: 1.8,
    flexDirection: 'column',
    paddingTop: 15,
  },

  textMain: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 10,
  },

  textSecondary: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 5,
  },

  inputContainer: {
    width: 300,
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 30,
  },

  input: {
    fontSize: 50,
    backgroundColor: '#fff',
    borderColor: "#04AEFB",
    borderWidth: 2,
    textAlign: "center",
    color: "#4298f4",
    minWidth: 260,
    flex: 1,
  },

  button: {
    fontSize: 20,
    alignItems: 'center',
    backgroundColor: "#F67C00",
    color: '#fff',
    borderColor: '#fff',
    width: 100,
    marginHorizontal: 10,
    padding: 5,
  },

  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flex: 1,
  },

  toast: {
    alignItems: 'center',
    paddingVertical: 50,
  },

  line: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },

  empty: {
    flex: 2,
  }
});
