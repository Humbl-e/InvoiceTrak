import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
});

export default function InvoiceListItem({ onPress, item, footer }) {
  const footerTextColor = footer ? { color: Colors.lightGrey } : { color: Colors.black };
  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <View style={{ flex: 1 }}>
          <View style={styles.row}>
            <Text style={[styles.text, footerTextColor]}>{footer ? 'Add Item' : item.description}</Text>
            <Text style={[styles.text, footerTextColor]}>{footer ? '0 x £0.00' : `${item.qty} x £${item.unitCost}`}</Text>
          </View>
          <Text style={[styles.textTotal, footerTextColor]}>{footer ? '£0.00' : `£${item.subTotal}`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
