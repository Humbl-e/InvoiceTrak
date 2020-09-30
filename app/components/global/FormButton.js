import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from '../../styles/Colors';
import { windowHeight, windowWidth } from '../../utilities/Dimensions';

export default function FormButton({ title, disabled, onPress, style, ...props }) {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} {...props} disabled={disabled} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: windowWidth / 2,
    height: windowHeight / 20,
    backgroundColor: Colors.slate,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    textAlign: 'center',
  },
});
