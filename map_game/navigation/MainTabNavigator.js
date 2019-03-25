import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {AsyncStorage} from 'react-native';
const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (

    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const MapsStack = createStackNavigator({
  Maps: MapScreen,
});

MapsStack.navigationOptions = {
  tabBarLabel: 'Maps',
  visible  : false,
  tabBarIcon: ({ focused }) => (
    <AntDesign
      focused={focused}
      
      name="login" size={25} color='lightgray' 
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'HomeGame',
  tabBarIcon: ({ focused }) => (
    <FontAwesome
    name="gamepad" size={25} color='lightgray' 
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  MapsStack,
  SettingsStack,
});
