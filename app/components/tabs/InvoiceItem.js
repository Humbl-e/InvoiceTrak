import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';
import { windowWidth } from '../../utilities/Dimensions';
import { InvoiceContext } from '../store/InvoiceProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderBottomWidth: 0.5,
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

export default function InvoiceItem({ item, index }) {
  const { data } = useContext(InvoiceContext);
  const invoice = data.invoices.byId;
  const invoiceDetails = invoice[item].details;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{invoice[item].id}</Text>
      <View style={styles.row}>
        <Text style={styles.textTotal}>{invoice[item].clientName}</Text>
        <Text style={styles.textTotal}>{`£${invoice[item].total}`}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {invoiceDetails.map((element, pos) => {
          return <Text key={pos} numberOfLines={1} ellipsizeMode="tail" style={[[styles.text]]}>{`${element.description}, `}</Text>;
        })}
      </View>
    </View>
  );
}
