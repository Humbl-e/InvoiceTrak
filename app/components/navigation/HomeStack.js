import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../home/HomeScreen';
import InvoiceCreateScreen from '../home/InvoiceCreateScreen';
import ItemScreen from '../home/ItemScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2F4F4F',
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTitleStyle: { color: 'white' },
        headerBackTitleStyle: { color: 'white' },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="Invoices" component={HomeScreen} />
      <Stack.Screen name="Invoice" component={InvoiceCreateScreen} />
      <Stack.Screen name="Item" component={ItemScreen} />
    </Stack.Navigator>
  );
}
