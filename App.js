import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './app/components/navigation/HomeStack';
import Loading from './app/components/global/Loading';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import { InvoiceContext } from './app/components/store/InvoiceProvider';

LogBox.ignoreLogs(['VirtualizedLists should never be nested', 'Non-serializable values were found in the navigation state']);

export default function App() {
  const navigationRef = React.createRef();
  const { data, dispatch } = useContext(InvoiceContext);
  const loading = data.loading;

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
      <Loading loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
