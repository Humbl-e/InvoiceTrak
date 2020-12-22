import React, { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { InvoiceContext } from '../store/InvoiceProvider';
import InvoiceItem from './InvoiceItem';

export default function InvoicesAllTab({ navigation }) {
  const { data } = useContext(InvoiceContext);

  const goToInvoice = (item) => {
    navigation.navigate('Add Invoice', { editMode: true, id: item });
  };

  const renderItem = ({ item, index }) => {
    return <InvoiceItem item={item} index={index} onPress={() => goToInvoice(item)} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ margin: 10 }}
        data={data.invoices.allIds}
        extraData={data.invoices.allIds}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
      />
    </View>
  );
}
