import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Platform } from 'react-native';
import { Container, Form, Item, Input, Label, Separator } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { windowWidth } from '../../utilities/Dimensions';
import Colors from '../../styles/Colors';
import Loading from '../global/Loading';
import InvoiceListItem from '../global/InvoiceListItem';
import FormButton from '../global/FormButton';
import DateHolder from '../global/DateHolder';
import { InvoiceContext } from '../store/InvoiceProvider';
import { ADD_DETAILS, ADD_INVOICE } from '../config/actionTypes';

const mockCustomerData = [
  // {
  //   id: '1',
  //   dueDate: '20/10/2018',
  //   customer: 'Terry Ltd',
  //   qty: 15,
  //   description: 'Building materials',
  //   unitCost: 0.75,
  //   amount: '25.99',
  // },
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
    margin: 10,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  footer: {
    flex: 1,
    backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 50,
    padding: 5,
  },
  textFooter: {
    fontSize: 16,
  },
});

export default function InvoiceCreateScreen({ navigation, route }) {
  const [paid, setPaid] = useState(false);
  const [clientName, setClientName] = useState('');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const { data, dispatch } = useContext(InvoiceContext);
  const invoiceNumber = data.lastInvoice;

  console.log('invoiceNumber', invoiceNumber);
  console.log('data', data.invoices);

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
    const invoice = {
      id: invoiceNumber,
      clientName,
      date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      isPaid: paid,
      details: data.invoiceDetails,
      Total: data.invoiceTotal,
    };
    dispatch({ type: ADD_INVOICE, payload: invoice });
    navigation.goBack();
  };

  const goToInvoiceDetail = ({ item, index }) => {
    if (item) {
      navigation.navigate('Invoice Detail', { item, index, updateDetails });
    } else {
      navigation.navigate('Invoice Detail', { updateDetails });
    }
  };

  const updateDetails = (detail) => {
    dispatch({ type: ADD_DETAILS, payload: detail });
  };

  const renderItem = ({ item, index }) => {
    return <InvoiceListItem item={item} index={index} onPress={() => goToInvoiceDetail({ item, index })} />;
  };

  const renderFooter = () => {
    return <InvoiceListItem footer onPress={goToInvoiceDetail} />;
  };

  return (
    <Container style={styles.container}>
      <ScrollView>
        <Separator style={{ flex: 0.05 }}>
          <Text>Details</Text>
        </Separator>
        <Form>
          <Item inlineLabel>
            <Label>Invoice Number</Label>
            <Input value={invoiceNumber} editable={false} />
          </Item>
          <Item inlineLabel error={!clientName}>
            <Label>Client Name</Label>
            <Input value={clientName} onChangeText={setClientName} />
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
          data={data.invoiceDetails}
          extraData={data.invoiceDetails}
          scrollEnabled={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.description + index}
          ListFooterComponent={renderFooter}
        />
        <View style={styles.footer}>
          <Text style={styles.textFooter}>SubTotal</Text>
          <Text style={styles.textFooter}>{`£${data.invoiceTotal}`}</Text>
        </View>

        <View style={styles.btnContainer}>
          <FormButton style={{ backgroundColor: paid ? Colors.green : Colors.red }} title={'Paid'} onPress={changePaid} />
          <FormButton title="Save Invoice" onPress={saveInvoice} disabled={data.invoiceDetails.length < 1 || !clientName} />
        </View>
      </ScrollView>
      {show && <DateTimePicker value={date} is24Hour={true} display="default" onChange={onChange} />}
      {loading && <Loading />}
    </Container>
  );
}
