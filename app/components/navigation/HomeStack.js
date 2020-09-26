import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../home/HomeScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
