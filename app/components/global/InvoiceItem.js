import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    paddingTop: 10,
    borderRadius: 10,
  },
  btn: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  text: {
    fontSize: 16,
  },
  textTotal: {
    fontSize: 16,
    padding: 5,
    textAlign: 'right',
  },
  footer: {
    flex: 1,
    backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 35,
    padding: 5,
  },
  textFooter: {
    fontSize: 16,
  },
});

export default function InvoiceItem({
  onPress,
  description,
  style,
  item,
  footer,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} transparent onPress={onPress}>
        <View style={{ flex: 1 }}>
          <View style={styles.row}>
            <Text style={styles.text}>Add Item</Text>
            <Text style={styles.text}>0 x £0.00</Text>
          </View>
          <Text style={styles.textTotal}>GO</Text>
        </View>
      </TouchableOpacity>
      {footer && (
        <View style={styles.footer}>
          <Text style={styles.textFooter}>SubTotal</Text>
          <Text style={styles.textFooter}>£52.50</Text>
        </View>
      )}
    </View>
  );
}
