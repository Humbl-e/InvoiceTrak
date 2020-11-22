import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import Colors from '../../styles/Colors';

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

export default function InvoiceListItem({ onPress, description, style, item, footer }) {
  const footerTextColor = footer ? { color: Colors.lightGrey } : { color: Colors.black };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <View style={{ flex: 1 }}>
          <View style={styles.row}>
            <Text style={[styles.text, footerTextColor]}>Add Item</Text>
            <Text style={[styles.text, footerTextColor]}>0 x £0.00</Text>
          </View>
          <Text style={[styles.textTotal, footerTextColor]}>GO</Text>
        </View>
      </TouchableOpacity>
      {footer && (
        <View style={styles.footer}>
          <Text style={styles.textFooter}>SubTotal</Text>
          <Text style={styles.textFooter}>INVOICE TOTAL</Text>
        </View>
      )}
    </View>
  );
}
