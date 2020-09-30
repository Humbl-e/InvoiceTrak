import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Platform } from 'react-native';
import { Container, Form, Item, Input, Label, Separator } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { windowWidth } from '../../utilities/Dimensions';
import Colors from '../../styles/Colors';
import Loading from '../global/Loading';
import InvoiceItem from '../global/InvoiceItem';
import FormButton from '../global/FormButton';
import DateHolder from '../global/DateHolder';

let invoice = '0001';

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
  {
    id: '2',
    dueDate: '20/10/2018',
    customer: 'Terry Ltd',
    qty: 20,
    description: 'Building materials',
    unitCost: 0.25,
    amount: '50.00',
  },
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
    margin: 10,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
});

export default function InvoiceCreateScreen({ navigation }) {
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const changePaid = () => {
    setPaid((prevState) => !prevState);
  };

  const showMode = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const saveInvoice = () => {
    console.log('saving invoice');
  };

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

  // const isNotValid = () => {
  //   return !
  // };

  return (
    <Container style={styles.container}>
      <ScrollView>
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
            <DateHolder date={date} onPress={showMode} />
          </Item>
        </Form>
        <Separator style={{ flex: 0.05 }}>
          <Text>Invoice Details</Text>
        </Separator>
        <FlatList
          data={mockCustomerData}
          extraData={mockCustomerData}
          scrollEnabled={false}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
        />
        <View style={styles.btnContainer}>
          <FormButton style={{ backgroundColor: paid ? 'green' : Colors.slate }} title="Mark as Paid" onPress={changePaid} />
          <FormButton title="Save Invoice" onPress={saveInvoice} />
        </View>
      </ScrollView>
      {show && <DateTimePicker value={date} is24Hour={true} display="default" onChange={onChange} />}
      {loading && <Loading />}
    </Container>
  );
}
