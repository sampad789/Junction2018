import React from 'react';
import {
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
        balance: this.state.newBalance
      });
  };

  increase = () => {
    this.setState({
      newBalance: this.state.newBalance + 1
    })
  }

  decrease = () => {
    this.setState({
      newBalance: this.state.newBalance - 1
    })
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 55,
            borderBottomColor: 'black',
            borderBottomWidth: 2
          }}>
          Your balance{'\n'}
        </Text>
        <Text style={{ fontSize: 40, marginTop: 50 }}>
          {this.state.balance}
        </Text>
        <View style={{ width: 100, marginTop: 50, flexDirection: 'row', justifyContent: "space-around"}}>
          <TouchableOpacity style={{alignContent: "center", backgroundColor: "#DDDDDD", padding: 10}} onPress={this.increase}>
            <Text>+</Text>
          </TouchableOpacity>
          <TextInput
            onChangeText={newBalance => this.setState({ newBalance })}
            value={`${this.state.newBalance}`}
            keyboardType="numeric"
            style={{ borderBottomColor: 'black', borderBottomWidth: 2 }}
          />
          <TouchableOpacity style={{alignContent: "center", backgroundColor: "#DDDDDD", padding: 10}} onPress={this.decrease}>
          <Text>-</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={{alignItems: 'center', backgroundColor: "#DDDDDD", width: 100, padding: 10, marginTop: 50}} onPress={() => this.editValue()}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center', backgroundColor: "#DDDDDD", width: 100, padding: 10, marginTop: 50}}><Text>MobilePay</Text></TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});
