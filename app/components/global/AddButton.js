import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

const buttonSize = 60;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 25,
    marginBottom: 50,
  },
  icon: {
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent',
  },
});
export default function AddButton({onPress}) {
  const shadowStyle = {
    shadowColor: '#000', // IOS
    shadowOffset: {height: 5, width: 0}, // IOS
    shadowOpacity: 0.35, // IOS
    shadowRadius: 3, // IOS
    elevation: 5, // ANDROID
  };
  const buttonStyle = {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[buttonStyle, shadowStyle]}
        activeOpacity={0.85}
        onPress={() => onPress()}
        disabled={!onPress}>
        <Icon name="md-add" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}
