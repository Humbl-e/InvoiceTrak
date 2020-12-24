import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import Colors from '../../styles/Colors';
import { InvoiceContext } from '../store/InvoiceProvider';
import InvoiceItem from './InvoiceItem';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  list: {
    margin: 10,
    paddingBottom: 25,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
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

export default function InvoicesPaidTab() {
  const [invoicesTotal, setInvoicesTotal] = useState(0);
  const navigation = useNavigation();
  const [listData, setListData] = useState([]);

  const { data } = useContext(InvoiceContext);

  useEffect(() => {
    const invoices = data.invoices.byId;
    let outstandingInvoices = [];
    let totalAmount = 0;
    for (let i in invoices) {
      const paidStatus = invoices[i].isPaid;
      if (paidStatus) {
        const singleTotal = Number.parseFloat(invoices[i].total);
        totalAmount += singleTotal;
        outstandingInvoices.push(i);
      }
    }
    setListData(outstandingInvoices);
    setInvoicesTotal(Number.parseFloat(totalAmount).toFixed(2));
  }, [data.invoices]);

  const goToInvoice = (item) => {
    navigation.navigate('Add Invoice', { editMode: true, id: item });
  };

  const renderItem = ({ item, index }) => {
    return <InvoiceItem item={item} index={index} onPress={() => goToInvoice(item)} />;
  };

  const renderHeader = () => {
    return (
      <View style={styles.row}>
        <Text style={[styles.textTotal, { flex: 0.5 }]}>Total</Text>
        <Text style={[styles.textTotal, { flex: 1, textAlign: 'right' }]}>{`£${invoicesTotal}`}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <FlatList
        style={styles.list}
        scrollEnabled={false}
        data={listData}
        extraData={listData}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        ListHeaderComponent={renderHeader}
      />
    </ScrollView>
  );
}
