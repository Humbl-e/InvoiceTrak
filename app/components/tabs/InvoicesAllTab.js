import React, { useState, useContext, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import Colors from '../../styles/Colors';
import { InvoiceContext } from '../store/InvoiceProvider';
import InvoiceItem from './InvoiceItem';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 25,
  },
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
  emptyText: {
    fontSize: 18,
    color: Colors.turqoise,
    textAlign: 'center',
  },
});

const renderEmptyComponent = () => {
  return (
    <View style={styles.container}>
      <Icon name="document-text-outline" style={{ fontSize: 75, color: Colors.slate, margin: 10 }} />
      <Text style={styles.emptyText}>{'All invoices will show up here. Click the plus button below to create your first invoice!'}</Text>
    </View>
  );
};

export default function InvoicesAllTab() {
  const [invoicesTotal, setInvoicesTotal] = useState(0);
  const navigation = useNavigation();
  const { data } = useContext(InvoiceContext);

  const goToInvoice = (item) => {
    navigation.navigate('Add Invoice', { editMode: true, id: item });
  };

  const renderItem = ({ item, index }) => {
    return <InvoiceItem item={item} index={index} onPress={() => goToInvoice(item)} />;
  };

  useEffect(() => {
    const invoices = data.invoices.byId;
    let totalAmount = 0;
    for (let i in invoices) {
      const singleTotal = Number.parseFloat(invoices[i].total);
      totalAmount += singleTotal;
    }
    setInvoicesTotal(Number.parseFloat(totalAmount).toFixed(2));
  }, [data.invoices]);

  const renderHeader = () => {
    return (
      <View style={styles.row}>
        <Text style={[styles.textTotal, { flex: 0.5 }]}>Total</Text>
        <Text style={[styles.textTotal, { flex: 1, textAlign: 'right' }]}>{`£${invoicesTotal}`}</Text>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <FlatList
        style={styles.list}
        scrollEnabled={false}
        data={data.invoices.allIds}
        contentContainerStyle={{ flexGrow: 1 }}
        extraData={data.invoices.allIds}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        ListHeaderComponent={data.invoices.allIds.length > 0 ? renderHeader : null}
        ListEmptyComponent={renderEmptyComponent}
      />
    </ScrollView>
  );
}
