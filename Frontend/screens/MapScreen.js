import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, Alert, YellowBox, FlatList } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import * as firebase from "firebase";

YellowBox.ignoreWarnings(['Setting a timer']);
const base64 = require('base-64');

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Maps   ',
  };
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      latitude: 60.200692,
      longitude: 24.934302,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
      markerTitle: '',
      markers: [],
      EVChargers: [],
      chargingPointGroups: [],
      isReady: false
    }
  }

  componentWillMount() {
    this.getLocation();
    this.enstoAPI();
  }

  // Get current user co-ords
  getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('No permission to access location.');
    }
    else {
      let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      this.setState({ location, latitude: location.coords.latitude, longitude: location.coords.longitude })
    }
  }

  enstoAPI = async () => {
    const username = 'junction';
    const pswd = 'junction2018';
    await fetch("https://junctionev.enstoflow.com/api/v1/chargingPointGroup", {
      method: 'GET',
      headers: new Headers({
        "Authorization": "Basic " + base64.encode(username + ":" + pswd),
        "Content-Type": "application/json"
      })
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Oops! Something went wrong!")
        }
        else
          return response.json()
      })
      .then((responseJSON) => {
        for (var i = 0; i < responseJSON.length; i++) {
          let tempChargingPointGroup = {};
          tempChargingPointGroup.id = responseJSON[i].id;
          tempChargingPointGroup.chargingPoints = [];

          for (var j = 0; j < responseJSON[i].chargingPoints.length; j++) {
            let tempChargingPoint = {};
            tempChargingPoint.id = responseJSON[i].chargingPoints[j].id;
            tempChargingPoint.chargePointVendor = responseJSON[i].chargingPoints[j].chargePointVendor;
            tempChargingPoint.chargePointModel = responseJSON[i].chargingPoints[j].chargePointModel;
            tempChargingPoint.connectors = [];
            tempChargingPointGroup.chargingPoints.push(tempChargingPoint);

            for (var k = 0; k < responseJSON[i].chargingPoints[j].connectors.length; k++) {
              let tempConnector = {};
              if (responseJSON[i].chargingPoints[j].connectors[k].id === 0) {
                continue
              }
              tempConnector.connectorId = responseJSON[i].chargingPoints[j].connectors[k].id;
              tempConnector.status = responseJSON[i].chargingPoints[j].connectors[k].status;
              tempChargingPointGroup.chargingPoints[j].connectors.push(tempConnector);
            }
          }
          this.setState({ EVChargers: [...this.state.EVChargers, tempChargingPointGroup] });
        }
      })
      .then(this.getChargingPointGroups);
  }

  getChargingPointGroups = () => {
    let firebaseResult = [];
    let temp = this.state.EVChargers;
    let newArr = [];

    return firebase.database().ref(`/chargingPointGroup`).once('value').then(function (snapshot) {
      for (let ele of snapshot.val()) {
        if (ele) {
          firebaseResult.push(ele);
        }
      }

      firebaseResult.sort(function (a, b) { return a.id - b.id });
      temp.sort(function (a, b) { return a.id - b.id });

      firebaseResult.forEach((itm, i) => {
        newArr.push(Object.assign({}, itm, temp[i]));
      });
      this.setState({ EVChargers: newArr, isReady: true });
    }.bind(this));
  }

  chargingPointMarkers = (chargingPointGroup) => {
    let availableConnectors = 0;
    let result = '';
    for (var i = 0; i < chargingPointGroup.chargingPoints.length; i++) {
      for (var j = 0; j < chargingPointGroup.chargingPoints[i].connectors.length; j++) {
        console.log(chargingPointGroup.chargingPoints[i].connectors[j].status);
        if (chargingPointGroup.chargingPoints[i].connectors[j].status == 'Available') {
          availableConnectors++;
        }
      }
    }
    if (availableConnectors === 1) {
      result = '1 connector available';
    }
    else {
      result = `${availableConnectors} connectors available`;
    }
    return result
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    const renderMarkers = this.state.EVChargers.map((info, index) =>
      <MapView.Marker
        key={index}
        title={info.address}
        description={this.chargingPointMarkers(info)}
        coordinate={{
          latitude: info.latitude,
          longitude: info.longitude
        }}
      />
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
          {renderMarkers}
        </MapView>
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  }
});
