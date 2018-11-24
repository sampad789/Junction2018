import React from 'react';
import { ScrollView, StyleSheet ,Text} from 'react-native';


export default class ChargeScreen extends React.Component {
  static navigationOptions = {
    title: 'Charge        ',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
       <Text>Boom boi </Text>
       
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});