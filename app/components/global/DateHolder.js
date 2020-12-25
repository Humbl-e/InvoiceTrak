import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';

const styles = StyleSheet.create({
  container: {
    width: 300,
    // borderBottomWidth: 1,
    borderBottomColor: Colors.slate,
    padding: 15,
  },
  text: {
    fontSize: 16,
    color: Colors.memoGrey,
  },
});

export default function DateHolder({ date, onPress }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <Text style={[styles.text]}>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
