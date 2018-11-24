import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, Alert } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
const key = 'AIzaSyB5LPlTnHClwSE8rXgznk6nuGxxBnAfu1M';


const info = [
  {
    name :"pasila",
    lat :60.1990,
    lon:24.9328,
    chargingPointGroup :[
    {  id : "4",
    chargePointVendor:"Ensto",
    chargingPoint:[
      {
        id:"1",
        status:"available"
      }
    ]
    
    }
    ],

    status:"available"
  }

]








export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Maps   ',
  };
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      address: '',
      latitude: 60.200692,
      longitude: 24.934302,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
      markerTitle: '',
      markers: [],
      description:'boomboi',
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('No permission to access location.');
    }
    else {
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      this.setState({ location, latitude: location.coords.latitude, longitude: location.coords.longitude })
      this.getRestaurants();
    
    }
  }

  getAddress = () => {
    if (this.state.address.length < 1) { Alert.alert("Please type an address!"); return false }

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.address}&key=${key}`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({latitude: responseJson.results[0].geometry.location.lat,
        longitude: responseJson.results[0].geometry.location.lng,
        latitudeDelta: 0.004757,
        longitudeDelta: 0.006866,
        markerTitle: responseJson.results[0].formatted_address});
    })
    .then(this.getRestaurants)
    .catch((error) => {
      Alert.alert(error);
    });
  }

  getRestaurants = () => {
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.latitude},${this.state.longitude}&radius=300&type=restaurants&key=${key}`)
    .then((response) => response.json())
    .then((responseJson) => {
      let temp = [];
      for (let i = 0; i < responseJson.results.length; i++) {
        temp.push({
          name: responseJson.results[i].name,
          address: responseJson.results[i].vicinity,
          latitude: responseJson.results[i].geometry.location.lat,
          longitude: responseJson.results[i].geometry.location.lng
        })
        this.setState({markers: temp})
      }
    })
  }

  render() {
  
    const renderMarkers = info.map((info, index) =>
      <MapView.Marker
        key = {index}
        title = {info.name}
        description={info.status}
        coordinate = {{
          latitude: info.lat,
          longitude: info.lon
        }} />
    )

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
          }}>
          <MapView.Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            title= {this.state.markerTitle} />
          {renderMarkers}
        </MapView>
        <View style={styles.search}>
          <TextInput style={{fontSize: 18, height: 50}} value={this.state.address}
            onChangeText={(address) => this.setState({address})} />
          <Button title='SHOW' onPress={this.getAddress}></Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    map: {
      flex: 0.8
    },
    search: {
      flex: 0.2,
      padding: 5
    }
  });