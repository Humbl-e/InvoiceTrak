import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { windowWidth } from '../../utilities/Dimensions';

import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Separator,
} from 'native-base';

import InvoiceItem from '../global/InvoiceItem';

let invoice = '0001';
const getInvoiceNumber = () => {
  return invoice++;
};

const mockCustomerData = [
  {
    id: '1',
    dueDate: '20/10/2018',
    customer: 'Terry Ltd',
    qty: 15,
    description: 'Building materials',
    unitCost: 0.75,
    amount: '25.99',
  },
  // {
  //   id: '2',
  //   dueDate: '20/10/2018',
  //   customer: 'Terry Ltd',
  //   qty: 20,
  //   description: 'Building materials',
  //   unitCost: 0.25,
  //   amount: '50.00',
  // },
  // {
  //   id: '3',
  //   dueDate: '20/10/2018',
  //   customer: 'Terry Ltd',
  //   qty: 1000,
  //   description: 'Building materials',
  //   unitCost: 10.5,
  //   amount: '99.27',
  // },
  // {
  //   id: '4',
  //   dueDate: '20/10/2018',
  //   customer: 'Terry Ltd',
  //   qty: 100,
  //   description: 'Building materials',
  //   unitCost: 0.95,
  //   amount: '101.20',
  // },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'grey',
  },
  touchable: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    margin: 10,
    borderRadius: 15,
  },
});

const Details = ({ title }) => {
  console.log('tet', title);
  return (
    <View style={styles.row}>
      <Text style={{ maxWidth: windowWidth / 4 }}>QTY</Text>
      <Text>Description</Text>
      <Text>Unit Cost</Text>
      <Text>Amount</Text>
    </View>
  );
};

export default function InvoiceCreateScreen({ navigation }) {
  const goToItem = ({ item, index }) => {
    if (item) {
      navigation.navigate('Item', { item, index });
    } else {
      navigation.navigate('Item');
    }
  };

  const renderItem = ({ item, index }) => {
    console.log(item);
    return <InvoiceItem onPress={() => goToItem({ item, index })} />;
  };

  const renderFooter = () => {
    return <InvoiceItem footer onPress={goToItem} />;
  };

  return (
    <Container style={{ margin: 10 }}>
      <Content>
        <Separator style={{ flex: 0.05 }}>
          <Text>Details</Text>
        </Separator>
        <Form>
          <Item inlineLabel>
            <Label>Invoice Number</Label>
            <Input value={invoice} editable={false} />
          </Item>
          <Item inlineLabel>
            <Label>Client Name</Label>
            <Input />
          </Item>
          <Item inlineLabel last>
            <Label>Date</Label>
            <Input />
          </Item>
        </Form>
        <Separator style={{ flex: 0.05 }}>
          <Text>Invoice Details</Text>
        </Separator>
        <FlatList
          style={{ flex: 1 }}
          data={mockCustomerData}
          extraData={mockCustomerData}
          scrollEnabled={false}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
        />
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            // minHeight: 50,
          }}>
          <TouchableOpacity style={styles.touchable}>
            <View>
              <Text>Mark Paid</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Content>
    </Container>
  );
}
