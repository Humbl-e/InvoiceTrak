import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../styles/Colors';
import { windowWidth } from '../../utilities/Dimensions';
import { InvoiceContext } from '../store/InvoiceProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: 'grey',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
  },
  text: {
    fontSize: 16,
    color: Colors.lightGrey,
  },
  textTotal: {
    fontSize: 16,
    color: Colors.slate,
  },
});

export default function InvoiceItem({ item, index, onPress }) {
  const { data } = useContext(InvoiceContext);
  const invoice = data.invoices.byId;
  const invoiceDetails = invoice[item].details;
  const [stringDetails, setStringDetails] = useState('');

  useEffect(() => {
    let stringArray = [];
    invoiceDetails.forEach((element) => {
      stringArray.push(element.description);
    });
    const stringifiedDetails = stringArray.join(', ');
    setStringDetails(stringifiedDetails);
  }, [invoiceDetails]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{invoice[item].id}</Text>
        <View style={styles.row}>
          <Text style={styles.textTotal} numberOfLines={1}>
            {invoice[item].clientName}
          </Text>
          <Text style={styles.textTotal} numberOfLines={1}>{`£${invoice[item].total}`}</Text>
        </View>
        <View style={{ flexDirection: 'row', maxWidth: windowWidth / 2 + 50 }}>
          <Text style={[styles.text]} numberOfLines={1}>
            {stringDetails}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
