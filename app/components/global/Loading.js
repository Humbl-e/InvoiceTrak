import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';

export default function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.slate} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
