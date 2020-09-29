import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeStack from './app/components/navigation/HomeStack';
import Loading from './app/components/global/Loading';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();

export default function App() {
  const navigationRef = React.createRef();
  useEffect(() => {
    Icon.loadFont();
    MaterialIcons.loadFont();
    MaterialCommunityIcons.loadFont();
    FontAwesomeIcons.loadFont();
  }, []);

  return (
    <View style={styles.container} accessibility="app">
      <StatusBar barStyle={'light-content'} />
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
