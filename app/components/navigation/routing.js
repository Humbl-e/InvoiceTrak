import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Home/HomeScreen';

const Stack = createStackNavigator();

export function AuthStack() {
  return (
    <View>
      <Text>Auth</Text>
    </View>
  );
}

export function AppStack() {
  return (
    <Stack.Navigator
      headerMode="none"
      mode="modal"
      screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
