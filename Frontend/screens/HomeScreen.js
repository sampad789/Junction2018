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
import ChargeScreen from '../screens/ChargeScreen';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
   title:'Home     '
  };
  constructor(props){
    super(props);
    

  }

  
  render() {
    const {navigate} = this.props.navigation;
    return (
      

      <Button onPress={()=>navigate('Charge')} title='Charge' />

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    
  }
});
