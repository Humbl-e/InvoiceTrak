import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeStack from './app/components/navigation/HomeStack';
import Loading from './app/components/global/Loading';

const Stack = createStackNavigator();

export default function App() {
  const navigationRef = React.createRef();

  return (
    <View style={styles.container} accessibility="app">
      <NavigationContainer ref={navigationRef}>
        <HomeStack />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
