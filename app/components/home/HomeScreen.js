import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormButton from '../global/FormButton';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome user</Text>
      <FormButton buttonTitle="Logout" onPress={() => console.log('welcome')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f1',
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
});
