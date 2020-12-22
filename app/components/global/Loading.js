import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../../styles/Colors';

export default function Loading({ loading }) {
  return <Spinner visible={loading} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />;
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
