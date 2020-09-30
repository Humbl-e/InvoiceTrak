import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './app/components/navigation/HomeStack';
import Loading from './app/components/global/Loading';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

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
