import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';

import MapScreen from '../screens/MapScreen';
import ChargeScreen from '../screens/ChargeScreen';
import ValueScreen from '../screens/ValueScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Charge:ChargeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const MapStack = createStackNavigator({
  Maps: MapScreen,
});

MapStack.navigationOptions = {
  tabBarLabel: 'Maps',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-locate' : 'md-locate'}
    />
  ),
};

const ValueStack = createStackNavigator({
  Value: ValueScreen,
});

ValueStack.navigationOptions = {
  tabBarLabel: 'Value',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-card' : 'md-card'}
    />
  ),
};
const ChargeStack = createStackNavigator({
  Charge: ChargeScreen,
});

ChargeStack.navigationOptions = {
  tabBarLabel: 'Charge',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-battery-charging' : 'md-battery-charging'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  MapStack,
  ValueStack,
 
  
});

